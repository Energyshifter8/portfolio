"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type Entry = { period: string; title: string; org: string; detail: string; branch: string }

// a short, stable "commit hash" for each entry
function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 6)
}

/** Career entries as a horizontal log, oldest first: wheel, drag, arrow keys or the rail move between them. */
export function CareerTrack({ entries, user }: { entries: Entry[]; user: string }) {
  const track = React.useRef<HTMLDivElement>(null)
  const panels = React.useRef<(HTMLElement | null)[]>([])
  const [cur, setCur] = React.useState(0)
  const ids = React.useMemo(() => entries.map((e) => hash(e.title + e.org + e.period)), [entries])
  const lanes = React.useMemo(() => [...new Set(entries.map((e) => e.branch))], [entries])

  const go = React.useCallback((i: number) => {
    const k = Math.max(0, Math.min(entries.length - 1, i))
    panels.current[k]?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    })
  }, [entries.length])

  // the panel nearest the centre is current; keep the URL hash in step
  React.useEffect(() => {
    const el = track.current
    if (!el) return
    const onScroll = () => {
      const mid = el.scrollLeft + el.clientWidth / 2
      let best = 0
      let bd = Infinity
      panels.current.forEach((p, i) => {
        if (!p) return
        const d = Math.abs(p.offsetLeft + p.offsetWidth / 2 - mid)
        if (d < bd) {
          bd = d
          best = i
        }
      })
      setCur(best)
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    // vertical wheel scrolls the track sideways
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    // open on the entry named in the hash
    const start = ids.indexOf(location.hash.slice(1))
    if (start > 0) panels.current[start]?.scrollIntoView({ inline: "center", block: "nearest" })
    return () => {
      el.removeEventListener("scroll", onScroll)
      el.removeEventListener("wheel", onWheel)
    }
  }, [ids])

  React.useEffect(() => {
    history.replaceState(null, "", `#${ids[cur]}`)
  }, [cur, ids])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea, select")) return
      if (e.key === "ArrowRight" || e.key === "ArrowDown") go(cur + 1)
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(cur - 1)
      else if (e.key === "Home") go(0)
      else if (e.key === "End") go(entries.length - 1)
      else return
      e.preventDefault()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [cur, go, entries.length])

  // drag to scroll with a mouse
  const drag = React.useRef<{ x: number; left: number } | null>(null)

  const e = entries[cur]
  return (
    <div className="flex h-full flex-col">
      <div className="flex border-b border-encre">
        <p
          key={cur}
          className="animate-[pq-pop_.18s_steps(3,end)] truncate px-4 py-[10px] text-[12.5px] max-[720px]:px-2.5 max-[720px]:text-[11px]"
        >
          <span className="opacity-70">{user}:~$ </span>git checkout {e.branch} &amp;&amp; git show {ids[cur]}
        </p>
      </div>

      <div
        ref={track}
        tabIndex={0}
        aria-label="Career entries"
        onPointerDown={(ev) => {
          if (ev.pointerType !== "mouse" || !track.current) return
          drag.current = { x: ev.clientX, left: track.current.scrollLeft }
        }}
        onPointerMove={(ev) => {
          if (drag.current && track.current) track.current.scrollLeft = drag.current.left - (ev.clientX - drag.current.x)
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerLeave={() => (drag.current = null)}
        className="flex min-h-0 flex-1 cursor-grab snap-x snap-mandatory items-center overflow-x-auto overflow-y-hidden px-[calc(50%-clamp(430px,46vw,660px)/2)] outline-none [scrollbar-width:none] max-[720px]:px-[7vw]"
      >
        {entries.map((en, i) => (
          <article
            key={ids[i]}
            ref={(el) => {
              panels.current[i] = el
            }}
            aria-current={i === cur ? "step" : undefined}
            className={cn(
              "w-[clamp(430px,46vw,660px)] shrink-0 snap-center transition-opacity duration-[180ms] ease-[steps(3,end)] not-last:mr-[clamp(64px,9vw,160px)] max-[720px]:w-[86vw] max-[720px]:not-last:mr-[7vw]",
              i === cur ? "opacity-100" : "opacity-[.24]",
            )}
          >
            <p className="flex flex-wrap items-center gap-2 text-[12.5px]">
              <span>{ids[i]}</span>
              <span className="border border-encre px-1.5 text-[10.5px] tracking-[0.06em]">{en.branch}</span>
              <span>
                {en.branch}: {en.title.toLowerCase()} — {en.org}
              </span>
            </p>
            <h2 className="mt-4 font-display text-[clamp(38px,4.4vw,64px)] leading-[.95] text-creme max-[720px]:text-[32px]">
              {en.org}
            </h2>
            <p className="mt-3 text-[12px] tracking-[0.08em] uppercase">
              {en.title} · {en.period}
            </p>
            <p className="mt-4 max-w-[456px] text-[14px] leading-[1.5] max-[720px]:text-[13px]">{en.detail}</p>
          </article>
        ))}
      </div>

      {/* the rail: a git-style graph, one lane per branch, entries joined in order */}
      <div className="mx-[clamp(20px,4vw,64px)] mb-[26px] flex-[0_0_120px] max-[720px]:mx-2.5 max-[720px]:flex-[0_0_84px]">
        <div className="relative h-full">
          <svg aria-hidden className="absolute inset-0 size-full overflow-visible">
            {entries.slice(1).map((en, i) => {
              const xa = entries.length > 1 ? i / (entries.length - 1) : 0.5
              const xb = entries.length > 1 ? (i + 1) / (entries.length - 1) : 0.5
              const ya = 28 + lanes.indexOf(entries[i].branch) * 34
              const yb = 28 + lanes.indexOf(en.branch) * 34
              // a lane change bends at the start of the segment, like a branch-off
              const bend = `${Math.min(xb, xa + 0.03) * 100}%`
              return ya === yb ? (
                <line key={i} x1={`${xa * 100}%`} y1={ya} x2={`${xb * 100}%`} y2={yb} stroke="var(--encre)" strokeWidth="2" />
              ) : (
                <g key={i} stroke="var(--encre)" strokeWidth="2">
                  <line x1={`${xa * 100}%`} y1={ya} x2={bend} y2={yb} />
                  <line x1={bend} y1={yb} x2={`${xb * 100}%`} y2={yb} />
                </g>
              )
            })}
          </svg>
          {lanes.map((lane, l) => {
            const first = entries.findIndex((en) => en.branch === lane)
            const x = entries.length > 1 ? first / (entries.length - 1) : 0.5
            return (
              <span
                key={lane}
                className="absolute -translate-y-[26px] text-[10.5px] tracking-[0.1em] opacity-70 max-[720px]:hidden"
                style={{ left: `${x * 100}%`, top: `${28 + l * 34}px` }}
              >
                {lane}
              </span>
            )
          })}
          {entries.map((en, i) => {
            const l = lanes.indexOf(en.branch)
            const x = entries.length > 1 ? i / (entries.length - 1) : 0.5
            return (
              <button
                key={ids[i]}
                type="button"
                aria-label={`${en.title}, ${en.org}, ${en.period}`}
                aria-current={i === cur ? "step" : undefined}
                onClick={() => go(i)}
                className="absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center"
                style={{ left: `${x * 100}%`, top: `${28 + l * 34}px` }}
              >
                <span
                  className={cn(
                    "block size-3 border-2 border-encre bg-papier transition-colors duration-100 max-[720px]:size-2.5",
                    i === cur && "bg-encre outline-2 outline-offset-2 outline-encre",
                  )}
                />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
