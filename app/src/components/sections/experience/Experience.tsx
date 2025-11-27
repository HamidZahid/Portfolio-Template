'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/app/src/constants';
import ExperienceCard from '@/app/src/components/ui/cards/ExperienceCard';
import ScrollAnimation from '@/app/src/components/ui/ScrollAnimation';
import { staggerContainer, fadeInUp } from '@/app/src/utils/animations';

export default function Experience() {
  const handleDownloadCV = () => {
    // Add your CV download logic here
    // For now, this is a placeholder
    window.open('/assets/cv.pdf', '_blank');
  };

  return (
    <section
      id="experience"
      className="py-20 md:py-32 px-4 md:px-6 lg:px-8 bg-white"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 md:mb-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-normal text-black mb-2"
          >
            Recent experience
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="bg-[#fafafa] rounded-3xl p-8 md:p-12 lg:p-16"
        >
          <div className="space-y-0">
            {experiences.map((experience, index) => (
              <ScrollAnimation key={experience.id} delay={index * 0.1}>
                <ExperienceCard
                  experience={experience}
                  index={index}
                />
              </ScrollAnimation>
            ))}
          </div>

          {/* Download CV Button */}
          <div className="flex justify-center mt-12 md:mt-16">
            <motion.button
              onClick={handleDownloadCV}
              className="px-10 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 text-base md:text-lg font-medium shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

