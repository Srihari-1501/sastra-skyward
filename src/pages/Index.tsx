import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Team } from '@/components/sections/Team';
import { Achievements } from '@/components/sections/Achievements';
import { Events } from '@/components/sections/Events';
import { Gallery } from '@/components/sections/Gallery';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Team />
      <Achievements />
      <Events />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
