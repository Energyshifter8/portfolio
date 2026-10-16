import Link from "next/link"
import type { Metadata } from "next"

import { WindowFrame } from "@/components/window-frame"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/content/site"

export const metadata: Metadata = { title: "Projects" }

export default function ProjectsPage() {
  return (
    <WindowFrame index="01" file="projects.vol" title="Projects">
      <ul className="divide-y border-y">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group grid gap-2 py-5 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-6"
            >
              <span className="text-signal">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="block text-3xl group-hover:text-primary group-hover:glow">{p.title}</span>
                <span className="block text-lg text-muted-foreground">{p.summary}</span>
              </span>
              <span className="flex flex-wrap gap-1.5 sm:justify-end">
                <Badge variant="outline" className="font-pixel text-base">{p.meta.period}</Badge>
                <Badge variant="secondary" className="font-pixel text-base">{p.meta.status}</Badge>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </WindowFrame>
  )
}
