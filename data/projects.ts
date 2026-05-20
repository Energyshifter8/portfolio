export interface Project {
  slug: string;
  code: string;
  client: string;
  title: string;
  tags: string[];
  year: number;
}

export const projects: Project[] = [
  {
    slug: "quantum-interface",
    code: "QNT",
    client: "Quantum Dynamics",
    title: "Next-Gen Dashboard",
    tags: ["DASHBOARD", "WEBGL", "REACT"],
    year: 2024,
  },
  {
    slug: "vanguard-branding",
    code: "VNG",
    client: "Vanguard Studio",
    title: "Brand Identity",
    tags: ["BRANDING", "LOGO", "STORYTELLING"],
    year: 2024,
  },
  {
    slug: "echo-audio",
    code: "ECH",
    client: "Echo Sound",
    title: "Audio Visualization",
    tags: ["AUDIO", "CANVAS", "MOTION"],
    year: 2023,
  },
  {
    slug: "lumina-retail",
    code: "LUM",
    client: "Lumina Co.",
    title: "E-commerce Platform",
    tags: ["COMMERCE", "MOBILE", "UI/UX"],
    year: 2023,
  },
  {
    slug: "nexus-network",
    code: "NEX",
    client: "Nexus Labs",
    title: "Network Explorer",
    tags: ["DATA", "VIZ", "D3.JS"],
    year: 2022,
  },
  {
    slug: "atlas-travel",
    code: "ATL",
    client: "Atlas Journeys",
    title: "Travel Booking App",
    tags: ["TRAVEL", "MAPS", "APP"],
    year: 2022,
  },
];
