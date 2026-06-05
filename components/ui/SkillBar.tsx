"use client";

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SkillBarProps {
  name: string;
  level: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level }) => {
  const [displayLevel, setDisplayLevel] = useState(0);
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        width: `${level}%`,
        transition: { duration: 1.5, ease: "easeOut" }
      });

      let start = 0;
      const interval = setInterval(() => {
        if (start < level) {
          start += 1;
          setDisplayLevel(start);
        } else {
          clearInterval(interval);
        }
      }, 1500 / level);

      return () => clearInterval(interval);
    }
  }, [inView, controls, level]);

  const barCount = 20;
  const filledBars = Math.floor((displayLevel / 100) * barCount);
  const emptyBars = barCount - filledBars;

  return (
    <div ref={ref} className="space-y-2 font-mono text-[10px] tracking-widest text-white/60">
      <div className="flex justify-between items-center mb-1">
        <span>{name}</span>
        <span>{displayLevel}% PROFICIENCY</span>
      </div>
      <div className="flex gap-1 text-accent overflow-hidden whitespace-nowrap">
        {"█".repeat(filledBars)}
        <span className="opacity-20">{"░".repeat(emptyBars)}</span>
      </div>
    </div>
  );
};

export default SkillBar;
