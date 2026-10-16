"use client"

import * as React from "react"

import { site } from "@/content/site"
import { cn } from "@/lib/utils"

// The portrait as a field of short horizontal dashes. Each cell of a low-res sample
// either gets a dash or not (4×4 Bayer threshold on its "energy"); kept dashes sit at a
// depth that follows that energy, so the field can sway and be dragged in 3D.
// Pointer speed pushes nearby dashes away, and a fading trail under the cursor shows
// the colour photo. On load the dashes fly in from a loose cloud.

const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]
const BUCKETS = 32 // colour steps along the ramp
const TILT = 0.12 // radians, top leaning back
const SWAY = 0.2 // radians, idle yaw amplitude
const DIST = 2400 // perspective distance, css px
const MORPH_MS = 1150
const FADE_MS = 700
const FADE_BOTTOM = 0.3
const FADE_SIDE = 0.14
const GRID_W = 64 // photo-reveal trail resolution
const GRID_H = 72

const smooth = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.trim().replace("#", "")
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

// 5-stop ramp read from the CSS tokens: papier → rouille → braise → encre → creme
function rampColours() {
  const cs = getComputedStyle(document.documentElement)
  const stops = ["--papier", "--rouille", "--braise", "--encre", "--creme"].map((v) => hexToRgb(cs.getPropertyValue(v) || "#000000"))
  return Array.from({ length: BUCKETS }, (_, k) => {
    const t = (k / (BUCKETS - 1)) * 4
    const i = Math.min(3, Math.floor(t))
    const f = t - i
    const c = stops[i].map((v, j) => Math.round(v + (stops[i + 1][j] - v) * f))
    return `rgb(${c[0]} ${c[1]} ${c[2]})`
  })
}

type Field = {
  n: number
  u: Float32Array // target position, -0.5..0.5 of the figure width
  v: Float32Array // target position, -0.5..0.5 of the figure height
  z: Float32Array // depth, in figure widths
  su: Float32Array // start position in the cloud
  sv: Float32Array
  sz: Float32Array
  bend: Float32Array // arc offset during the fly-in (u, v, z per dash)
  seed: Float32Array
  bucket: Uint8Array
}

