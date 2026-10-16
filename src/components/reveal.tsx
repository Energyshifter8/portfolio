"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Text reveals, ticking at 30fps once the element is in view.
//   title: letters appear left→right, each flashing ember for two frames
//   type:  small text typed in under an inverted block
//   lines: paragraph typed out behind a block caret
//   count: the first number counts up from 0
// The split letters are aria-hidden; screen readers get the plain text.

type Mode = "title" | "type" | "lines" | "count"

const FPS = 30
const HOT_FRAMES = 2

function frameCount(mode: Mode, text: string) {
  const n = text.length
  const ms =
    mode === "title"
      ? Math.min(620, Math.max(180, n * 22))
      : mode === "lines"
        ? Math.min(720, 110 + Math.ceil(n / 52) * 95)
        : Math.min(520, Math.max(180, n * 34))
  return Math.max(1, Math.round((ms / 1000) * FPS))
}

type Props<T extends React.ElementType> = {
  as?: T
  children: string
  mode?: Mode
  delay?: number
  className?: string
} & Omit<React.ComponentPropsWithoutRef<T>, "children" | "className">

export function Reveal<T extends React.ElementType = "span">({
  as,
  children: text,
  mode = "type",
  delay = 0,
  className,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "span") as React.ElementType
  const ref = React.useRef<HTMLElement>(null)
  const chars = React.useMemo(() => Array.from(text), [text])
  // server render: everything shown; CSS hides it ("pending") until the effect arms it
  const [state, setState] = React.useState<"pending" | "armed" | "done">("pending")
  const [shown, setShown] = React.useState(chars.length)
  const [hotFrom, setHotFrom] = React.useState(chars.length)
  const [count, setCount] = React.useState<number | null>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("done")
      return
    }
    const total = frameCount(mode, text)
    const target = mode === "count" ? Number(text.match(/\d+/)?.[0] ?? 0) : 0
    let timer = 0
    let frame = 0

    setShown(0)
    setHotFrom(0)
    if (mode === "count") setCount(0)
    setState("armed")

    const tick = () => {
      frame++
      if (mode === "count") {
        const steps = Math.min(16, Math.max(4, target))
        setCount(Math.round((target * Math.min(frame, steps)) / steps))
        if (frame >= steps) return setState("done")
      } else {
        const n = Math.ceil((chars.length * frame) / total)
        const prev = Math.ceil((chars.length * Math.max(0, frame - HOT_FRAMES)) / total)
        setShown(n)
        setHotFrom(prev)
        if (frame >= total + HOT_FRAMES) return setState("done")
      }
      timer = window.setTimeout(tick, 1000 / FPS)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        const r = entry.intersectionRect
        if (entry.intersectionRatio >= 0.5 || r.height >= 90 || (entry.isIntersecting && r.height >= entry.boundingClientRect.height * 0.5)) {
          io.disconnect()
          timer = window.setTimeout(tick, delay)
        }
      },
      { threshold: [0, 0.25, 0.5, 1] },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearTimeout(timer)
    }
  }, [mode, text, chars.length, delay])

  const done = state === "done"

  let visual: React.ReactNode
  if (mode === "count") {
    const m = text.match(/\d+/)
    const value = done || count === null || !m ? m?.[0] : String(count).padStart(m[0].length, "0")
    visual = m ? text.replace(m[0], value ?? m[0]) : text
  } else if (done) {
    visual = text
  } else {
    const caretAt = mode === "lines" && state === "armed" && shown > 0 && shown < chars.length ? shown - 1 : -1
    visual = chars.map((c, i) => (
      <span key={i} className={cn(i >= shown ? "rv-off" : i >= hotFrom && "rv-hot", i === caretAt && "rv-at")}>
        {c}
      </span>
    ))
  }

  return (
    <Tag ref={ref} data-reveal={mode} data-rv={state} className={cn(className)} {...rest}>
      {done ? (
        text
      ) : (
        <>
          <span className="sr-only">{text}</span>
          <span aria-hidden>{visual}</span>
        </>
      )}
    </Tag>
  )
}
