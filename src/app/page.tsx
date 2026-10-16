import Link from "next/link"

import { DitherPortrait } from "@/components/dither-portrait"
import { site } from "@/content/site"
import { cn } from "@/lib/utils"

const corners = [
  { n: "01", file: "projects.vol", label: "Projects", href: "/projects", pos: "top-16 left-4 sm:left-8" },
  { n: "02", file: "career.log", label: "Experience", href: "/experience", pos: "top-16 right-4 sm:right-8 items-end text-right" },
  { n: "03", file: "profile.sys", label: "Profile", href: "/profile", pos: "bottom-6 left-4 sm:left-8" },
  { n: "04", file: "contact.app", label: "Contact", href: "/contact", pos: "bottom-6 right-4 sm:right-8 items-end text-right" },
]

export default function Home() {
  return (
    <main className="relative h-dvh min-h-[560px] overflow-hidden">
      {corners.map((c) => (
        <Link
          key={c.href}
          href={c.href}
          className={cn("group absolute z-10 mt-6 flex flex-col leading-none", c.pos)}
        >
          <span className="font-gothic text-2xl text-signal">{c.n}</span>
          <span className="mt-3 text-base text-muted-foreground">{c.file}</span>
          <span className="mt-1 text-3xl text-foreground transition-colors group-hover:text-primary group-hover:glow sm:text-4xl">
            {c.label}
            <span className="ml-1 opacity-0 group-hover:opacity-100 blink">_</span>
          </span>
        </Link>
      ))}

      {/* padded to centre between the corner links; on short phones the portrait shrinks to fit */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-16 md:pt-12">
        <DitherPortrait src="/portrait.png" className="h-[min(46vh,calc(100dvh-27rem))] w-auto md:h-[58vh]" />
        {/* pulled up so the role and name sit over the faded bottom of the portrait */}
        <div className="relative z-10 -mt-[12vh] flex flex-col items-center md:-mt-[16vh]">
          <p className="bg-background/80 px-3 text-sm tracking-[0.35em] text-signal uppercase sm:text-base">
            {site.role}
          </p>
          <h1
            data-text={site.name}
            className="glitch mt-2 text-center font-gothic text-6xl leading-none text-foreground glow-halo sm:text-8xl"
          >
            {site.name}
          </h1>
          <p className="mt-6 max-w-md text-center text-lg text-muted-foreground">{site.tagline}</p>
        </div>
      </div>
    </main>
  )
}
