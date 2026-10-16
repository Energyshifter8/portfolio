import Link from "next/link"

import { DitherPortrait } from "@/components/dither-portrait"
import { Reveal } from "@/components/reveal"
import { site } from "@/content/site"
import { rooms } from "@/lib/rooms"
import { cn } from "@/lib/utils"

// corner placement: top/bottom clamp(18px,4vh,40px), left/right clamp(26px,4vw,64px)
const corner = [
  "top-[clamp(18px,4vh,40px)] left-[clamp(26px,4vw,64px)]",
  "top-[clamp(18px,4vh,40px)] right-[clamp(26px,4vw,64px)] items-end text-right",
  "bottom-[clamp(18px,4vh,40px)] left-[clamp(26px,4vw,64px)]",
  "bottom-[clamp(18px,4vh,40px)] right-[clamp(26px,4vw,64px)] items-end text-right",
]

/** The home "desktop": portrait, name and the four corner rooms. */
export function Desktop({ inert = false }: { inert?: boolean }) {
  return (
    <main inert={inert} className="fixed inset-x-0 top-[49px] bottom-0 overflow-hidden">
      <h1 className="sr-only">
        {site.name} — {site.role}
      </h1>

      <DitherPortrait
        src="/portrait.png"
        interactive={!inert}
        bleed={0.6}
        className="absolute top-[11%] left-1/2 h-[62%] -translate-x-1/2 max-[500px]:top-[128px] max-[500px]:h-[calc(100%-330px)]"
      />

      {/* the mast sits over the faded lower part of the portrait */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[64%] -translate-y-1/2 text-center max-[500px]:top-[clamp(18px,4vh,40px)] max-[500px]:translate-y-0"
      >
        <Reveal
          as="p"
          mode="type"
          delay={320}
          className="inline-block bg-papier px-3 py-[3px] text-[12px] tracking-[0.42em] uppercase max-[500px]:text-[10px] max-[500px]:tracking-[0.22em]"
        >
          {site.role}
        </Reveal>
        <Reveal
          as="p"
          mode="title"
          delay={420}
          className="mt-[clamp(6px,1.2vh,14px)] font-display text-[clamp(58px,13.2vw,210px)] leading-[.9] whitespace-nowrap text-creme max-[500px]:text-[14.4vw]"
        >
          {site.name}
        </Reveal>
      </div>

      <nav
        aria-label="Rooms"
        className="max-[500px]:absolute max-[500px]:inset-x-4 max-[500px]:bottom-[18px] max-[500px]:grid max-[500px]:grid-cols-2 max-[500px]:gap-x-2.5 max-[500px]:gap-y-3.5"
      >
        {rooms.map((r, i) => (
          <Link
            key={r.href}
            href={r.href}
            className={cn(
              "group absolute z-10 flex flex-col gap-1.5 outline-none max-[500px]:static max-[500px]:items-start max-[500px]:text-left",
              corner[i],
            )}
          >
            <Reveal
              mode="title"
              delay={520 + i * 110}
              className="font-display text-[clamp(34px,3.2vw,48px)] leading-[.9] text-braise max-[500px]:text-[26px]"
            >
              {String(i + 1).padStart(2, "0")}
            </Reveal>
            <Reveal mode="type" delay={580 + i * 110} className="text-[11px] tracking-[0.1em] opacity-65">
              {r.file}
            </Reveal>
            <Reveal
              mode="type"
              delay={780 + i * 110}
              className="text-[clamp(22px,2.2vw,32px)] leading-[1.1] transition-colors duration-100 ease-[steps(2,end)] group-hover:text-creme group-focus-visible:text-creme group-active:max-[500px]:bg-creme group-active:max-[500px]:text-papier max-[500px]:text-[19px]"
            >
              {r.label}
            </Reveal>
            <span
              aria-hidden
              className={cn(
                "invisible bg-encre px-[9px] py-[2px] text-[11px] tracking-[0.1em] text-papier uppercase transition-[translate] duration-[160ms] ease-[steps(3,end)] group-hover:visible group-hover:translate-x-0 group-focus-visible:visible group-focus-visible:translate-x-0 max-[500px]:hidden",
                i % 2 ? "translate-x-2" : "-translate-x-2",
              )}
            >
              Enter ▸
            </span>
          </Link>
        ))}
      </nav>
    </main>
  )
}
