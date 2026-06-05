"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 300 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor="hover"]');
      
      if (interactive) {
        setIsHovering(true);
        const text = (interactive as HTMLElement).dataset.tooltip || "ACCESS_LINK";
        setTooltipText(text);
      } else {
        setIsHovering(false);
        setTooltipText("");
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Horizontal Line */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-[1px] bg-accent pointer-events-none z-[9999] opacity-50"
        style={{
          x: x,
          y: y,
          translateX: '-50%',
          translateY: '-50%',
          scaleX: isHovering ? 1.5 : 1,
        }}
      />
      {/* Vertical Line */}
      <motion.div
        className="fixed top-0 left-0 w-[1px] h-12 bg-accent pointer-events-none z-[9999] opacity-50"
        style={{
          x: x,
          y: y,
          translateX: '-50%',
          translateY: '-50%',
          scaleY: isHovering ? 1.5 : 1,
        }}
      />
      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-white pointer-events-none z-[9999]"
        style={{
          x: x,
          y: y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Terminal Tooltip */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] font-mono text-[8px] bg-accent text-black px-2 py-1 uppercase tracking-widest whitespace-nowrap"
        style={{
          x: x,
          y: y,
          translateX: '20px',
          translateY: '20px',
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0.8,
        }}
      >
        {`> ${tooltipText}`}
      </motion.div>
    </>
  );
};

export default CustomCursor;
