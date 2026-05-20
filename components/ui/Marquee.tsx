"use client";

import React from 'react';
import FastMarquee from 'react-fast-marquee';

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ items, speed = 40, className = "" }) => {
  return (
    <div className={`py-8 border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black overflow-hidden ${className}`}>
      <FastMarquee speed={speed} gradient={false}>
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center mx-8 text-2xl font-bold uppercase tracking-tighter text-zinc-300 dark:text-zinc-700"
          >
            <span className="mr-8">•</span>
            {item}
          </div>
        ))}
      </FastMarquee>
    </div>
  );
};

export default Marquee;
