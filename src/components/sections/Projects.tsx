import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import droneProject from '@/assets/drone-project.jpg';
import rcAircraft from '@/assets/rc-aircraft.jpg';
import uavProject from '@/assets/uav-project.jpg';

const projects = [
  {
    title: 'Phoenix UAV',
    category: 'Competition Build',
    description: 'Advanced autonomous UAV designed for the SAE Aero Design competition with payload delivery capabilities.',
    image: uavProject,
    year: '2024',
    tags: ['Autonomous', 'Competition'],
  },
  {
    title: 'SkyHawk RC',
    category: 'RC Aircraft',
    description: 'High-performance trainer aircraft with 2m wingspan, designed for club training and aerobatic demonstrations.',
    image: rcAircraft,
    year: '2023',
    tags: ['Training', 'Aerobatics'],
  },
  {
    title: 'Surveyor Drone',
    category: 'UAV / Drone',
    description: 'Quadcopter equipped with HD camera and GPS for aerial mapping and surveillance applications.',
    image: droneProject,
    year: '2024',
    tags: ['Mapping', 'Surveillance'],
  },
  {
    title: 'Glider Alpha',
    category: 'RC Aircraft',
    description: 'Lightweight glider optimized for thermal soaring with 3m wingspan and composite construction.',
    image: rcAircraft,
    year: '2023',
    tags: ['Glider', 'Endurance'],
  },
  {
    title: 'Cargo Carrier',
    category: 'Competition Build',
    description: 'Heavy-lift aircraft designed for maximum payload capacity in national aeromodelling competitions.',
    image: uavProject,
    year: '2024',
    tags: ['Heavy Lift', 'Competition'],
  },
  {
    title: 'FPV Racing Quad',
    category: 'UAV / Drone',
    description: 'Custom-built FPV racing drone capable of reaching speeds over 100 km/h for competitive racing.',
    image: droneProject,
    year: '2023',
    tags: ['Racing', 'FPV'],
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
            Our Projects
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Engineering Excellence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From competition-winning UAVs to high-performance RC aircraft, explore our portfolio 
            of innovative aerospace projects.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group bg-card rounded-2xl overflow-hidden card-hover border border-border"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-accent-foreground" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{project.year}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
