'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/app/src/types';
import { useRef } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const imageHoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef(null);
  
  // Scroll-based parallax animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effect - reduced for better mobile performance
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="group cursor-pointer h-full"
      initial="rest"
      animate="rest"
      whileHover="hover"
      transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="relative overflow-hidden rounded-[20px] sm:rounded-[24px] md:rounded-[32px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 h-full">
        <motion.div
          className="relative h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[600px] overflow-hidden rounded-[20px] sm:rounded-[24px] md:rounded-[32px]"
        >
          {/* Image with parallax */}
          <motion.div
            style={{ y }}
            className="absolute inset-0 w-full h-full overflow-hidden"
            variants={imageHoverVariants}
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              priority={index < 2}
              quality={90}
            />
          </motion.div>
          
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 pointer-events-none" />
          
          {/* Text overlay on image */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.15,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            <motion.h3 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3 tracking-tight break-words"
              style={{ fontFamily: 'var(--font-inter)' }}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
              title={project.title}
            >
              {project.title.split(' ').slice(0, 2).join(' ')}
            </motion.h3>
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/95 font-light leading-relaxed"
              style={{
                fontFamily: 'var(--font-inter)',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {project.description}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
