import { Navbar } from '@/components/layout/Navbar';
import { Events } from '@/components/sections/Events';
import { Footer } from '@/components/layout/Footer';

const EventsPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Events />
      </div>
      <Footer />
    </main>
  );
};

export default EventsPage;
