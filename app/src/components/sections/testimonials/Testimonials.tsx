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
      className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-[#f5f5f5]"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-20 text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4"
          >
            What my colleges say
          </motion.h2>
        </motion.div>

        {/* Cards container with scroll space - reduced height for faster animation */}
        <div ref={containerRef} className="relative" style={{ height: '80vh' }}>
          <div className="sticky top-20 w-full h-[600px] md:h-[700px]">
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

        <div className="mt-8 text-center">
          <motion.a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gray-900 text-white rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
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
