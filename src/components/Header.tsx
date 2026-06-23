import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, MapPin, Briefcase, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const locations = ["Hildesheim", "Wittingen"];
const services = ["Haushaltshilfe", "Pflege"];

const siteUrls: Record<string, Record<string, string>> = {
  Hildesheim: {
    Haushaltshilfe: "https://positana-haushaltshilfe-hildesheim.de",
    Pflege: "https://positana-pflege-hildesheim.de",
  },
  Wittingen: {
    Haushaltshilfe: "https://positana-haushaltshilfe-wittingen.de",
    Pflege: "https://positana-pflege-wittingen.de",
  },
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeLocation, setActiveLocation] = useState("Hildesheim");
  const [activeService, setActiveService] = useState("Pflege");
  const location = useLocation();

  const navLinks = [
    { label: "Startseite", path: "/" },
    {
      label: "Leistungen",
      path: "/leistungen",
      children: [
        { label: "Grundpflege", path: "/leistungen#grundpflege" },
        { label: "Behandlungspflege", path: "/leistungen#behandlungspflege" },
        { label: "Haushaltshilfe", path: "/leistungen#haushaltshilfe" },
        { label: "Verhinderungspflege", path: "/leistungen#verhinderungspflege" },
        { label: "Hausmeisterdienst", path: "/leistungen#hausmeisterdienst" },
        { label: "Betreutes Wohnen", path: "/leistungen#betreutes-wohnen" },
        { label: "Pflege vor Ort", path: "/pflege/ambulante-pflege-hildesheim" },
      ],
    },
    { label: "Ablauf", path: "/ablauf" },
    { label: "Abrechnung", path: "/abrechnung" },
    {
      label: "Informationen",
      path: "/ueber-uns",
      children: [
        { label: "Über uns", path: "/ueber-uns" },
        { label: "FAQ", path: "/faq" },
        { label: "Ratgeber", path: "/ratgeber" },
      ],
    },
    { label: "Karriere", path: "/karriere" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Top bar with switchers */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              {locations.map((loc) => (
                <a
                  key={loc}
                  href={siteUrls[loc][activeService]}
                  className={`px-2 py-0.5 rounded-full transition-colors ${
                    activeLocation === loc
                      ? "bg-primary text-primary-foreground"
                      : "hover:text-foreground"
                  }`}
                  onClick={() => setActiveLocation(loc)}
                >
                  {loc}
                </a>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground border-l border-border pl-4">
              <Briefcase className="w-3.5 h-3.5" />
              {services.map((svc) => (
                <a
                  key={svc}
                  href={siteUrls[activeLocation][svc]}
                  className={`px-2 py-0.5 rounded-full transition-colors ${
                    activeService === svc
                      ? "bg-primary text-primary-foreground"
                      : "hover:text-foreground"
                  }`}
                  onClick={() => setActiveService(svc)}
                >
                  {svc}
                </a>
              ))}
            </div>
          </div>
          <a href="tel:017619312010" className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">0176 19312010</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="shrink-0">
          <img src={logo.src} width={1109} height={383} alt="Positana Pflege" className="h-10 md:h-12 w-auto" decoding="async" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`flex items-center gap-1 transition-colors hover:text-accent ${
                    isActive(link.path) ? "text-accent font-semibold" : "text-foreground"
                  }`}
                >
                  {link.label}
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>
                {openDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-background border border-border rounded-lg shadow-lg py-2 min-w-[200px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="block px-4 py-2 hover:bg-muted hover:text-accent transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.path}
                className={`transition-colors hover:text-accent ${
                  isActive(link.path) ? "text-accent font-semibold" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/kontakt"
            className="hidden md:inline-flex bg-accent text-accent-foreground px-5 py-2.5 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Beratung anfragen
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Menü"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2 text-lg transition-colors hover:text-accent ${
                    isActive(link.path) ? "text-accent font-semibold" : ""
                  }`}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="pl-4 flex flex-col gap-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.path}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1.5 text-muted-foreground hover:text-accent transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/kontakt"
              onClick={() => setMobileOpen(false)}
              className="mt-2 bg-accent text-accent-foreground px-5 py-3 rounded-full font-semibold text-center hover:opacity-90 transition-opacity"
            >
              Beratung anfragen
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
