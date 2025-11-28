'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/app/src/constants';
import TestimonialCard from '@/app/src/components/ui/cards/TestimonialCard';
import { fadeInUp, staggerContainer } from '@/app/src/utils/animations';
import { useRef } from 'react';

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="testimonials"
      className="py-10 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#f5f5f5]"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-3 sm:mb-4"
          >
            What my partners say
          </motion.h2>
        </motion.div>

        {/* Cards container with optimized scroll space for smooth animations */}
        <div ref={containerRef} className="relative" style={{ height: '140vh', minHeight: '800px', position: 'relative' }}>
          <div className="sticky top-16 sm:top-20 w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[700px]">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                containerRef={containerRef}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center">
          <motion.a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-full text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Read on Linkedin
          </motion.a>
        </div>
      </div>
    </section>
  );
}
