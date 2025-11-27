'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Testimonial } from '@/app/src/types';
import { RefObject } from 'react';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function TestimonialCard({ testimonial, index, containerRef }: TestimonialCardProps) {
  // Scroll progress from container - each card triggers at different scroll positions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Each card has its own scroll range - tighter ranges for faster replacement
  // Card 0: 0 - 0.4, Card 1: 0.3 - 0.7, Card 2: 0.6 - 1
  const cardStart = index * 0.3;
  const cardEnd = Math.min(cardStart + 0.4, 1);
  
  // Map scroll progress to card-specific range
  const cardProgress = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    [0, 1]
  );

  // Slide up from bottom - faster animation
  const y = useTransform(
    cardProgress,
    [0, 0.5, 1],
    ['100%', '0%', '0%']
  );

  // Complete opacity control - hide when not active
  const opacity = useTransform(
    scrollYProgress,
    [
      cardStart - 0.1, 
      cardStart, 
      cardEnd - 0.1, 
      cardEnd
    ],
    [0, 1, 1, 0] // Fully visible only in active range
  );

  return (
    <motion.div
      style={{
        y,
        opacity,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: index, // Higher index = on top
        willChange: 'transform, opacity',
      }}
      className="w-full h-full"
    >
      <div
        className="rounded-3xl overflow-hidden h-full bg-[#f5f5f5]"
        style={{
          borderTop: `8px solid ${
            testimonial.borderColor === '#E8B44D' 
              ? '#E85D9A' // Yellow border → Pink border
              : testimonial.borderColor === '#E85D9A'
              ? '#60D5D5' // Pink border → Teal border
              : '#E8B44D' // Teal border → Yellow border
          }`,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
          {/* Content Column - Left side */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
            {/* Quote Marks */}
            <div className="mb-6">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="text-gray-900"
              >
                <path
                  d="M10 18C10 12.477 14.477 8 20 8V12C16.686 12 14 14.686 14 18V20H20V32H8V20H10V18Z"
                  fill="currentColor"
                />
                <path
                  d="M30 18C30 12.477 34.477 8 40 8V12C36.686 12 34 14.686 34 18V20H40V32H28V20H30V18Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black mb-6 leading-tight">
              {testimonial.title}
            </h3>

            {/* Quote */}
            <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
              {testimonial.quote}
            </p>

            {/* Author Info */}
            <div>
              <p className="font-semibold text-lg text-black">
                {testimonial.author}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {testimonial.role}
              </p>
              {/* College Image */}
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <Image
                  src="/assets/images/college_4.png"
                  alt="College"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 64px, 80px"
                />
              </div>
            </div>
          </div>

          {/* Image Column - Right side */}
          {testimonial.image && (
            <div className="relative h-80 md:h-full order-1 md:order-2">
              <Image
                src={testimonial.image}
                alt={testimonial.author}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
