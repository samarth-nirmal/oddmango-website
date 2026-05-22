'use client';

import React, {
  useRef,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
  scrollContainer?: React.RefObject<HTMLElement | null>;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
  scrollContainer,
}: ScrollExpandMediaProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainer,
    offset: ["start start", "end end"]
  });


  // Use scrollYProgress directly — Lenis already provides smooth scrolling,
  // so a useSpring wrapper would double-smooth and cause sluggish response.

  // Calculate dimensions based on progress
  // Base: 300px width, 400px height
  // Expanded: Match the background image insets
  const width = useTransform(
    scrollYProgress,
    [0, 0.8],
    [300, isMobile ? window.innerWidth - 32 : window.innerWidth - 80]
  );
  const height = useTransform(
    scrollYProgress,
    [0, 0.8],
    [400, isMobile ? window.innerHeight - (60 + 32) : window.innerHeight - (70 + 80)]
  );
  const borderRadius = useTransform(scrollYProgress, [0.6, 0.9], [24, isMobile ? 24 : 48]);
  
  // Text translations
  const textXLeft = useTransform(scrollYProgress, [0, 0.6], [0, isMobile ? -100 : -150]);
  const textXRight = useTransform(scrollYProgress, [0, 0.6], [0, isMobile ? 100 : 150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 0.5, 0]);

  // Background image opacity fades out as we expand
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div ref={sectionRef} className="relative h-[250vh] bg-cloud overflow-visible">
      <div className="sticky top-[60px] md:top-[70px] h-[calc(100vh-60px)] md:h-[calc(100vh-70px)] w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Ambient Background Image */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-4 top-4 md:inset-10 md:top-6 z-0 rounded-3xl md:rounded-[3rem] overflow-hidden"
        >
          <img
            src={bgImageSrc}
            alt="Background"
            className="w-full h-full object-cover grayscale opacity-40"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-midnight/60" />
        </motion.div>

        {/* Media Container */}
        <motion.div
          style={{
            width,
            height,
            borderRadius,
            maxWidth: '100vw',
            maxHeight: '100vh',
            willChange: 'width, height, border-radius',
          }}
          className="relative z-10 overflow-hidden flex items-center justify-center bg-graphite"
        >
          {mediaType === 'video' ? (
            <video
              src={mediaSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={mediaSrc}
              alt={title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          )}

          {/* Optional Overlay on Video */}
          <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0, 0.8], [0.4, 0]) }}
            className="absolute inset-0 bg-midnight pointer-events-none"
          />
          
          {/* Internal Title Content inside media */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             {/* We can put things here that scale with the video */}
          </div>
        </motion.div>

        {/* Dynamic Titles */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
        >
          <motion.div
            style={{ x: textXLeft, opacity: textOpacity }}
            className="font-black text-white text-4xl md:text-6xl uppercase tracking-tighter text-center filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            {firstWord}
          </motion.div>
          <motion.div
            style={{ x: textXRight, opacity: textOpacity }}
            className="font-black text-white text-3xl md:text-5xl uppercase tracking-tighter text-center filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mt-1"
          >
            {restOfTitle}
          </motion.div>
        </div>

        {/* Date / Scroll Indicator */}
        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-white/70 font-normal uppercase tracking-[0.2em] text-[10px] md:text-xs z-20"
        >
          <span>{date}</span>
          <div className="w-[1px] h-10 bg-white/30" />
          <span>{scrollToExpand}</span>
        </motion.div>

        {/* Render children as content that fades in AFTER expansion */}
        {children && (
          <motion.div
            style={{ 
              opacity: useTransform(scrollYProgress, [0.8, 1], [0, 1]),
              y: useTransform(scrollYProgress, [0.8, 1], [50, 0])
            }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-cloud text-midnight"
          >
            <div className="w-full max-w-4xl px-8">
              {children}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ScrollExpandMedia;

