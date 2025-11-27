'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/app/src/utils/animations';

export default function DownloadCV() {
  return (
    <section
      id="cv"
      className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-white"
    >
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.a
            variants={fadeInUp}
            href="#"
            className="inline-flex items-center gap-3 text-black font-medium text-lg hover:opacity-70 transition-opacity"
          >
            <span>Download CV</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

