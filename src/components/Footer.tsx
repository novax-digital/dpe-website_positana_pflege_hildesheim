import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import logo from "@/assets/logo.png";

const InstagramMark = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="18" height="18" x="3" y="3" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5h.01" />
  </svg>
);

const FacebookMark = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 8h2.5V5H14a4 4 0 0 0-4 4v2H8v3h2v7h3v-7h2.5l.5-3h-3V9a1 1 0 0 1 1-1Z" />
  </svg>
);

const socialLinks = [
  {
    label: "Positana Hildesheim auf Instagram",
    href: "https://www.instagram.com/positana.hildesheim/",
    Icon: InstagramMark,
  },
  {
    label: "Positana Hildesheim auf Facebook",
    href: "https://www.facebook.com/positana.hildesheim",
    Icon: FacebookMark,
  },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* About */}
          <div>
            <img src={logo.src} width={1109} height={383} alt="Positana" className="h-10 w-auto mb-4 brightness-0 invert" loading="lazy" decoding="async" />
            <p className="text-primary-foreground/80 leading-relaxed">
              Seit 1993 begleiten wir Menschen im Alltag – mit Herz, Verlässlichkeit und einem offenen Ohr für Ihre Wünsche.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/25 text-primary-foreground/80 transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-lg mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { label: "Startseite", path: "/" },
                { label: "Leistungen", path: "/leistungen" },
                { label: "Über uns", path: "/ueber-uns" },
                { label: "Ablauf", path: "/ablauf" },
                { label: "Abrechnung", path: "/abrechnung" },
                { label: "FAQ", path: "/faq" },
                { label: "Ratgeber", path: "/ratgeber" },
                { label: "Kontakt", path: "/kontakt" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-4">Kontakt</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 shrink-0" />
                <div>
                  <a href="tel:017619312010" className="hover:text-accent transition-colors block">0176 19312010</a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 shrink-0" />
                <a href="mailto:info@positana-pflege-hildesheim.de" className="hover:text-accent transition-colors">
                  info@positana-pflege-hildesheim.de
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                <span>Brückenstr. 3, 31180 Giesen</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-1 shrink-0" />
                <span>Mo–Fr: 8:00–14:00 Uhr</span>
              </li>
            </ul>
          </div>

          {/* Local SEO */}
          <div>
            <h4 className="font-serif text-lg mb-4">Pflege vor Ort</h4>
            <ul className="space-y-2">
              {[
                { label: "Pflege Hildesheim", path: "/pflege/ambulante-pflege-hildesheim" },
                { label: "Pflege Giesen", path: "/pflege/ambulante-pflege-giesen" },
                { label: "Pflege Sarstedt", path: "/pflege/ambulante-pflege-sarstedt" },
                { label: "Grundpflege", path: "/pflege/grundpflege-hildesheim" },
                { label: "Behandlungspflege", path: "/pflege/behandlungspflege-hildesheim" },
                { label: "Pflegegrad-Beratung", path: "/pflege/pflegeberatung-pflegegrad-hildesheim" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif text-lg mb-4">Rechtliches</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/impressum" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="text-primary-foreground/70 hover:text-accent transition-colors">
                  Datenschutzerklärung
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/50 text-sm">
          © {new Date().getFullYear()} Positana Pflege. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
