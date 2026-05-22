'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import {
  HTMLMotionProps,
  motion,
  MotionValue,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  useAnimationFrame
} from 'motion/react';

interface ScrollXCarouselContextValue {
  scrollYProgress: MotionValue<number>;
}

const ScrollXCarouselContext =
  React.createContext<ScrollXCarouselContextValue | null>(null);

function useScrollXCarousel() {
  const context = React.useContext(ScrollXCarouselContext);
  if (!context) {
    throw new Error('useScrollXCarousel must be used within a ScrollXCarousel');
  }
  return context;
}

export function ScrollXCarousel({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: carouselRef,
  });
  return (
    <ScrollXCarouselContext.Provider value={{ scrollYProgress }}>
      <div
        ref={carouselRef}
        className={cn('relative w-screen max-w-full', className)}
        {...props}
      >
        {children}
      </div>
    </ScrollXCarouselContext.Provider>
  );
}

export function ScrollXCarouselContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('sticky overflow-hidden w-full top-0 left-0', className)}
      {...props}
    />
  );
}

export function ScrollXCarouselWrap({
  className,
  style,
  xRange = ['-0%', '-80%'],
  xRagnge,
  ...props
}: HTMLMotionProps<'div'> & { xRange?: unknown[], xRagnge?: unknown[] }) {
  const { scrollYProgress } = useScrollXCarousel();
  const rangeToUse = xRange || xRagnge || ['-0%', '-80%']; // Handle typo from original code if any
  const x = useTransform(scrollYProgress, [0, 1], rangeToUse as string[]);

  return (
    <motion.div
      className={cn('w-fit', className)}
      style={{ x, ...style }}
      {...props}
    />
  );
}

export function ScrollXCarouselProgress({
  className,
  style,
  progressStyle,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { progressStyle?: string }) {
  const { scrollYProgress } = useScrollXCarousel();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div className={cn('max-w-screen overflow-hidden', className)} {...props}>
      <motion.div
        className={cn('origin-left', progressStyle)}
        style={{ scaleX, ...style }}
      />
    </div>
  );
}

export function ContinuousScrollWrap({
  className,
  style,
  baseVelocity = -1,
  children,
}: React.HTMLAttributes<HTMLDivElement> & { baseVelocity?: number }) {
  // Use a ref instead of React state so animation frame updates go directly
  // to the DOM — zero React re-renders during the infinite marquee scroll.
  const innerRef = React.useRef<HTMLDivElement>(null);
  const baseX = React.useRef(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 3], {
    clamp: false
  });

  // Wrap values between min and max
  const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  useAnimationFrame((t, delta) => {
    let moveBy = baseVelocity * (delta / 16);

    const v = velocityFactor.get();
    if (v !== 0) {
      moveBy += v * (baseVelocity > 0 ? 0.005 : -0.005);
    }

    baseX.current += moveBy;
    const xWrapped = wrap(-50, 0, baseX.current);

    // Direct DOM mutation — bypasses React reconciler entirely
    if (innerRef.current) {
      innerRef.current.style.transform = `translateX(${xWrapped}%)`;
    }
  });

  return (
    <div className="overflow-hidden w-full flex">
      <div
        ref={innerRef}
        className="flex w-max space-x-0 mx-0"
        style={{ willChange: 'transform', ...(style as React.CSSProperties) }}
      >
        <div className={cn("flex shrink-0 items-center justify-start", className)}>{children}</div>
        <div className={cn("flex shrink-0 items-center justify-start", className)}>{children}</div>
      </div>
    </div>
  );
}

