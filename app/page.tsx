"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import Loader from '@/components/ui/Loader';
import Geometry from '@/components/ui/Geometry';

const techItems = [
  "NEXT.JS", "TYPESCRIPT", "THREE.JS", "WEBGL", "FRAMER MOTION", "TAILWIND", "GSAP", "LENIS"
];

const projects = [
  { id: "01", title: "QUANTUM_OS", role: "LEAD ARCHITECT", status: "STABLE" },
  { id: "02", title: "NEURAL_LINK", role: "INTERFACE DESIGN", status: "EXPERIMENTAL" },
  { id: "03", title: "CYBER_RETAIL", role: "WEBGL DEV", status: "LEGACY" },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  const skewVelocity = useSpring(useTransform(scrollVelocity, [-1, 1], [-20, 20]), {
    stiffness: 1000,
    damping: 100
  });

  return (
    <>
      <div className="noise-bg" />
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <main className="relative z-10 brutal-grid">
        <Geometry />
        
        {/* --- EXTREME HERO --- */}
        <section className="min-h-screen flex flex-col border-b border-white/20">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 divide-x divide-white/20">
            <div className="md:col-span-8 flex flex-col justify-end p-8 md:p-20">
              <div className="font-mono text-[10px] text-accent tracking-[0.8em] mb-10">
                [ SYSTEM STATUS: OPERATIONAL ]
              </div>
              <motion.div style={{ skewY: skewVelocity }} className="relative">
                <h1 className="text-[18vw] md:text-[14rem] font-bold leading-[0.75] tracking-tighter uppercase mix-blend-difference">
                  TEMU<br/>ULEN B.
                </h1>
                <div className="absolute -top-10 -right-10 font-mono text-[10px] text-white/30 hidden md:block">
                  COORD_X: 47.9188<br/>COORD_Y: 106.9176
                </div>
              </motion.div>
            </div>
            
            <div className="md:col-span-4 p-8 md:p-12 flex flex-col justify-between font-mono text-[10px] uppercase tracking-widest leading-loose">
              <div className="space-y-8">
                <p className="text-white/40 max-w-xs">
                  A DIGITAL CRAFTSMAN FOCUSED ON THE INTERSECTION OF SYSTEM ARCHITECTURE AND EXPERIMENTAL DESIGN.
                </p>
                <div className="space-y-2">
                  <p>[01] // SELECTED_WORK</p>
                  <p>[02] // ARCHIVE_FILES</p>
                  <p>[03] // SYSTEM_SPECS</p>
                  <p>[04] // CONTACT_TERM</p>
                </div>
              </div>
              
              <div className="space-y-4 pt-20">
                <div className="w-full h-[1px] bg-white/20" />
                <div className="flex justify-between">
                  <span>LATENCY: 14MS</span>
                  <span>ENCRYPTION: AES-256</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- DATA TABLE WORK --- */}
        <section className="border-b border-white/20">
          <div className="p-8 md:p-12 bg-white/5 font-mono text-[10px] tracking-[0.5em] text-white/40 uppercase">
            ## FILE_SYSTEM / PROJECTS
          </div>
          <div className="divide-y divide-white/20">
            {projects.map((p) => (
              <motion.div 
                key={p.id}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                className="grid grid-cols-1 md:grid-cols-12 p-8 md:p-12 items-center group cursor-pointer"
              >
                <div className="md:col-span-1 font-mono text-[10px] text-white/20">{p.id}</div>
                <div className="md:col-span-6">
                  <h3 className="text-4xl md:text-8xl font-bold tracking-tighter uppercase group-hover:text-accent transition-colors duration-500">
                    {p.title}
                  </h3>
                </div>
                <div className="md:col-span-3 font-mono text-[10px] text-white/40 tracking-widest mt-4 md:mt-0">
                  {p.role}
                </div>
                <div className="md:col-span-2 text-right">
                  <span className="inline-block px-3 py-1 border border-white/20 font-mono text-[8px] uppercase tracking-[0.3em]">
                    {p.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SYSTEM CAPABILITIES --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 divide-x divide-white/20 border-b border-white/20">
          <div className="p-12 md:p-24 flex flex-col justify-center">
            <h2 className="text-6xl md:text-[10rem] font-bold tracking-tighter leading-none uppercase mb-20 mix-blend-difference">
              CAPA<br/>BILITIES
            </h2>
            <div className="grid grid-cols-2 gap-8">
              {techItems.map((tech) => (
                <div key={tech} className="flex items-center gap-4 font-mono text-[10px] tracking-widest text-white/60">
                  <div className="w-1.5 h-1.5 bg-accent" />
                  {tech}
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-12 md:p-24 flex flex-col justify-between min-h-[60vh]">
            <div className="space-y-12">
              <div className="font-mono text-[10px] text-white/20 tracking-widest uppercase">## PHILOSOPHY_MANIFESTO</div>
              <p className="text-2xl md:text-4xl font-mono uppercase leading-tight text-white/80">
                BRUTALISM IS NOT ABOUT UGLINESS. IT IS ABOUT THE TRUTH OF THE MATERIALS. THE TRUTH OF THE CODE.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-full h-[1px] bg-white/10" />
              <a href="mailto:sys@temuulen.b" className="group block">
                <div className="font-mono text-[8px] text-white/20 tracking-widest uppercase mb-4">INITIATE_HANDSHAKE</div>
                <span className="text-4xl md:text-7xl font-bold tracking-tighter uppercase group-hover:text-accent transition-all">
                  HI@TEMUULEN.B
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* --- SYSTEM LOG FOOTER --- */}
        <footer className="p-10 font-mono text-[10px] text-white/20 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex gap-10">
            <span>[ SYSTEM_TIME: {new Date().toLocaleTimeString()} ]</span>
            <span>[ UPTIME: 99.9% ]</span>
          </div>
          <div className="flex gap-10">
            {['GITHUB', 'LINKEDIN', 'READ.CV'].map(s => (
              <a key={s} href="#" className="hover:text-accent transition-colors tracking-widest">[{s}]</a>
            ))}
          </div>
          <div>© 2026-PRESENT // ARCH_RESERVED</div>
        </footer>
      </main>
    </>
  );
}
