import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, Users, Shield, GraduationCap, Target, Compass } from 'lucide-react';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Pushing boundaries in aerospace design and technology',
  },
  {
    icon: Users,
    title: 'Teamwork',
    description: 'Collaborative spirit driving exceptional results',
  },
  {
    icon: Shield,
    title: 'Safety',
    description: 'Prioritizing safety in all flight operations',
  },
  {
    icon: GraduationCap,
    title: 'Learning',
    description: 'Continuous growth through hands-on experience',
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Where Dreams Take Flight
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The Aeromodelling Club at SASTRA (ACS) has been nurturing the next generation 
            of aerospace engineers and aviation enthusiasts.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-gradient p-8 rounded-2xl card-hover border border-border"
          >
            <div className="w-12 h-12 rounded-xl accent-gradient flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Our Mission</h3>
            <p className="text-muted-foreground">
              To foster innovation in aerospace engineering through hands-on experience in designing, 
              building, and flying RC aircraft and drones, while preparing students for careers in aviation 
              and aerospace industries.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-gradient p-8 rounded-2xl card-hover border border-border"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
              <Compass className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Our Vision</h3>
            <p className="text-muted-foreground">
              To become a nationally recognized center of excellence in aeromodelling, producing innovative 
              UAV solutions and winning prestigious national and international competitions.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-display text-2xl font-bold text-foreground text-center mb-8">Core Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-center p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <value.icon className="w-7 h-7 text-accent" />
                </div>
                <h4 className="font-display font-semibold text-foreground mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Faculty Advisor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 p-8 rounded-2xl bg-primary text-center"
        >
          <h3 className="font-display text-xl font-bold text-primary-foreground mb-2">Faculty Advisor</h3>
          <p className="text-2xl font-semibold text-accent mb-1">Dr. Venkatesh</p>
          <p className="text-primary-foreground/80">Professor, Department of Mechanical Engineering</p>
          <p className="text-primary-foreground/60 text-sm mt-2">
            20+ years of experience in aerospace research and UAV development
          </p>
        </motion.div>
      </div>
    </section>
  );
}
