import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const upcomingEvents = [
  {
    title: 'Aerodynamics Workshop',
    date: 'Feb 15, 2025',
    time: '10:00 AM - 4:00 PM',
    location: 'Main Auditorium',
    description: 'Learn the fundamentals of aircraft aerodynamics and wing design principles.',
    type: 'Workshop',
    seats: '50 seats available',
  },
  {
    title: 'Flight Simulator Training',
    date: 'Feb 22, 2025',
    time: '2:00 PM - 6:00 PM',
    location: 'Simulation Lab',
    description: 'Hands-on training with professional RC flight simulators.',
    type: 'Training',
    seats: '20 seats available',
  },
  {
    title: 'Annual Air Show',
    date: 'Mar 10, 2025',
    time: '9:00 AM - 5:00 PM',
    location: 'University Ground',
    description: 'Annual showcase of all club projects with live flight demonstrations.',
    type: 'Event',
    seats: 'Open to all',
  },
];

const pastEvents = [
  {
    title: 'CAD Design Bootcamp',
    date: 'Jan 2025',
    attendees: '45 participants',
  },
  {
    title: 'Drone Building Workshop',
    date: 'Dec 2024',
    attendees: '30 participants',
  },
  {
    title: 'Flight Control Systems Seminar',
    date: 'Nov 2024',
    attendees: '60 participants',
  },
  {
    title: 'Industry Expert Talk',
    date: 'Oct 2024',
    attendees: '100 participants',
  },
];

export function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Events */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-xl font-bold text-foreground mb-6">Upcoming Events</h3>
            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
                  className="card-gradient rounded-xl p-6 card-hover border border-border group"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                          {event.type}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {event.seats}
                        </span>
                      </div>
                      <h4 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-accent" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-accent" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-accent" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <Button variant="accent" size="sm" className="md:self-center">
                      Register
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Past Events */}
          <div>
            <h3 className="font-display text-xl font-bold text-foreground mb-6">Past Events</h3>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card-gradient rounded-xl p-6 border border-border"
            >
              <div className="space-y-4">
                {pastEvents.map((event, index) => (
                  <div
                    key={event.title}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </div>
                    <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded-full">
                      {event.attendees}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
