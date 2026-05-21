"use client";

import React, { useEffect, useRef } from 'react';

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  color: string;
  velocityX: number;
  velocityY: number;
}

class Particle implements ParticleProps {
  x: number;
  y: number;
  size: number;
  color: string;
  velocityX: number;
  velocityY: number;

  constructor(x: number, y: number, hue: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 10 + 1; // Random size between 1 and 11
    this.color = `hsl(${hue}, 100%, 50%)`;
    this.velocityX = (Math.random() - 0.5) * 2; // Random spread
    this.velocityY = (Math.random() - 0.5) * 2;
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    if (this.size > 0.1) this.size -= 0.1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const CursorTrailEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesArray = useRef<Particle[]>([]);
  const hue = useRef<number>(0);
  const requestRef = useRef<number>(0);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const handleMouseMove = (e: MouseEvent) => {
    // Spawn 2 particles per move
    for (let i = 0; i < 2; i++) {
      particlesArray.current.push(new Particle(e.clientX, e.clientY, hue.current));
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update hue for rainbow effect
    hue.current = (hue.current + 2) % 360;

    for (let i = 0; i < particlesArray.current.length; i++) {
      const p = particlesArray.current[i];
      p.update();
      p.draw(ctx);

      // Remove small particles
      if (p.size < 0.3) {
        particlesArray.current.splice(i, 1);
        i--;
      }
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', initCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};

export default CursorTrailEffect;
