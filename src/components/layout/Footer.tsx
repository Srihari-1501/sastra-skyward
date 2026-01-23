import { Plane, Instagram, Linkedin, Github, Mail } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Team', href: '#team' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: 'mailto:aeroclub@sastra.edu', label: 'Email' },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="hero-gradient text-primary-foreground">
      <div className="container-custom section-padding pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg accent-gradient flex items-center justify-center">
                <Plane className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-lg">AERO</span>
                <span className="font-display font-bold text-lg text-accent">CLUB</span>
              </div>
            </a>
            <p className="text-primary-foreground/70 max-w-md mb-6">
              SASTRA University's premier aeromodelling club, fostering innovation in aerospace 
              engineering through hands-on experience in RC aircraft, drones, and UAV development.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold mb-4">Contact Us</h4>
            <address className="not-italic text-primary-foreground/70 space-y-2">
              <p>SASTRA Deemed University</p>
              <p>Thanjavur, Tamil Nadu</p>
              <p>India - 613401</p>
              <p className="pt-2">
                <a href="mailto:aeroclub@sastra.edu" className="hover:text-accent transition-colors">
                  aeroclub@sastra.edu
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} SASTRA Aeromodelling Club. All rights reserved.
          </p>
          <p className="text-sm text-primary-foreground/60">
            Design. Build. Fly.
          </p>
        </div>
      </div>
    </footer>
  );
}
