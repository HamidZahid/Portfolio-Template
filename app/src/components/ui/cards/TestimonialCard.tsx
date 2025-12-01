'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import { Testimonial } from '@/app/src/types';
import { RefObject, useState, useEffect } from 'react';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function TestimonialCard({ testimonial, index, containerRef }: TestimonialCardProps) {
  // Cursor tracking for 3D rotation effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations for cursor-based rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 150,
    damping: 15,
  });

  // Detect if device is mobile/touch
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mouse movement for cursor interactivity
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize mouse position to -0.5 to 0.5 range
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  // Scroll progress from container - each card triggers at different scroll positions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Consistent scroll ranges for all cards - third card gets full range to 1.0
  // Card 0: 0 - 0.4, Card 1: 0.33 - 0.73, Card 2: 0.66 - 1.0
  const cardStart = index * 0.33;
  const cardRange = 0.4; // Consistent range for all cards
  const cardEnd = index === 2 ? 1.0 : Math.min(cardStart + cardRange, 0.9);

  // Map scroll progress to card-specific range with smooth easing
  const cardProgress = useTransform(
    scrollYProgress,
    [cardStart, cardEnd],
    [0, 1]
  );

  // Smooth slide up animation for all cards
  const y = useTransform(
    cardProgress,
    [0, 0.5, 1], // Smoother timing
    ['100%', '0%', '0%']
  );

  // Smooth scale animation for all cards
  const scale = useTransform(
    cardProgress,
    [0, 0.3, 0.7, 1], // Smoother timing
    [0.95, 1, 1, 0.98] // More subtle scale values
  );

  // No rotation - cards stay perfectly aligned
  const rotate = useTransform(
    cardProgress,
    [0, 0.5, 1],
    [0, 0, 0]
  );

  // Opacity transitions: Smooth fade in/out based on scroll progress
  // Card 2 (index 2) must stay fully visible when scrolling down
  const opacity = useTransform(
    scrollYProgress,
    index === 2
      ? [
        // Card 2: Fade in and stay fully visible even beyond scroll end
        cardStart - 0.15,   // Start fading in earlier
        cardStart - 0.05,   // Mostly visible
        cardStart,          // Fully visible
        cardEnd,            // Still fully visible
        1.1,                // Still fully visible (handles scroll beyond end)
      ]
      : [
        // Cards 0 and 1: Fade in, then fade out when next card appears
        cardStart - 0.15,
        cardStart - 0.05,
        cardStart,
        cardEnd - 0.1,
        cardEnd,
        cardEnd + 0.1
      ],
    index === 2
      ? [0, 0.5, 1, 1, 1] // Card 2: stays fully visible
      : [0, 0.5, 1, 1, 0.3, 0] // Cards 0 and 1: smooth fade-out
  );

  // Dynamic z-index: Active card should be on top
  // Higher opacity = higher z-index for proper stacking
  // Using integer values for proper CSS z-index
  const zIndex = useTransform(
    opacity,
    [0, 0.3, 0.7, 1],
    [
      index,           // When invisible, lowest z-index
      index + 5,       // When partially visible
      index + 8,       // When mostly visible
      index + 10       // When fully visible, highest z-index
    ]
  );

  // Minimal parallax effect for content - very subtle
  const contentY = useTransform(
    cardProgress,
    [0, 1],
    [5, 0] // Very minimal parallax
  );

  // Minimal parallax effect for image - very subtle
  const imageY = useTransform(
    cardProgress,
    [0, 1],
    [-5, 0] // Very minimal parallax
  );

  return (
    <motion.div
      style={{
        y,
        opacity,
        scale,
        rotate,
        zIndex,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        willChange: 'transform, opacity',
        perspective: '1000px',
      }}
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="rounded-2xl sm:rounded-3xl overflow-hidden h-full bg-[#f5f5f5] shadow-lg"
        style={{
          borderTop: `8px solid ${testimonial.borderColor === '#E8B44D'
            ? '#E85D9A' // Yellow border → Pink border
            : testimonial.borderColor === '#E85D9A'
              ? '#60D5D5' // Pink border → Teal border
              : '#E8B44D' // Teal border → Yellow border
            }`,
          transformOrigin: 'center center', // Ensure scaling happens from center
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
          {/* Content Column - Left side */}
          <motion.div
            style={{ y: contentY }}
            className={`${index === 2 ? 'p-8 sm:p-10 md:p-16 lg:p-20 mt-4 sm:mt-6 md:mt-8 lg:mt-10' : 'p-6 sm:p-8 md:p-12 lg:p-16'} flex flex-col justify-center order-2 md:order-1 min-h-[300px] sm:min-h-0`}
          >
            {/* Quote Marks */}
            <div className="mb-4 sm:mb-6">
              <svg
                width="40"
                height="40"
                viewBox="0 0 48 48"
                fill="none"
                className="text-gray-900 sm:w-12 sm:h-12"
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
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-black mb-4 sm:mb-6 leading-tight">
              {testimonial.title}
            </h3>

            {/* Quote */}
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              {testimonial.quote}
            </p>

            {/* Author Info */}
            <div>
              <p className="font-semibold text-base sm:text-lg text-black">
                {testimonial.author}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                {testimonial.role}
              </p>
              {/* College Image */}
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
                <Image
                  src="/assets/images/college_4.png"
                  alt="College"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 80px"
                />
              </div>
            </div>
          </motion.div>

          {/* Image Column - Right side */}
          {testimonial.image && (
            <motion.div
              style={{ y: imageY }}
              className="relative h-[250px] sm:h-[300px] md:h-full order-1 md:order-2"
            >
              <Image
                src={testimonial.image}
                alt={testimonial.author}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
