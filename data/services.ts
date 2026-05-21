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
  {
    code: "APP",
    title: "Аппликейшн Хөгжүүлэлт",
    dateCode: "01-10-24",
    upperTags: ["React Native", "Expo", "Mobile UI"],
    lowerTags: ["iOS", "Android", "Performance"],
    processFrom: "ARC",
    processTo: "REL",
  },
  {
    code: "OPT",
    title: "Хурдны Оновчлол",
    dateCode: "04-05-24",
    upperTags: ["Lighthouse", "Web Vitals", "SEO"],
    lowerTags: ["Caching", "Compression", "Assets"],
    processFrom: "ANL",
    processTo: "FST",
  },
  {
    code: "INT",
    title: "Интерактив Систем",
    dateCode: "05-12-24",
    upperTags: ["Three.js", "Shaders", "R3F"],
    lowerTags: ["Physics", "Particles", "Experience"],
    processFrom: "MAT",
    processTo: "SIM",
  },
];
