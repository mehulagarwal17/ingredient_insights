'use client';

import { useEffect, useRef } from 'react';

export function AnimatedDotsBackground({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const frameId = useRef<number | undefined>(undefined);
  const targetX = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate mouse position relative to container (from -1 to 1)
      mouseX.current = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY.current = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    // Smooth animation loop
    const animate = () => {
      // Easing for smooth movement (lower = smoother, slower movement)
      const easing = 0.05;
      
      // Update target positions with easing
      targetX.current += (mouseX.current * 20 - targetX.current) * easing;
      targetY.current += (mouseY.current * 20 - targetY.current) * easing;

      // Apply the transformation to the dots container
      if (dotsRef.current) {
        dotsRef.current.style.transform = `translate3d(${targetX.current}px, ${targetY.current}px, 0)`;
      }

      frameId.current = requestAnimationFrame(animate);
    };

    frameId.current = requestAnimationFrame(animate);

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden z-0"
    >
      <div 
        ref={dotsRef}
        className="absolute inset-0 dots-pattern"
        style={{
          transition: 'transform 0.1s ease-out',
          willChange: 'transform',
        }}
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
