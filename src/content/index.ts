import type { Locale } from "@/i18n/config"

import { en } from "./en"
import { mn } from "./mn"
import { projectBase, shared, type LinkKind } from "./shared"
import type { LocaleText } from "./types"

export { fmt } from "./types"
export type { Entry } from "./types"

export type Project = {
  slug: string
  title: string
  summary: string
  description: string[]
  featureGroups: { title: string; items: { name: string; detail: string }[] }[]
  meta: {
    client: string
    role: string
    period: string
    status: string
    stack: string[]
    link?: { label: string; href: string; kind: LinkKind }
  }
  cover?: string
  figures: { caption: string; src: string }[]
}

export type Content = Omit<LocaleText, "projects" | "site"> & {
  locale: Locale
  site: LocaleText["site"] & typeof shared
  projects: Project[]
}

const texts: Record<Locale, LocaleText> = { en, mn }

const build = (locale: Locale): Content => {
  const t = texts[locale]
  return {
    ...t,
    locale,
    site: { ...t.site, ...shared },
    projects: projectBase.map((b): Project => {
      const p = t.projects[b.slug]
      const link = "link" in b ? b.link : undefined
      return {
        slug: b.slug,
        title: p.title,
        summary: p.summary,
        description: p.description,
        featureGroups: p.featureGroups,
        meta: {
          ...p.meta,
          period: b.period,
          stack: [...b.stack],
          link: link && { ...link, label: t.ui.project.linkLabel[link.kind] },
        },
        cover: b.cover,
        figures: b.figures.map((src, i) => ({ src, caption: p.captions[i] ?? en.projects[b.slug].captions[i] ?? "" })),
      }
    }),
  }
}

const cache = new Map<Locale, Content>()
export function getContent(locale: Locale): Content {
  let c = cache.get(locale)
  if (!c) cache.set(locale, (c = build(locale)))
  return c
}

/** Content plus a builder for locale-prefixed links; what pages and components receive. */
export type Localized = Content & { href: (path?: string) => string }
