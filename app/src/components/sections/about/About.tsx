'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export default function About() {
  const textRef = useRef(null);

  // Scroll progress for text animation
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.8", "start 0.3"]
  });

  const text = "I am a product designer with a background in computer science, blending design intuition with technical problem-solving to create seamless, user-friendly digital experiences.";
  const words = text.split(" ");

  return (
    <section
      id="about"
      className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-[#f5f5f5]"
    >
      <div className="container mx-auto max-w-4xl">
        {/* Centered Layout */}
        <div className="flex flex-col items-center text-center">
          {/* Profile Image with Name Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="relative mb-16"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-xl ring-4 ring-white mx-auto">
              <Image
                src="/assets/images/user.png"
                alt="Roy Jones"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Name Card Below Image */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="mt-6 bg-white px-6 py-3 rounded-2xl shadow-lg inline-block"
            >
              <p className="text-base font-semibold text-black">Roy Jones</p>
              <p className="text-sm text-gray-600">Product designer</p>
            </motion.div>
          </motion.div>

          {/* Main Description with Word-by-Word Animation */}
          <div
            ref={textRef}
            className="text-3xl md:text-4xl lg:text-5xl font-normal text-black leading-tight mb-12 max-w-3xl"
          >
            {words.map((word, index) => {
              const start = index / words.length;
              const end = start + (1 / words.length);

              return (
                <motion.span
                  key={index}
                  style={{
                    opacity: useTransform(scrollYProgress, [start, end], [0.3, 1]),
                  }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              );
            })}
          </div>

          {/* Let's talk! Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="mb-16"
          >
            <motion.a
              href="#contact"
              className="inline-block px-10 py-4 rounded-full bg-[#FF6B6B] text-white text-lg font-medium hover:bg-[#FF5252] transition-colors shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 107, 107, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Let's talk!
            </motion.a>
          </motion.div>

          {/* Info Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {/* Badge 1 */}
            <motion.div
              className="flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-md"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm md:text-base text-gray-700 font-medium">Computer scientist turn designer</span>
            </motion.div>

            {/* Badge 2 */}
            <motion.div
              className="flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-md"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm md:text-base text-gray-700 font-medium">Previously worked for Meta</span>
            </motion.div>

            {/* Badge 3 */}
            <motion.div
              className="flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-md"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm md:text-base text-gray-700 font-medium">Based in Los Angeles</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
