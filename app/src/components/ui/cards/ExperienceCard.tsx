'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Experience } from '@/app/src/types';
import { fadeInUp } from '@/app/src/utils/animations';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="hover:bg-gray-50/50 transition-colors duration-200"
    >
      <div className="py-5 md:py-6">
        {/* Main Row - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_280px_auto] gap-3 md:gap-8 items-center">
          {/* Column 1: Year Range */}
          <div className="text-gray-500 text-sm md:text-base font-normal order-1">
            {experience.startDate} — {experience.endDate}
          </div>

          {/* Column 2: Job Title */}
          <div className="text-gray-900 text-lg md:text-xl font-medium order-2">
            {experience.title}
          </div>

          {/* Column 3: Company Name with Logo */}
          <div className="flex items-center gap-3 order-3 whitespace-nowrap md:whitespace-normal">
            {experience.logo && (
              <div className="w-8 h-8 flex-shrink-0">
                <Image
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <span className="text-gray-900 text-base md:text-lg font-normal">
              {experience.company}
            </span>
          </div>

          {/* Column 4: Expand Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-300 hover:border-gray-900 hover:bg-gray-100 transition-all duration-200 flex-shrink-0 order-4"
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="text-gray-900 text-2xl leading-none font-light"
            >
              +
            </motion.span>
          </motion.button>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="overflow-hidden"
            >
              <div className="pt-5 grid grid-cols-1 md:grid-cols-[200px_1fr_200px_auto] gap-3 md:gap-6">
                {/* Empty first column */}
                <div></div>

                {/* Content in second and third columns */}
                <div className="md:col-span-2">
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
                    {experience.description}
                  </p>
                  {experience.responsibilities && experience.responsibilities.length > 0 && (
                    <div>
                      <h4 className="text-gray-900 font-medium text-base md:text-lg mb-2">
                        Key Responsibilities:
                      </h4>
                      <ul className="space-y-1.5 text-gray-600 text-base md:text-lg">
                        {experience.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-gray-400 mt-1.5">•</span>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Empty last column */}
                <div></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

