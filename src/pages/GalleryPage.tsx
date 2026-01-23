import { Navbar } from '@/components/layout/Navbar';
import { Gallery } from '@/components/sections/Gallery';
import { Footer } from '@/components/layout/Footer';

const GalleryPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Gallery />
      </div>
      <Footer />
    </main>
  );
};

export default GalleryPage;
