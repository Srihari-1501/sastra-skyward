import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Users, Trophy, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const quickLinks = [
  {
    icon: Rocket,
    title: 'Our Projects',
    description: 'Explore our RC aircraft, drones, and UAV builds',
    href: '/projects',
  },
  {
    icon: Users,
    title: 'Meet the Team',
    description: 'The passionate minds behind our innovations',
    href: '/team',
  },
  {
    icon: Trophy,
    title: 'Achievements',
    description: 'Awards and recognitions we\'ve earned',
    href: '/achievements',
  },
  {
    icon: Calendar,
    title: 'Events',
    description: 'Workshops and competitions we organize',
    href: '/events',
  },
];

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      
      {/* Quick Overview Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore <span className="text-gradient inline-block">ACS</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover what makes us the premier aeromodelling club at SASTRA University
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.href}
                  className="block p-6 rounded-xl bg-card card-hover border border-border/50 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                    <link.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {link.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="accent" size="lg" asChild>
              <Link to="/about">
                Learn About Us <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
