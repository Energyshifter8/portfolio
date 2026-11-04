import type { Slug } from "./shared"

export type ProjectText = {
  title: string
  summary: string
  description: string[]
  featureGroups: { title: string; items: { name: string; detail: string }[] }[]
  meta: { client: string; role: string; status: string }
  captions: string[] // one per image in shared.ts, same order
}

export type Entry = { period: string; title: string; org: string; branch: string; detail: string }

export type RoomText = { label: string; note: string }

/** Everything a locale file has to provide. TypeScript flags any missing key. */
export type LocaleText = {
  site: { name: string; initials: string; role: string; location: string; tagline: string; status: string }
  contact: {
    note: string
    fromPlaceholder: string
    subjectPlaceholder: string
    messagePlaceholder: string
    projectTypes: string[]
    timelines: string[]
  }
  projects: Record<Slug, ProjectText>
  experience: Entry[]
  profile: {
    aboutLabels: [string, string]
    about: [string, string]
    skills: { group: string; items: string[] }[]
    languages: string[]
    skillsTitle: string
    cta: { text: string; button: string }
  }
  ui: {
    rooms: { projects: RoomText; experience: RoomText; profile: RoomText; contact: RoomText }
    desktop: { roomsLabel: string; enter: string; portrait: string } // portrait: {name}
    menu: {
      file: string
      extras: string
      system: string
      print: string
      quickActions: string
      surprise: string
      copyEmail: string
      copied: string
      sendEmail: string
      fullscreen: string
      exitFullscreen: string
      crtOff: string
      crtOn: string
      language: string
    }
    bar: {
      backToDesktop: string
      breadcrumb: string
      escProject: string
      escWindow: string
      escDesktop: string
      entries: string // {entries}, {branches}
      weekdays: string[] // Sunday first
    }
    project: {
      about: string // {title}
      spec: { client: string; role: string; period: string; status: string; stack: string; link: string }
      linkLabel: Record<"site" | "github", string>
      screenshots: string
      fig: string
      back: string
      all: string
      next: string // {n}
      nextAria: string // {title}
    }
    experience: { tracklabel: string }
    contact: {
      dialog: string
      windowTitle: string
      email: string
      to: string
      from: string
      subject: string
      project: string
      timeline: string
      projectHint: string
      timelineHint: string
      message: string
      send: string
      empty: string
      opening: string
      defaultSubject: string
      replyTo: string
    }
    window: { close: string }
    notFound: { text: string; back: string }
  }
}

/** Fill "{name}" placeholders: fmt("Up next / {n}", { n: "02" }). */
export const fmt = (t: string, v: Record<string, string | number>) => t.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""))
