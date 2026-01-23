import { Navbar } from '@/components/layout/Navbar';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';

const ContactPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </main>
  );
};

export default ContactPage;
