import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, Medal, Award, Star } from 'lucide-react';

const achievements = [
  {
    icon: Trophy,
    title: '1st Place - SAE Aero Design',
    event: 'SAE India Aero Design Challenge',
    year: '2024',
    description: 'Won first place in the Regular Class category for innovative payload delivery system.',
  },
  {
    icon: Medal,
    title: '2nd Place - National UAV Championship',
    event: 'DRDO UAV Design Competition',
    year: '2023',
    description: 'Secured silver for autonomous navigation and obstacle avoidance capabilities.',
  },
  {
    icon: Award,
    title: 'Best Design Award',
    event: 'IIT Bombay Techfest',
    year: '2023',
    description: 'Recognized for outstanding aerodynamic design and structural efficiency.',
  },
  {
    icon: Star,
    title: 'Innovation Excellence Award',
    event: 'SASTRA University',
    year: '2024',
    description: 'Awarded for continuous innovation and contribution to aerospace research.',
  },
  {
    icon: Trophy,
    title: '3rd Place - RC Flight Competition',
    event: 'Aero India Air Show',
    year: '2023',
    description: 'Achieved podium finish in precision landing and aerobatics competition.',
  },
  {
    icon: Medal,
    title: 'Best Student Chapter',
    event: 'SAE India Southern Section',
    year: '2022',
    description: 'Recognized as the most active and innovative student chapter in the region.',
  },
];

export function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="achievements" className="section-padding bg-muted/30">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Achievements
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Pride & Glory
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A legacy of excellence in national and international aerospace competitions.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
              className="card-gradient rounded-xl p-6 card-hover border border-border group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                  <achievement.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">{achievement.year}</span>
                  <h3 className="font-display font-bold text-foreground mb-1">{achievement.title}</h3>
                  <p className="text-sm text-accent font-medium mb-2">{achievement.event}</p>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
