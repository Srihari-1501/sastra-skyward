import { Navbar } from '@/components/layout/Navbar';
import { Achievements } from '@/components/sections/Achievements';
import { Footer } from '@/components/layout/Footer';

const AchievementsPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Achievements />
      </div>
      <Footer />
    </main>
  );
};

export default AchievementsPage;
