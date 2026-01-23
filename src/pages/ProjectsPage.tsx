import { Navbar } from '@/components/layout/Navbar';
import { Projects } from '@/components/sections/Projects';
import { Footer } from '@/components/layout/Footer';

const ProjectsPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Projects />
      </div>
      <Footer />
    </main>
  );
};

export default ProjectsPage;
