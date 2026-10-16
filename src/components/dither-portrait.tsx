"use client"

import * as React from "react"

import { site } from "@/content/site"
import { cn } from "@/lib/utils"

// An amber, ordered-dithered portrait. The photo is sampled once at low resolution;
// every frame re-dithers it with the reveal, scan line, glitch and cursor light applied.

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((r) => r.map((v) => (v + 0.5) / 16))

// dark → light
const PALETTE = ["#1e110a", "#521f10", "#963a1c", "#d4682e", "#f0a854", "#ffe4aa"].map((h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
])
const STEPS = PALETTE.length - 1

const REVEAL_MS = 1400
const SCAN_MS = 7000 // one pass of the bright scan line
const FLOOR = 0.2 // the darkest tones land in the reds instead of black
const FADE_BOTTOM = 0.3
const FADE_SIDE = 0.14

const smooth = (t: number) => t * t * (3 - 2 * t)
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

export function DitherPortrait({
  src,
  resolution = 200,
  className,
}: {
  src: string
  resolution?: number
  className?: string
}) {
  const ref = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
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
      const W = resolution
      const H = Math.round((resolution * img.naturalHeight) / img.naturalWidth)
      const N = W * H
      canvas!.width = W
      canvas!.height = H

      // ---- sample once on a hidden canvas ----
      const off = document.createElement("canvas")
      off.width = W
      off.height = H
      const octx = off.getContext("2d", { willReadFrequently: true })!
      octx.imageSmoothingQuality = "high"
      octx.drawImage(img, 0, 0, W, H)
      const px = octx.getImageData(0, 0, W, H).data

      const raw = new Float32Array(N)
      const alpha = new Float32Array(N)
      for (let i = 0; i < N; i++) {
        raw[i] = (0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2]) / 255
        alpha[i] = px[i * 4 + 3] / 255
      }

      // light unsharp mask (alpha-weighted, so transparent pixels don't darken the edges)
      const sharp = new Float32Array(N)
      for (let y = 0; y < H; y++)
        for (let x = 0; x < W; x++) {
          let s = 0
          let w = 0
          for (let dy = -1; dy <= 1; dy++)
            for (let dx = -1; dx <= 1; dx++) {
              const xx = x + dx
              const yy = y + dy
              if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue
              const j = yy * W + xx
              s += raw[j] * alpha[j]
              w += alpha[j]
            }
          const i = y * W + x
          sharp[i] = w > 0 ? raw[i] + 0.6 * (raw[i] - s / w) : raw[i]
        }

      // contrast stretch between the 2nd and 98th percentile of the visible pixels
      const hist = new Uint32Array(256)
      let count = 0
      for (let i = 0; i < N; i++)
        if (alpha[i] > 0.5) {
          hist[Math.round(clamp01(raw[i]) * 255)]++
          count++
        }
      const pct = (p: number) => {
        let acc = 0
        for (let k = 0; k < 256; k++) if ((acc += hist[k]) >= p * count) return k / 255
        return 1
      }
      const lo = pct(0.02)
      const hi = Math.max(lo + 0.05, pct(0.98))

      const lum = new Float32Array(N)
      const vis = new Float32Array(N) // photo alpha × edge fades
      for (let y = 0; y < H; y++) {
        const fy = y > H * (1 - FADE_BOTTOM) ? 1 - smooth((y - H * (1 - FADE_BOTTOM)) / (H * FADE_BOTTOM)) : 1
        // the bottom fade dims as well as thins out, so the white shirt doesn't glare behind the name
        const tone = 0.55 + 0.45 * fy
        for (let x = 0; x < W; x++) {
          const i = y * W + x
          const fx = smooth(clamp01(Math.min(x, W - 1 - x) / (W * FADE_SIDE)))
          lum[i] = (FLOOR + (1 - FLOOR) * Math.pow(clamp01((sharp[i] - lo) / (hi - lo)), 0.85)) * tone
          vis[i] = alpha[i] * fx * fy
        }
      }

      // ---- interaction state ----
      const mouse = { x: 0, y: 0, inside: false }
      const par = { x: 0, y: 0, tx: 0, ty: 0 }
      let hover = 0
      let t0 = -1
      let nextGlitch = 0
      let glitch: { y0: number; y1: number; dx: number; until: number } | null = null
      let visible = true

      if (!reduce) {
        const onMove = (e: PointerEvent) => {
          const r = canvas!.getBoundingClientRect()
          mouse.x = ((e.clientX - r.left) / r.width) * W
          mouse.y = ((e.clientY - r.top) / r.height) * H
          mouse.inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
          par.tx = -((e.clientX / window.innerWidth) * 2 - 1) * 6
          par.ty = -((e.clientY / window.innerHeight) * 2 - 1) * 4
        }
        const onLeave = () => {
          mouse.inside = false
          par.tx = par.ty = 0
        }
        window.addEventListener("pointermove", onMove, { passive: true })
        document.documentElement.addEventListener("pointerleave", onLeave)
        cleanups.push(() => {
          window.removeEventListener("pointermove", onMove)
          document.documentElement.removeEventListener("pointerleave", onLeave)
        })

        // pause while scrolled out of view
        const io = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting
          cancelAnimationFrame(raf)
          if (visible) raf = requestAnimationFrame(draw)
        })
        io.observe(canvas!)
        cleanups.push(() => io.disconnect())
      }

      const out = ctx!.createImageData(W, H)
      const d = out.data
      const sigma2 = 2 * (W * 0.16) ** 2

      function draw(now: number) {
        if (t0 < 0) {
          t0 = now
          nextGlitch = now + REVEAL_MS + 1500 + Math.random() * 2500
        }
        const t = now - t0
        const p = reduce ? 1 : Math.min(1, t / REVEAL_MS)
        const front = p * (H + 4) // rows above the front are revealed

        hover += ((mouse.inside ? 1 : 0) - hover) * 0.07

        if (!reduce && p >= 1) {
          if (glitch && now > glitch.until) glitch = null
          if (!glitch && now >= nextGlitch) {
            const h = 2 + Math.floor(Math.random() * H * 0.06)
            const y0 = Math.floor(Math.random() * (H - h))
            const dx = (Math.random() < 0.5 ? -1 : 1) * (2 + Math.floor(Math.random() * W * 0.05))
            glitch = { y0, y1: y0 + h, dx, until: now + 150 }
            nextGlitch = now + (mouse.inside ? 350 + Math.random() * 900 : 2500 + Math.random() * 3500)
          }
        }

        const scanY = reduce ? -99 : ((t / SCAN_MS) % 1) * (H + 16) - 8

        for (let y = 0; y < H; y++) {
          const shown = y < front
          const behind = front - y
          const frontBoost = p < 1 && behind < 4 ? 0.55 * (1 - behind / 4) : 0
          const sd = Math.abs(y - scanY)
          const scanBoost = sd < 2 ? 0.08 * (1 - sd / 2) : 0
          const shift = glitch && y >= glitch.y0 && y < glitch.y1 ? glitch.dx : 0
          const rowDim = y & 1 ? 0.84 : 1 // scanlines
          const by = BAYER[y & 3]
          const ay = BAYER[(y + 2) & 3] // offset matrix for alpha, so fades don't track tone
          for (let x = 0; x < W; x++) {
            const o = (y * W + x) * 4
            const sx = x - shift
            if (!shown || sx < 0 || sx >= W) {
              d[o + 3] = 0
              continue
            }
            const i = y * W + sx
            if (vis[i] <= ay[(x + 1) & 3]) {
              d[o + 3] = 0
              continue
            }
            let v = lum[i] + frontBoost + scanBoost + (shift ? 0.08 : 0)
            if (hover > 0.01) {
              // lifts shadows and mids more than highlights, so the face keeps its detail
              const mx = x - mouse.x
              const my = y - mouse.y
              v += hover * 0.4 * (1 - v) * Math.exp(-(mx * mx + my * my) / sigma2)
            }
            const s = clamp01(v) * STEPS * 0.9999
            const base = s | 0
            const c = PALETTE[s - base > by[x & 3] ? base + 1 : base]
            d[o] = c[0] * rowDim
            d[o + 1] = c[1] * rowDim
            d[o + 2] = c[2] * rowDim
            d[o + 3] = 255
          }
        }
        ctx!.putImageData(out, 0, 0)

        if (reduce) return
        par.x += (par.tx - par.x) * 0.06
        par.y += (par.ty - par.y) * 0.06
        canvas!.style.transform = `translate3d(${par.x.toFixed(2)}px, ${par.y.toFixed(2)}px, 0)`
        if (visible) raf = requestAnimationFrame(draw)
      }

      raf = requestAnimationFrame(draw)
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      cleanups.forEach((f) => f())
    }
  }, [src, resolution])

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={`Portrait of ${site.name}`}
      width={resolution}
      height={Math.round(resolution * 1.2)}
      className={cn("pixelated", className)}
    />
  )
}
