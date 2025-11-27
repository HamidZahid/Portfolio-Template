'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/app/src/types';
import { useRef } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef(null);
  
  // Scroll-based parallax animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax effect - image moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="group cursor-pointer h-full"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="relative overflow-hidden rounded-[24px] md:rounded-[32px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 h-full">
        <motion.div
          className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-[24px] md:rounded-[32px]"
        >
          {/* Image with parallax */}
          <motion.div
            style={{ y }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-center scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 2}
            />
          </motion.div>
          
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Text overlay on image */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-8 md:p-10 lg:p-12"
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
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight"
              style={{ fontFamily: 'var(--font-inter)' }}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-white/95 font-light leading-relaxed"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {project.description}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
