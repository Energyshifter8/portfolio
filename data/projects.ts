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
    title: "Дараагийн Үеийн Хяналтын Самбар",
    tags: ["ХЯНАЛТЫН_САМБАР", "WEBGL", "REACT"],
    year: 2024,
  },
  {
    slug: "vanguard-branding",
    code: "VNG",
    client: "Vanguard Studio",
    title: "Брэндийн Өнгө Төрх",
    tags: ["БРЭНДИНГ", "ЛОГО", "ТҮҮХ_ӨГҮҮЛЭХ"],
    year: 2024,
  },
  {
    slug: "echo-audio",
    code: "ECH",
    client: "Echo Sound",
    title: "Аудио Визуалчлал",
    tags: ["АУДИО", "CANVAS", "ХӨДӨЛГӨӨН"],
    year: 2023,
  },
  {
    slug: "lumina-retail",
    code: "LUM",
    client: "Lumina Co.",
    title: "Цахим Худалдааны Платформ",
    tags: ["ХУДАЛДАА", "ГАР_УТАС", "UI/UX"],
    year: 2023,
  },
  {
    slug: "nexus-network",
    code: "NEX",
    client: "Nexus Labs",
    title: "Сүлжээ Судлаач",
    tags: ["ӨГӨГДӨЛ", "ВИЗУАЛЧЛАЛ", "D3.JS"],
    year: 2022,
  },
  {
    slug: "atlas-travel",
    code: "ATL",
    client: "Atlas Journeys",
    title: "Аялал Захиалгын Апп",
    tags: ["АЯЛАЛ", "ГАЗРЫН_ЗУРАГ", "АПП"],
    year: 2022,
  },
];
