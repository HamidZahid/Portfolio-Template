'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import { staggerContainer } from '@/app/src/utils/animations';

export default function Contact() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [lahoreHovered, setLahoreHovered] = useState(false);
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
  const dropFollowY = useTransform(scrollYProgress, [0, 0.5], [0, -15]);
  const goHomeY = useTransform(scrollYProgress, [0, 0.5], [0, -15]);

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

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 md:py-24 lg:py-32 overflow-x-hidden overflow-y-hidden bg-[#2d3139]"
    >
      {/* 3D Plus Sign - Left side floating - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: -50 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: [0, -10, 0],
          rotate: 0
        }}
        viewport={{ once: true }}
        transition={{
          opacity: { duration: 1, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] },
          scale: { duration: 1, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] },
          y: { duration: 2, delay: 1.2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 0 }
        }}
        className="hidden lg:block absolute top-1/3 left-[8%] xl:left-[12%] w-28 h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40 z-10"
      >
        <Image
          src="/assets/images/hero_3.png"
          alt="Plus sign"
          width={160}
          height={160}
          className="w-full h-full object-contain opacity-80"
          unoptimized
        />
      </motion.div>

      {/* 3D Map Pin - Bottom Left - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          delay: 0.4,
          type: "spring",
          stiffness: 100,
          damping: 12
        }}
        className="hidden lg:block absolute left-[8%] xl:left-[12%] bottom-20 lg:bottom-24 xl:bottom-28 z-10"
      >
        <div className="relative flex flex-col items-center">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-36 h-36 lg:w-44 lg:h-44 xl:w-52 xl:h-52"
          >
            <Image
              src="/assets/images/hero_2.png"
              alt="Map pin"
              width={224}
              height={224}
              className="w-full h-full object-contain opacity-80"
              unoptimized
            />
          </motion.div>

          {/* Lahore Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ y: lahoreY }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="absolute top-[100%] left-1/2 -translate-x-1/2 px-4 py-2 lg:px-5 lg:py-2.5 rounded-full bg-[#3d4149] text-white text-xs lg:text-sm font-medium hover:bg-[#4d5159] transition-colors shadow-lg min-w-[120px] lg:min-w-[140px]"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setLahoreHovered(true)}
            onMouseLeave={() => setLahoreHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={lahoreHovered ? 'lahore-time' : 'lahore-label'}
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

      {/* Available for work - Top Center - Visible on all screens */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="flex absolute top-12 sm:top-16 md:top-20 lg:top-70 left-1/2 -translate-x-1/2 z-20 items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10"
      >
        <motion.div
          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-gray-300 text-xs sm:text-sm font-medium">Available for work</span>
      </motion.div>

      {/* Drop me a follow Button - Top Right - Hidden on mobile and tablet */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{ y: dropFollowY }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="hidden lg:block absolute top-28 xl:top-32 right-[15%] xl:right-[18%] z-20"
      >
        <motion.button
          className="px-4 py-2 lg:px-5 lg:py-2.5 rounded-full bg-[#3d4149] text-white text-xs lg:text-sm font-medium hover:bg-[#4d5159] transition-colors shadow-lg"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          Drop me a follow
        </motion.button>
      </motion.div>

      {/* 3D Hand - Right Side - Responsive sizing and positioning */}
      <motion.div
        initial={{ opacity: 0, x: 100, rotate: -20, scale: 0.8 }}
        whileInView={{
          opacity: 1,
          x: 0,
          rotate: [0, -8, 8, -5, 5, 0],
          scale: [0.8, 1.08, 1, 1.03, 1]
        }}
        viewport={{ once: true }}
        style={{
          y: isScrolling ? 0 : springY,
          right: '-15%',
          bottom: '8%',
          willChange: 'transform, opacity',
          transformOrigin: 'center center'
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
        className="hidden sm:block absolute right-0 w-[30rem] h-[30rem] sm:w-[35rem] sm:h-[35rem] md:w-[45rem] md:h-[45rem] lg:w-[55rem] lg:h-[55rem] xl:w-[65rem] xl:h-[65rem] z-10"
      >
        <Image
          src="/assets/images/hand.png"
          alt="3D Hand"
          width={2000}
          height={2000}
          className="w-full h-full object-contain opacity-80"
          unoptimized
        />
      </motion.div>

      {/* Go home Button - Bottom Right - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{ y: goHomeY }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="hidden md:block absolute bottom-16 md:bottom-20 lg:bottom-24 right-[15%] lg:right-[18%] xl:right-[20%] z-20"
      >
        <div className="relative">
          <motion.a
            href="#hero"
            className="px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-blue-500 text-white text-xs md:text-sm font-medium hover:bg-blue-600 transition-colors shadow-lg inline-flex items-center gap-2"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Go home
          </motion.a>

          {/* Floating Arrow Cursor */}
          <motion.div
            className="absolute -top-5 -left-5 md:-top-6 md:-left-6 w-6 h-6 md:w-8 md:h-8 pointer-events-none"
            style={{
              rotate: -90,
            }}
            animate={{
              x: [0, -3, 0],
              y: [0, -5, 0]
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

      {/* Main Content - Center - Fully responsive */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 sm:mb-5 md:mb-6"
          >
            Let&apos;s create something<br />great together.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 max-w-xl mx-auto px-2"
          >
            I&apos;m not just here to design products;<br />I&apos;m here to connect with people.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="flex justify-center"
          >
            <motion.a
              href="mailto:abrehmanewm@gmail.com"
              className="px-8 py-3 sm:px-10 sm:py-4 rounded-full bg-white text-black text-base sm:text-lg font-bold hover:bg-gray-100 transition-colors shadow-2xl"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Let&apos;s talk!
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
