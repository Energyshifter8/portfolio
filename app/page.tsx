"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import Loader from '@/components/ui/Loader';
import Geometry from '@/components/ui/Geometry';
import BootSequence from '@/components/ui/BootSequence';
import SkillBar from '@/components/ui/SkillBar';

const techItems = [
  { name: "NEXT.JS", level: 92 },
  { name: "TYPESCRIPT", level: 88 },
  { name: "THREE.JS", level: 75 },
  { name: "WEBGL", level: 70 },
  { name: "FRAMER MOTION", level: 95 },
  { name: "REACT NATIVE", level: 82 },
  { name: "GSAP / LOTTIE", level: 85 },
  { name: "TAILWIND CSS", level: 90 }
];

const projects = [
  { 
    id: "01", 
    title: "MARKETING_WEB", 
    role: "FULL-STACK / REACT", 
    status: "STABLE",
    size: "4.2MB",
    date: "JUN-05-2026",
    perms: "drwxr-xr-x",
    link: "https://github.com/Energyshifter8/user" 
  },
  { 
    id: "02", 
    title: "GRAVITY_SIM", 
    role: "PHYSICS ENGINE / C++", 
    status: "EXPERIMENTAL",
    size: "12.8MB",
    date: "MAY-12-2026",
    perms: "drw-------",
    link: "https://github.com/Energyshifter8/gravity_sim"
  },
  { 
    id: "03", 
    title: "QUANTUM_INT", 
    role: "WEBGL / DASHBOARD", 
    status: "STABLE",
    size: "8.5MB",
    date: "MAR-24-2026",
    perms: "drwxr-xr-x",
    link: "https://github.com/Energyshifter8/quantum-interface"
  },
  { 
    id: "04", 
    title: "ECHO_AUDIO", 
    role: "AUDIO_VIS / CANVAS", 
    status: "STABLE",
    size: "2.1MB",
    date: "JAN-15-2026",
    perms: "drwxr-xr-x",
    link: "https://github.com/Energyshifter8/echo-audio"
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showBoot, setShowBoot] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  const skewVelocity = useSpring(useTransform(scrollVelocity, [-1, 1], [-20, 20]), {
    stiffness: 1000,
    damping: 100
  });

  useEffect(() => {
    const hasBooted = sessionStorage.getItem('hasBooted');
    if (!hasBooted) {
      setShowBoot(true);
      setLoading(false); // Skip standard loader if booting
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem('hasBooted', 'true');
    setShowBoot(false);
  };

  return (
    <>
      <div className="noise-bg" />
      <AnimatePresence>
        {showBoot && <BootSequence onComplete={handleBootComplete} />}
        {loading && !showBoot && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Geometry />
      <main className="relative z-10 brutal-grid">
        
        {/* --- EXTREME HERO --- */}
        <section className="min-h-screen flex flex-col border-b border-white/20">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 divide-x divide-white/20">
            <div className="md:col-span-8 flex flex-col justify-end p-8 md:p-20">
              <div className="font-mono text-[10px] text-accent tracking-[0.8em] mb-10 animate-glitch">
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
                  <div className="text-right flex items-center gap-4">
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => (
                        <motion.div 
                          key={i}
                          animate={{ height: [2, Math.random() * 10 + 2, 2] }}
                          transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                          className="w-[2px] bg-accent/40"
                        />
                      ))}
                    </div>
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
                <h1 className="text-[14vw] md:text-[10rem] font-bold leading-[0.75] tracking-tighter uppercase mix-blend-difference whitespace-nowrap chromatic-aberration">
                  TEMUULEN B.<span className="animate-blink text-accent ml-2">█</span>
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
                  <p className="hover:text-accent cursor-pointer transition-colors" data-tooltip="GO_TO: WORK">[01] // SELECTED_WORK</p>
                  <p className="hover:text-accent cursor-pointer transition-colors" data-tooltip="GO_TO: ARCHIVE">[02] // ARCHIVE_FILES</p>
                  <p className="hover:text-accent cursor-pointer transition-colors" data-tooltip="GO_TO: SPECS">[03] // SYSTEM_SPECS</p>
                  <p className="hover:text-accent cursor-pointer transition-colors" data-tooltip="GO_TO: CONTACT">[04] // CONTACT_TERM</p>
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
          <div className="p-8 md:p-12 bg-white/5 font-mono text-[9px] tracking-[0.5em] text-white/40 uppercase flex justify-between items-center">
            <span>## FILE_SYSTEM / PROJECTS</span>
            <span className="hidden md:block">TOTAL_SIZE: 17.0MB</span>
          </div>
          <div className="divide-y divide-white/20">
            {projects.map((p) => (
              <motion.div 
                key={p.id}
                onMouseEnter={() => setHoveredProject(p.id)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                className="grid grid-cols-1 md:grid-cols-12 p-8 md:p-12 items-center group cursor-pointer relative overflow-hidden"
                data-tooltip={p.status === "CLASSIFIED" ? "ACCESS_DENIED" : "READ_FILE"}
              >
                <a 
                  href={p.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="absolute inset-0 z-20"
                />
                
                <div className="md:col-span-1 font-mono text-[9px] text-white/20">
                  {p.perms}
                </div>
                
                <div className="md:col-span-6 flex items-center gap-6">
                  <div className="font-mono text-[9px] text-white/20 hidden md:block">{p.id}</div>
                  <h3 className="text-3xl md:text-7xl font-bold tracking-tighter uppercase group-hover:text-accent transition-colors duration-500 flex items-center gap-4">
                    {p.title}
                    {hoveredProject === p.id && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs font-mono text-accent animate-pulse"
                      >
                        _
                      </motion.span>
                    )}
                  </h3>
                </div>

                <div className="md:col-span-2 font-mono text-[9px] text-white/40 tracking-widest mt-4 md:mt-0 flex flex-col gap-1">
                  <span className="text-white/60">{p.role}</span>
                  <span className="text-[8px] opacity-50">{p.size} // {p.date}</span>
                </div>

                <div className="md:col-span-3 text-right flex items-center justify-end gap-4">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    p.status === 'STABLE' ? 'bg-green-500' : 
                    p.status === 'EXPERIMENTAL' ? 'bg-yellow-500' : 'bg-red-600'
                  }`} />
                  <span className="inline-block px-3 py-1 border border-white/20 font-mono text-[7px] uppercase tracking-[0.3em]">
                    {p.status}
                  </span>
                </div>

                {/* Hover Background Detail */}
                <AnimatePresence>
                  {hoveredProject === p.id && (
                    <motion.div 
                      initial={{ x: "100%" }}
                      animate={{ x: "0%" }}
                      exit={{ x: "100%" }}
                      className="absolute right-0 top-0 h-full w-1/3 bg-accent/5 pointer-events-none -z-10 flex items-center justify-center font-mono text-[60px] opacity-10 font-bold italic"
                    >
                      {p.id}
                    </motion.div>
                  )}
                </AnimatePresence>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {techItems.map((tech) => (
                <SkillBar key={tech.name} name={tech.name} level={tech.level} />
              ))}
            </div>
          </div>
          
          <div className="p-12 md:p-32 flex flex-col justify-between min-h-[70vh]">
            <div className="space-y-12 max-w-xl">
              <div className="font-mono text-[10px] text-white/20 tracking-widest uppercase flex items-center gap-4">
                <span className="w-8 h-[1px] bg-white/10" />
                ## INTERNSHIP_OPPORTUNITIES
              </div>
              <div className="space-y-8">
                <p className="text-xl md:text-3xl font-mono uppercase leading-tight text-white/80">
                  Би ШУТИС-ийн компьютерийн ухаан чиглэлээр суралцдаг оюутан бөгөөд программ хангамж Front-end, Back-end чиглэлээр дадлага (internship) хийх газар, боломж хайж байна.
                </p>
                <p className="text-sm md:text-base font-mono uppercase leading-tight text-white/40 italic max-w-lg">
                  // Computer Science student at MUST, seeking internship opportunities in Front-end or Back-end development to apply technical skills in a professional environment.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="px-4 py-2 bg-accent/5 border border-accent/20 text-accent font-mono text-[9px] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent animate-pulse" />
                  [ STATUS: AVAILABLE_FOR_HIRE ]
                </div>
                <div className="px-4 py-2 bg-white/5 border border-white/10 text-white/40 font-mono text-[9px] uppercase tracking-widest">
                  [ LOC: ULAANBAATAR, MN ]
                </div>
              </div>
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