function sampleField(img: HTMLImageElement, cols: number): Field {
  const rows = Math.round((cols * img.naturalHeight) / img.naturalWidth)
  const c = document.createElement("canvas")
  c.width = cols
  c.height = rows
  const cx = c.getContext("2d", { willReadFrequently: true })!
  cx.imageSmoothingEnabled = true
  cx.drawImage(img, 0, 0, cols, rows)
  const px = cx.getImageData(0, 0, cols, rows).data
  const N = cols * rows
  const at = (i: number, k: number) => px[i * 4 + k] / 255

  // stretch luminance so the dark suit and hair still register
  const lumRaw = new Float32Array(N)
  const hist = new Uint32Array(256)
  let count = 0
  for (let i = 0; i < N; i++) {
    lumRaw[i] = at(i, 0) * 0.299 + at(i, 1) * 0.587 + at(i, 2) * 0.114
    if (at(i, 3) > 0.5) {
      hist[Math.round(lumRaw[i] * 255)]++
      count++
    }
  }
  const pct = (p: number) => {
    let acc = 0
    for (let k = 0; k < 256; k++) if ((acc += hist[k]) >= p * count) return k / 255
    return 1
  }
  const lo = pct(0.02)
  const hi = Math.max(lo + 0.05, pct(0.98))

  const dist = (i: number, j: number) =>
    Math.sqrt(0.25 * (at(i, 0) - at(j, 0)) ** 2 + 0.5 * (at(i, 1) - at(j, 1)) ** 2 + 0.25 * (at(i, 2) - at(j, 2)) ** 2)

  const kept: number[] = []
  const zs: number[] = []
  const cols8: number[] = []
  let rand = 7
  const rnd = () => ((rand = (rand * 16807) % 2147483647) - 1) / 2147483646

  for (let y = 0; y < rows; y++) {
    const fy = y > rows * (1 - FADE_BOTTOM) ? 1 - smooth(0, 1, (y - rows * (1 - FADE_BOTTOM)) / (rows * FADE_BOTTOM)) : 1
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x
      const a = at(i, 3)
      if (a < 0.02) continue
      const r = at(i, 0)
      const b = at(i, 2)
      // a high-key photo: lift the darks, but keep skin around mid-tone so it lands on ink, not cream
      const luma = 0.12 + 0.6 * Math.pow(clamp01((lumRaw[i] - lo) / (hi - lo)), 0.9)
      // colour edges against opaque neighbours only, so the silhouette gets no rim
      let e = 0
      for (const j of [x > 0 ? i - 1 : i, x + 1 < cols ? i + 1 : i, y > 0 ? i - cols : i, y + 1 < rows ? i + cols : i])
        if (at(j, 3) > 0.5) e = Math.max(e, dist(i, j))
      const edge = smooth(0.018, 0.11, e)
      const warm = smooth(-0.01, 0.16, r - b)
      const hilit = smooth(0.55, 0.82, luma) * smooth(-0.05, 0.1, r - b)
      const T = Math.max(warm, hilit, 0.55, 0.72 * edge)
      const fx = smooth(0, 1, Math.min(x, cols - 1 - x) / (cols * FADE_SIDE))
      const E = a * fx * fy * clamp01(luma * (0.05 + 0.95 * T) + 0.1 * edge + 0.22)
      if (E <= (BAYER4[(y % 4) * 4 + (x % 4)] + 0.5) / 16) continue
      const relief = clamp01(0.62 * E + 0.23 + 0.15 * edge)
      const tone = 0.2 + E * 0.8
      const t = 0.06 + 0.94 * clamp01(relief * 0.72 + tone * 0.28)
      kept.push(i)
      zs.push(0.026 + relief * 0.11)
      // darken toward the faded bottom so the shirt doesn't glare behind the name
      cols8.push(Math.round(t * (0.55 + 0.45 * fy) * (BUCKETS - 1)))
    }
  }

  const n = kept.length
  const f: Field = {
    n,
    u: new Float32Array(n),
    v: new Float32Array(n),
    z: new Float32Array(zs),
    su: new Float32Array(n),
    sv: new Float32Array(n),
    sz: new Float32Array(n),
    bend: new Float32Array(n * 3),
    seed: new Float32Array(n),
    bucket: new Uint8Array(cols8),
  }
  const aspect = rows / cols
  for (let k = 0; k < n; k++) {
    const i = kept[k]
    f.u[k] = (i % cols) / (cols - 1) - 0.5
    f.v[k] = (Math.floor(i / cols) / (rows - 1) - 0.5) * aspect // in figure widths
    // a loose shell around the figure: radius 0.62–0.96 widths, squashed vertically
    const th = rnd() * Math.PI * 2
    const ph = Math.acos(2 * rnd() - 1)
    const R = (235 + rnd() * 130) / 380
    f.su[k] = R * Math.sin(ph) * Math.cos(th)
    f.sv[k] = R * Math.cos(ph) * 0.8
    f.sz[k] = R * Math.sin(ph) * Math.sin(th)
    const bl = (18 + rnd() * 24) / 380
    f.bend[k * 3] = (rnd() - 0.5) * bl
    f.bend[k * 3 + 1] = -bl * (0.5 + rnd() * 0.5)
    f.bend[k * 3 + 2] = (46 + rnd() * 44) / 380
    f.seed[k] = rnd()
  }
  return f
}

