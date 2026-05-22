import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { X, RotateCw, Sparkles, HelpCircle } from 'lucide-react';
import { asset } from '../lib/utils';

interface InteractiveCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InteractiveCard({ isOpen, onClose }: InteractiveCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate trackers mapped from 0 to 1
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth springs for rotation angles - Tilt level (max 22 degrees for visible 3D parallax)
  const tiltX = useSpring(useTransform(mouseY, [0, 1], [22, -22]), { stiffness: 150, damping: 22 });
  const tiltY = useSpring(useTransform(mouseX, [0, 1], [-22, 22]), { stiffness: 150, damping: 22 });

  // Flare Position Maps (linear percentage coordinates)
  const glareX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), { stiffness: 150, damping: 22 });
  const glareY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), { stiffness: 150, damping: 22 });

  // Floating Backlight Shadow Position (displaces behind the card in opposite direction for depth)
  const glowX = useSpring(useTransform(mouseX, [0, 1], [-30, 30]), { stiffness: 150, damping: 22 });
  const glowY = useSpring(useTransform(mouseY, [0, 1], [-30, 30]), { stiffness: 150, damping: 22 });

  // Extracted useTransform calls to comply with Rules of Hooks
  const frontGlareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]: any) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, 0.35) 0%, rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.15) 100%)`
  );

  const frontShimmerBackground = useTransform(
    glareX,
    (gx: any) => `linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.05) ${gx - 20}%, rgba(255, 176, 0, 0.1) ${gx - 10}%, rgba(107, 175, 58, 0.1) ${gx}%, rgba(242, 106, 27, 0.1) ${gx + 10}%, rgba(255, 255, 255, 0.05) ${gx + 20}%, transparent 100%)`
  );

  const backGlareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]: any) => `radial-gradient(circle at ${100 - gx}% ${gy}%, rgba(255, 255, 255, 0.35) 0%, rgba(255,255,255,0.02) 45%, rgba(0,0,0,0.15) 100%)`
  );

  const backShimmerBackground = useTransform(
    glareX,
    (gx: any) => `linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.05) ${80 - gx}%, rgba(255, 176, 0, 0.1) ${90 - gx}%, rgba(107, 175, 58, 0.1) ${100 - gx}%, rgba(242, 106, 27, 0.1) ${110 - gx}%, rgba(255, 255, 255, 0.05) ${120 - gx}%, transparent 100%)`
  );

  // Reset coordinates on close or layout change
  useEffect(() => {
    if (!isOpen) {
      setIsFlipped(false);
      mouseX.set(0.5);
      mouseY.set(0.5);
    }
  }, [isOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Confine to 0-1 range safely
    mouseX.set(Math.max(0, Math.min(1, x)));
    mouseY.set(Math.max(0, Math.min(1, y)));
  };

  const handleMouseLeave = () => {
    // Return smoothly to center position
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(prev => !prev);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl select-none"
        >
          {/* Ambient Particles - single static blob to avoid expensive animate-pulse at 100px blur */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-mango/15 blur-[50px]" />
          </div>

          {/* Close Button Header */}
          <div className="absolute top-6 right-6 z-50">
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white shadow-lg transition-colors cursor-pointer"
              aria-label="Close interactive modal"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          </div>

          {/* Main Physics Frame */}
          <div 
            className="w-full max-w-[90vw] md:max-w-[50vw] aspect-[1.586/1] md:aspect-[1.586/1] relative flex items-center justify-center"
            style={{ perspective: 2000 }}
          >
            {/* Holographic Glowing Base Layer (Displaced under-glow mock shadow) */}
            <motion.div
              style={{
                x: glowX,
                y: glowY,
                rotateX: tiltX,
                rotateY: tiltY,
              }}
              className="absolute inset-0 rounded-2xl md:rounded-[1.5rem] opacity-30 blur-[20px] pointer-events-none transition-opacity duration-300 z-0 bg-gradient-to-tr from-saffron via-mango-ripe to-leaf"
            />

            {/* Interactive Physical Card Container */}
            <motion.div
              ref={cardContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleCardClick}
              initial={{ y: "-120vh", opacity: 0, rotateZ: -15, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, rotateZ: 0, scale: 1 }}
              exit={{ y: "120vh", opacity: 0, rotateZ: 15, scale: 0.8 }}
              transition={{ 
                type: "spring", 
                stiffness: 85, 
                damping: 14,
                opacity: { duration: 0.3 }
              }}
              style={{
                rotateX: tiltX,
                rotateY: tiltY,
                transformStyle: "preserve-3d"
              }}
              className="w-full h-full cursor-pointer relative z-40 select-none group"
            >
              {/* Card Flips on this inner layout container */}
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full h-full relative"
              >
                
                {/* ==================== CARD FRONT SIDE ==================== */}
                <div 
                  className="absolute inset-0 rounded-2xl md:rounded-[1.4rem] overflow-hidden border-2 border-white/20 shadow-2xl flex flex-col justify-between"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Real Texture Layer */}
                  <img
                    src={asset("/cardside1.png")}
                    alt="Odd Mango card front side"
                    className="w-full h-full object-cover select-none pointer-events-none absolute inset-0 z-0 bg-graphite"
                  />

                  {/* Polished Shiny Gloss Glare Overlay */}
                  <motion.div
                    style={{ background: frontGlareBackground }}
                    className="absolute inset-0 z-10 pointer-events-none"
                  />

                  {/* Glass finishing gloss line (ambient reflex reflection overlay) */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 z-20 mix-blend-overlay opacity-90 pointer-events-none" />

                  {/* Shimmer Stream (Rainbow holographic gloss when we tilt/hover) */}
                  <motion.div
                    style={{ background: frontShimmerBackground }}
                    className="absolute inset-0 z-15 mix-blend-color-dodge opacity-80 pointer-events-none"
                  />

                  {/* Embedded 3D Border highlighting */}
                  <div className="absolute inset-0 border border-white/30 rounded-2xl md:rounded-[1.4rem] pointer-events-none z-30" />
                </div>


                {/* ==================== CARD BACK SIDE ==================== */}
                <div 
                  className="absolute inset-0 rounded-2xl md:rounded-[1.4rem] overflow-hidden border-2 border-white/20 shadow-2xl flex flex-col justify-between"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Real Texture Layer */}
                  <img
                    src={asset("/cardside2.png")}
                    alt="Odd Mango card back side"
                    className="w-full h-full object-cover select-none pointer-events-none absolute inset-0 z-0 bg-graphite"
                  />

                  {/* Polished Shiny Gloss Glare Overlay */}
                  <motion.div
                    style={{ background: backGlareBackground }}
                    className="absolute inset-0 z-10 pointer-events-none"
                  />

                  {/* Glass finishing gloss line */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 z-20 mix-blend-overlay opacity-90 pointer-events-none" />

                  {/* Shimmer Stream */}
                  <motion.div
                    style={{ background: backShimmerBackground }}
                    className="absolute inset-0 z-15 mix-blend-color-dodge opacity-80 pointer-events-none"
                  />

                  {/* Embedded 3D Border highlighting */}
                  <div className="absolute inset-0 border border-white/30 rounded-2xl md:rounded-[1.4rem] pointer-events-none z-30" />
                </div>

              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
