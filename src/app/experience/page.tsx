import type { Metadata } from "next"

import { WindowFrame } from "@/components/window-frame"
import { experience } from "@/content/site"

export const metadata: Metadata = { title: "Experience" }

export default function ExperiencePage() {
  return (
    <WindowFrame index="02" file="career.log" title="Experience">
      <ol className="relative space-y-8 border-l pl-6">
        {experience.map((e) => (
          <li key={e.period + e.title} className="relative">
            <span className="absolute top-2 -left-[29px] size-2.5 bg-primary shadow-[0_0_8px_var(--primary)]" />
            <p className="text-base text-signal">[{e.period}]</p>
            <h2 className="text-3xl">
              {e.title} <span className="text-muted-foreground">@ {e.org}</span>
            </h2>
            <p className="mt-1 max-w-2xl text-lg text-muted-foreground">{e.detail}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-lg text-muted-foreground">
        &gt; end of log<span className="blink">_</span>
      </p>
    </WindowFrame>
  )
}
