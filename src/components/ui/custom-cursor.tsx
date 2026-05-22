import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMango, setIsMango] = useState(false);
  // Start hidden — reveal only on non-touch devices after mount
  const [visible, setVisible] = useState(false);

  const springConfig = { damping: 30, stiffness: 120, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // pointer:coarse == touch screen (phone/tablet) — no custom cursor needed
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    setVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX + 30);
      mouseY.set(e.clientY + 30);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const mangoEl = target.closest('[data-cursor-mango="true"]');
      const enlargeEl = target.closest('[data-cursor-enlarge="true"]');

      if (mangoEl) {
        setIsMango(true);
        setIsHovered(true);
      } else if (enlargeEl) {
        setIsHovered(true);
        setIsMango(false);
      } else {
        setIsHovered(false);
        setIsMango(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
      animate={{
        scale: isMango ? 16 : isHovered ? 12 : 1,
        backgroundColor: isMango ? "#FFFF00" : "#F4A460",
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference`}
    />
  );
};
