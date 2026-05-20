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
    title: "Вэб Дизайн",
    dateCode: "06-20-12",
    upperTags: ["UI/UX", "Прототипүүд", "Компонентууд"],
    lowerTags: ["Figma", "Ерөнхий бүтэц", "Интеракцууд"],
    processFrom: "WIR",
    processTo: "PRO",
  },
  {
    code: "DEV",
    title: "Фулл-Стак Хөгжүүлэлт",
    dateCode: "08-15-22",
    upperTags: ["Next.js", "TypeScript", "Node"],
    lowerTags: ["Prisma", "PostgreSQL", "Tailwind"],
    processFrom: "BCK",
    processTo: "FRO",
  },
  {
    code: "MOT",
    title: "Хөдөлгөөнт Дизайн",
    dateCode: "11-02-23",
    upperTags: ["After Effects", "Lottie", "GSAP"],
    lowerTags: ["Framer", "Canvas", "WebGL"],
    processFrom: "STA",
    processTo: "MOV",
  },
  {
    code: "BRA",
    title: "Брэндийн Өнгө Төрх",
    dateCode: "03-12-24",
    upperTags: ["Логонууд", "Загварын удирдамжууд", "Типографи"],
    lowerTags: ["Хэвлэл", "Дижитал", "Удирдамжууд"],
    processFrom: "IDE",
    processTo: "MAR",
  },
];
