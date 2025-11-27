export interface NavItem {
  label: string;
  href: string;
  section?: string;
}

export const navigationItems: NavItem[] = [
  { label: 'Work', href: '#works', section: 'works' },
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Testimonial', href: '#testimonials', section: 'testimonials' },
  { label: 'Article', href: '#articles', section: 'articles' },
];

