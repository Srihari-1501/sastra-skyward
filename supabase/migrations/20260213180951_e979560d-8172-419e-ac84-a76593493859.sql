
-- Events table (public read, admin write)
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Workshop',
  registration_link TEXT DEFAULT '',
  is_upcoming BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Everyone can read events
CREATE POLICY "Events are publicly readable"
  ON public.events FOR SELECT
  USING (true);

-- Only authenticated users can insert/update/delete
CREATE POLICY "Authenticated users can insert events"
  ON public.events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update events"
  ON public.events FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete events"
  ON public.events FOR DELETE
  TO authenticated
  USING (true);

-- Seed default events
INSERT INTO public.events (title, date, time, location, description, type, registration_link, is_upcoming) VALUES
  ('Aerodynamics Workshop', 'Feb 15, 2025', '10:00 AM - 4:00 PM', 'Main Auditorium', 'Learn the fundamentals of aircraft aerodynamics and wing design principles.', 'Workshop', '', true),
  ('Flight Simulator Training', 'Feb 22, 2025', '2:00 PM - 6:00 PM', 'Simulation Lab', 'Hands-on training with professional RC flight simulators.', 'Training', '', true),
  ('Annual Air Show', 'Mar 10, 2025', '9:00 AM - 5:00 PM', 'University Ground', 'Annual showcase of all club projects with live flight demonstrations.', 'Event', '', true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
