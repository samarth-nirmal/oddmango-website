import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const IMAGES = [
  "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
  "https://images.unsplash.com/photo-1505909182942-e2f09aee3e89?w=400&q=80",
  "https://images.unsplash.com/photo-1523821741446-edb9b4415985?w=400&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80",
  "https://images.unsplash.com/photo-1529605218764-1ddbe3b25dd3?w=400&q=80",
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&q=80"
];

export function HoverImageReveal({ children, className }: { children: React.ReactNode, className?: string }) {
  const [hovered, setHovered] = useState(false);
  const [images, setImages] = useState<{ id: number, src: string, x: number, y: number, rot: number }[]>([]);
  const imageIdRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (hovered) {
      intervalRef.current = setInterval(() => {
        const id = imageIdRef.current++;
        const src = IMAGES[Math.floor(Math.random() * IMAGES.length)];
        
        // Random offsets spread over an area
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const rot = (Math.random() - 0.5) * 30;

        setImages(curr => [...curr, { id, src, x, y, rot }]);

        // Remove after 1.5 seconds
        setTimeout(() => {
          setImages(curr => curr.filter(img => img.id !== id));
        }, 1500);

      }, 250); // pop every 250ms
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hovered]);

  return (
    <span 
      className={`relative inline-block cursor-crosshair z-50 ${className || ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      style={{ touchAction: 'none' }}
    >
      {children}
      <AnimatePresence>
        {images.map(img => (
          <motion.img
            key={img.id}
            src={img.src}
            alt=""
            className="absolute top-1/2 left-1/2 w-32 h-44 sm:w-44 sm:h-60 object-cover pointer-events-none z-10 grayscale hover:grayscale-0 transition-opacity rounded-md shadow-lg"
            initial={{ opacity: 0, scale: 0.2, x: '-50%', y: '-50%', rotate: img.rot - 20 }}
            animate={{ 
              opacity: 0.85, 
              scale: 1, 
              x: `calc(-50% + ${img.x}px)`, 
              y: `calc(-50% + ${img.y}px)`, 
              rotate: img.rot 
            }}
            exit={{ opacity: 0, scale: 0.8, y: `calc(-50% + ${img.y + 50}px)` }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
          />
        ))}
      </AnimatePresence>
    </span>
  );
}
