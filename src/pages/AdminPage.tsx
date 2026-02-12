import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Edit2, Save, X, Copy, ExternalLink, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EventData } from '@/components/sections/Events';

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

const AdminPage = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<EventData, 'id'>>({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    type: 'Workshop',
    registrationLink: '',
    isUpcoming: true,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('acs-events');
      if (stored) {
        setEvents(JSON.parse(stored));
      } else {
        setEvents(defaultEvents);
        localStorage.setItem('acs-events', JSON.stringify(defaultEvents));
      }
    } catch {
      setEvents(defaultEvents);
    }
  }, []);

  const saveEvents = (updated: EventData[]) => {
    setEvents(updated);
    localStorage.setItem('acs-events', JSON.stringify(updated));
  };

  const handleAdd = () => {
    const newEvent: EventData = {
      ...form,
      id: Date.now().toString(),
    };
    saveEvents([...events, newEvent]);
    setForm({ title: '', date: '', time: '', location: '', description: '', type: 'Workshop', registrationLink: '', isUpcoming: true });
    setShowForm(false);
  };

  const handleEdit = (event: EventData) => {
    setEditingId(event.id);
    setForm({ ...event });
  };

  const handleUpdate = () => {
    if (!editingId) return;
    const updated = events.map(e => e.id === editingId ? { ...form, id: editingId } : e);
    saveEvents(updated);
    setEditingId(null);
    setForm({ title: '', date: '', time: '', location: '', description: '', type: 'Workshop', registrationLink: '', isUpcoming: true });
  };

  const handleDelete = (id: string) => {
    saveEvents(events.filter(e => e.id !== id));
  };

  const copyEventLink = (id: string) => {
    const url = `${window.location.origin}/events/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const isEditing = editingId !== null;

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 section-padding">
        <div className="container-custom max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-muted-foreground mt-1">Manage events and registration links</p>
            </div>
            <Button variant="accent" onClick={() => { setShowForm(true); setEditingId(null); setForm({ title: '', date: '', time: '', location: '', description: '', type: 'Workshop', registrationLink: '', isUpcoming: true }); }}>
              <Plus className="w-4 h-4" /> Add Event
            </Button>
          </div>

          {/* Add/Edit Form */}
          <AnimatePresence>
            {(showForm || isEditing) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <div className="card-gradient rounded-2xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {isEditing ? 'Edit Event' : 'New Event'}
                    </h3>
                    <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-muted-foreground hover:text-foreground">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Title</label>
                      <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Event title" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Type</label>
                      <select
                        value={form.type}
                        onChange={e => setForm({ ...form, type: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="Workshop">Workshop</option>
                        <option value="Training">Training</option>
                        <option value="Event">Event</option>
                        <option value="Competition">Competition</option>
                        <option value="Seminar">Seminar</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Date</label>
                      <Input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="e.g. Mar 15, 2025" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Time</label>
                      <Input value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} placeholder="e.g. 10:00 AM - 4:00 PM" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Location</label>
                      <Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Venue" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Google Form Link</label>
                      <Input value={form.registrationLink} onChange={e => setForm({ ...form, registrationLink: e.target.value })} placeholder="https://forms.google.com/..." />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                    <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Event description" rows={3} />
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={form.isUpcoming}
                        onChange={e => setForm({ ...form, isUpcoming: e.target.checked })}
                        className="rounded border-input"
                      />
                      <span className="text-foreground">Upcoming event</span>
                    </label>
                  </div>
                  <Button variant="accent" onClick={isEditing ? handleUpdate : handleAdd} disabled={!form.title}>
                    <Save className="w-4 h-4" /> {isEditing ? 'Update' : 'Save'} Event
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Events List */}
          <div className="space-y-4">
            {events.map((event) => (
              <motion.div
                key={event.id}
                layout
                className="card-gradient rounded-xl p-5 border border-border"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                        {event.type}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${event.isUpcoming ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                        {event.isUpcoming ? 'Upcoming' : 'Past'}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-foreground">{event.title}</h4>
                    <p className="text-xs text-muted-foreground">{event.date} · {event.time} · {event.location}</p>
                    {event.registrationLink && (
                      <p className="text-xs text-accent mt-1 truncate">
                        <ExternalLink className="w-3 h-3 inline mr-1" />
                        {event.registrationLink}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => copyEventLink(event.id)}>
                      {copiedId === event.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedId === event.id ? 'Copied!' : 'Copy Link'}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(event)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(event.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {events.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>No events yet. Click "Add Event" to create one.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AdminPage;
