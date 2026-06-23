import { Link } from "react-router-dom";
import { Home, HeartPulse, Stethoscope, CalendarClock, Building2, Wrench, Phone, ArrowRight, Star, Shield, Heart, FileCheck, Wallet, BadgeCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import heroImg from "@/assets/hero.webp";
import SEO from "@/components/SEO";

const Index = () => {
  useScrollAnimation();

  return (
    <>
      <SEO
        title="Ambulante Pflege, Betreutes Wohnen & Betreuung"
        description="Positana Pflege Hildesheim: Ambulante Pflege, Grund- und Behandlungspflege, Betreutes Wohnen in der Theaterresidenz und Alltagsbegleitung. Seit 1993. Direkte Abrechnung mit allen Pflege- und Krankenkassen."
      />
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImg.src}
            width={1600}
            height={1067}
            alt="Fürsorgliche Begleitung"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(192,100%,24%,0.85)] via-[hsl(192,100%,24%,0.6)] to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
              Ihr Zuhause.<br />
              <span className="italic">Unsere Fürsorge.</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
              Wir unterstützen Sie im Alltag – einfühlsam, zuverlässig und genau so, wie Sie es brauchen.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/kontakt"
                className="bg-accent text-accent-foreground px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                Jetzt Beratung anfragen
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:017619312010"
                className="text-white border-2 border-white/40 px-8 py-4 rounded-full text-lg hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                0176 19312010
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust elements */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Shield, title: "Seit 1993", text: "Über 30 Jahre Erfahrung in der Betreuung" },
              { icon: Heart, title: "Persönliche Betreuung", text: "Feste Ansprechpartner, die Sie kennen" },
              { icon: Star, title: "Direkte Abrechnung", text: "Wir rechnen direkt mit allen Pflegekassen ab" },
            ].map((item) => (
              <div key={item.title} className="fade-in-section flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl">{item.title}</h3>
                <p className="text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 fade-in-section">
            <h2 className="font-serif text-3xl md:text-4xl mb-3">Unsere Leistungen</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Individuell auf Ihre Bedürfnisse abgestimmt – für mehr Lebensqualität im eigenen Zuhause.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: HeartPulse,
                title: "Grundpflege",
                examples: ["Tägliche Grundpflege", "Pflege nach Schlaganfall", "24-Stunden-Betreuung"],
                anchor: "grundpflege",
                wide: false,
              },
              {
                icon: Stethoscope,
                title: "Behandlungspflege",
                examples: ["Wundversorgung & Verbände", "Medikamentengabe & Injektionen", "Palliativ- & Intensivpflege"],
                anchor: "behandlungspflege",
                wide: false,
              },
              {
                icon: Home,
                title: "Haushaltshilfe",
                examples: ["Hilfe im Alltag", "Begleitung bei Demenz", "Einkaufs- & Fahrdienst"],
                anchor: "haushaltshilfe",
                wide: false,
              },
              {
                icon: CalendarClock,
                title: "Verhinderungspflege",
                examples: ["Bei Urlaub oder Auszeit", "Bis zu 6 Wochen Kostenübernahme", "Pflegegeld bleibt erhalten"],
                anchor: "verhinderungspflege",
                wide: false,
              },
              {
                icon: Building2,
                title: "Betreutes Wohnen",
                examples: ["Barrierefreies Appartement", "Ambulante Pflege bei Bedarf", "Sicherheit & Selbstbestimmung"],
                anchor: "betreutes-wohnen",
              },
              {
                icon: Wrench,
                title: "Hausmeisterdienst",
                examples: ["Garten- & Winterdienst", "Kleine Reparaturen", "Entrümpelungen & Möbel"],
                anchor: "hausmeisterdienst",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="fade-in-section group p-8 rounded-2xl border border-border hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-serif text-2xl mb-4">{service.title}</h3>
                <ul className="space-y-2 mb-6">
                  {service.examples?.map((ex) => (
                    <li key={ex} className="text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {ex}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/leistungen#${service.anchor}`}
                  className="text-accent font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Mehr erfahren <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-14 fade-in-section">
            So einfach funktioniert es
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {[
              { step: "Schritt 1", title: "Kostenlose Beratung", text: "Persönliches Gespräch bei Ihnen zu Hause – wir klären Pflegegrad, Abrechnung mit der Pflegekasse und Entlastungsmöglichkeiten." },
              { step: "Schritt 2", title: "Angebotserstellung", text: "Wir erstellen ein maßgeschneidertes Angebot und weisen Ihnen nach Möglichkeit eine feste Pflegekraft zu." },
              { step: "Schritt 3", title: "Start der Versorgung", text: "Ihre persönliche Pflege- und Betreuungskraft beginnt die regelmäßige Versorgung – verlässlich und einfühlsam." },
            ].map((item) => (
              <div key={item.step} className="fade-in-section text-center">
                <div className="text-3xl md:text-4xl font-serif text-primary-foreground mb-3">{item.step}</div>
                <h3 className="font-serif text-2xl mb-2">{item.title}</h3>
                <p className="text-primary-foreground/80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 fade-in-section">
            <h2 className="font-serif text-3xl md:text-4xl mb-3">Worauf Sie sich verlassen können</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Verlässliche Betreuung mit klaren Standards – damit Sie und Ihre Angehörigen sich sicher fühlen.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Seit 1993",
                text: "Über 30 Jahre Erfahrung in der häuslichen Betreuung in Hildesheim und Umgebung.",
              },
              {
                icon: FileCheck,
                title: "Anerkannt nach § 45a SGB XI",
                text: "Zugelassener Anbieter für Entlastungsleistungen – anerkannt vom Land Niedersachsen.",
              },
              {
                icon: Wallet,
                title: "Direkte Abrechnung",
                text: "Wir rechnen direkt mit allen Pflegekassen ab – ohne Vorkasse, ohne Papierkram für Sie.",
              },
              {
                icon: BadgeCheck,
                title: "Geprüfte Mitarbeitende",
                text: "Alle Betreuungskräfte sind geschult und legen ein Führungszeugnis vor.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="fade-in-section p-8 rounded-2xl border border-border hover:border-accent/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-serif text-xl mb-2 leading-snug">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center fade-in-section">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Lassen Sie uns gemeinsam den ersten Schritt gehen
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Ein Anruf genügt – wir beraten Sie persönlich und unverbindlich.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/kontakt"
              className="bg-accent text-accent-foreground px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Beratung anfragen <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:017619312010"
              className="text-foreground border-2 border-border px-8 py-4 rounded-full text-lg hover:border-accent transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              0176 19312010
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
