export interface Service {
  code: string;
  title: string;
  dateCode: string;
  upperTags: string[];
  lowerTags: string[];
  processFrom: string;
  processTo: string;
}

export const services: Service[] = [
  {
    code: "WEB",
    title: "Web Design",
    dateCode: "06-20-12",
    upperTags: ["UI/UX", "Prototypes", "Components"],
    lowerTags: ["Figma", "Wireframes", "Interactions"],
    processFrom: "WIR",
    processTo: "PRO",
  },
  {
    code: "DEV",
    title: "Full-Stack Dev",
    dateCode: "08-15-22",
    upperTags: ["Next.js", "TypeScript", "Node"],
    lowerTags: ["Prisma", "PostgreSQL", "Tailwind"],
    processFrom: "BCK",
    processTo: "FRO",
  },
  {
    code: "MOT",
    title: "Motion Design",
    dateCode: "11-02-23",
    upperTags: ["After Effects", "Lottie", "GSAP"],
    lowerTags: ["Framer", "Canvas", "WebGL"],
    processFrom: "STA",
    processTo: "MOV",
  },
  {
    code: "BRA",
    title: "Brand Identity",
    dateCode: "03-12-24",
    upperTags: ["Logos", "Styleguides", "Typography"],
    lowerTags: ["Print", "Digital", "Guidelines"],
    processFrom: "IDE",
    processTo: "MAR",
  },
];
