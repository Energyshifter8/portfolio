// ─────────────────────────────────────────────────────────────
// Data that is the same in every language: contact details,
// links, images and tech stacks. Words live in en.ts / mn.ts.
// ─────────────────────────────────────────────────────────────

export const shared = {
  email: "temuulen.b@tanasoft.mn",
  shellUser: "temuulen@ulaanbaatar", // the prompt on the experience page
  socials: [
    { label: "GitHub", handle: "github.com/Energyshifter8", href: "https://github.com/Energyshifter8" },
    { label: "Instagram", handle: "@energyshifter8", href: "https://www.instagram.com/energyshifter8/" },
    { label: "Facebook", handle: "facebook.com/tem.len.b.623027", href: "https://www.facebook.com/tem.len.b.623027" },
  ],
}

export type LinkKind = "site" | "github"

export type ProjectBase = {
  slug: string
  cover?: string
  figures: string[] // image paths; captions come from the locale file, in the same order
  period: string
  stack: string[]
  link?: { kind: LinkKind; href: string }
}

const shots = (slug: string, names: string[]) => names.map((n) => `/projects/${slug}/${n}.png`)

export const projectBase = [
  {
    slug: "procure-agent",
    cover: "/projects/procure-agent/cover.png",
    figures: shots("procure-agent", ["01-agent-steps", "02-quotes", "03-approval", "04-timeline", "05-audit", "06-purchases"]),
    period: "2026",
    stack: ["TypeScript", "Next.js 16", "MongoDB Atlas", "MCP", "A2A", "Vitest"],
  },
  {
    slug: "devdreams",
    cover: "/projects/devdreams/cover.png",
    figures: shots("devdreams", ["01-frontend", "02-backend", "03-assistant"]),
    period: "2026",
    stack: ["Next.js 16", "TypeScript", "Firebase", "Pinecone", "Groq", "next-intl"],
    link: { kind: "site", href: "https://roadmap-theta-eosin.vercel.app/" },
  },
  {
    slug: "mindx-plus",
    cover: "/projects/mindx-plus/cover.png",
    figures: shots("mindx-plus", ["01-sign-in", "02-sign-up"]),
    period: "2026",
    stack: ["Next.js 16", "React 19", "TypeScript", "TanStack Query", "shadcn/ui"],
    link: { kind: "site", href: "https://mindxplus-v2.vercel.app" },
  },
  {
    slug: "tlj-mongolia",
    cover: "/projects/tlj-mongolia/cover.png",
    figures: shots("tlj-mongolia", ["01-loyalty", "02-wordle", "03-spin-wheel", "04-quiz", "05-leaderboard"]),
    period: "2026",
    stack: ["Next.js 16", "TypeScript", "Three.js", "React Three Fiber", "Tailwind CSS"],
    link: { kind: "site", href: "https://tlj-mongolia.vercel.app" },
  },
  {
    slug: "bankers-algorithm",
    cover: "/projects/bankers-algorithm/cover.png",
    figures: shots("bankers-algorithm", ["01-resource-graph", "02-safety-steps", "03-console"]),
    period: "2026",
    stack: ["C11", "Make", "Python", "JavaScript"],
    link: { kind: "github", href: "https://github.com/Energyshifter8/V-1-13-Bankers-Algorithm" },
  },
  {
    slug: "bearing-gan",
    cover: "/projects/bearing-gan/cover.png",
    figures: shots("bearing-gan", ["01-signal-quality", "02-tsne", "03-accuracy", "04-spectrogram"]),
    period: "2026",
    stack: ["Python", "PyTorch", "scikit-learn", "NumPy", "Jupyter"],
  },
  {
    slug: "rest-api-guide",
    cover: "/projects/rest-api-guide/cover.png",
    figures: shots("rest-api-guide", ["01-endpoints", "02-try-it"]),
    period: "2026",
    stack: ["Ruby 4", "Rails 8", "MySQL", "Docker", "OpenAPI"],
    link: { kind: "site", href: "https://rest-api-guide.vercel.app" },
  },
  {
    slug: "soundwave",
    cover: "/projects/soundwave/cover.png",
    figures: shots("soundwave", ["01-features", "02-live-demo", "03-testimonials"]),
    period: "2026",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: { kind: "site", href: "https://dumb-psi.vercel.app" },
  },
] as const satisfies readonly ProjectBase[]

export type Slug = (typeof projectBase)[number]["slug"]
