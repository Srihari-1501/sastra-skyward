import { Navbar } from '@/components/layout/Navbar';
import { Team } from '@/components/sections/Team';
import { Footer } from '@/components/layout/Footer';

const TeamPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Team />
      </div>
      <Footer />
    </main>
  );
};

export default TeamPage;
