'use client';

import { motion } from 'framer-motion';
import { socialLinks } from '@/app/src/constants';
import { fadeIn } from '@/app/src/utils/animations';

export default function Footer() {
  return (
    <motion.footer
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-[#f5f5f5] border-t border-gray-200"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600">
              Made by Tom D
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Built with Framer
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-black transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600">
              Los Angeles
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Available for work
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

