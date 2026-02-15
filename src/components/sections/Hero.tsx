import { motion } from 'framer-motion';
import { ChevronDown, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-aircraft.jpg';
import airplaneImage from '@/assets/airplane.png';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="RC Aircraft in flight"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
      </div>

      {/* Animated flying airplane */}
      <motion.img
        src={airplaneImage}
        alt="Flying airplane"
        className="absolute w-32 sm:w-44 md:w-56 lg:w-64 z-[2] opacity-90 drop-shadow-2xl pointer-events-none"
        initial={{ x: '-20vw', y: '10vh' }}
        animate={{
          x: ['−20vw', '110vw'],
          y: ['12vh', '6vh', '10vh'],
        }}
        transition={{
          x: { duration: 18, repeat: Infinity, ease: 'linear' },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ top: '10%' }}
      />

      {/* Second smaller airplane in background */}
      <motion.img
        src={airplaneImage}
        alt=""
        className="absolute w-16 sm:w-20 md:w-28 z-[1] opacity-40 pointer-events-none"
        initial={{ x: '110vw', y: '25vh' }}
        animate={{
          x: ['110vw', '-20vw'],
          y: ['25vh', '20vh', '28vh'],
        }}
        transition={{
          x: { duration: 25, repeat: Infinity, ease: 'linear', delay: 5 },
          y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ top: '5%', transform: 'scaleX(-1)' }}
      />

      {/* Content */}
      <div className="relative z-10 container-custom text-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
            <span className="text-sm font-medium text-primary-foreground">SASTRA University</span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 leading-tight">
            <span className="block">Design. Build.</span>
            <span className="text-gradient inline-block pb-2">Fly.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-4">
            Aeromodelling Club at SASTRA
          </p>
          <p className="text-base md:text-lg text-primary-foreground/60 max-w-xl mx-auto mb-8">
            Pushing the boundaries of RC aircraft, drones, and aerospace innovation.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                <Target className="w-5 h-5" />
                Contact Us
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/projects">Our Projects</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-primary-foreground/60" />
      </motion.div>
    </section>
  );
}
