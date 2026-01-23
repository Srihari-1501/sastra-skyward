import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';

const teamMembers = [
  {
    name: 'Arjun Krishnamurthy',
    role: 'Club Captain',
    department: 'Mechanical Engineering',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
  },
  {
    name: 'Priya Sharma',
    role: 'Design Lead',
    department: 'Aerospace Engineering',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces',
  },
  {
    name: 'Vikram Patel',
    role: 'Electronics Lead',
    department: 'Electronics & Communication',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces',
  },
  {
    name: 'Sneha Reddy',
    role: 'Operations Manager',
    department: 'Mechanical Engineering',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces',
  },
  {
    name: 'Rahul Menon',
    role: 'Manufacturing Lead',
    department: 'Mechanical Engineering',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces',
  },
  {
    name: 'Kavitha Nair',
    role: 'PR & Marketing',
    department: 'Computer Science',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces',
  },
];

export function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="team" className="section-padding bg-background">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Our Team
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meet the Crew
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Passionate engineers and innovators working together to push the limits of aeromodelling.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative"
            >
              <div className="card-gradient rounded-2xl p-6 card-hover border border-border text-center">
                {/* Image */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full accent-gradient opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-full h-full rounded-full object-cover border-4 border-background shadow-lg"
                  />
                </div>

                {/* Info */}
                <h3 className="font-display text-lg font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-accent font-semibold text-sm mb-1">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.department}</p>

                {/* Social Links */}
                <div className="flex justify-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
