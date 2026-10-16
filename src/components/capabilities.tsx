"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/** Skill groups as big display headings; the one nearest the middle of the screen is lit. */
export function Capabilities({ groups }: { groups: { group: string; items: string[] }[] }) {
  const refs = React.useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2
      let best = 0
      let bd = Infinity
      refs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const d = Math.abs(r.top + r.height / 2 - mid)
        if (d < bd) {
          bd = d
          best = i
        }
      })
      setActive(best)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div>
      {groups.map((g, i) => (
        <section
          key={g.group}
          ref={(el) => {
            refs.current[i] = el
          }}
          onPointerEnter={() => setActive(i)}
          className={cn(
            "py-[72px] transition-opacity duration-[350ms] max-[720px]:py-11 [@media(hover:none)]:opacity-100 max-[1000px]:opacity-100",
            i === active ? "opacity-100" : "opacity-55",
          )}
        >
          <h3
            className={cn(
              "font-display text-[clamp(56px,9vw,150px)] leading-[.84] whitespace-nowrap text-creme transition-[text-shadow] duration-[350ms] max-[720px]:text-[clamp(36px,10.5vw,50px)] max-[720px]:whitespace-normal",
              i === active && "[text-shadow:6px_6px_0_var(--braise)] max-[1000px]:[text-shadow:none]",
            )}
          >
            {g.group}
          </h3>
          <ul className="mt-7 flex flex-wrap gap-2">
            {g.items.map((it) => (
              <li
                key={it}
                className="border border-braise px-2.5 pt-[7px] pb-1.5 text-[10.5px] leading-none tracking-[0.07em] text-braise uppercase"
              >
                {it}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
