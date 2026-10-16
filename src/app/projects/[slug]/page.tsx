import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { WindowFrame } from "@/components/window-frame"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { projects } from "@/content/site"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = projects.find((p) => p.slug === slug)
  return { title: p?.title ?? "Project", description: p?.summary }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) notFound()
  const p = projects[i]
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]

  const metaRows: [string, React.ReactNode][] = [
    ["client", p.meta.client],
    ["role", p.meta.role],
    ["period", p.meta.period],
    ["status", p.meta.status],
    [
      "stack",
      <span key="s" className="flex flex-wrap gap-1.5">
        {p.meta.stack.map((s) => (
          <Badge key={s} variant="outline" className="font-pixel text-base">{s}</Badge>
        ))}
      </span>,
    ],
  ]
  if (p.meta.link)
    metaRows.push([
      "link",
      <a key="l" href={p.meta.link.href} target="_blank" rel="noreferrer" className="text-primary hover:underline">
        {p.meta.link.label} ↗
      </a>,
    ])

  return (
    <WindowFrame index={String(i + 1).padStart(2, "0")} file={`${p.slug}.prj`} title={p.title}>
      <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
        <article className="space-y-4 text-xl">
          {p.description.map((d) => (
            <p key={d}>{d}</p>
          ))}
          {p.featureGroups.map((g) => (
            <section key={g.title} className="pt-4">
              <h2 className="mb-3 text-sm tracking-[0.3em] text-signal uppercase">{g.title}</h2>
              <ul className="space-y-2">
                {g.items.map((it) => (
                  <li key={it.name} className="flex gap-2">
                    <span className="text-primary">›</span>
                    <span>
                      <span className="text-primary">{it.name}</span>
                      <span className="text-muted-foreground"> : {it.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </article>

        <aside className="h-fit border bg-background/40 text-lg lg:sticky lg:top-20">
          <dl>
            {metaRows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[5rem_1fr] gap-2 border-b px-3 py-2 last:border-b-0">
                <dt className="text-muted-foreground">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {p.figures.map((f, n) => (
          <figure key={f} className="border">
            <div className="grid aspect-[4/3] place-items-center bg-[repeating-linear-gradient(45deg,transparent_0_6px,rgb(233_165_75/0.06)_6px_7px)] text-muted-foreground">
              add screenshot
            </div>
            <figcaption className="flex justify-between border-t px-3 py-1.5 text-base">
              <span className="text-muted-foreground">fig. {String(n + 1).padStart(2, "0")}</span>
              <span>{f}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <Separator className="my-10" />

      <nav className="flex flex-wrap items-center justify-between gap-4 text-xl">
        <Button asChild variant="ghost" className="font-pixel text-xl">
          <Link href={`/projects/${prev.slug}`}>← {prev.title}</Link>
        </Button>
        <Button asChild variant="outline" className="font-pixel text-xl">
          <Link href="/projects">All projects</Link>
        </Button>
        <Link href={`/projects/${next.slug}`} className="group text-right">
          <span className="block text-base text-muted-foreground">Up next</span>
          <span className="text-2xl group-hover:text-primary">{next.title} →</span>
        </Link>
      </nav>
    </WindowFrame>
  )
}
