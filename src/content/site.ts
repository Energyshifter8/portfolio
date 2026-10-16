// ─────────────────────────────────────────────────────────────
// All site content lives here. Edit this file to make it yours.
// Everything below is placeholder text.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Temuulen B.",
  initials: "TB",
  role: "Software Engineer",
  location: "Ulaanbaatar, Mongolia",
  email: "temuulen.b@tanasoft.mn",
  tagline: "I build fast, careful interfaces and the systems behind them.",
  status: "available", // shown in the menu bar with a blinking light
  socials: [
    { label: "GitHub", handle: "github.com/Energyshifter8", href: "https://github.com/Energyshifter8" },
    { label: "Instagram", handle: "@energyshifter8", href: "https://www.instagram.com/energyshifter8/" },
    { label: "Facebook", handle: "facebook.com/tem.len.b.623027", href: "https://www.facebook.com/tem.len.b.623027" },
  ],
}

// Contact window copy and the two optional dropdowns.
export const contact = {
  note: "Usually replies within two working days",
  fromPlaceholder: "you@company.com",
  subjectPlaceholder: "Web app / Dashboard / Collaboration",
  messagePlaceholder: "Hi Temuulen,\n\nWe're working on…\nWhat we need, the team and the timeline…",
  projectTypes: ["Web app or dashboard", "Interface design", "Mobile app", "Something else"],
  timelines: ["As soon as possible", "Within 3 months", "Later", "Let's discuss"],
}

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
    link?: { label: string; href: string }
  }
  figures: string[]
}

export const projects: Project[] = [
  {
    slug: "ledger",
    title: "Ledger",
    summary: "An invoicing and payments dashboard for small businesses.",
    description: [
      "Ledger helps small teams send invoices, collect payments and see where their cash is going.",
      "I designed the interface and built the web dashboard, the API and the payment integration.",
    ],
    featureGroups: [
      {
        title: "Web features",
        items: [
          { name: "Dashboard", detail: "outstanding amounts, overdue invoices and monthly receipts at a glance." },
          { name: "Invoices", detail: "create, send and track invoices with statuses and reminders." },
          { name: "Payments", detail: "online card payments with partial-payment tracking." },
          { name: "Customers", detail: "CSV import with row-level validation and error review." },
        ],
      },
    ],
    meta: {
      client: "Placeholder Co.",
      role: "Product design · Full-stack development",
      period: "2026",
      status: "Live",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
      link: { label: "Visit project", href: "https://example.com" },
    },
    figures: ["Dashboard overview", "Invoice editor", "Payment flow", "Customer import"],
  },
  {
    slug: "steppe-maps",
    title: "Steppe Maps",
    summary: "An offline-first map app for travellers in rural Mongolia.",
    description: [
      "Steppe Maps downloads regions ahead of time so routes and points of interest work without signal.",
      "I built the mobile app, the tile pipeline and the sync service.",
    ],
    featureGroups: [
      {
        title: "Mobile features",
        items: [
          { name: "Offline regions", detail: "download vector tiles by province and keep them up to date." },
          { name: "Routing", detail: "on-device routing over dirt tracks and paved roads." },
          { name: "Waypoints", detail: "save camps, wells and fuel stops and share them later." },
        ],
      },
    ],
    meta: {
      client: "Independent product",
      role: "Mobile development · Data pipeline",
      period: "2025",
      status: "Beta",
      stack: ["React Native", "MapLibre", "Go", "SQLite"],
    },
    figures: ["Region download", "Route view", "Waypoint list"],
  },
  {
    slug: "signal-room",
    title: "Signal Room",
    summary: "A realtime ops console for monitoring IoT sensors.",
    description: [
      "Signal Room streams readings from thousands of sensors and flags anomalies as they happen.",
      "I led front-end development and built the WebGL chart layer.",
    ],
    featureGroups: [
      {
        title: "Console features",
        items: [
          { name: "Live charts", detail: "WebGL rendering of 100k+ points without dropping frames." },
          { name: "Alerts", detail: "threshold and anomaly rules with on-call routing." },
          { name: "Replays", detail: "scrub through past incidents minute by minute." },
        ],
      },
    ],
    meta: {
      client: "Tanasoft",
      role: "Front-end lead",
      period: "2024 – 2025",
      status: "In production",
      stack: ["React", "TypeScript", "WebGL", "WebSockets"],
    },
    figures: ["Fleet overview", "Sensor detail", "Incident replay"],
  },
]

export const experience = [
  {
    period: "2024 — now",
    title: "Software Engineer",
    org: "Tanasoft",
    branch: "work",
    detail: "Building product interfaces and internal platforms with React, TypeScript and Node.",
  },
  {
    period: "2022 — 2024",
    title: "Front-end Developer",
    org: "Placeholder Studio",
    branch: "work",
    detail: "Shipped marketing sites and dashboards for clients across finance and retail.",
  },
  {
    period: "2020 — 2022",
    title: "Junior Developer",
    org: "Placeholder Agency",
    branch: "work",
    detail: "Started with HTML, CSS and a lot of jQuery; moved the team to React.",
  },
  {
    period: "2016 — 2020",
    title: "B.Sc. Computer Science",
    org: "Placeholder University",
    branch: "study",
    detail: "Graphics, algorithms and too many late nights in the lab.",
  },
]

export const profile = {
  aboutLabels: ["Today", "Background"], // headings over the two `about` paragraphs
  about: [
    "I'm a software engineer based in Ulaanbaatar. I care about interfaces that feel quick, read clearly and hold up under real use.",
    "Most of my work sits between design and engineering: turning rough ideas into products, then making them fast and reliable.",
  ],
  skills: [
    { group: "Languages", items: ["TypeScript", "JavaScript", "Go", "SQL"] },
    { group: "Front-end", items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "WebGL"] },
    { group: "Back-end", items: ["Node.js", "PostgreSQL", "Redis", "REST / GraphQL"] },
    { group: "Tools", items: ["Figma", "Git", "Docker", "Vercel"] },
  ],
  languages: ["Mongolian — native", "English — professional"],
  skillsTitle: "What I work with",
  cta: { text: "Got an idea that needs building?", button: "Write to me" },
}
