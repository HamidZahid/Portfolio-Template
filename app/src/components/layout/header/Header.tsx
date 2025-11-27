'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Nav from '../navigation/Nav';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Brand - anchored left */}
          <motion.a
            href="/"
            className="text-3xl md:text-4xl font-semibold text-black flex-shrink-0"
            style={{ fontFamily: 'var(--font-dancing-script)' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Abdul Rehman
          </motion.a>

          {/* Desktop Navigation - centered, hidden when scrolled */}
          <div
            className={`hidden md:flex flex-1 justify-center transition-opacity duration-300 ${
              isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <Nav />
          </div>

          {/* Let's connect Button - right aligned */}
          <div className="hidden md:flex justify-end flex-shrink-0">
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
            className="md:hidden flex flex-col gap-1.5 ml-auto"
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
