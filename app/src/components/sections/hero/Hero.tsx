'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import ScrollIndicator from '@/app/src/components/ui/ScrollIndicator';
import { FaBuilding, FaRocket, FaStore, FaCloud, FaLaptop } from 'react-icons/fa';

export default function Hero() {
  const [checkWorkHovered, setCheckWorkHovered] = useState(false);
  const [lahoreHovered, setLahoreHovered] = useState(false);
  const [socialHovered, setSocialHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll detection for floating animation
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  // Scroll progress for section-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Transform scroll progress for button animations
  const lahoreY = useTransform(scrollYProgress, [0, 0.5], [0, -20]);
  const checkWorkY = useTransform(scrollYProgress, [0, 0.5], [0, -15]);
  const socialY = useTransform(scrollYProgress, [0, 0.5], [0, -15]);
  const scrollIndicatorY = useTransform(scrollYProgress, [0, 0.5], [0, -15]);
  
  // Smooth spring for floating
  const floatingY = useMotionValue(0);
  const springY = useSpring(floatingY, { stiffness: 50, damping: 15 });
  
  useEffect(() => {
    if (!isScrolling) {
      floatingY.set(-15);
      const interval = setInterval(() => {
        floatingY.set(floatingY.get() === -15 ? 0 : -15);
      }, 3000);
      return () => clearInterval(interval);
    } else {
      floatingY.set(0);
    }
  }, [isScrolling, floatingY]);

  const marqueeItems = [
    { icon: FaBuilding, label: 'ROYAL SWIFT SERVICES' },
    { icon: FaRocket, label: 'BEST DEAL MARKETING' },
    { icon: FaStore, label: 'AL HAMAD DEVELOPERS' },
    { icon: FaCloud, label: 'AYYAN DEVELOPER' },
    { icon: FaLaptop, label: 'GLOBAL ECO GROUP' },
    { icon: FaBuilding, label: 'FORMAN CHRISTIAN COLLEGE' },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 pt-24 sm:pt-28 md:pt-20 pb-8 sm:pb-10 md:pb-12 overflow-x-hidden overflow-y-hidden bg-[#f5f5f5]"
    >
      {/* 3D Plus Sign - Top Left with bounce animation only - moved closer to center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: -50 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: [0, -10, 0],
          rotate: 0
        }}
        transition={{ 
          opacity: { duration: 1, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] },
          scale: { duration: 1, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] },
          y: { duration: 2, delay: 1.2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 0 }
        }}
        className="hidden md:block absolute top-20 left-[15%] md:left-[18%] lg:left-[15%] w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 z-10"
      >
        <Image
          src="/assets/images/hero_3.png"
          alt="Plus sign"
          width={160}
          height={160}
          className="w-full h-full object-contain"
          priority
          unoptimized
        />
      </motion.div>

      {/* 3D Map Pin with Lahore Button - Left Side - moved closer to center */}
      <motion.div
        initial={{ opacity: 0, y: -100, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1,
          delay: 0.4,
          type: "spring",
          stiffness: 100,
          damping: 10
        }}
        className="hidden md:block absolute left-[10%] md:left-[13%] lg:left-[10%] bottom-32 md:bottom-40 z-10"
      >
        <div className="relative flex flex-col items-center">
          {/* Map Pin Image */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
          >
            <Image
              src="/assets/images/hero_2.png"
              alt="Map pin"
              width={256}
              height={256}
              className="w-full h-full object-contain"
              priority
              unoptimized
            />
          </motion.div>

          {/* Lahore Button - anchored to pin center */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ y: lahoreY }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="absolute top-[105%] left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-[#1a1a1a] text-white text-sm font-medium hover:bg-black transition-colors shadow-lg min-w-[140px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setLahoreHovered(true)}
            onMouseLeave={() => setLahoreHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={lahoreHovered ? 'time' : 'location'}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {lahoreHovered
                  ? new Date().toLocaleTimeString('en-US', {
                      timeZone: 'Asia/Karachi',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : 'Lahore'}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Check my work Button - Left Side with hover effect and scroll animation - moved closer to center */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ y: checkWorkY }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="hidden md:block absolute left-[15%] md:left-[18%] lg:left-[22%] top-1/2 -translate-y-1/2 z-20"
        onMouseEnter={() => setCheckWorkHovered(true)}
        onMouseLeave={() => setCheckWorkHovered(false)}
      >
        <div className="relative">
          <motion.a
            href="#works"
            className="px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2 shadow-lg"
            animate={{ 
              y: [0, -8, 0]
            }}
            transition={{ 
              y: { duration: 2.5, delay: 1.5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={checkWorkHovered ? 'click-me' : 'check-work'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {checkWorkHovered ? 'Click me' : 'Check my work'}
              </motion.span>
            </AnimatePresence>
          </motion.a>

          {/* Floating Arrow Cursor with Animation */}
          <motion.div 
            className="absolute -top-6 -right-6 w-8 h-8 pointer-events-none"
            animate={{ 
              x: [0, 5, 0],
              y: [0, -3, 0]
            }}
            transition={{ 
              x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
          >
            <Image
              src="/assets/images/hero_1.png"
              alt="Cursor"
              width={32}
              height={32}
              className="w-full h-full object-contain drop-shadow-md"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content - Center */}
      <div className="relative z-10 text-center max-w-5xl mx-auto w-full px-2 sm:px-0">
        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="flex flex-col items-center mb-6 sm:mb-8"
        >
          <motion.div
            className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-3 sm:mb-4 bg-gray-200 shadow-xl ring-2 sm:ring-4 ring-white"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/assets/images/abd.png"
              alt="Abdul Rehman"
              width={128}
              height={128}
              className="w-full h-full object-cover object-top rounded-full"
              priority
            />
          </motion.div>
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Abdul Rehman
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-500 font-medium px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Property developer & export operator
          </motion.p>
        </motion.div>

        {/* Main Headline with stagger animation */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-black leading-tight sm:leading-snug mb-6 sm:mb-8 tracking-tight break-words hyphens-auto"
        >
          Lahore developer & export operator delivering trusted property, logistics, and environmental programs.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed"
        >
          I lead Royal Swift Services, Best Deal Marketing, Al Hamad Developers, Ayyan Developer, and Global Eco Group to
          move capital, land, and ESG mandates from Lahore to Dubai with transparent reporting and on-ground delivery.
        </motion.p>

        {/* Let's talk Button - Center Below Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="flex justify-center mb-12 sm:mb-14 md:mb-16"
        >
          <motion.a
            href="#contact"
            className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-full bg-[#FF4D4D] text-white text-base sm:text-lg font-medium hover:bg-[#FF3333] transition-colors shadow-xl shadow-red-200"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 77, 77, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Let&apos;s talk!
          </motion.a>
        </motion.div>

        {/* Company Names - Scrolling from right to left - Below Let's talk */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="relative w-full mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-20"
        >
          <div className="relative overflow-hidden mx-auto max-w-4xl">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 lg:w-48 bg-gradient-to-r from-[#f5f5f5] via-[#f5f5f5]/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 lg:w-48 bg-gradient-to-l from-[#f5f5f5] via-[#f5f5f5]/80 to-transparent z-10 pointer-events-none"></div>

            <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 whitespace-nowrap marquee-track">
              {[...marqueeItems, ...marqueeItems].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={`${item.label}-${idx}`} className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    <Icon className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl" />
                    <span className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg font-semibold tracking-wide uppercase">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3D Hand - RIGHT Side - Overflowing beyond right edge with thumbs up and floating animation */}
      <motion.div
        initial={{ opacity: 0, x: 100, rotate: -20, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          x: 0, 
          rotate: [0, -8, 8, -5, 5, 0],
          scale: [0.8, 1.08, 1, 1.03, 1]
        }}
        transition={{ 
          opacity: { duration: 1, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
          x: { duration: 1, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
          rotate: { 
            duration: 1.2, 
            delay: 1.5, 
            ease: [0.34, 1.56, 0.64, 1],
            times: [0, 0.3, 0.6, 0.8, 0.95, 1]
          },
          scale: {
            duration: 1.2,
            delay: 1.5,
            ease: [0.34, 1.56, 0.64, 1],
            times: [0, 0.3, 0.6, 0.8, 1]
          }
        }}
        className="hidden md:block absolute right-0 top-1/4 bottom-16 md:bottom-20 lg:bottom-24 w-[40rem] h-[40rem] md:w-[50rem] md:h-[50rem] lg:w-[60rem] lg:h-[60rem] xl:w-[70rem] xl:h-[70rem] z-10"
        style={{ 
          y: isScrolling ? 0 : springY,
          right: '-13%',
          bottom: '10%',
          willChange: 'transform, opacity',
          transformOrigin: 'center center'
        }}
      >
        <Image
          src="/assets/images/hand.png"
          alt="3D Hand"
          width={2000}
          height={2000}
          className="w-full h-full object-contain"
          priority
          unoptimized
        />
      </motion.div>

      {/* Drop me a follow Button with Social Icons Below - moved closer to center with scroll animation */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ y: socialY }}
        transition={{ duration: 0.8, delay: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="hidden md:block absolute right-[15%] md:right-[18%] lg:right-[20%] top-32 md:top-40 z-20"
      >
        <div
          className="flex flex-col items-center gap-3"
          onMouseEnter={() => setSocialHovered(true)}
          onMouseLeave={() => setSocialHovered(false)}
        >
          <motion.button
            className="px-6 py-3 rounded-full bg-[#1a1a1a] text-white text-sm font-medium hover:bg-black transition-colors shadow-lg"
            animate={{ 
              y: [0, -8, 0]
            }}
            transition={{ 
              y: { duration: 2.5, delay: 1.8, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Drop me a follow
          </motion.button>

          {/* Social Icons - Appear Below on Hover */}
          <AnimatePresence>
            {socialHovered && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#1a1a1a] shadow-lg"
              >
                {/* Twitter/X */}
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>

                {/* Instagram */}
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Scroll Indicator - Lower Right - moved closer to center with scroll animation */}
      <motion.div
        className="hidden md:block absolute right-[15%] md:right-[18%] lg:right-[20%] bottom-32 md:bottom-52 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ y: scrollIndicatorY }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <ScrollIndicator />
      </motion.div>

     
    </section>
  );
}
