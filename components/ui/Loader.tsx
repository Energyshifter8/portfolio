"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "INITIALIZING PORTFOLIO_V2.0.4...",
  "LOADING SYSTEM CORE...",
  "MOUNTING GEOMETRY_ENGINE...",
  "ESTABLISHING BRUTAL_GRID...",
  "SUCCESS: TEMUULEN_B READY.",
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < messages.length) {
      const timeout = setTimeout(() => setIndex(index + 1), 400);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(onComplete, 500);
    }
  }, [index, onComplete]);

  return (
    <motion.div 
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] bg-background p-10 font-mono text-[10px] md:text-xs tracking-tighter uppercase leading-none overflow-hidden"
    >
      <div className="flex flex-col h-full justify-between">
        <div className="space-y-1">
          <div className="flex justify-between border-b border-white/10 pb-4 mb-8">
            <span>BIOS VERSION 0.1.2</span>
            <span>(C) 2026 TEMUULEN_LABS</span>
          </div>
          {messages.slice(0, index + 1).map((msg, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-white/20">[{new Date().toLocaleTimeString()}]</span>
              <span className={i === index ? "text-accent" : "text-white"}>{msg}</span>
            </div>
          ))}
          {index < messages.length && (
            <span className="inline-block w-2 h-4 bg-accent animate-blink mt-1" />
          )}
        </div>
        
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <p>CPU: AMD RYZEN 9 5950X 16-CORE</p>
            <p>MEMORY: 65536MB OK</p>
            <p>DRIVE: NVME_SSD_001 MOUNTED</p>
          </div>
          <div className="text-right">
            <p>F1: ENTER SETUP</p>
            <p>ESC: SKIP BOOT</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