export function DitherPortrait({
  src,
  resolution = 200,
  className,
  bleed = 0.35,
  interactive = false,
}: {
  src: string
  /** dash columns across the figure */
  resolution?: number
  className?: string
  /** how far the canvas extends beyond the figure box, as a fraction of its size (room for the fly-in) */
  bleed?: number
  /** drag and scroll-wheel to rotate */
  interactive?: boolean
}) {
  const boxRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [aspect, setAspect] = React.useState(5 / 6)

  React.useEffect(() => {
    const box = boxRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!box || !canvas || !ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    let cancelled = false
    let raf = 0
    const cleanups: (() => void)[] = []

    const img = new Image()
    img.decoding = "async"
    img.src = src
    img
      .decode()
      .then(() => !cancelled && start())
      .catch(() => {})

    function start() {
      setAspect(img.naturalWidth / img.naturalHeight)
      const field = sampleField(img, resolution)
      let colours = rampColours()
      const paths: Path2D[] = []

      // ---- sizing ----
      let W = 0 // figure box, css px
      let H = 0
      let dpr = 1
      let ox = 0 // figure centre inside the canvas, css px
      let oy = 0
      const resize = () => {
        const r = box!.getBoundingClientRect()
        W = r.width
        H = r.height
        dpr = Math.min(2, window.devicePixelRatio || 1)
        const cw = W * (1 + 2 * bleed)
        const ch = H * (1 + 2 * bleed)
        canvas!.width = Math.round(cw * dpr)
        canvas!.height = Math.round(ch * dpr)
        ox = cw / 2
        oy = ch / 2
        if (reduce) draw(performance.now())
      }
      const ro = new ResizeObserver(resize)
      ro.observe(box!)
      cleanups.push(() => ro.disconnect())

      // ---- state ----
      let t0 = -1
      let last = 0
      let yaw = 0
      let yawVel = 0
      let tilt = TILT
      let tiltFrom = TILT
      let tiltBack = -1 // time the tilt spring started
      let dragging = false
      const ptr = { x: -9999, y: -9999, lx: 0, ly: 0, lt: 0, speed: 0 }
      let push = 0
      const trail = new Float32Array(GRID_W * GRID_H)
      const trailTmp = new Float32Array(GRID_W * GRID_H)
      let trailMax = 0
      const mask = document.createElement("canvas")
      mask.width = GRID_W
      mask.height = GRID_H
      const mctx = mask.getContext("2d")!
      const maskData = mctx.createImageData(GRID_W, GRID_H)
      const photo = document.createElement("canvas")
      const pctx = photo.getContext("2d")!
      let visible = true

      // pointer position in canvas css px
      const toLocal = (e: PointerEvent) => {
        const r = canvas!.getBoundingClientRect()
        return [e.clientX - r.left, e.clientY - r.top]
      }

      if (!reduce) {
        const onMove = (e: PointerEvent) => {
          const [x, y] = toLocal(e)
          const now = performance.now()
          const dt = Math.max(8, now - ptr.lt)
          ptr.speed = Math.hypot(x - ptr.lx, y - ptr.ly) / (dt / 1000)
          ptr.x = x
          ptr.y = y
          ptr.lx = x
          ptr.ly = y
          ptr.lt = now
          if (dragging) {
            yaw += e.movementX * 0.0075
            yawVel = e.movementX * 0.0075 * 60
            tilt = Math.min(TILT + 0.45, Math.max(TILT - 0.45, tilt + e.movementY * 0.005))
          }
          // stir the photo trail (fine pointers only), stronger when moving fast
          if (finePointer && e.pointerType === "mouse") {
            const gx = ((x - (ox - W / 2)) / W) * GRID_W
            const gy = ((y - (oy - H / 2)) / H) * GRID_H
            if (gx > -3 && gy > -3 && gx < GRID_W + 3 && gy < GRID_H + 3) {
              const amt = Math.min(0.5, 0.08 + ptr.speed / 4000)
              for (let j = -3; j <= 3; j++)
                for (let i = -3; i <= 3; i++) {
                  const X = Math.round(gx) + i
                  const Y = Math.round(gy) + j
                  if (X < 0 || Y < 0 || X >= GRID_W || Y >= GRID_H) continue
                  const k = Y * GRID_W + X
                  trail[k] = Math.min(1, trail[k] + amt * Math.exp(-(i * i + j * j) / 4.5))
                }
            }
          }
        }
        const onLeave = () => {
          ptr.x = ptr.y = -9999
          ptr.speed = 0
        }
        window.addEventListener("pointermove", onMove, { passive: true })
        document.documentElement.addEventListener("pointerleave", onLeave)
        cleanups.push(() => {
          window.removeEventListener("pointermove", onMove)
          document.documentElement.removeEventListener("pointerleave", onLeave)
        })

        if (interactive) {
          const onDown = (e: PointerEvent) => {
            if (e.button !== 0) return
            dragging = true
            yawVel = 0
            tiltBack = -1
            box!.setPointerCapture(e.pointerId)
            box!.style.cursor = "grabbing"
          }
          const onUp = (e: PointerEvent) => {
            if (!dragging) return
            dragging = false
            tiltFrom = tilt
            tiltBack = performance.now()
            box!.releasePointerCapture?.(e.pointerId)
            box!.style.cursor = ""
          }
          const onWheel = (e: WheelEvent) => {
            e.preventDefault()
            yaw -= (e.deltaX + e.deltaY) * 0.0022
          }
          box!.addEventListener("pointerdown", onDown)
          box!.addEventListener("pointerup", onUp)
          box!.addEventListener("pointercancel", onUp)
          box!.addEventListener("wheel", onWheel, { passive: false })
          cleanups.push(() => {
            box!.removeEventListener("pointerdown", onDown)
            box!.removeEventListener("pointerup", onUp)
            box!.removeEventListener("pointercancel", onUp)
            box!.removeEventListener("wheel", onWheel)
          })
        }

        const io = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting
          cancelAnimationFrame(raf)
          if (visible) raf = requestAnimationFrame(draw)
        })
        io.observe(box!)
        cleanups.push(() => io.disconnect())
      }

      // re-read the ramp if the tokens change (e.g. a theme switch)
      const mo = new MutationObserver(() => (colours = rampColours()))
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "style", "class"] })
      cleanups.push(() => mo.disconnect())

      function draw(now: number) {
        if (t0 < 0) {
          t0 = now
          last = now
        }
        const dt = Math.min(0.05, (now - last) / 1000)
        last = now
        const t = now - t0
        const mix = reduce ? 1 : easeInOut(Math.min(1, t / MORPH_MS))
        const alpha = reduce ? 1 : 1 - (1 - Math.min(1, t / FADE_MS)) ** 2

        if (!reduce) {
          if (!dragging) {
            yaw += yawVel * dt
            yawVel *= Math.exp(-2.6 * dt)
          }
          if (tiltBack >= 0) {
            const k = Math.min(1, (now - tiltBack) / 900)
            tilt = tiltFrom + (TILT - tiltFrom) * (1 - (1 - k) ** 2)
            if (k >= 1) tiltBack = -1
          }
          // pointer speed → push, fast attack, slow release
          const target = Math.min(0.8, ptr.speed / 900)
          push += (target - push) * (1 - Math.exp(-(target > push ? 18 : 5) * dt))
          ptr.speed *= Math.exp(-6 * dt)
          // trail: blur a little and fade
          if (trailMax > 0.002 || ptr.speed > 1) {
            trailMax = 0
            for (let y = 0; y < GRID_H; y++)
              for (let x = 0; x < GRID_W; x++) {
                const k = y * GRID_W + x
                const s =
                  trail[k] * 0.6 +
                  0.1 *
                    ((x > 0 ? trail[k - 1] : 0) +
                      (x < GRID_W - 1 ? trail[k + 1] : 0) +
                      (y > 0 ? trail[k - GRID_W] : 0) +
                      (y < GRID_H - 1 ? trail[k + GRID_W] : 0))
                trailTmp[k] = s * Math.exp(-1.6 * dt)
                if (trailTmp[k] > trailMax) trailMax = trailTmp[k]
              }
            trail.set(trailTmp)
          }
        }

        const sway = reduce ? 0 : Math.sin(now * 0.00032) * SWAY
        const Y = yaw + sway
        const cy = Math.cos(Y)
        const sy = Math.sin(Y)
        const cx = Math.cos(tilt)
        const sx = Math.sin(tilt)
        // dashes: 72% of the cell pitch plus 1px past each end, ~0.7 pitch thick, antialiased
        const pitch = W / (resolution - 1)
        const seg = pitch * 0.72 + 2
        const thick = Math.max(1 / dpr, pitch * 0.7)
        const P = 0.45 // per-dash stagger in the fly-in

        ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

        // colour photo through the trail mask, under the dashes
        if (trailMax > 0.01) {
          for (let k = 0; k < trail.length; k++) {
            maskData.data[k * 4 + 3] = Math.min(255, trail[k] * 420)
          }
          mctx.putImageData(maskData, 0, 0)
          const pw = Math.round(W * dpr)
          const ph = Math.round(H * dpr)
          if (photo.width !== pw || photo.height !== ph) {
            photo.width = pw
            photo.height = ph
          }
          pctx.globalCompositeOperation = "source-over"
          pctx.clearRect(0, 0, pw, ph)
          pctx.imageSmoothingEnabled = true
          pctx.drawImage(mask, 0, 0, pw, ph)
          pctx.globalCompositeOperation = "source-in"
          pctx.drawImage(img, 0, 0, pw, ph)
          ctx!.globalAlpha = alpha
          ctx!.drawImage(photo, ox - (W / 2) * cy, oy - H / 2, W * cy, H)
        }

        for (let b = 0; b < BUCKETS; b++) paths[b] = new Path2D()
        const fu = field.u
        const fv = field.v
        const fz = field.z
        for (let k = 0; k < field.n; k++) {
          // fly-in: each dash leaves the cloud a little later than the last, on a bent path
          let u = fu[k]
          let v = fv[k]
          let z = fz[k]
          if (mix < 1) {
            const m = clamp01(mix * (1 + P) - field.seed[k] * P)
            const e = m * m * (3 - 2 * m)
            const arc = Math.sin(Math.PI * e)
            u = field.su[k] + (u - field.su[k]) * e + field.bend[k * 3] * arc
            v = field.sv[k] + (v - field.sv[k]) * e + field.bend[k * 3 + 1] * arc
            z = field.sz[k] + (z - field.sz[k]) * e + field.bend[k * 3 + 2] * arc
          }
          // world (css px): yaw around the vertical axis, then tilt
          const wx = u * W
          const wy = v * W
          const wz = z * W
          const x1 = wx * cy + wz * sy
          const z1 = -wx * sy + wz * cy
          const y2 = wy * cx + z1 * sx
          const z2 = -wy * sx + z1 * cx
          const w = Math.max(0.05, (DIST - z2) / DIST)
          let px = ox + x1 / w
          let py = oy + y2 / w

          if (push > 0.01) {
            const ax = px - ptr.x
            const ay = py - ptr.y
            const d = Math.hypot(ax, ay)
            if (d < 120) {
              const fall = (1 - smooth(0, 120, d)) ** 2
              const s = (fall * push * (8 + field.seed[k] * 14)) / Math.max(d, 28)
              px += ax * s
              py += ay * s
            }
          }
          // where the photo shows through, thin the dashes out
          if (trailMax > 0.01) {
            const gx = (((px - ox) / (W * cy || 1)) + 0.5) * GRID_W
            const gy = ((py - oy) / H + 0.5) * GRID_H
            if (gx >= 0 && gy >= 0 && gx < GRID_W && gy < GRID_H && trail[(gy | 0) * GRID_W + (gx | 0)] * 1.6 > field.seed[k]) continue
          }
          const hl = ((seg / 2) * Math.abs(cy)) / w
          paths[field.bucket[k]].rect(px - hl, py - thick / 2, hl * 2, thick)
        }
        ctx!.globalAlpha = alpha
        for (let b = 0; b < BUCKETS; b++) {
          ctx!.fillStyle = colours[b]
          ctx!.fill(paths[b])
        }
        ctx!.globalAlpha = 1

        if (!reduce && visible) raf = requestAnimationFrame(draw)
      }

      resize()
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      cleanups.forEach((f) => f())
    }
  }, [src, resolution, bleed, interactive])

  return (
    <div
      ref={boxRef}
      role="img"
      aria-label={`Portrait of ${site.name}`}
      style={{ aspectRatio: aspect }}
      className={cn("relative select-none", interactive && "cursor-grab touch-none", className)}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute"
        style={{ inset: `-${bleed * 100}%`, width: `${100 + bleed * 200}%`, height: `${100 + bleed * 200}%` }}
      />
    </div>
  )
}
