'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function ScrollIndicator() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('works');
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.a
        href="#works"
        onClick={handleClick}
        className="px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          y: [0, -8, 0]
        }}
        transition={{ 
          opacity: { delay: 1, duration: 0.5 },
          y: { duration: 2.5, delay: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isHovered ? 'click-me' : 'scroll'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {isHovered ? 'Click me' : 'Scrollllllll'}
          </motion.span>
        </AnimatePresence>
      </motion.a>

      {/* Floating Arrow Cursor - Left Side (Flipped) */}
      <motion.div
        className="absolute -top-6 -left-6 w-8 h-8 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          x: [0, -5, 0],
          y: [0, -3, 0]
        }}
        transition={{ 
          opacity: { delay: 1.2, duration: 0.5 },
          x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
        }}
      >
        <Image
          src="/assets/images/hero_1.png"
          alt="Cursor"
          width={32}
          height={32}
          className="w-full h-full object-contain drop-shadow-md scale-x-[-1]"
        />
      </motion.div>
    </div>
  );
}
