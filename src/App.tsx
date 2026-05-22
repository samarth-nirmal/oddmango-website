/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowUpRight, Menu as MenuIcon, X, ArrowUp, Headphones, Play } from 'lucide-react';
import { motion, AnimatePresence, useInView as motionUseInView, useScroll, useTransform } from 'motion/react';
import React, { useRef, useEffect, useState } from 'react';
import Lenis from 'lenis';

import { HoverImageReveal } from './components/ui/hover-image-reveal';
import { ZoomParallax } from './components/ui/zoom-parallax';
import ScrollExpandMedia from './components/ui/scroll-expansion-hero';
import { ScrollXCarousel, ScrollXCarouselContainer, ScrollXCarouselWrap } from "./components/ui/scroll-x-carousel";
import { CardHoverReveal, CardHoverRevealContent, CardHoverRevealMain } from './components/ui/reveal-on-hover'
import { Badge } from './components/ui/badge'
import { DynamicIslandTOC } from './components/ui/dynamic-island-toc';
import { Annotation } from './components/ui/annotation';
import { CustomCursor } from './components/ui/custom-cursor';
import { cn, asset } from './lib/utils';
import { InteractiveCard } from './components/InteractiveCard';
import { ImageShowcase } from './components/ui/image-showcase';
import { LegalModal } from './components/LegalModal';

const SLIDES = [
  {
    id: 'slide-1',
    title: 'Neon Pulse',
    client: 'Velocity Labs',
    description: 'A futuristic exploration of high-speed light dynamics and kinetic typographic motion.',
    services: ['motion', 'vfx', '3d'],
    type: 'Cinematic',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    videoUrl: '/showcase/Shoecasev1.mp4',
  },
  {
    id: 'slide-2',
    title: 'Liquid Dream',
    client: 'Aura Cosmetics',
    description: 'Bespoke procedural liquid simulations capturing organic textures and premium cosmetic flows.',
    services: ['simulation', 'direction', 'art'],
    type: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop',
    videoUrl: '/showcase/Shoecasev2.mp4',
  },
  {
    client: 'SynthWave Audio',
    category: 'App / UI',
    year: '2024',
    videoUrl: asset('/showcase/Shoecasev2.mp4'),
    color: '#F26A1B',
  },
  {
    id: 3,
    title: 'Serene Space',
    client: 'Mindful Retreats',
    category: 'Web / Brand',
    year: '2025',
    videoUrl: asset('/showcase/Shoecasev3.mp4'),
    color: '#6BAF3A',
  },
  {
    id: 4,
    title: 'Velocity OS',
    client: 'SpeedTech',
    category: 'System / UI',
    year: '2024',
    videoUrl: asset('/showcase/Shoecasev4.mp4'),
    color: '#FF8A00',
  },
  {
    id: 5,
    title: 'Quantum Learn',
    client: 'EduFuture',
    category: 'Platform / UX',
    year: '2025',
    videoUrl: asset('/showcase/Showcasev5.mp4'),
    color: '#1C1C21',
  },
];

const Letter = ({ children, index, className }: { children: React.ReactNode, index: number, className?: string }) => (
  <motion.span
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 + 5.0 }}
    className={`inline-block ${className || ""}`}
  >
    {children}
  </motion.span>
);

const SERVICES = [
  {
    title: "ART DIRECTION",
    images: [
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=400"
    ]
  },
  {
    title: "BRANDING",
    images: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1572044162444-ad60f128bde3?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1493421419110-74f4e85ba124?auto=format&fit=crop&q=80&w=400"
    ]
  },
  {
    title: "WEBFLOW",
    images: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&q=80&w=400"
    ]
  },
  {
    title: "UI/UX DESIGN",
    images: [
      "https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=400"
    ]
  },
  {
    title: "GSAP ANIMATIONS",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1454165833059-4469f602371b?auto=format&fit=crop&q=80&w=400"
    ]
  },
  {
    title: "ADVERTISING",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400"
    ]
  },
  {
    title: "SEO & CONTENT",
    images: [
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=400"
    ]
  },
];

function SectionTitle({ 
  title, 
  lineColor = "bg-midnight", 
  textColor = "text-midnight" 
}: { 
  title: string, 
  lineColor?: string, 
  textColor?: string 
}) {
  const sectionRef = React.useRef(null);
  const isInView = motionUseInView(sectionRef, { once: true, amount: 0.1 });
  const [isHovered, setIsHovered] = useState(false);
  
  const words = title.split(" ");

  return (
    <div ref={sectionRef} className="w-full relative flex flex-col items-center">
      <div 
        className="w-full flex justify-center overflow-hidden pt-12 md:pt-12 pb-2 md:pb-4 cursor-default"
        onMouseEnter={() => {
          if (typeof window !== "undefined" && window.innerWidth >= 768) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 className={cn("font-black text-[13vw] sm:text-[11vw] md:text-[8.5vw] leading-[0.95] md:leading-[0.85] tracking-[-0.04em] md:tracking-[-0.02em] origin-bottom scale-y-[1.4] scale-x-[0.95] flex flex-wrap justify-center md:flex-row items-center gap-x-[3vw] gap-y-1 md:gap-0 text-center px-2 [text-shadow:0_1px_1px_currentColor] md:[text-shadow:none]", textColor)}>
          {words.map((word, wordIndex) => {
            const letterDelayOffset = wordIndex * Math.max(...words.map(w => w.length));
            return (
              <React.Fragment key={wordIndex}>
                <div className="flex">
                  {word.split("").map((char, index) => {
                    const delay = (letterDelayOffset + index) * 0.03;
                    return (
                      <div key={`${word}-${index}`} className="relative inline-block overflow-hidden">
                        <motion.span
                          initial={{ y: "120%" }}
                          animate={{ y: isHovered ? "-110%" : isInView ? "0%" : "120%" }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay }}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                        <motion.span
                          initial={{ y: "120%" }}
                          animate={{ y: isHovered ? "0%" : "110%" }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay }}
                          className="absolute left-0 top-0 inline-block"
                          aria-hidden="true"
                        >
                          {char}
                        </motion.span>
                      </div>
                    );
                  })}
                </div>
                {wordIndex < words.length - 1 && <span className="hidden md:inline">&nbsp;</span>}
              </React.Fragment>
            );
          })}
        </h2>
      </div>

      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
        className={cn("h-[1.5px] w-full max-w-[1700px] mt-2", lineColor)}
      />
    </div>
  );
}

