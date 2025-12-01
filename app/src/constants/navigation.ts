export interface NavItem {
  label: string;
  href: string;
  section?: string;
}

export const navigationItems: NavItem[] = [
  { label: 'Work', href: '#works', section: 'works' },
  { label: 'About', href: '#about', section: 'about' },
  { label: 'Article', href: '#articles', section: 'articles' },
];

