import Link from "next/link"
import type { Metadata } from "next"

import { Reveal } from "@/components/reveal"
import { projects } from "@/content/site"

export const metadata: Metadata = { title: "Projects" }

export default function ProjectsPage() {
  return (
    <main className="relative min-h-dvh pt-[72px]">
      <h1 className="sr-only">Projects</h1>

      {/* top and bottom fades, 14% of the room each */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-[72px] z-[2] h-[14%] bg-gradient-to-b from-papier to-transparent" />
      <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 z-[2] h-[14%] bg-gradient-to-t from-papier to-transparent" />

      <ol className="flex flex-col px-[clamp(26px,4vw,64px)] py-[16vh]">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex w-max max-w-full items-baseline gap-[.35em] py-[.5em] outline-none focus-visible:outline-2 focus-visible:outline-creme focus-visible:outline-dashed max-[500px]:gap-[.3em]"
            >
              <span className="min-w-[3.2em] text-[clamp(11px,1.5vh,14px)] tracking-[0.1em] text-braise max-[500px]:min-w-[2.8em] max-[500px]:text-[9px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Reveal
                mode="title"
                delay={i * 70}
                className="overflow-hidden font-display text-[clamp(40px,10.5vh,150px)] leading-[.82] whitespace-nowrap text-encre group-hover:text-creme group-focus-visible:text-creme group-active:bg-creme group-active:text-papier max-[500px]:text-[clamp(26px,8.2vw,64px)]"
              >
                {p.title}
              </Reveal>

              {/* where the reference docks a cover image: a spec card for the hovered row */}
              <span
                aria-hidden
                className="dot-field pointer-events-none invisible fixed top-[calc(72px+clamp(26px,4vw,64px))] right-[clamp(26px,4vw,64px)] bottom-[clamp(26px,4vw,64px)] z-[1] flex w-[min(38vw,620px)] flex-col justify-end border border-encre p-6 shadow-light group-hover:visible max-[1000px]:hidden"
              >
                <span className="text-[11px] tracking-[0.12em] uppercase">
                  {String(i + 1).padStart(2, "0")} · {p.meta.period} · {p.meta.status}
                </span>
                <span className="mt-3 max-w-[40ch] text-[16px] leading-[1.6] text-creme">{p.summary}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  )
}
