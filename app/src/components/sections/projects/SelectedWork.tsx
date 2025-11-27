'use client';

import { motion, useInView } from 'framer-motion';
import { projects } from '@/app/src/constants';
import ProjectCard from '@/app/src/components/ui/cards/ProjectCard';
import ScrollAnimation from '@/app/src/components/ui/ScrollAnimation';
import { useRef } from 'react';

export default function SelectedWork() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: '-50px' });

  const titleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      id="works"
      className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-white"
    >
      <div className="container mx-auto max-w-7xl">
        <div ref={titleRef} className="mb-10 sm:mb-12 md:mb-16 lg:mb-20 text-center">
          <motion.h2
            variants={titleVariants}
            initial="hidden"
            animate={isTitleInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-black mb-2 sm:mb-3 md:mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Flagship ventures
          </motion.h2>
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate={isTitleInView ? 'visible' : 'hidden'}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-gray-500 text-sm sm:text-base md:text-lg font-light tracking-wide px-2"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Export operations · Real estate · Environmental services
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {/* First row: 8 grid + 4 grid */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-8">
            <ScrollAnimation delay={0.1}>
              <ProjectCard project={projects[0]} index={0} />
            </ScrollAnimation>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-4">
            <ScrollAnimation delay={0.2}>
              <ProjectCard project={projects[1]} index={1} />
            </ScrollAnimation>
          </div>

          {/* Second row: 4 grid + 8 grid (content swapped) */}
          {projects[3] && (
            <div className="col-span-1 sm:col-span-2 lg:col-span-4">
              <ScrollAnimation delay={0.3}>
                <ProjectCard project={projects[3]} index={3} />
              </ScrollAnimation>
            </div>
          )}
          {projects[2] && (
            <div className="col-span-1 sm:col-span-2 lg:col-span-8">
              <ScrollAnimation delay={0.4}>
                <ProjectCard project={projects[2]} index={2} />
              </ScrollAnimation>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
