"use client";

import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { id: "01", title: "QUANTUM INTERFACE", type: "WEBGL / SHADERS", year: "2024" },
  { id: "02", title: "NEXUS OS", type: "REACT / SYSTEM", year: "2024" },
  { id: "03", title: "ECHO VISUALIZER", type: "CANVAS / AUDIO", year: "2023" },
  { id: "04", title: "LUMINA RETAIL", type: "UI/UX / COMMERCE", year: "2023" },
];

const techStack = [
  { category: "LANGUAGES", items: ["TYPESCRIPT", "JAVASCRIPT", "GLSL", "PYTHON"] },
  { category: "FRONTEND", items: ["NEXT.JS", "REACT", "TAILWIND", "GSAP"] },
  { category: "CREATIVE", items: ["THREE.JS", "FRAMER MOTION", "CANVAS", "SVG"] },
  { category: "TOOLS", items: ["FIGMA", "GIT", "DOCKER", "NEOVIM"] },
];

const revealVariants = {
  hidden: { y: "100%" },
  visible: { 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
  }
};

export default function Home() {
  return (
    <main className="min-h-screen border-x border-white/10 max-w-[1800px] mx-auto overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-12 border-b border-white/10">
        <div className="md:col-span-8 p-6 md:p-12 border-r border-white/10 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="font-mono text-[10px] tracking-[0.4em] text-white/40 uppercase">VERSION_2.0.4</div>
            <div className="font-mono text-[10px] tracking-[0.4em] text-white/40 uppercase">AVAILABLE_FOR_WORK</div>
          </div>
          
          <div className="overflow-hidden">
            <motion.h1 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="text-[12vw] md:text-[8rem] font-bold leading-[0.8] tracking-tighter uppercase"
            >
              TEMUULEN B.
            </motion.h1>
          </div>

          <div className="max-w-xl space-y-6">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-mono text-xs md:text-sm leading-relaxed text-white/60 uppercase tracking-widest"
            >
              Building high-performance, creative web experiences at the intersection of design and code. Specializing in frontend architecture and interactive motion.
            </motion.p>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col">
          <nav className="p-8 border-b border-white/10 flex-1 flex flex-col justify-center space-y-4">
            {['WORK', 'ABOUT', 'LAB', 'CONTACT'].map((item, i) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="group flex items-center justify-between font-mono text-sm tracking-[0.3em] hover:text-white transition-colors text-white/40"
              >
                <span>{`0${i + 1}`} // {item}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            ))}
          </nav>
          <div className="p-8 font-mono text-[10px] text-white/20 uppercase tracking-[0.2em] leading-loose">
            [ SYSTEM_READY ]<br />
            [ LOCATION: ULAANBAATAR ]<br />
            [ TIME: {new Date().toLocaleTimeString()} ]
          </div>
        </div>
      </section>

      {/* --- WORK SECTION --- */}
      <section id="work" className="border-b border-white/10">
        <div className="p-8 border-b border-white/10">
          <h2 className="font-mono text-xs tracking-[0.5em] text-white/40 uppercase">## SELECTED_WORK.SH</h2>
        </div>
        
        <div className="divide-y divide-white/10">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group relative grid grid-cols-1 md:grid-cols-12 items-center p-8 hover:bg-white/[0.02] transition-colors cursor-pointer"
            >
              <div className="md:col-span-1 font-mono text-xs text-white/20">{project.id}</div>
              <div className="md:col-span-6">
                <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase group-hover:pl-4 transition-all duration-500 ease-out">
                  {project.title}
                </h3>
              </div>
              <div className="md:col-span-4 font-mono text-xs text-white/40 tracking-widest mt-4 md:mt-0">
                {project.type}
              </div>
              <div className="md:col-span-1 font-mono text-xs text-white/20 text-right">
                {project.year}
              </div>
              
              {/* Subtle hover reveal line */}
              <div className="absolute left-0 bottom-0 h-[1px] w-0 bg-white/50 group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* --- TECH STACK SECTION --- */}
      <section id="tech" className="grid grid-cols-1 md:grid-cols-2 border-b border-white/10">
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
          <h2 className="font-mono text-xs tracking-[0.5em] text-white/40 uppercase mb-12">## SYSTEM_CAPABILITIES.XML</h2>
          <div className="grid grid-cols-1 gap-12">
            {techStack.map((stack) => (
              <div key={stack.category} className="space-y-4">
                <h4 className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase underline underline-offset-8">
                  {stack.category}
                </h4>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {stack.items.map((item) => (
                    <span key={item} className="font-mono text-sm tracking-tighter hover:text-white transition-colors text-white/60">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-between">
          <div className="space-y-8">
            <h2 className="font-mono text-xs tracking-[0.5em] text-white/40 uppercase">## CORE_PHILOSOPHY.LOG</h2>
            <div className="space-y-6 text-xl md:text-2xl font-mono text-white/60 uppercase leading-snug">
              <p>Minimalism is not the lack of something. It is the perfect amount of something.</p>
              <p>Code is design. Design is code. The boundary is an illusion.</p>
            </div>
          </div>
          
          <div className="pt-24 flex items-center gap-8">
            <a href="mailto:contact@temuulen.b" className="group flex flex-col">
              <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase mb-2">INITIATE_CONTACT</span>
              <span className="text-2xl font-bold tracking-tighter uppercase group-hover:underline transition-all underline-offset-8">
                HI@TEMUULEN.B
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="p-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
          © {new Date().getFullYear()} TEMUULEN B. / ALL_RIGHTS_RESERVED
        </div>
        <div className="flex gap-8">
          {['GITHUB', 'LINKEDIN', 'X'].map(link => (
            <a key={link} href="#" className="font-mono text-[10px] text-white/40 hover:text-white transition-colors tracking-widest uppercase">
              [{link}]
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}
