"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const logs = [
    "BIOS Version 2.4.0 (Build 2026-06-05)",
    "CPU: AMD Ryzen 9 5950X 16-Core Processor @ 3.40GHz",
    "Memory Test: 65536MB OK",
    "Checking NVMe... [OK]",
    "Initializing Portfolio System...",
    "Mounting /home/temuulen...",
    "Loading System Assets...",
    "Establishing Secure Connection...",
    "Protocol: TLS_1.3 Initialized",
    "Decrypting User Interface...",
    "SYSTEM READY. INITIALIZING BOOT_SEQUENCE..."
  ];

  useEffect(() => {
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setBootLogs(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 150);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + Math.random() * 5;
        }
        clearInterval(progressInterval);
        return 100;
      });
    }, 100);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100 && bootLogs.length >= logs.length) {
      setTimeout(() => {
        setIsDone(true);
        setTimeout(onComplete, 800); // Allow time for the flicker transition
      }, 500);
    }
  }, [progress, bootLogs, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            filter: "brightness(2) contrast(1.5) blur(10px)",
            scaleY: 0.01,
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[11000] bg-[#0a0a0a] flex flex-col p-8 font-mono text-sm md:text-base text-accent"
        >
          <div className="flex-1 overflow-hidden">
            <div className="flex flex-col gap-1">
              {bootLogs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <span className="text-white/30 mr-2">[{new Date().toLocaleTimeString()}]</span>
                  {log}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between mb-2">
              <span>SYSTEM_INITIALIZATION</span>
              <span>{Math.floor(progress)}%</span>
            </div>
            <div className="w-full h-4 border border-accent/30 p-0.5">
              <motion.div 
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 crt-overlay" />
        </motion.div>
      )}
      
      {isDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[11001] bg-white pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
