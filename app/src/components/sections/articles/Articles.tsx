'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { articles } from '@/app/src/constants';
import ArticleCard from '@/app/src/components/ui/cards/ArticleCard';
import ScrollAnimation from '@/app/src/components/ui/ScrollAnimation';
import { staggerContainer, fadeInUp } from '@/app/src/utils/animations';

const INITIAL_DISPLAY_COUNT = 3;

export default function Articles() {
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  const displayedArticles = articles.slice(0, displayCount);
  const hasMore = displayCount < articles.length;

  return (
    <section
      id="articles"
      className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-[#e5e5e5]"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4"
          >
            Recent articles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="text-gray-600 text-lg"
          >
            I write about the future of design and the life of a product designer.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {displayedArticles.map((article, index) => (
            <ScrollAnimation key={article.id} delay={index * 0.1}>
              <ArticleCard article={article} index={index} />
            </ScrollAnimation>
          ))}
        </div>

        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="text-center"
          >
            <motion.button
              onClick={() => setDisplayCount(articles.length)}
              className="px-8 py-3 rounded-full bg-gray-800 text-white text-sm font-medium hover:bg-gray-900 transition-colors shadow-md"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              Load more
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
