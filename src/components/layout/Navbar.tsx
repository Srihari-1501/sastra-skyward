import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import acsLogo from '@/assets/acs-logo.png';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Team', href: '/team' },
  { name: 'Achievements', href: '/achievements' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg border-b border-border/20' : 'bg-primary/90 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <img src={acsLogo} alt="ACS Logo" className="w-10 h-10 object-contain" />
              <div className="hidden sm:block">
                <span className="font-display font-bold text-lg text-primary-foreground">ACS</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors relative group ${
                  isActive(link.href)
                    ? 'text-accent'
                    : 'text-primary-foreground/80 hover:text-accent'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-accent transition-all duration-300 ${
                  isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              variant="accent"
              size="default"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-primary-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary/95 backdrop-blur-md border-t border-border/20"
          >
            <div className="container-custom py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-accent bg-accent/10'
                      : 'text-primary-foreground hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button
                variant="accent"
                className="w-full mt-4"
                asChild
              >
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
