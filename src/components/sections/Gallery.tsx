import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import heroImage from '@/assets/hero-aircraft.jpg';
import droneProject from '@/assets/drone-project.jpg';
import rcAircraft from '@/assets/rc-aircraft.jpg';
import uavProject from '@/assets/uav-project.jpg';

const galleryImages = [
  { src: heroImage, alt: 'RC Aircraft in flight', category: 'Flight Tests' },
  { src: droneProject, alt: 'Quadcopter drone', category: 'Drones' },
  { src: rcAircraft, alt: 'RC aircraft on field', category: 'Aircraft' },
  { src: uavProject, alt: 'UAV on workbench', category: 'Workshop' },
  { src: heroImage, alt: 'Aerial photography', category: 'Flight Tests' },
  { src: droneProject, alt: 'Drone testing', category: 'Drones' },
  { src: rcAircraft, alt: 'Competition aircraft', category: 'Competitions' },
  { src: uavProject, alt: 'Team working', category: 'Workshop' },
];

export function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };
  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  return (
    <section id="gallery" className="section-padding bg-muted/30">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
            Gallery
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Captured Moments
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of flight tests, workshops, competitions, and team moments.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className={`relative group cursor-pointer overflow-hidden rounded-xl ${
                index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover aspect-square transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs text-accent font-medium">{image.category}</span>
                <p className="text-primary-foreground text-sm font-medium">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground hover:bg-accent/90 transition-colors"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 flex items-center justify-center text-primary-foreground hover:bg-background/30 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 flex items-center justify-center text-primary-foreground hover:bg-background/30 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
