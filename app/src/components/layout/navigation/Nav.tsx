'use client';

import { motion } from 'framer-motion';
import { navigationItems, NavItem } from '@/app/src/constants';

interface NavProps {
  onNavClick?: (href: string) => void;
  isOverDarkSection?: boolean;
}

export default function Nav({ onNavClick, isOverDarkSection = false }: NavProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }

    if (onNavClick) {
      onNavClick(href);
    }
  };

  return (
    <nav className={`flex flex-col md:flex-row items-center gap-2 px-4 py-2 rounded-2xl md:rounded-full shadow-md w-full md:w-auto transition-colors ${isOverDarkSection ? 'bg-white/10 backdrop-blur-md' : 'bg-white'
      }`}>
      {navigationItems.map((item: NavItem) => (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => handleClick(e, item.href)}
          className={`text-sm font-medium transition-colors relative px-4 py-1.5 rounded-full ${isOverDarkSection
              ? 'text-gray-200 hover:text-white'
              : 'text-gray-600 hover:text-black'
            }`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
