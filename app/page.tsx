"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import Loader from '@/components/ui/Loader';
import Geometry from '@/components/ui/Geometry';

const techItems = [
  "NEXT.JS", "TYPESCRIPT", "THREE.JS", "WEBGL", "FRAMER MOTION", "TAILWIND", "GSAP", "LENIS"
];

const projects = [
  { 
    id: "01", 
    title: "MARKETING_WEB", 
    role: "FULL-STACK / REACT", 
    status: "STABLE",
    link: "https://github.com/Energyshifter8/user" 
  },
  { 
    id: "02", 
    title: "GRAVITY_SIM", 
    role: "PHYSICS ENGINE / C++", 
    status: "EXPERIMENTAL",
    link: "https://github.com/Energyshifter8/gravity_sim"
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  
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

      <Geometry />
      <main className="relative z-10 brutal-grid">
        
        {/* --- EXTREME HERO --- */}
        <section className="min-h-screen flex flex-col border-b border-white/20">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 divide-x divide-white/20">
            <div className="md:col-span-8 flex flex-col justify-end p-8 md:p-20">
              <div className="font-mono text-[10px] text-accent tracking-[0.8em] mb-10">
                [ SYSTEM STATUS: OPERATIONAL ]
              </div>
              
              <div className="mb-12 w-full max-w-3xl group transition-all duration-700">
                <div className="flex justify-between items-end mb-4 font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">
                  <div className="flex gap-6">
                    <span className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-accent animate-pulse" />
                      AUDIO_LINK: ACTIVE
                    </span>
                    <span className="hidden md:block">VOL_REF: 0.82</span>
                  </div>
                  <div className="text-right">
                    [ PLAYLIST_04 / 2026 ]
                  </div>
                </div>
                
                <div className="relative p-1 border border-white/10 group-hover:border-accent/40 transition-colors duration-500 bg-black/20 backdrop-blur-sm">
                  <iframe 
                    style={{ borderRadius: '0px' }} 
                    src="https://open.spotify.com/embed/playlist/4Ob7RFVWLtMCMjgnWnQuQa?utm_source=generator&theme=0" 
                    width="100%" 
                    height="352" 
                    frameBorder="0" 
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    className="grayscale invert brightness-200 contrast-125 opacity-70 group-hover:opacity-100 transition-all duration-700"
                  ></iframe>
                  
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r border-b border-accent/40" />
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-l border-t border-accent/40" />
                </div>
              </div>

              <motion.div style={{ skewY: skewVelocity }} className="relative">
                <h1 className="text-[14vw] md:text-[10rem] font-bold leading-[0.75] tracking-tighter uppercase mix-blend-difference whitespace-nowrap">
                  TEMUULEN B.
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
              </div>
            </div>
          </div>
        </section>

        {/* --- DATA TABLE WORK --- */}
        <section className="border-b border-white/20">
          <div className="p-8 md:p-12 bg-white/5 font-mono text-[9px] tracking-[0.5em] text-white/40 uppercase">
            ## FILE_SYSTEM / PROJECTS
          </div>
          <div className="divide-y divide-white/20">
            {projects.map((p) => (
              <motion.div 
                key={p.id}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                className="grid grid-cols-1 md:grid-cols-12 p-8 md:p-12 items-center group cursor-pointer relative"
              >
                <a 
                  href={p.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="absolute inset-0 z-20"
                />
                <div className="md:col-span-1 font-mono text-[9px] text-white/20">{p.id}</div>
                <div className="md:col-span-6">
                  <h3 className="text-3xl md:text-7xl font-bold tracking-tighter uppercase group-hover:text-accent transition-colors duration-500">
                    {p.title}
                  </h3>
                </div>
                <div className="md:col-span-3 font-mono text-[9px] text-white/40 tracking-widest mt-4 md:mt-0">
                  {p.role}
                </div>
                <div className="md:col-span-2 text-right">
                  <span className="inline-block px-3 py-1 border border-white/20 font-mono text-[7px] uppercase tracking-[0.3em]">
                    {p.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- SYSTEM CAPABILITIES --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 divide-x divide-white/20 border-b border-white/20">
          <div className="p-12 md:p-32 flex flex-col justify-center">
            <h2 className="text-3xl md:text-[5rem] font-bold tracking-tighter leading-none uppercase mb-16 mix-blend-difference">
              CAPABILITIES
            </h2>
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              {techItems.map((tech) => (
                <div key={tech} className="flex items-center gap-4 font-mono text-[10px] tracking-widest text-white/60">
                  <div className="w-1.5 h-1.5 bg-accent" />
                  {tech}
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-12 md:p-32 flex flex-col justify-between min-h-[70vh]">
            <div className="space-y-12 max-w-xl">
              <div className="font-mono text-[10px] text-white/20 tracking-widest uppercase">## INTERNSHIP_OPPORTUNITIES</div>
              <p className="text-xl md:text-3xl font-mono uppercase leading-tight text-white/80">
                Би ШУТИС-ийн компьютерийн ухаан чиглэлээр суралцдаг оюутан бөгөөд программ хангамж Front-end, Back-end чиглэлээр дадлага (internship) хийх газар, боломж хайж байна.
              </p>
            </div>
            
            <div className="space-y-8 mt-16 md:mt-0">
              <div className="w-full h-[1px] bg-white/10" />
              <div className="flex flex-col items-start gap-12 pt-4 relative z-50">
                <a href="mailto:temuulenbold1@gmail.com" className="group block -ml-4 md:-ml-12 lg:-ml-20">
                  <div className="font-mono text-[8px] text-white/20 tracking-widest uppercase mb-4">INITIATE_HANDSHAKE</div>
                  <span className="text-xl md:text-4xl lg:text-5xl font-bold tracking-tighter uppercase group-hover:text-accent transition-all whitespace-nowrap">
                    TEMUULENBOLD1@GMAIL.COM
                  </span>
                </a>
                
                <div className="flex flex-wrap items-center gap-4 -ml-4 md:-ml-12 lg:-ml-20">
                  <a 
                    href="https://github.com/Energyshifter8" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group flex items-center gap-4 border border-white/20 p-4 hover:bg-white/5 transition-colors flex-shrink-0 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-accent transition-colors">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                      <path d="M9 18c-4.51 2-5-2-7-2"/>
                    </svg>
                    <span className="font-mono text-[10px] uppercase tracking-widest group-hover:text-accent transition-colors">GITHUB</span>
                  </a>

                  <a 
                    href="https://www.facebook.com/tem.len.b.623027" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group flex items-center gap-4 border border-white/20 p-4 hover:bg-white/5 transition-colors flex-shrink-0 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-accent transition-colors">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                    <span className="font-mono text-[10px] uppercase tracking-widest group-hover:text-accent transition-colors">FACEBOOK</span>
                  </a>

                  <a 
                    href="https://www.instagram.com/energyshifter8/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group flex items-center gap-4 border border-white/20 p-4 hover:bg-white/5 transition-colors flex-shrink-0 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-accent transition-colors">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                    <span className="font-mono text-[10px] uppercase tracking-widest group-hover:text-accent transition-colors">INSTAGRAM</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SYSTEM LOG FOOTER --- */}
        <footer className="p-10 font-mono text-[10px] text-white/20 flex justify-between items-center border-t border-white/10">
          <div>© 2026-PRESENT // ARCH_RESERVED</div>
          <div className="text-white/10">[ END_OF_TRANSMISSION ]</div>
        </footer>
      </main>
    </>
  );
}
