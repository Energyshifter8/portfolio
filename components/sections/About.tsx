"use client";

import React from 'react';
import Marquee from '../ui/Marquee';

const About = () => {
  const awards = [
    "FWA FOTD x2",
    "Awwwards HM x4",
    "CSS Design Awards SOTD",
    "GSAP SOTD x4",
    "Behance Featured",
    "SiteInspire",
    "Commarts",
    "Product Hunt #1"
  ];

  const clients = [
    "Universal Music",
    "The New York Times",
    "Adidas",
    "Stripe",
    "Framestore",
    "R/GA",
    "Locomotive",
    "Active Theory"
  ];

  return (
    <section id="about" className="py-24 border-t border-border mt-24">
      <div className="px-6 max-w-7xl mx-auto mb-32">
        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-muted mb-16">## ABOUT</h2>
        
        <div className="grid md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-7 space-y-12">
            <div className="space-y-6 text-2xl md:text-3xl leading-tight">
              <p>
                I thrive at the intersection of design and technology, crafting bespoke digital experiences that challenge the status quo.
              </p>
              <p>
                With a focus on editorial aesthetics and terminal-inspired precision, I help brands and agencies translate complex ideas into intuitive visual systems.
              </p>
            </div>
            
            <div className="pt-12 border-t border-border">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted mb-8">NOTABLE_ROSTER.TXT</h4>
              <ul className="grid grid-cols-2 gap-4">
                {clients.map(client => (
                  <li key={client} className="font-mono text-xs uppercase tracking-widest flex items-center gap-3">
                    <span className="w-1 h-1 bg-muted rounded-full" />
                    {client}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="md:col-span-5">
            <div className="bg-white/[0.02] border border-border p-12 aspect-square flex flex-col justify-between">
              <div className="flex justify-between font-mono text-[10px] text-muted uppercase tracking-widest">
                <span>LOCAL_MATCH_SCORE</span>
                <span>2024.05.20</span>
              </div>
              
              <div className="flex items-baseline justify-center gap-12">
                <div className="text-center">
                  <div className="font-mono text-xs text-muted mb-2">HOME</div>
                  <div className="text-8xl font-black font-mono leading-none">0</div>
                </div>
                <div className="text-4xl text-muted font-mono">—</div>
                <div className="text-center">
                  <div className="font-mono text-xs text-muted mb-2">AWAY</div>
                  <div className="text-8xl font-black font-mono leading-none">0</div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="px-4 py-2 border border-border font-mono text-[10px] uppercase tracking-[0.3em]">
                  MATCH IN PROGRESS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-y border-border py-12 bg-white/[0.01]">
        <Marquee items={awards} />
      </div>
    </section>
  );
};

export default About;
