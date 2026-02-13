import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface EventData {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: string;
  registration_link: string;
  is_upcoming: boolean;
}

export function Events() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as EventData[];
    },
  });

  const upcomingEvents = events.filter(e => e.is_upcoming);
  const pastEvents = events.filter(e => !e.is_upcoming);

  return (
    <section id="events" className="section-padding bg-background">
      <div className="container-custom" ref={ref}>
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
                  {event.registration_link ? (
                    <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
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
      </div>
    </section>
  );
}
