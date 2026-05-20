"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface CursorTrailEffectProps {
  particleCount?: number;
  baseSize?: number;
  color?: string;
  stiffness?: number;
  damping?: number;
}

/**
 * CursorTrailEffect
 * A high-performance mouse trail component using Framer Motion springs.
 */
const CursorTrailEffect: React.FC<CursorTrailEffectProps> = ({
  particleCount = 12,
  baseSize = 8,
  color = "#f0ede6", // Matching the project's --fg color
  stiffness = 250,
  damping = 20,
}) => {
  const [mounted, setMounted] = useState(false);

  // Main cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {Array.from({ length: particleCount }).map((_, i) => (
        <CursorParticle 
          key={i} 
          index={i} 
          mouseX={mouseX} 
          mouseY={mouseY} 
          total={particleCount}
          baseSize={baseSize}
          color={color}
          stiffness={stiffness}
          damping={damping}
        />
      ))}
    </div>
  );
};

interface ParticleProps {
  index: number;
  mouseX: any;
  mouseY: any;
  total: number;
  baseSize: number;
  color: string;
  stiffness: number;
  damping: number;
}

const CursorParticle: React.FC<ParticleProps> = ({ 
  index, 
  mouseX, 
  mouseY, 
  total,
  baseSize,
  color,
  stiffness,
  damping 
}) => {
  // Calculate delay factor - particles further back have lower stiffness/damping for "drag"
  const delayFactor = (index + 1) * 0.05;
  
  // Create staggered spring motion
  const x = useSpring(mouseX, {
    stiffness: stiffness - (index * 15),
    damping: damping + (index * 2),
    restDelta: 0.001
  });
  
  const y = useSpring(mouseY, {
    stiffness: stiffness - (index * 15),
    damping: damping + (index * 2),
    restDelta: 0.001
  });

  // Size decreases as it gets further back in the trail
  const size = baseSize * (1 - (index / total) * 0.5);
  // Opacity fades out
  const opacity = 1 - (index / total);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        translateX: '-50%',
        translateY: '-50%',
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%',
        opacity: opacity,
        pointerEvents: 'none',
        zIndex: 9999 - index,
      }}
    />
  );
};

export default CursorTrailEffect;
