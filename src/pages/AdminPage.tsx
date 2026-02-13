import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Edit2, Save, X, Copy, ExternalLink, Check, LogOut, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { EventData } from '@/components/sections/Events';

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm card-gradient rounded-2xl p-8 border border-border"
      >
        <h1 className="font-display text-2xl font-bold text-foreground text-center mb-2">Admin Login</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">Sign in to manage ACS events</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button variant="accent" className="w-full" type="submit" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

function AdminDashboard() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '', date: '', time: '', location: '', description: '',
    type: 'Workshop', registration_link: '', is_upcoming: true,
  });

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['admin-events'],
    queryFn: async () => {
      const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as EventData[];
    },
  });

  const addMutation = useMutation({
    mutationFn: async (newEvent: typeof form) => {
      const { error } = await supabase.from('events').insert(newEvent);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof form }) => {
      const { error } = await supabase.from('events').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const resetForm = () => {
    setForm({ title: '', date: '', time: '', location: '', description: '', type: 'Workshop', registration_link: '', is_upcoming: true });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (event: EventData) => {
    setEditingId(event.id);
    setForm({
      title: event.title, date: event.date, time: event.time,
      location: event.location, description: event.description,
      type: event.type, registration_link: event.registration_link,
      is_upcoming: event.is_upcoming,
    });
  };

  const copyEventLink = (id: string) => {
    const url = `${window.location.origin}/events/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const isEditing = editingId !== null;

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 section-padding">
        <div className="container-custom max-w-4xl">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-muted-foreground mt-1 text-sm">Manage events and registration links</p>
            </div>
            <div className="flex gap-2">
              <Button variant="accent" onClick={() => { setShowForm(true); setEditingId(null); resetForm(); setShowForm(true); }}>
                <Plus className="w-4 h-4" /> Add Event
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </div>
          </div>

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
                    <button onClick={resetForm} className="text-muted-foreground hover:text-foreground">
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
                      <Input value={form.registration_link} onChange={e => setForm({ ...form, registration_link: e.target.value })} placeholder="https://forms.google.com/..." />
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
                        checked={form.is_upcoming}
                        onChange={e => setForm({ ...form, is_upcoming: e.target.checked })}
                        className="rounded border-input"
                      />
                      <span className="text-foreground">Upcoming event</span>
                    </label>
                  </div>
                  <Button
                    variant="accent"
                    onClick={() => isEditing ? updateMutation.mutate({ id: editingId!, data: form }) : addMutation.mutate(form)}
                    disabled={!form.title || addMutation.isPending || updateMutation.isPending}
                  >
                    <Save className="w-4 h-4" /> {isEditing ? 'Update' : 'Save'} Event
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <motion.div key={event.id} layout className="card-gradient rounded-xl p-4 md:p-5 border border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                          {event.type}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${event.is_upcoming ? 'bg-green-500/10 text-green-600' : 'bg-muted text-muted-foreground'}`}>
                          {event.is_upcoming ? 'Upcoming' : 'Past'}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-foreground truncate">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">{event.date} · {event.time} · {event.location}</p>
                      {event.registration_link && (
                        <p className="text-xs text-accent mt-1 truncate">
                          <ExternalLink className="w-3 h-3 inline mr-1" />
                          {event.registration_link}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button variant="outline" size="sm" onClick={() => copyEventLink(event.id)}>
                        {copiedId === event.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span className="hidden sm:inline">{copiedId === event.id ? 'Copied!' : 'Copy Link'}</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(event)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(event.id)} className="text-destructive hover:text-destructive">
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
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}

const AdminPage = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onLogin={() => {}} />;
  }

  return <AdminDashboard />;
};

export default AdminPage;
