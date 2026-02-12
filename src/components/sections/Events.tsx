import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: string;
  registrationLink: string;
  isUpcoming: boolean;
}

const defaultEvents: EventData[] = [
  {
    id: '1',
    title: 'Aerodynamics Workshop',
    date: 'Feb 15, 2025',
    time: '10:00 AM - 4:00 PM',
    location: 'Main Auditorium',
    description: 'Learn the fundamentals of aircraft aerodynamics and wing design principles.',
    type: 'Workshop',
    registrationLink: '',
    isUpcoming: true,
  },
  {
    id: '2',
    title: 'Flight Simulator Training',
    date: 'Feb 22, 2025',
    time: '2:00 PM - 6:00 PM',
    location: 'Simulation Lab',
    description: 'Hands-on training with professional RC flight simulators.',
    type: 'Training',
    registrationLink: '',
    isUpcoming: true,
  },
  {
    id: '3',
    title: 'Annual Air Show',
    date: 'Mar 10, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'University Ground',
    description: 'Annual showcase of all club projects with live flight demonstrations.',
    type: 'Event',
    registrationLink: '',
    isUpcoming: true,
  },
];

export function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Load events from localStorage (admin-managed) or use defaults
  const getEvents = (): EventData[] => {
    try {
      const stored = localStorage.getItem('acs-events');
      if (stored) return JSON.parse(stored);
    } catch {}
    return defaultEvents;
  };

  const events = getEvents();
  const upcomingEvents = events.filter(e => e.isUpcoming);
  const pastEvents = events.filter(e => !e.isUpcoming);

  return (
    <section id="events" className="section-padding bg-background">
      <div className="container-custom" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Events & Workshops
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Learn, Build, Fly
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our workshops and events to enhance your skills in aeromodelling and aerospace engineering.
          </p>
        </motion.div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-12">
            <h3 className="font-display text-xl font-bold text-foreground mb-6">Upcoming Events</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
                  className="card-gradient rounded-xl p-6 card-hover border border-border group flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                      {event.type}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{event.description}</p>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      {event.location}
                    </span>
                  </div>
                  {event.registrationLink ? (
                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                      <Button variant="accent" size="sm" className="w-full">
                        Register <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  ) : (
                    <Button variant="accent" size="sm" className="w-full" disabled>
                      Registration Coming Soon
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div>
            <h3 className="font-display text-xl font-bold text-foreground mb-6">Past Events</h3>
            <div className="card-gradient rounded-xl p-6 border border-border">
              <div className="space-y-4">
                {pastEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </div>
                    <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded-full">
                      {event.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Link to individual event pages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-sm text-muted-foreground"
        >
          Share individual event registration links with your members via the admin panel.
        </motion.div>
      </div>
    </section>
  );
}
