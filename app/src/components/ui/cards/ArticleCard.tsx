'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Article } from '@/app/src/types';
import { useRef } from 'react';

interface ArticleCardProps {
  article: Article;
  index: number;
}

const colorClasses: Record<string, string> = {
  lilac: 'bg-[#f0ede8]',
  yellow: 'bg-[#f0ede8]',
  orange: 'bg-[#f0ede8]',
  green: 'bg-[#f0ede8]',
};

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const bgColor = article.color ? colorClasses[article.color] || 'bg-gray-100' : 'bg-gray-100';

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="group cursor-pointer h-full"
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={`${bgColor} rounded-3xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300`}
      >
        {/* Image Section */}
        {article.image && (
          <div className="relative w-full h-64 flex items-center justify-center p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.1 + 0.2,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="relative w-full h-full"
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-6 md:p-8 flex-1 flex flex-col">
          <motion.h3 
            className="text-xl md:text-2xl font-semibold text-black mb-3 group-hover:text-gray-800 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1 + 0.3,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {article.title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 text-base md:text-lg mb-6 flex-1"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1 + 0.4,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {article.description}
          </motion.p>

          <motion.div 
            className="text-sm text-gray-500 mt-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ 
              duration: 0.4, 
              delay: index * 0.1 + 0.5,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {article.date}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
