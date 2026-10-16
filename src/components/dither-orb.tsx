"use client"

import * as React from "react"

// A small software-rendered, ordered-dithered sphere. No WebGL needed.
// The light follows the pointer; the surface carries a slow rotating pattern.

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((r) => r.map((v) => (v + 0.5) / 16))

// dark → bright amber ramp
const PALETTE: [number, number, number][] = [
  [18, 14, 9],
  [92, 38, 18],
  [190, 84, 38],
  [233, 165, 75],
  [255, 226, 168],
]

export function DitherOrb({ size = 168, className }: { size?: number; className?: string }) {
  const ref = React.useRef<HTMLCanvasElement>(null)
  const light = React.useRef({ x: -0.5, y: -0.6 })

  React.useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const W = size
    const H = size
    canvas.width = W
    canvas.height = H
    const img = ctx.createImageData(W, H)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1
      light.current.x = Math.max(-1.2, Math.min(1.2, nx))
      light.current.y = Math.max(-1.2, Math.min(1.2, ny))
    }
    window.addEventListener("pointermove", onMove)

    let raf = 0
    let lx = light.current.x
    let ly = light.current.y
    const R = W * 0.42
    const cx = W / 2
    const cy = H / 2

    const draw = (t: number) => {
      lx += (light.current.x - lx) * 0.06
      ly += (light.current.y - ly) * 0.06
      const ln = Math.hypot(lx, ly, 1)
      const Lx = lx / ln, Ly = ly / ln, Lz = 1 / ln
      const rot = reduce ? 0 : t * 0.00035
      const d = img.data

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i = (y * W + x) * 4
          const px = (x - cx) / R
          const py = (y - cy) / R
          const rr = px * px + py * py
          let v: number
          if (rr <= 1) {
            const pz = Math.sqrt(1 - rr)
            const diff = Math.max(0, px * Lx + py * Ly + pz * Lz)
            // longitude/latitude bands that rotate
            const lon = Math.atan2(px, pz) + rot
            const lat = Math.asin(py)
            const bands = 0.5 + 0.5 * Math.sin(lon * 6) * Math.cos(lat * 5)
            const spec = Math.pow(diff, 24)
            v = 0.08 + diff * 0.72 + bands * 0.12 * diff + spec * 0.5
          } else {
            // soft halo
            const dist = Math.sqrt(rr) - 1
            v = Math.max(0, 0.18 - dist * 0.9)
          }
          // scanline jitter
          if (!reduce && (y + Math.floor(t / 90)) % 23 === 0) v *= 0.75
          const th = BAYER[y & 3][x & 3]
          const n = PALETTE.length - 1
          const scaled = Math.min(0.999, Math.max(0, v)) * n
          const base = Math.floor(scaled)
          const idx = scaled - base > th ? base + 1 : base
          const c = PALETTE[Math.min(n, idx)]
          d[i] = c[0]
          d[i + 1] = c[1]
          d[i + 2] = c[2]
          d[i + 3] = idx === 0 ? 0 : 255
        }
      }
      ctx.putImageData(img, 0, 0)
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
    }
  }, [size])

  return <canvas ref={ref} aria-hidden className={`pixelated ${className ?? ""}`} />
}
