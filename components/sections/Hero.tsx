"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto">
      <div className="overflow-hidden mb-8">
        <motion.h1 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[18vw] md:text-[10rem] font-bold tracking-tighter leading-[0.85] uppercase"
        >
          Сайн уу!
        </motion.h1>
      </div>
      
      <div className="max-w-2xl">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-3xl leading-relaxed text-muted"
        >
          Та <span className="text-foreground font-bold underline decoration-border underline-offset-8">Таны Нэр</span> – чөлөөт фулл-стак дизайнер, хөгжүүлэгчийн портфолиод тавтай морил.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 flex items-center gap-4 font-mono text-xs uppercase tracking-widest"
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Шинэ төсөл дээр ажиллахад бэлэн
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
