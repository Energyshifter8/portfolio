import type { LocaleText } from "./types"

export const en: LocaleText = {
  site: {
    name: "Temuulen B.",
    initials: "TB",
    role: "Software Engineer",
    location: "Ulaanbaatar, Mongolia",
    tagline: "I build fast, careful interfaces and the systems behind them.",
    status: "available", // shown in the menu bar with a blinking light
  },

  contact: {
    note: "Usually replies within two working days",
    fromPlaceholder: "you@company.com",
    subjectPlaceholder: "Web app / Dashboard / Collaboration",
    messagePlaceholder: "Hi Temuulen,\n\nWe're working on…\nWhat we need, the team and the timeline…",
    projectTypes: ["Web app or dashboard", "Interface design", "Mobile app", "Something else"],
    timelines: ["As soon as possible", "Within 3 months", "Later", "Let's discuss"],
  },

  projects: {
    "procure-agent": {
      title: "ProcureAgent",
      summary: "An agentic procurement system that turns a request written in Mongolian into a paid, audited order.",
      description: [
        "ProcureAgent is a hackathon MVP that automates internal purchasing. An employee writes a request in Mongolian; the agent collects quotes from suppliers, scores them transparently, checks policy and sends the result to an approver.",
        "After approval it makes a sandbox payment, reconciles VAT three ways and creates the order. Every step is written to an append-only audit chain. The rule: the LLM only reads, explains and justifies. Money, limits and approvals are decided by deterministic code.",
      ],
      featureGroups: [
        {
          title: "System",
          items: [
            { name: "Request parsing", detail: "an LLM turns free Mongolian text into a structured procurement spec." },
            { name: "Quote scoring", detail: "supplier offers ranked by transparent, rule-based scores, not by the model." },
            { name: "Agent protocols", detail: "MCP over Streamable HTTP and A2A (JSON-RPC 2.0 with an Agent Card)." },
            { name: "Audit chain", detail: "every step, from request to payment and VAT check, recorded so it can't be changed." },
            { name: "Testing", detail: "127 tests, typechecks across 7 packages and an end-to-end demo script." },
          ],
        },
      ],
      meta: { client: "DEBE hackathon", role: "Full-stack development · Agent design", status: "Hackathon MVP" },
      captions: [
        "Agent steps: plan, act, observe, replan",
        "Top 3 quotes with scores",
        "Approval with the approver's name",
        "Procure-to-Pay timeline",
        "Audit chain, 20 entries intact",
        "Purchases dashboard",
      ],
    },
    devdreams: {
      title: "DevDreams",
      summary: "Interactive developer roadmaps with an AI assistant that answers questions about every topic.",
      description: [
        "DevDreams shows the Frontend, Backend, DevOps and Mobile roadmaps as branching canvases. Learners mark topics as done and open any topic for a description and curated links.",
        "A built-in assistant uses retrieval-augmented generation (Pinecone + Groq Llama 3.3 70B) to answer questions, with voice input through Groq Whisper. The whole UI is in English and Mongolian.",
      ],
      featureGroups: [
        {
          title: "Web features",
          items: [
            { name: "Roadmap canvas", detail: "four tracks laid out as a branching grid with SVG bezier connections drawn via ResizeObserver." },
            { name: "AI assistant", detail: "RAG over Pinecone vector search with answers from Llama 3.3 70B on Groq." },
            { name: "Voice input", detail: "Whisper speech-to-text with silence detection and auto-stop." },
            { name: "Progress", detail: "completed topics persist across sessions." },
            { name: "Bilingual", detail: "full English and Mongolian translation with next-intl." },
          ],
        },
      ],
      meta: { client: "DevDreams", role: "Full-stack development", status: "Live" },
      captions: ["Frontend roadmap canvas", "Backend roadmap with milestones", "AI roadmap assistant"],
    },
    "mindx-plus": {
      title: "MindX Plus",
      summary: "A recruitment and survey dashboard for HR teams, fully localized in Mongolian.",
      description: [
        "MindX Plus gives HR teams one place to create, manage and track recruitment assessments and candidate surveys.",
        "The dashboard shows live stats (published counts, respondents, invitation balances) and refetching lists. A companion public site lets candidates fill in the surveys and recruitment tests.",
      ],
      featureGroups: [
        {
          title: "Dashboard features",
          items: [
            { name: "Auth", detail: "login and sign-up with validation and background token refresh." },
            { name: "Overview", detail: "stat cards and tables for recruitments and surveys." },
            { name: "Recruitments", detail: "active and completed talent evaluations in one list." },
            { name: "Survey site", detail: "a separate public app where respondents take surveys and tests." },
          ],
        },
      ],
      meta: { client: "MindX", role: "Front-end development", status: "Live" },
      captions: ["Sign in", "Sign up"],
    },
    "tlj-mongolia": {
      title: "TOUS les JOURS",
      summary: "A digital experience for a Franco-Asian bakery: 3D pastries, loyalty cards and mini-games.",
      description: [
        "A web app concept for TOUS les JOURS Mongolia, built to bring customers back between visits.",
        "It pairs a 3D pastry showcase with a loyalty programme and four small games feeding one leaderboard. It installs as a PWA and works offline.",
      ],
      featureGroups: [
        {
          title: "Web features",
          items: [
            { name: "3D showcase", detail: "low-poly pastry models rendered with React Three Fiber." },
            { name: "Loyalty", detail: "QR card, Bronze / Silver / Gold tier progress and wallet buttons." },
            { name: "Games", detail: "Mongolian Wordle, an 8×8 block puzzle, a brand quiz and a prize wheel." },
            { name: "Leaderboard", detail: "scores from every game combined in one table." },
            { name: "PWA", detail: "service worker with offline caching; installable on the home screen." },
          ],
        },
      ],
      meta: { client: "Concept for TOUS les JOURS Mongolia", role: "Design · Front-end development", status: "Live demo" },
      captions: ["Loyalty card with QR", "Mongolian Wordle", "Spin & Win", "Brand quiz", "Leaderboard"],
    },
    "bankers-algorithm": {
      title: "Banker's Algorithm",
      summary: "Deadlock avoidance in C, with an interactive resource-graph UI.",
      description: [
        "A team assignment for F.CSM302 Operating Systems at MUST: the Banker's Algorithm programming project from Silberschatz, Operating System Concepts (10th ed., ch. 8).",
        "The C program grants a resource request only if the system stays in a safe state. A browser UI lets you edit Available, Max and Allocation, submit requests and step through the safety algorithm on a resource graph. The C binary does all the calculation.",
      ],
      featureGroups: [
        {
          title: "Program",
          items: [
            { name: "CLI", detail: "RQ / RL / * commands, safety algorithm (§8.6.3.1) and resource-request algorithm (§8.6.3.2)." },
            { name: "Interactive UI", detail: "assignment, claim and request edges drawn as a resource graph." },
            { name: "Step-through", detail: "the safety algorithm shown one step at a time." },
            { name: "Tests", detail: "unit, CLI and server tests run with make test." },
          ],
        },
      ],
      meta: { client: "MUST · F.CSM302 Operating Systems", role: "Team project (5 members)", status: "Submitted" },
      captions: ["Resource graph after a granted request", "Safety algorithm, step by step", "Command console"],
    },
    "bearing-gan": {
      title: "Synthetic Faults",
      summary: "Generating unseen early-stage bearing faults with GANs: 96.84% downstream accuracy.",
      description: [
        "A machine-learning team project (Team I4, AI + Logistics Supply Chain) for COSE362 Machine Learning at Korea University.",
        "We trained only on Normal and severe Ball021 vibration signals from the CWRU bearing dataset, then generated the unseen, intermediate Ball007 severity. The best model, WGAN-GP (λ=10), reached 96.84% classifier accuracy, only 3.16% below training on real data.",
      ],
      featureGroups: [
        {
          title: "Pipeline",
          items: [
            { name: "Preprocessing", detail: "CWRU signal loading and a window-size selection experiment." },
            { name: "GAN family", detail: "nine experiments (E1–E9) plus a 2D variant, from vanilla GAN to WGAN-GP." },
            { name: "Evaluation", detail: "downstream classifier accuracy, ACF, PSD and envelope similarity." },
          ],
        },
      ],
      meta: { client: "Korea University · COSE362", role: "Team project", status: "Submitted" },
      captions: [
        "WGAN-GP signal quality: time domain and PSD",
        "t-SNE: synthetic vs. real",
        "Downstream classifier accuracy by model",
        "Mean 2D spectrograms",
      ],
    },
    "rest-api-guide": {
      title: "REST API Guide",
      summary: "A Rails 8 + MySQL REST API, documented step by step in Mongolian.",
      description: [
        "A small Posts and Comments API built with Ruby on Rails 8 in API mode, MySQL 8.4 running in Docker and Swagger UI for documentation.",
        "The README is a guide in Mongolian that follows a request from route to controller to database, with curl examples for every endpoint.",
      ],
      featureGroups: [
        {
          title: "API",
          items: [
            { name: "CRUD", detail: "JSON endpoints for posts and their comments." },
            { name: "Swagger", detail: "OpenAPI 3 docs with a live Swagger UI." },
            { name: "Docker", detail: "MySQL in a container for one-command setup." },
          ],
        },
      ],
      meta: { client: "Personal / teaching", role: "Back-end development · Documentation", status: "Live" },
      captions: ["Posts and Comments endpoints", "Trying POST /posts in Swagger"],
    },
    soundwave: {
      title: "SoundWave",
      summary: "An audio experience site that turns sound into fluid light and motion.",
      description: [
        "SoundWave is a creative website where every interaction makes ripples, pulses and visual feedback, so visitors feel the audio as well as see it.",
        "The look is a 'cosmic sound lab': deep-space blacks, purple-to-cyan gradients and glass panels that pulse like audio gear.",
      ],
      featureGroups: [
        {
          title: "Web features",
          items: [
            { name: "Visualizers", detail: "fluid, organic animations driven by sound." },
            { name: "Interaction", detail: "ripples and pulses respond to the cursor and to playback." },
          ],
        },
      ],
      meta: { client: "Personal", role: "Design · Front-end development", status: "Live" },
      captions: ["Features", "Live demo player", "Testimonials"],
    },
  },

  experience: [
    {
      period: "2026 — now",
      title: "Software Engineer",
      org: "Tanasoft",
      branch: "work",
      detail: "Building product interfaces and internal platforms with React, TypeScript and Node.",
    },
    {
      period: "2026",
      title: "Freelance developer",
      org: "MindX · DevDreams · MonFresh",
      branch: "work",
      detail: "MindX Plus recruitment dashboard and survey site, the DevDreams AI roadmap platform and the MonFresh marketing site.",
    },
    {
      period: "2026",
      title: "Hackathon team",
      org: "DEBE hackathon",
      branch: "community",
      detail: "Built ProcureAgent, an agentic procurement MVP on MCP and A2A with 127 tests and an audit chain.",
    },
    {
      period: "2026",
      title: "Development team",
      org: "Sys&CoTech club, MUST",
      branch: "community",
      detail: "Club website, member app and the landing page for the club's Programming Olympiad 2026.",
    },
    {
      period: "2026 Spring",
      title: "Machine Learning (COSE362)",
      org: "Korea University",
      branch: "study",
      detail: "Team project generating unseen bearing faults with GANs; WGAN-GP reached 96.84% downstream accuracy.",
    },
    {
      period: "2024 — now",
      title: "B.Sc. Computer Science",
      org: "Mongolian University of Science and Technology (MUST)",
      branch: "study",
      detail: "Data structures, algorithm design, operating systems, automata theory, computer graphics, data mining & ML, web design, and network administration.",
    },
  ],

  profile: {
    aboutLabels: ["Today", "Background"], // headings over the two `about` paragraphs
    about: [
      "I'm a computer science student at MUST and a software engineer at Tanasoft in Ulaanbaatar. I build web products end to end, from dashboards and AI assistants to 3D brand sites.",
      "Most of my work sits between design and engineering: turning rough ideas into products, then making them fast and reliable. At university I go deeper into the systems underneath: operating systems, algorithms, automata and machine learning.",
    ],
    skills: [
      { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "C", "Java", "Ruby", "SQL"] },
      { group: "Front-end", items: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Three.js / R3F", "TanStack Query"] },
      { group: "Back-end & data", items: ["Node.js", "Ruby on Rails", "Firebase", "MongoDB", "MySQL"] },
      { group: "AI & ML", items: ["PyTorch", "scikit-learn", "RAG / Pinecone", "MCP / A2A agents"] },
      { group: "Tools", items: ["Git", "Docker", "Vercel", "Biome", "Vitest", "Figma"] },
    ],
    languages: ["Mongolian — native", "English — professional"],
    skillsTitle: "What I work with",
    cta: { text: "Got an idea that needs building?", button: "Write to me" },
  },

  ui: {
    rooms: {
      projects: { label: "Projects", note: "the projects" },
      experience: { label: "Experience", note: "the career" },
      profile: { label: "Profile", note: "the profile" },
      contact: { label: "Contact", note: "write to me" },
    },
    desktop: { roomsLabel: "Rooms", enter: "Enter ▸", portrait: "Portrait of {name}" },
    menu: {
      file: "File",
      extras: "Extras",
      system: "System",
      print: "Print this page",
      quickActions: "Quick actions",
      surprise: "Surprise me",
      copyEmail: "Copy my email",
      copied: "Copied ✓",
      sendEmail: "Send an email",
      fullscreen: "Full screen",
      exitFullscreen: "Exit full screen",
      crtOff: "Turn off the CRT",
      crtOn: "Turn on the CRT",
      language: "Language",
    },
    bar: {
      backToDesktop: "Back to desktop",
      breadcrumb: "Breadcrumb",
      escProject: "ESC — close project",
      escWindow: "ESC — close window",
      escDesktop: "ESC — back to desktop",
      entries: "{entries} entries · {branches} branches",
      weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    project: {
      about: "About {title}",
      spec: { client: "client", role: "role", period: "period", status: "status", stack: "stack", link: "link" },
      linkLabel: { site: "Visit project", github: "View on GitHub" },
      screenshots: "Screenshots",
      fig: "fig.",
      back: "Back to the projects",
      all: "All projects ↗",
      next: "Up next / {n}",
      nextAria: "Next project: {title}",
    },
    experience: { tracklabel: "Career entries" },
    contact: {
      dialog: "Contact",
      windowTitle: "contact.app — new message",
      email: "Email",
      to: "To",
      from: "From",
      subject: "Subject",
      project: "Project",
      timeline: "Timeline",
      projectHint: "Type (optional)",
      timelineHint: "Timing (optional)",
      message: "Message",
      send: "▸ SEND MESSAGE",
      empty: "Write a few words first.",
      opening: "✓ Opening your mail app…",
      defaultSubject: "Hello",
      replyTo: "Reply to",
    },
    window: { close: "Close window" },
    notFound: { text: "File not found.", back: "← Back to desktop" },
  },
}
