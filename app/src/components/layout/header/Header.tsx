'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Nav from '../navigation/Nav';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-24 relative mt-4 md:mt-6">
          {/* Roy Jones - Left with spacing */}
          <motion.a
            href="/"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black z-10 ml-4 md:ml-6"
            style={{ fontFamily: 'var(--font-dancing-script)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Roy Jones
          </motion.a>

          {/* Desktop Navigation - Only show when not scrolled */}
          <div className={`hidden md:flex items-center gap-4 absolute left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}>
            <Nav />
          </div>

          {/* Let's connect Button - Right with spacing */}
          <div className="hidden md:block z-10 mr-4 md:mr-6">
            <motion.a
              href="#contact"
              className="px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-black text-white text-sm md:text-base font-medium hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let&apos;s connect
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-black"
            />
            <motion.span
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-black"
            />
            <motion.span
              animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-black"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4">
            <Nav onNavClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
