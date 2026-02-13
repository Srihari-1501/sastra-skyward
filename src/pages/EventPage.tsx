import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Calendar, Clock, MapPin, ExternalLink, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const EventPage = () => {
  const { eventId } = useParams();

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!eventId,
  });

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 section-padding">
        <div className="container-custom max-w-3xl">
          <Link to="/events" className="inline-flex items-center gap-2 text-accent mb-8 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : event ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-gradient rounded-2xl p-6 md:p-12 border border-border"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold mb-4">
                {event.type}
              </span>
              <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-6">
                {event.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-8">{event.description}</p>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                  <Calendar className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="text-sm font-medium text-foreground">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                  <Clock className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="text-sm font-medium text-foreground">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                  <MapPin className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium text-foreground">{event.location}</p>
                  </div>
                </div>
              </div>

              {event.registration_link ? (
                <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                  <Button variant="accent" size="lg" className="w-full sm:w-auto">
                    Register Now <ExternalLink className="w-5 h-5" />
                  </Button>
                </a>
              ) : (
                <Button variant="accent" size="lg" disabled>
                  Registration Coming Soon
                </Button>
              )}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Event Not Found</h2>
              <p className="text-muted-foreground mb-6">This event may have been removed or the link is incorrect.</p>
              <Button variant="accent" asChild>
                <Link to="/events">View All Events</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default EventPage;
