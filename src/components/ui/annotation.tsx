import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface AnnotationProps {
  text: string;
  className?: string;
  arrowClassName?: string;
  boxClassName?: string;
  delay?: number;
}

export const Annotation = ({ 
  text, 
  className, 
  arrowClassName, 
  boxClassName,
  delay = 0 
}: AnnotationProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn("absolute flex flex-col items-center pointer-events-none z-20", className)}
    >
      <div className={cn("bg-white text-midnight px-4 py-2 font-normal text-xs md:text-sm shadow-xl rounded-sm whitespace-nowrap mb-2", boxClassName)}>
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      
      <motion.svg 
        width="60" 
        height="40" 
        viewBox="0 0 60 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={cn("text-white", arrowClassName)}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <path 
          d="M5 5C5 5 15 35 55 35M55 35L45 30M55 35L50 25" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </motion.svg>
    </motion.div>
  );
};