function FeaturedWorksSection({ containerRef, onPopupChange }: { containerRef: React.RefObject<HTMLDivElement | null>; onPopupChange?: (isOpen: boolean) => void }) {
  const sectionRef = React.useRef(null);
  const isInView = motionUseInView(sectionRef, { once: true, amount: 0.1 });
  const [selectedProject, setSelectedProject] = useState<null | typeof SLIDES[0]>(null);

  return (
    <div id="featured-works" data-toc data-toc-title="Portfolio" ref={sectionRef} className="relative w-full pt-28 md:pt-36 pb-4 md:pb-8 px-6 md:px-12 bg-cloud text-midnight flex flex-col min-h-[50vh] justify-start">
      <div className="w-full max-w-[1800px] mx-auto flex flex-col">
        
        <SectionTitle title="FEATURED WORKS" />

        {/* Bottom Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-row justify-between items-center pt-4 md:pt-6 gap-2"
        >
          <div className="font-normal text-[9px] sm:text-[10px] md:text-sm tracking-[0.1em] uppercase text-midnight/60 whitespace-nowrap shrink-0">
            Selected Work
          </div>
          <div className="hidden md:flex gap-1.5 md:gap-2 flex-nowrap items-center justify-end min-w-0 overflow-x-auto hide-scrollbar pb-1 md:pb-0 -mb-1 md:-mb-0 pl-2 mask-linear-fade">
            {['Conceptual', 'Expressive', 'Immersive'].map(tag => (
              <div key={tag} className="shrink-0 bg-midnight text-cloud px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[8px] sm:text-[9px] md:text-[11px] font-normal tracking-[0.05em] uppercase whitespace-nowrap">
                {tag}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Horizontal Carousel */}
        <div className="w-screen relative -mx-6 md:-mx-12">
          <ScrollXCarousel className="h-[250vh]">
            <ScrollXCarouselContainer className="h-screen flex flex-col justify-center items-start">
              <ScrollXCarouselWrap 
                xRange={['calc(0% + 0vw)', 'calc(-100% + 100vw)']} 
                className="flex gap-8 md:gap-16 px-[22.5vw] md:px-[36vw] lg:px-[39vw]"
              >
                {SLIDES.map((slide) => (
                  <CardHoverReveal
                    key={slide.id}
                    onClick={() => { setSelectedProject(slide); onPopupChange?.(true); }}
                    className="min-w-[55vw] md:min-w-[28vw] lg:min-w-[22vw] aspect-[9/16] border border-midnight/5 cursor-pointer rounded-none group"
                  >
                    <CardHoverRevealMain className="rounded-none">
                      <div className="relative size-full overflow-hidden">
                        <video
                          src={`${slide.videoUrl}#t=0.5`}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                          preload="metadata"
                          loop
                          muted
                          playsInline
                        />
                        <div className="absolute inset-0 bg-mango/0 group-hover:bg-mango/10 transition-colors duration-300" />
                      </div>
                    </CardHoverRevealMain>
                    <CardHoverRevealContent className="rounded-none bg-mango/95 backdrop-blur-xs p-6 m-0 inset-0 flex flex-col justify-center items-center translate-x-0 translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-midnight">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-midnight flex items-center justify-center shadow-lg transform transition-all duration-300 scale-90 group-hover:scale-100 group-hover:rotate-6">
                        <Play className="text-mango w-5 h-5 md:w-6 md:h-6 fill-current ml-0.5" />
                      </div>
                      <div className="mt-4 flex flex-col items-center">
                        <span className="text-xs md:text-sm font-black tracking-[0.2em] uppercase text-midnight text-center">
                          {slide.client}
                        </span>
                      </div>
                    </CardHoverRevealContent>
                  </CardHoverReveal>
                ))}
              </ScrollXCarouselWrap>
            </ScrollXCarouselContainer>
          </ScrollXCarousel>
        </div>

      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl"
            onClick={() => { setSelectedProject(null); onPopupChange?.(false); }}
          >
            {/* Minimalist sharp close button */}
            <button
              onClick={() => { setSelectedProject(null); onPopupChange?.(false); }}
              className="absolute top-6 right-6 md:top-8 md:right-8 z-[110] p-3 rounded-none bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all cursor-pointer duration-300 border border-white/10 flex items-center justify-center"
              aria-label="Close video player"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[420px] aspect-[9/16] max-h-[85vh] flex items-center justify-center p-0 rounded-none overflow-hidden border border-white/10 bg-black shadow-[0_0_50px_rgba(0,0,0,0.8)] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                key={selectedProject.id}
                src={selectedProject.videoUrl}
                controls
                playsInline
                autoPlay={true}
                preload="auto"
                className="w-full h-full object-cover rounded-none bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ServicesSection() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <div id="services" data-toc data-toc-title="Services" className="w-full bg-midnight/[0.03] pt-24 pb-24 md:pt-36 md:pb-40 px-6 overflow-hidden relative border-t border-midnight/5">
      <div className="max-w-[1800px] mx-auto flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-start px-2 md:px-0">
          <h2 className="text-xs md:text-sm font-normal uppercase tracking-[0.3em] text-midnight/40">Our Services</h2>
        </div>
        
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center mt-8 md:mt-16">
          {SERVICES.map((service, index) => (
            <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ 
              duration: 1.2, 
              delay: index * 0.05, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="w-full flex flex-col items-center relative"
          >
            <motion.button
              onClick={() => setActiveService(activeService === service.title ? null : service.title)}
              onMouseEnter={() => setHoveredService(service.title)}
              onMouseLeave={() => setHoveredService(null)}
              className="group relative py-2 md:py-3 w-full flex items-center justify-center gap-4 md:gap-6 z-10 bg-transparent"
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className={cn(
                "text-[7vw] md:text-[4.5vw] font-medium leading-none tracking-tight transition-colors duration-300 uppercase",
                activeService === service.title 
                  ? "text-mango" 
                  : hoveredService 
                    ? (hoveredService === service.title ? "text-midnight" : "text-midnight/20")
                    : "text-midnight"
              )}>
                {service.title}
              </h3>
              <span className={cn(
                "text-[10px] md:text-xs font-mono transition-opacity duration-300",
                hoveredService === service.title ? "opacity-40" : (hoveredService ? "opacity-10" : "opacity-20")
              )}>
                ({(index + 1).toString().padStart(2, '0')})
              </span>
            </motion.button>

            <AnimatePresence>
              {activeService === service.title && (
                <motion.div
                  initial={{ height: 0, opacity: 0, y: -10 }}
                  animate={{ height: "auto", opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -10 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden w-full flex justify-center z-0"
                >
                  <div className="grid grid-cols-3 gap-4 md:gap-8 pt-0 pb-6 md:pt-0 md:pb-10 max-w-xs md:max-w-md mx-auto w-full px-4">
                    {service.images.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: -5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -5, opacity: 0 }}
                        transition={{ 
                          delay: i * 0.05, 
                          duration: 1.2,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className="aspect-[1/0.85] w-full rounded-lg overflow-hidden bg-midnight/5 shadow-md border border-midnight/5"
                      >
                        <img 
                          src={img} 
                          alt={service.title} 
                          className="size-full object-cover grayscale hover:grayscale-0 transition-all duration-300 ease-out hover:scale-110" 
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhyChooseUsSection() {
  const benefits = [
    {
      title: "Unmatched Creativity",
      description: "We don't just follow trends; we set them. Our team of visionaries pushes the boundaries of design and motion to ensure your brand doesn't just exist—it leads.",
      imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000",
      color: "var(--color-mango)",
      textColor: "text-midnight"
    },
    {
      title: "Growth-First Mindset",
      description: "Everything we build is rooted in strategy. We align our creative execution with your business goals to drive measurable impact and sustainable scaling.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
      color: "var(--color-leaf)",
      textColor: "text-white"
    },
    {
      title: "Immersive Experiences",
      description: "We create sensory journeys that captivate your audience. By blending art, technology, and narrative, we turn simple interactions into lasting memories.",
      imageUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1000",
      color: "var(--color-mango-ripe)",
      textColor: "text-white"
    },
    {
      title: "Radical Transparency",
      description: "Communication is our cornerstone. From initial brief to final delivery, you're part of the team. We believe the best work happens through true collaboration.",
      imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000",
      color: "var(--color-saffron)",
      textColor: "text-white"
    }
  ];

  return (
    <div id="why-choose-us" data-toc data-toc-title="Benefits" className="bg-cloud">
      {/* Intoductory Section with Title */}
      <div className="pt-24 md:pt-48 pb-16 px-6 md:px-12 max-w-[1800px] mx-auto">
        <SectionTitle title="WHY CHOOSE US" />
        <div className="mt-8 flex justify-end">
          <p className="text-sm md:text-2xl font-normal md:font-normal text-midnight/60 max-w-xl text-right">
            We combine artful design with strategic precision to help brands leave a lasting mark in the digital landscape.
          </p>
        </div>
      </div>

      {/* Stacking Sections (Desktop: Full Screen / Mobile: Parallax Cards) */}
      <div className="relative">
        {/* Desktop Version: Full Screen Sticky Sections */}
        <div className="hidden md:block">
          {benefits.map((benefit, i) => (
            <section 
              key={`desktop-${i}`}
              className="h-screen sticky top-0 w-full flex flex-col items-center justify-center px-12 overflow-hidden"
              style={{ backgroundColor: benefit.color }}
            >
              {/* Background Accent Text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
                <h2 className="text-[30vw] font-black uppercase leading-none whitespace-nowrap translate-y-12">
                  {benefit.title.split(' ')[0]}
                </h2>
              </div>

              <div className="max-w-7xl w-full grid grid-cols-2 gap-24 items-center relative z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-12"
                >
                  <div className="flex items-center gap-4">
                    <span className={cn("text-2xl font-mono font-normal italic", benefit.textColor)}>0{i+1}</span>
                    <div className={cn("h-px w-16 bg-current opacity-30", benefit.textColor)} />
                  </div>
                  
                  <div className="space-y-6">
                    <h2 className={cn("text-[13vw] sm:text-6xl lg:text-7xl font-black uppercase tracking-[-0.04em] md:tracking-tighter leading-[0.85] break-words [text-shadow:0_1px_1px_currentColor] md:[text-shadow:none]", benefit.textColor)}>
                      {benefit.title}
                    </h2>
                    <p className={cn("text-2xl font-normal leading-relaxed max-w-xl opacity-90", benefit.textColor)}>
                      {benefit.description}
                    </p>
                  </div>

                  <div className="pt-4">
                    <button className={cn(
                      "px-10 py-5 font-normal uppercase tracking-[0.2em] text-xs border-2 transition-all duration-200 ease-out",
                      benefit.textColor === "text-white" 
                        ? "border-white text-white hover:bg-white hover:text-midnight" 
                        : "border-midnight text-midnight hover:bg-midnight hover:text-white"
                    )}>
                      Explore More
                    </button>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-300 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-4 border-white/10"
                >
                  <img 
                    src={benefit.imageUrl} 
                    alt={benefit.title} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </motion.div>
              </div>
              
              {/* Subtle Progress Indicator */}
              <div className="absolute bottom-12 right-12 flex items-center gap-6">
                 <span className={cn("text-xs font-normal tracking-widest", benefit.textColor)}>SECTION 0{i+1}</span>
                 <div className="w-24 h-[2px] bg-white/20 relative">
                   <div className="absolute inset-0 bg-white" style={{ width: `${((i+1)/benefits.length)*100}%` }} />
                 </div>
              </div>
            </section>
          ))}
        </div>

        {/* Mobile Version: Stacking Parallax Cards */}
        <div className="md:hidden flex flex-col px-6 pb-24 gap-[20vh]">
          {benefits.map((benefit, i) => (
            <motion.div 
              key={`mobile-${i}`}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 - (benefits.length - i) * 0.02 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="sticky top-[15vh] w-full aspect-[4/5] p-8 md:p-12 mb-8 shadow-2xl overflow-hidden first:mt-0"
              style={{ 
                backgroundColor: benefit.color,
                zIndex: i + 1,
              }}
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <span className={cn("text-base font-mono font-normal", benefit.textColor)}>0{i+1}</span>
                  <h2 className={cn("text-2xl font-black uppercase tracking-tighter leading-none break-words", benefit.textColor)}>
                    {benefit.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  <p className={cn("text-xs font-normal leading-relaxed opacity-90 line-clamp-4 text-pretty", benefit.textColor)}>
                    {benefit.description}
                  </p>
                  <button className={cn(
                    "w-full py-3 font-normal uppercase tracking-widest text-[10px] border-2",
                    benefit.textColor === "text-white" ? "border-white text-white" : "border-midnight text-midnight"
                  )}>
                    Explore More
                  </button>
                </div>
              </div>

               {/* Mobile Decorative Image Background */}
              <div className="absolute inset-0 opacity-20 filter grayscale">
                <img 
                  src={benefit.imageUrl} 
                  alt={benefit.title} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BrandingSkillsSection() {
  const skills = [
    "OUR SERVICES", "BRANDING", "DESIGNING", "MOTION GRAPHICS", "UX STRATEGY", 
    "WEB DEVELOPMENT", "CREATIVE DIRECTION", "ART DIRECTION",
    "OUR SERVICES", "BRANDING", "DESIGNING", "MOTION GRAPHICS", "UX STRATEGY", 
  ];

  return (
    <div className="relative w-full overflow-hidden flex flex-col items-center">
      {/* Top Banner (Cloud Background) */}
      <div className="w-full bg-cloud pt-24 pb-4 select-none">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap text-[8vw] md:text-[6vw] font-black uppercase tracking-tighter leading-none text-midnight/10"
        >
          {skills.join(" • ")} • {skills.join(" • ")}
        </motion.div>
      </div>
      
      {/* Separating Line */}
      <div className="w-full h-px bg-white/10 relative z-10" />

      {/* Bottom Banner (Black Background transition starts here) */}
      <div className="w-full bg-midnight py-4 select-none">
        <motion.div 
          animate={{ x: [-1000, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap text-[8vw] md:text-[6vw] font-black uppercase tracking-tighter leading-none text-white/5"
        >
          {[...skills].reverse().join(" • ")} • {skills.join(" • ")}
        </motion.div>
      </div>
    </div>
  );
}

function TransformationSection() {
  const [isTransformed, setIsTransformed] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  const [clipCenter, setClipCenter] = React.useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleUpdatePosition = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setClipCenter({ x, y });
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    handleUpdatePosition(e);
    setIsTransformed(!isTransformed);
  };

  return (
    <div id="work-with-us" data-toc data-toc-title="Careers" className="w-full bg-midnight py-24 md:py-32 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-[1800px] mx-auto flex flex-col">
        <div data-cursor-enlarge="true" className="w-full flex justify-center">
          <SectionTitle title="WORK WITH US" lineColor="bg-white/20" textColor="text-white" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-16 md:mt-24 flex justify-center"
        >
        <div 
          ref={cardRef} 
          className="transform-card relative w-full max-w-5xl rounded-none overflow-hidden shadow-2xl min-h-[600px] md:min-h-[500px]"
        >
        {/* Before Section (Base Layer) */}
        <div className="absolute inset-0 bg-graphite flex flex-col justify-center p-8 md:p-16">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-8 justify-between h-full">
            <div className="flex-1 space-y-6">
              <p className="text-white/40 font-mono text-xs md:text-sm tracking-widest uppercase flex items-center gap-2">
                <span className="w-8 h-px bg-white/40" />
                The Old Way
              </p>
              <h2 className="text-[11vw] sm:text-4xl md:text-6xl font-black uppercase tracking-[-0.04em] md:tracking-tighter text-white leading-[0.85] [text-shadow:0_1px_1px_currentColor] md:[text-shadow:none]">
                Before <br /> Odd Mango
              </h2>
              <ul className="space-y-4">
                {[
                  "Lost in the noise of generic brands",
                  "Settling for 'good enough' design",
                  "Following yesterday's trends",
                  "Safe, predictable, and forgettable"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/50 font-light text-base md:text-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-end md:justify-end">
              <button 
                onClick={handleToggle}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleUpdatePosition}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-normal text-white uppercase tracking-widest overflow-hidden rounded-full border border-white/20 hover:border-white/50 transition-colors"
              >
                <span>Work With Us</span>
              </button>
            </div>
          </div>
        </div>

        {/* After Section (Overlay Layer with Clip Path) */}
        <motion.div 
          initial={false}
          animate={{
            clipPath: isTransformed 
              ? `circle(2000px at ${clipCenter.x}px ${clipCenter.y}px)` 
              : isHovering
                ? `circle(120px at ${clipCenter.x}px ${clipCenter.y}px)`
                : `circle(0px at ${clipCenter.x}px ${clipCenter.y}px)`
          }}
          transition={{ 
            duration: isTransformed ? 2.2 : 1.2, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="absolute inset-0 bg-leaf flex flex-col justify-center p-8 md:p-16 z-10 text-white"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000')] bg-cover bg-center opacity-[0.15] mix-blend-overlay pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 md:gap-8 justify-between h-full">
            <div className="flex-1 space-y-6">
              <p className="text-cloud/60 font-mono text-xs md:text-sm tracking-widest uppercase flex items-center gap-2">
                <span className="w-8 h-px bg-cloud/60" />
                The New Standard
              </p>
              <h2 className="text-[11vw] sm:text-4xl md:text-6xl font-black uppercase tracking-[-0.04em] md:tracking-tighter text-cloud leading-[0.85] [text-shadow:0_1px_1px_currentColor] md:[text-shadow:none]">
                With <br /> Odd Mango
              </h2>
              <ul className="space-y-4">
                {[
                  "Setting the industry benchmark",
                  "Bold, unapologetic creative direction",
                  "Innovating tomorrow's visual standards",
                  "Vibrant, impactful, and unforgettable"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-4 text-cloud/80 font-normal text-base md:text-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-cloud flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-end md:justify-end">
              <button 
                onClick={handleToggle}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleUpdatePosition}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-normal text-midnight bg-cloud uppercase tracking-widest rounded-full hover:bg-white transition-colors hover:scale-105"
              >
                <span>See the Difference</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      </motion.div>
      </div>
    </div>
  );
}

const TEAM_MEMBERS = [
  {
    name: "Omkar Janvekar",
    role: "Founder",
    image: asset("/founder1.jpg"),
    bio: "Visionary behind the digital language of Odd Mango. Crafting narratives that resonate."
  },
  {
    name: "Raghvendra Joshi",
    role: "Founder",
    image: asset("/founder2.jpeg"),
    bio: "Co-founder shaping narratives through story and visual art. Bringing meaning to content."
  }
];

function MeetTheTeamSection() {
  const sectionRef = useRef(null);
  
  return (
    <div id="team" data-toc data-toc-title="Team" ref={sectionRef} className="w-full py-24 md:py-40 px-6 md:px-12 bg-cloud text-midnight relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto flex flex-col">
        <SectionTitle title="MEET THE TEAM" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 mt-16 md:mt-24">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                x: i % 2 === 0 ? -100 : 100,
                rotate: i % 2 === 0 ? -5 : 5
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                rotate: 0
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-midnight/5 border border-midnight/10 mb-8">
                <motion.img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">{member.name}</h3>
                  <span className="text-[10px] md:text-xs font-normal uppercase tracking-[0.2em] opacity-40">{member.role}</span>
                </div>
                <div className="h-px w-full bg-midnight/10 mb-4" />
                <p className="text-base md:text-lg font-normal opacity-60 leading-relaxed max-w-sm">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [interactiveCardOpen, setInteractiveCardOpen] = useState(false);
  const [videoPopupOpen, setVideoPopupOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms' | 'cookies'>('privacy');
  
  const heroRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });
  const textY = useTransform(heroProgress, [0, 1], ["0vh", "-32vh"]);
  const bottomTextY = useTransform(heroProgress, [0.1, 0.9], ["50vh", "0vh"]);
  const bottomTextOpacity = useTransform(heroProgress, [0.1, 0.4], [0, 1]);
  const imageScale = useTransform(heroProgress, [0, 1], [1, 0.3]);
  const imageBorderRadius = useTransform(heroProgress, [0, 1], ["0px", "40px"]);
  const effectOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const imageOpacity = useTransform(heroProgress, [0, 0.6], [0.6, 1]);
  const blobsOpacity = useTransform(heroProgress, [0.1, 0.5], [1, 0]);
  const logoOpacity = useTransform(heroProgress, [0.1, 0.5], [0, 1]);
  const mangoWordColor = useTransform(heroProgress, [0, 0.5, 0.9, 1], ["#F7F7F5", "#F7F7F5", "#FF8A00", "#FF8A00"]);

  const { scrollYProgress: statementProgress } = useScroll({
    target: statementRef,
    offset: ["start end", "end start"]
  });
  
  const bgTextY = useTransform(statementProgress, [0, 1], ["-10%", "10%"]);
  const bgTextYMobile = useTransform(statementProgress, [0, 1], ["-5%", "5%"]);


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Only enable Lenis smooth scroll on desktop.
    // On mobile, native scroll is faster and avoids fighting browser optimisations.
    let lenis: Lenis | null = null;
    let rafId: number = 0;

    if (window.innerWidth >= 768) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time: number) {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    }

    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => {
      if (lenis) lenis.destroy();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ y: "0vh" }}
            exit={{ y: "-100vh" }}
            transition={{ duration: 3.0, ease: [0.85, 0, 0.15, 1] }}
            style={{ willChange: "transform" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cloud pointer-events-none"
          >
            <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
              {/* Logo Wrapper */}
              <div className="flex items-center justify-center">
                <img 
                  src={asset("/mango-logo.png")}
                  alt="Loading Logo" 
                  className="w-56 h-auto sm:w-72 md:w-[384px] lg:w-[420px] object-contain filter sepia-[100%] saturate-[1000%] hue-rotate-[15deg] brightness-[1.15] contrast-[1.2]" 
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div ref={containerRef} className="w-full bg-cloud selection:bg-midnight selection:text-cloud">
        <CustomCursor />
        {!isLoading && !videoPopupOpen && !interactiveCardOpen && <DynamicIslandTOC />}
      
      {/* First Section: Hero content above the sticky nav */}
      <div ref={heroRef} className="relative w-full h-[400vh]">
        <div id="hero" data-toc data-toc-title="Home" className="sticky top-0 z-[60] w-full h-[calc(100vh-60px)] md:h-[calc(100vh-70px)] flex flex-col justify-between p-6 md:p-8 bg-cloud text-midnight selection:bg-saffron selection:text-cloud rounded-b-3xl md:rounded-b-[3rem] overflow-hidden shadow-md">
          {/* Dynamic Background */}
          <motion.div 
            style={{ 
              scale: imageScale,
              borderRadius: imageBorderRadius,
              willChange: 'transform',
            }}
            className="absolute inset-0 z-0 overflow-hidden bg-mango origin-center transform-gpu"
          >
            {/* Animated blobs — desktop only. filter:blur() is one of the most expensive
                GPU operations; skipping on mobile gives a significant perf boost. */}
            {!isMobile && (
              <motion.div style={{ opacity: blobsOpacity }} className="absolute inset-0 saturate-[1.2]">
                {/* Animated Mango Blobs */}
                <motion.div 
                  className="absolute top-[-30%] left-[-20%] w-[140vw] h-[140vw] max-w-[1200px] max-h-[1200px] rounded-full mix-blend-overlay"
                  style={{
                    background: 'radial-gradient(circle, var(--color-saffron) 0%, transparent 60%)',
                    filter: 'blur(80px)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    x: ['0%', '10%', '0%'],
                    y: ['0%', '10%', '0%'],
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div 
                  className="absolute bottom-[-20%] right-[-20%] w-[120vw] h-[120vw] max-w-[1000px] max-h-[1000px] rounded-full mix-blend-multiply opacity-80"
                  style={{
                    background: 'radial-gradient(circle, var(--color-mango-ripe) 0%, transparent 60%)',
                    filter: 'blur(80px)',
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    x: ['0%', '-15%', '0%'],
                    y: ['0%', '-5%', '0%'],
                  }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            )}

            <motion.div 
              style={{ opacity: logoOpacity }} 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {/* To counteract the parent's scale shrink to 0.3, we can either InverseScale or just let it be responsive. At 0.3 scale, a 100% width logo turns into 30% width. Let's make it look like a nice centered card logo. */}
              <img src={asset("/mango-logo-orange.png")} alt="Mango Logo" className="w-[60%] h-[60%] md:w-[40%] md:h-[40%] object-contain" />
            </motion.div>
            
            {/* Grain Overlay — desktop only (mix-blend-overlay triggers compositing) */}
            {!isMobile && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-overlay" 
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
              ></div>
            )}

            <motion.div style={{ opacity: effectOpacity }} className="absolute inset-0 bg-gradient-to-b from-transparent via-saffron/10 to-saffron/40 z-0"></motion.div>
          </motion.div>

        {/* Top Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-between items-start text-midnight"
        >
          <div className="cursor-pointer hover:opacity-75 transition-opacity -ml-4 -mt-3 md:-ml-8 md:-mt-6 lg:-ml-12">
            <img src={asset("/mango-logo.png")} alt="Mango Logo" className="h-20 sm:h-28 md:h-36 lg:h-40 object-contain" />
          </div>
          
          <div onClick={() => scrollTo('contact-us')} className="flex items-center gap-2 md:gap-3 cursor-pointer group hover:opacity-85 transition-opacity">
            <div className="flex flex-col text-right font-normal text-[9px] md:text-[13px] leading-[1.05] uppercase tracking-wider mt-1 md:mt-0">
              <span>LET'S</span>
              <span>TALK</span>
            </div>
            <motion.div className="w-8 h-8 md:w-11 md:h-11 rounded-full border-[1.5px] border-current flex items-center justify-center transition-all duration-300 group-hover:bg-saffron group-hover:text-white group-hover:border-saffron">
              <ArrowUpRight strokeWidth={2.5} className="w-4 h-4 md:w-5 md:h-5 text-current transition-transform group-hover:rotate-45" />
            </motion.div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="relative flex-1 flex flex-col items-center justify-center w-full">
          <div className="w-full flex items-center justify-between px-2 md:px-8 lg:px-20">
            
            
            <motion.div 
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              initial={{ gap: "0vw" }}
              animate={{ gap: "2vw" }}
              transition={{ delay: 5.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex-wrap sm:flex-nowrap text-[12vw] sm:text-[10.5vw] md:text-[9.5vw] lg:text-[8.5vw] xl:text-[8.5vw] 2xl:text-[10rem] font-medium tracking-[-0.03em] leading-[1.1]"
            >
              <motion.div style={{ y: textY }} className="flex text-midnight drop-shadow-sm">
                <Letter index={0}>O</Letter>
                <Letter index={1}>d</Letter>
                <Letter index={2}>d</Letter>
              </motion.div>
              
              <motion.div style={{ y: textY, color: mangoWordColor }} className="flex group/mango drop-shadow-sm" data-cursor-mango="true">
                <Letter index={3}>m</Letter>
                <Letter index={4}>a</Letter>
                <Letter index={5}>n</Letter>
                <Letter index={6}>g</Letter>
                <div className="relative flex">
                  <Letter index={7}>o</Letter>
                  <div className="absolute top-0 right-0 w-[55%] h-[55%] pointer-events-none" style={{ transform: 'translate(40%, -20%)' }}>
                    <motion.svg 
                      className="w-full h-full text-leaf" 
                      style={{ transformOrigin: 'top right' }}
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      initial={{ opacity: 0, scale: 0, rotate: -45 }}
                      animate={{ opacity: 1, scale: 1, rotate: -8 }}
                      transition={{ delay: 5.0 + (7 * 0.12) + 0.3, duration: 0.8, type: "spring", bounce: 0.6 }}
                    >
                      <path d="M21 3C21 3 14 1 8 8C2 15 3 21 3 21C3 21 9 23 15 16C21 9 21 3 21 3Z" />
                    </motion.svg>
                  </div>
                </div>
              </motion.div>
              
              <motion.div style={{ y: textY }} className="flex text-midnight drop-shadow-sm">
                <Letter index={8}>m</Letter>
                <Letter index={9}>e</Letter>
                <Letter index={10}>d</Letter>
                <Letter index={11}>i</Letter>
                <Letter index={12}>a</Letter>
              </motion.div>
            </motion.div>
            
          </div>
          
          <motion.div
            style={{ y: bottomTextY, opacity: bottomTextOpacity }}
            className="absolute bottom-[10vh] md:bottom-[15vh] left-0 right-0 flex justify-center text-midnight z-[100] px-6 text-center pointer-events-none"
          >
            <p className="text-lg md:text-xl lg:text-2xl text-black uppercase tracking-[0.2em]">
              Branding with soul, strategy & impact
            </p>
          </motion.div>
        </main>
      </div>
      </div>

      {/* Navigation - Now below hero and non-sticky */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 5.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-50 w-full h-[60px] md:h-[70px] bg-cloud flex justify-between items-center px-6 md:px-8 font-normal text-[10px] md:text-[12px] uppercase tracking-[0.1em] text-midnight border-b border-graphite/10"
      >
        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-between items-center">
          <div onClick={() => scrollTo('hero')} className="cursor-pointer hover:opacity-75 transition-opacity">TOP</div>
          <div onClick={() => scrollTo('statement')} className="cursor-pointer hover:opacity-75 transition-opacity">STATEMENT</div>
          <div onClick={() => scrollTo('featured-works')} className="cursor-pointer hover:opacity-75 transition-opacity whitespace-nowrap">FEATURED WORKS</div>
          <div onClick={() => scrollTo('services')} className="cursor-pointer hover:opacity-75 transition-opacity">SERVICES</div>
          <div onClick={() => scrollTo('why-choose-us')} className="cursor-pointer hover:opacity-75 transition-opacity">BENEFITS</div>
          <div onClick={() => scrollTo('team')} className="cursor-pointer hover:opacity-75 transition-opacity">TEAM</div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden w-full justify-between items-center">
          <div onClick={() => scrollTo('hero')} className="cursor-pointer font-medium text-lg">Odd mango</div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
            {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-[60px] left-0 w-full bg-cloud z-40 border-b border-graphite/10 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6 font-normal text-sm uppercase tracking-widest text-midnight">
              <div onClick={() => scrollTo('hero')}>Top</div>
              <div onClick={() => scrollTo('statement')}>Statement</div>
              <div onClick={() => scrollTo('featured-works')}>Featured Works</div>
              <div onClick={() => scrollTo('services')}>Services</div>
              <div onClick={() => scrollTo('why-choose-us')}>Benefits</div>
              <div onClick={() => scrollTo('team')}>Team</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="video-expansion" className="w-full">
        {isMobile ? (
          <div className="w-full px-6 py-12 bg-cloud">
            <div className="aspect-video w-full rounded-2xl overflow-hidden">
              <video
                src={asset("/showcase/Parallax%20Video.mp4")}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-8 text-center">
               <h2 className="text-3xl font-black uppercase tracking-tighter text-midnight">WHO ARE WE?</h2>
               <p className="text-midnight/60 font-normal mt-2 uppercase tracking-wider text-xs">ODD MANGO MEDIA</p>
            </div>
          </div>
        ) : (
          <ScrollExpandMedia
            mediaType="video"
            mediaSrc={asset("/showcase/Parallax%20Video.mp4")}
            posterSrc="https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg"
            bgImageSrc="https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYMNjMlBUYHaeYpxduXPVNwf8mnFA61L7rkcoS"
            title="WHO ARE WE?"
            date="ODD MANGO MEDIA"
            scrollToExpand="Scroll to Expand Demo"
            textBlend
          />
        )}
      </div>

      {/* Statement Section */}
      <div ref={statementRef} id="statement" data-toc data-toc-title="Statement" className="w-full bg-leaf text-cloud flex flex-col items-center justify-center py-20 md:py-40 px-6 md:px-12 min-h-screen relative overflow-hidden selection:bg-mango selection:text-graphite">
        
        {/* Parallax Background Text */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-[0.04]"
          style={{ y: isMobile ? bgTextYMobile : bgTextY }}
        >
          <div className="font-black text-[25vw] md:text-[20vw] leading-[0.8] tracking-tighter uppercase whitespace-wrap text-center">
            CREATING<br/>
            CONTENT<br/>
            WITH<br/>
            MEANING
          </div>
        </motion.div>

        {/* Optional decorative elements */}
        <div className="absolute top-10 left-10 md:top-20 md:left-20">
          <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-mango mix-blend-screen shadow-[0_0_20px_var(--color-mango)]" />
        </div>

        <div className="text-center mb-10 md:mb-16 uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm font-normal opacity-60">
          Creative Studio Building Premium Brands
        </div>

        <div className="text-left font-black text-[12vw] sm:text-[11vw] md:text-[10vw] flex flex-col leading-[0.85] tracking-tighter max-w-[95vw] md:max-w-[90vw] mx-auto z-10">
          <motion.div 
            initial={{ opacity: 0, x: -150 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-50px" }} 
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="uppercase"
          >
            Creating
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 150 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-50px" }} 
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="uppercase text-right text-mango"
          >
            Content
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -150 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-50px" }} 
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="uppercase italic"
          >
            With
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 150 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-50px" }} 
            transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="uppercase text-right text-cloud/80"
          >
            Meaning
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center text-[10px] md:text-sm font-normal tracking-[0.6em] opacity-40 mt-16 md:mt-24 uppercase"
          >
            narrative through stories
          </motion.div>
        </div>
      </div>
      
      {mounted && <FeaturedWorksSection containerRef={containerRef} onPopupChange={setVideoPopupOpen} />}
      <ShortFilmSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <BrandingSkillsSection />
      <TransformationSection />
      <ImageShowcase />
      <MeetTheTeamSection />
      <ContactSection />
      {mounted && <LetsTalkBanner />}
      {mounted && (
        <FooterSection 
          onOpenLegal={(type) => {
            setLegalTab(type);
            setLegalModalOpen(true);
          }} 
          scrollTo={scrollTo}
        />
      )}
      
      {/* Floating Contact Component */}
      <AnimatePresence>
        {!videoPopupOpen && !interactiveCardOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 top-1/2 -translate-y-1/2 md:top-auto md:translate-y-0 md:bottom-8 md:right-8 z-[100] flex"
          >
            {/* Mobile Vertical Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setInteractiveCardOpen(true)}
              className="md:hidden flex h-24 w-8 bg-cloud text-midnight shadow-[0_12px_45px_rgba(0,0,0,0.25)] border border-midnight/10 items-center justify-center rounded-l-xl transition-all duration-200 absolute right-0 -mr-6"
              aria-label="Open interaction card"
            >
              <span className="text-[10px] font-bold tracking-widest uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Card</span>
            </motion.button>
            
            {/* Desktop Rounded Button */}
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'var(--color-saffron)', color: '#FFFFFF' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setInteractiveCardOpen(true)}
              className="hidden md:flex w-14 h-14 rounded-full bg-cloud text-midnight shadow-[0_12px_45px_rgba(0,0,0,0.25)] border border-midnight/5 items-center justify-center transition-all duration-200 ease-out cursor-pointer group"
              aria-label="Open interaction card"
            >
              <Headphones className="w-6 h-6 group-hover:rotate-[15deg] transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <InteractiveCard 
        isOpen={interactiveCardOpen} 
        onClose={() => setInteractiveCardOpen(false)} 
      />

      <AnimatePresence>
        {legalModalOpen && (
          <LegalModal 
            isOpen={legalModalOpen} 
            onClose={() => setLegalModalOpen(false)} 
            defaultTab={legalTab} 
          />
        )}
      </AnimatePresence>
    </div>
    </>
  );
}

function ShortFilmSection() {
  const sectionRef = React.useRef(null);
  const isInView = motionUseInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div ref={sectionRef} className="relative w-full py-16 md:py-32 px-4 md:px-8 bg-cloud flex flex-col justify-start">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        whileHover={{ borderColor: "rgba(255,255,255,0.12)", y: -4 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1400px] mx-auto bg-[#0A0A0A] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 lg:p-24 flex flex-col relative overflow-hidden shadow-2xl transition-all duration-300"
      >
        {/* Subtle background glows simulating the reference image's soft lighting */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.2, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-[#3a4020] rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.2, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="absolute top-[0%] -right-[10%] w-[50%] h-[50%] bg-[#2a2e18] rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" 
        />
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">
          
          {/* Information - Left Side */}
          <div className="w-full lg:w-5/12 flex flex-col gap-4 md:gap-6 order-2 lg:order-1">
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl font-normal tracking-tight text-white leading-tight"
            >
              Happy <span className="font-serif italic text-white/90">Birthday.</span>
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm md:text-base font-medium text-white leading-relaxed max-w-sm mt-1"
            >
              Happy Birthday follows a hardworking man living a humble life. On a special day marked on his calendar, he sets out with high hopes. Through the challenges of the day, his determination and love shine as he makes small sacrifices to create a moment of joy.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4"
            >
              <button 
                onClick={() => {
                  const el = document.getElementById('contact-us');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group flex items-center gap-3 text-white/50 hover:text-white transition-all duration-300 text-sm font-medium"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">Collaborate on a film</span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5 group-hover:scale-110 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white" />
                </div>
              </button>
            </motion.div>
          </div>

          {/* Video Player - Right Side */}
          <div className="w-full lg:w-7/12 order-1 lg:order-2 flex justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl aspect-video rounded-xl md:rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#030303]"
              whileHover={{ scale: 1.01 }}
            >
              <iframe 
                className="w-full h-full absolute inset-0"
                src="https://www.youtube.com/embed/SvANa8EdKvY?si=y7BlJLHLLOf-wMDF&amp;start=10" 
                title="Happy Birthday Short Film" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}

function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = motionUseInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <div id="contact-us" ref={sectionRef} className="w-full bg-[#E6E4DD] text-midnight font-sans px-4 md:px-8 py-16 md:py-32 rounded-t-[2rem] md:rounded-t-[4rem] relative z-20 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-12 justify-between"
      >
        {/* Left Side: Contact Info */}
        <div className="w-full lg:w-[60%] flex flex-col gap-12">
          <div>
            <h2 className="text-[11vw] sm:text-[9vw] md:text-[6.5vw] lg:text-[5rem] xl:text-[6.2rem] font-black uppercase tracking-tighter leading-[0.85] text-saffron flex flex-col pt-2 lg:pt-4">
              <span className="whitespace-nowrap">LET'S WORK</span>
              <span className="flex items-center mt-2 lg:mt-3 whitespace-nowrap">
                <motion.div
                  initial={{ width: 0, opacity: 0, marginRight: 0 }}
                  animate={isInView ? { width: "1.5em", opacity: 1, marginRight: "0.25em" } : { width: 0, opacity: 0, marginRight: 0 }}
                  transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden h-[0.9em] rounded-xl sm:rounded-2xl shrink-0"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&h=400&fit=crop&q=80" 
                    alt="Two people talking" 
                    className="w-[1.5em] h-[0.9em] object-cover max-w-none"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <span>TOGETHER</span>
              </span>
            </h2>
          </div>
          
          <div className="flex flex-col gap-8 md:gap-12 pl-1">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-normal tracking-[0.2em] opacity-40 uppercase">Location</span>
              <p className="text-xl md:text-2xl font-medium tracking-tight">
                Pune, India
              </p>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-normal tracking-[0.2em] opacity-40 uppercase">Contact Details</span>
              <a href="mailto:oddmangomedia@gmail.com" className="text-xl md:text-2xl font-medium tracking-tight hover:opacity-50 transition-opacity whitespace-pre-wrap">
                ODDMANGOMEDIA@GMAIL.COM
              </a>
              <a href="tel:+918010420225" className="text-xl md:text-2xl font-medium tracking-tight hover:opacity-50 transition-opacity">
                +91 8010420225
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full lg:w-[35%] max-w-xl shrink-0">
          <form className="flex flex-col gap-8 md:gap-10 pt-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-[10px] font-normal tracking-[0.2em] uppercase opacity-70">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full bg-transparent border-b border-midnight/20 pb-2 text-lg md:text-xl font-medium focus:outline-none focus:border-saffron transition-colors placeholder:text-midnight/30"
                placeholder="What's your name?"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[10px] font-normal tracking-[0.2em] uppercase opacity-70">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full bg-transparent border-b border-midnight/20 pb-2 text-lg md:text-xl font-medium focus:outline-none focus:border-saffron transition-colors placeholder:text-midnight/30"
                placeholder="hello@example.com"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-[10px] font-normal tracking-[0.2em] uppercase opacity-70">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                className="w-full bg-transparent border-b border-midnight/20 pb-2 text-lg md:text-xl font-medium focus:outline-none focus:border-saffron transition-colors placeholder:text-midnight/30"
                placeholder="Your phone number"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-[10px] font-normal tracking-[0.2em] uppercase opacity-70">Message</label>
              <textarea 
                id="message" 
                rows={4}
                className="w-full bg-transparent border-b border-midnight/20 pb-2 text-lg md:text-xl font-medium focus:outline-none focus:border-saffron transition-colors resize-none placeholder:text-midnight/30"
                placeholder="Tell us about your project..."
              />
            </div>

            <button 
              type="submit"
              className="mt-6 group relative flex items-center justify-center gap-4 px-12 py-6 bg-midnight text-cloud text-lg md:text-xl font-medium tracking-tight overflow-hidden transition-all duration-200 ease-out hover:bg-saffron hover:text-midnight border-2 border-midnight hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_var(--color-midnight)] active:translate-y-0 active:translate-x-0 active:shadow-none"
            >
              <span className="relative z-10">SEND MESSAGE</span>
              <ArrowUpRight className="w-6 h-6 transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-12 relative z-10" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

function FooterHoverLink({ 
  item, 
  href = "#", 
  target, 
  rel, 
  onClick 
}: { 
  item: string; 
  href?: string; 
  target?: string; 
  rel?: string; 
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  key?: React.Key;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-2xl md:text-5xl font-semibold tracking-tight relative overflow-hidden inline-block cursor-pointer"
    >
      <span className="flex select-none leading-none pt-1 pb-1">
        {item.split("").map((char, index) => {
          const delay = index * 0.025;
          return (
            <span key={index} className="relative inline-block overflow-hidden">
              <motion.span
                initial={{ y: "0%" }}
                animate={{ y: isHovered ? "-120%" : "0%" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
              <motion.span
                initial={{ y: "120%" }}
                animate={{ y: isHovered ? "0%" : "120%" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay }}
                className="absolute left-0 top-1 inline-block"
                aria-hidden="true"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </span>
          );
        })}
      </span>
    </a>
  );
}

function LetsTalkBanner() {
  const sectionRef = useRef(null);
  const isInView = motionUseInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <div ref={sectionRef} className="w-full bg-leaf overflow-hidden py-6 md:py-10 border-t border-midnight/10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span 
              key={i} 
              className="text-[12vw] md:text-[8vw] font-black text-midnight tracking-tighter leading-none uppercase px-8 select-none"
              style={{ fontWeight: 900 }}
            >
              Let's Talk
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function FooterSection({ 
  onOpenLegal,
  scrollTo 
}: { 
  onOpenLegal: (type: 'privacy' | 'terms' | 'cookies') => void;
  scrollTo?: (id: string) => void;
}) {
  const sectionRef = useRef(null);
  const isInView = motionUseInView(sectionRef, { once: true, amount: 0.1 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="footer" ref={sectionRef} className="w-full bg-[#E6E4DD] text-midnight font-sans overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top Labels */}
        <div className="w-full px-4 md:px-8 pt-8 pb-4 flex justify-between items-center text-[10px] md:text-xs font-normal tracking-widest opacity-60">
          <span>(FOLLOW)</span>
          <span>(NAVIGATION)</span>
        </div>

        {/* Main Divider */}
        <div className="w-full h-px bg-midnight/20" />

        {/* Socials & Nav */}
        <div className="w-full px-4 md:px-8 py-12 md:py-20 flex flex-nowrap justify-between items-start relative">
          {/* Social Links & Contact */}
          <div className="flex flex-col gap-8 md:gap-12">
            <div className="flex flex-col gap-2 md:gap-4">
              {['INSTAGRAM', 'LINKEDIN', 'BEHANCE'].map((item) => {
                let href = "#";
                let target: string | undefined = undefined;
                let rel: string | undefined = undefined;
                if (item === 'INSTAGRAM') {
                  href = "https://www.instagram.com/oddmangomedia/";
                  target = "_blank";
                  rel = "noopener noreferrer";
                }
                return (
                  <FooterHoverLink 
                    key={item} 
                    item={item} 
                    href={href} 
                    target={target} 
                    rel={rel} 
                  />
                );
              })}
            </div>
          </div>

          {/* Back to Top (Middle) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
            <button 
              onClick={scrollToTop}
              className="text-[10px] font-normal tracking-widest hover:opacity-50 transition-opacity whitespace-nowrap cursor-pointer"
            >
              BACK TO TOP
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 md:gap-4 items-end">
            {['HOME', 'WORKS', 'BREAK', 'ABOUT'].map((item) => {
              let href = "#";
              let onClick: ((e: React.MouseEvent<HTMLAnchorElement>) => void) | undefined = undefined;
              if (item === 'HOME') {
                href = "#hero";
                onClick = (e) => { e.preventDefault(); if (scrollTo) { scrollTo('hero'); } else { scrollToTop(); } };
              } else if (item === 'WORKS') {
                href = "#featured-works";
                onClick = (e) => { e.preventDefault(); if (scrollTo) { scrollTo('featured-works'); } };
              } else if (item === 'BREAK') {
                href = "#statement";
                onClick = (e) => { e.preventDefault(); if (scrollTo) { scrollTo('statement'); } };
              } else if (item === 'ABOUT') {
                href = "#why-choose-us";
                onClick = (e) => { e.preventDefault(); if (scrollTo) { scrollTo('why-choose-us'); } };
              }
              return (
                <FooterHoverLink 
                  key={item} 
                  item={item} 
                  href={href} 
                  onClick={onClick} 
                />
              );
            })}
          </div>
        </div>

        {/* Bottom Stats & Copyright */}
        <div className="w-full px-4 md:px-8 py-8 flex flex-col lg:flex-row justify-between items-center gap-6 text-[10px] font-normal tracking-widest uppercase opacity-60">
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-center">
            <span className="font-semibold">ODD MANGO STUDIO</span>
            <span className="opacity-40 select-none">|</span>
            <button onClick={() => onOpenLegal('privacy')} className="hover:text-mango transition-colors cursor-pointer text-[10px] tracking-widest font-sans font-medium hover:underline">PRIVACY POLICY</button>
            <span className="opacity-40 select-none">|</span>
            <button onClick={() => onOpenLegal('terms')} className="hover:text-mango transition-colors cursor-pointer text-[10px] tracking-widest font-sans font-medium hover:underline">TERMS OF SERVICE</button>
            <span className="opacity-40 select-none">|</span>
            <button onClick={() => onOpenLegal('cookies')} className="hover:text-mango transition-colors cursor-pointer text-[10px] tracking-widest font-sans font-medium hover:underline">COOKIE STATEMENT</button>
          </div>

          <div className="w-12 h-1.5 bg-midnight/20 rounded-full hidden lg:block" />

          <div className="text-center lg:text-right">
            <span>©2026</span><br />
            <span>ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
