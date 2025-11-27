import { Variants } from 'framer-motion';

// Smooth easing curves for natural motion
export const smoothEase = [0.43, 0.13, 0.23, 0.96];
export const framerEase = [0.22, 1, 0.36, 1]; // Framer-style ease for scroll animations

export const transition = {
  duration: 0.8,
  ease: smoothEase,
};

export const transitionFast = {
  duration: 0.4,
  ease: smoothEase,
};

export const transitionSmooth = {
  duration: 1.2,
  ease: framerEase,
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: smoothEase 
    } 
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.6, 
      ease: smoothEase 
    } 
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.7, 
      ease: smoothEase 
    } 
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      ease: smoothEase 
    } 
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8, 
      ease: smoothEase 
    } 
  },
};
