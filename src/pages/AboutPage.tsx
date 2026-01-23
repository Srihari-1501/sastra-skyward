import { Navbar } from '@/components/layout/Navbar';
import { About } from '@/components/sections/About';
import { Footer } from '@/components/layout/Footer';

const AboutPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <About />
      </div>
      <Footer />
    </main>
  );
};

export default AboutPage;
