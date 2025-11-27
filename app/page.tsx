import Header from '@/app/src/components/layout/header/Header';
import Hero from '@/app/src/components/sections/hero/Hero';
import SelectedWork from '@/app/src/components/sections/projects/SelectedWork';
import About from '@/app/src/components/sections/about/About';
import Testimonials from '@/app/src/components/sections/testimonials/Testimonials';
import Experience from '@/app/src/components/sections/experience/Experience';
import Articles from '@/app/src/components/sections/articles/Articles';
import Contact from '@/app/src/components/sections/contact/Contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <Header />
      <Hero />
      <SelectedWork />
      <About />
      <Testimonials />
      <Experience />
      <Articles />
      <Contact />
    </main>
  );
}
