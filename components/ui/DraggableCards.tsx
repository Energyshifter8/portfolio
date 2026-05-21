"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Service } from '@/data/services';

interface DraggableCardsProps {
  services: Service[];
}

const CARD_WIDTH = 340;
const GAP = 24;

const DraggableCards: React.FC<DraggableCardsProps> = ({ services }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);
  const springX = useSpring(x, { damping: 25, stiffness: 180, mass: 0.8 });

  useEffect(() => {
    if (trackRef.current && containerRef.current) {
      const trackWidth = trackRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      setConstraints({ left: -(trackWidth - containerWidth + 48), right: 0 });
    }
  }, [services]);

  const progress = useTransform(x, [constraints.left, 0], [100, 0]);

  return (
    <div className="relative w-full overflow-hidden" ref={containerRef}>
      {/* Progress Indicator */}
      <div className="flex justify-between items-center mb-8 px-1">
        <div className="font-mono text-[10px] text-muted tracking-widest uppercase flex items-center gap-4">
          <span>ШИЛЖИХ_ХЭМЖҮҮР.EXE</span>
          <div className="w-48 h-[2px] bg-border relative overflow-hidden">
            <motion.div 
              style={{ width: progress.get() + "%" }}
              className="absolute h-full bg-foreground left-0 top-0"
            />
          </div>
        </div>
        <div className="font-mono text-[10px] text-muted uppercase tracking-widest">
          {services.length} НЭГЖ
        </div>
      </div>

      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={constraints}
        dragElastic={0.08}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        style={{ x: springX }}
        className="flex gap-6 cursor-grab active:cursor-grabbing py-4"
      >
        {services.map((service, index) => (
          <motion.div
            key={service.code + index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 w-[340px] p-8 border border-border bg-white/[0.01] transition-colors relative group overflow-hidden"
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="font-mono text-xs text-muted mb-1 uppercase tracking-widest">СЕРВИС_{service.code}</div>
                <div className="font-mono text-5xl font-bold tracking-tighter">{service.code}</div>
              </div>
              <div className="font-mono text-[10px] text-muted">{service.dateCode}</div>
            </div>

            <h3 className="text-2xl font-bold tracking-tighter uppercase mb-3">{service.title}</h3>
            <p className="text-sm text-muted mb-8 line-clamp-3 leading-relaxed">
              Орчин үеийн дижитал орчинд зориулсан {service.title.toLowerCase()} шийдэл.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex flex-wrap gap-2">
                {service.upperTags.map(tag => (
                  <span key={tag} className="font-mono text-[9px] uppercase tracking-tighter py-1 px-2 border border-border/50 text-muted group-hover:text-foreground group-hover:border-foreground/30 transition-colors">
                    ▲ {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {service.lowerTags.map(tag => (
                  <span key={tag} className="font-mono text-[9px] uppercase tracking-tighter py-1 px-2 border border-border/50 text-muted group-hover:text-foreground group-hover:border-foreground/30 transition-colors">
                    ▼ {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-border flex items-center justify-between font-mono text-[10px] text-muted tracking-widest uppercase">
              <div className="flex items-center gap-2">
                {service.processFrom} <span className="text-foreground">→</span> {service.processTo}
              </div>
              <div className="w-4 h-4 rounded-full border border-border group-hover:bg-foreground transition-all duration-300" />
            </div>

            {/* Hover Sweep Line */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-foreground w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DraggableCards;
