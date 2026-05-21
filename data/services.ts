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
    title: "Вэб Хөгжүүлэлт",
    dateCode: "08-15-22",
    upperTags: ["Next.js", "TypeScript", "React"],
    lowerTags: ["Tailwind", "Framer Motion", "Анимаци"],
    processFrom: "DES",
    processTo: "DEV",
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
];
