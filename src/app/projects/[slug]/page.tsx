import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { Reveal } from "@/components/reveal"
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

const shell = "mx-auto w-[min(100%,1500px)] px-[clamp(22px,5vw,80px)] max-[767px]:px-5"
// poster titles shrink with length: min(12vw, 150vw / characters)
const titleScale = (t: string) => ({ "--title-scale": `${Math.min(12, 150 / t.length).toFixed(3)}vw` }) as React.CSSProperties
const poster = "m-0 font-display text-[length:clamp(64px,var(--title-scale),160px)] leading-[.95] text-creme [text-shadow:0_2px_12px_#0003] max-[767px]:text-[clamp(48px,14vw,76px)]"
const pad = (n: number) => String(n).padStart(2, "0")

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) notFound()
  const p = projects[i]
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]

  const spec: [string, React.ReactNode][] = [
    ["client", p.meta.client],
    ["role", p.meta.role],
    ["period", p.meta.period],
    ["status", p.meta.status],
    [
      "stack",
      p.meta.stack.map((s) => (
        <span key={s} className="block">
          {s}
        </span>
      )),
    ],
  ]
  if (p.meta.link)
    spec.push([
      "link",
      <a
        key="l"
        href={p.meta.link.href}
        target="_blank"
        rel="noreferrer"
        className="group/l inline-flex items-baseline gap-2.5 justify-self-start border-b text-encre hover:text-creme"
      >
        {p.meta.link.label}
        <i aria-hidden className="not-italic transition-[translate] duration-[180ms] ease-[steps(3,end)] group-hover/l:translate-x-[3px] group-hover/l:-translate-y-[3px]">
          ↗
        </i>
      </a>,
    ])

  return (
    <main className="pt-[72px]">
      {/* hero: a dotted plate where the cover image goes, title bottom-left */}
      <header className="dot-field relative isolate flex min-h-[max(480px,calc(100dvh-72px))] flex-col justify-end overflow-hidden max-[767px]:min-h-[max(420px,calc(100dvh-71px))]">
        <div aria-hidden className="absolute inset-0 -z-0 bg-[linear-gradient(#00000073,#0000_18%,#00000059_48%,#000000d9)]" />
        <div className={`${shell} relative z-[2] py-8 text-creme max-[767px]:py-7`}>
          <Reveal
            as="h1"
            mode="title"
            className={poster}
            style={titleScale(p.title)}
          >
            {p.title}
          </Reveal>
          <Reveal
            as="p"
            mode="lines"
            delay={180}
            className="mt-6 max-w-[56ch] text-[clamp(17px,1.5vw,22px)] leading-[1.55] text-pretty text-creme [text-shadow:0_2px_10px_#00000080] max-[767px]:mt-[18px] max-[767px]:text-[16px]"
          >
            {p.summary}
          </Reveal>
        </div>
      </header>

      <section aria-label={`About ${p.title}`} className={`${shell} pt-[70px] pb-[100px] max-[767px]:pt-[52px] max-[767px]:pb-16`}>
        <div className="mt-10 max-w-[860px]">
          <div className="text-[16px] leading-[1.8] max-[767px]:text-[14px] max-[767px]:leading-[1.75]">
            {p.description.map((d, k) => (
              <Reveal
                key={d}
                as="p"
                mode="lines"
                className={
                  k === 0
                    ? "mb-6 text-[clamp(20px,2vw,28px)] leading-[1.5] text-creme max-[767px]:text-[19px]"
                    : "mb-6"
                }
              >
                {d}
              </Reveal>
            ))}
            {p.featureGroups.map((g) => (
              <section key={g.title}>
                <h2 className="mt-8 mb-3.5 text-[14px] leading-[1.5] text-creme">{g.title}</h2>
                <ul className="list-disc pl-5 text-[16px] leading-[1.8]">
                  {g.items.map((it) => (
                    <li key={it.name}>
                      <strong className="font-normal text-creme">{it.name}</strong> : {it.detail}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <dl className="mt-11 border-t border-grid text-[13px] leading-[1.7]">
            {spec.map(([k, v], r) => (
              <div key={k} className="grid grid-cols-[minmax(120px,.34fr)_1fr] gap-x-[18px] border-b border-grid py-[11px]">
                <dt className="leader flex gap-2 overflow-hidden text-[11px] leading-[2] tracking-[0.12em] whitespace-nowrap uppercase">
                  <Reveal mode="type" delay={r * 70}>
                    {k}
                  </Reveal>
                </dt>
                <dd className="grid gap-0.5 text-creme">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* screenshots go here: framed plates with a "fig. NN" readout (the hero is fig. 01) */}
      <section aria-label="Screenshots" className="grid gap-[60px] pb-[30px] max-[767px]:gap-[30px]">
        {p.figures.map((f, n) => (
          <figure
            key={f}
            className="mx-auto w-[92%] border border-encre bg-papier shadow-[6px_6px_0_var(--grid)] max-[767px]:w-full"
          >
            <div className="flex h-8 items-center justify-between gap-4 px-4 text-[8px] tracking-[0.12em] uppercase">
              <span>fig. {pad(n + 2)}</span>
              <span>screenshot</span>
            </div>
            <div className="dot-field aspect-[1.85] max-h-[58dvh] w-full max-[767px]:aspect-[1.2]" />
            <figcaption className="sr-only">{f}</figcaption>
          </figure>
        ))}
      </section>

      <footer className="pt-[70px]">
        <nav aria-label="Back to the projects" className={`${shell} flex justify-between gap-4 py-3 text-[10px]`}>
          <Link href={`/projects/${prev.slug}`} className="transition-colors duration-100 ease-[steps(2,end)] hover:text-creme">
            ← {prev.title}
          </Link>
          <Link href="/projects" className="transition-colors duration-100 ease-[steps(2,end)] hover:text-creme">
            All projects ↗
          </Link>
        </nav>
        <div className="mt-6 border-t border-grid">
          <Link
            href={`/projects/${next.slug}`}
            aria-label={`Next project: ${next.title}`}
            className="dot-field group relative isolate flex min-h-[max(480px,calc(100dvh-72px))] flex-col justify-end overflow-hidden text-creme max-[767px]:min-h-[max(420px,calc(100dvh-71px))]"
          >
            <span className={`${shell} absolute inset-x-0 top-6 z-[2] text-[10px] leading-[1.5] text-encre`}>
              Up next / {pad(((i + 1) % projects.length) + 1)}
            </span>
            <div aria-hidden className="absolute inset-0 -z-0 bg-[linear-gradient(#00000073,#0000_18%,#00000059_48%,#000000d9)]" />
            <div className={`${shell} relative z-[2] py-8`}>
              <p
                className={`${poster} transition-colors duration-100 ease-[steps(2,end)] group-hover:text-encre`}
                style={titleScale(next.title)}
              >
                {next.title}
              </p>
              <p className="mt-6 max-w-[56ch] text-[clamp(17px,1.5vw,22px)] leading-[1.55] text-creme/70 max-[767px]:text-[16px]">
                {next.summary}
              </p>
            </div>
          </Link>
        </div>
      </footer>
    </main>
  )
}
