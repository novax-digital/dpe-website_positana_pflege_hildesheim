import { Link } from "react-router-dom";
import { HeartPulse, Stethoscope, Home, CalendarClock, Building2, Wrench, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SEO from "@/components/SEO";

const sections = [
  {
    id: "grundpflege",
    icon: HeartPulse,
    title: "Grundpflege",
    description:
      "In der Grundpflege unterstützen wir Sie einfühlsam bei den täglichen pflegerischen Aufgaben – mit Respekt, Geduld und fachlicher Kompetenz.",
    examples: [
      "Hilfe bei der täglichen Grundpflege",
      "Pflege nach Schlaganfall",
      "Pflege bei künstlicher Ernährung",
      "24-Stunden-Betreuung",
    ],
  },
  {
    id: "behandlungspflege",
    icon: Stethoscope,
    title: "Behandlungspflege",
    description:
      "Medizinische Pflegeleistungen auf ärztliche Verordnung – durchgeführt von erfahrenen Pflegefachkräften mit höchster Sorgfalt.",
    examples: [
      "Wundversorgung und Verbandwechsel aller Art",
      "Medikamentengabe und Injektionen (z.B. bei Diabetes)",
      "Blutdruck- und Blutzuckermessung",
      "Stoma-, Katheter- und Portversorgung",
      "Palliativ-, Intensiv- und Heimbeatmungspflege",
      "An- und Ausziehen von Kompressionsstrümpfen",
      "24-Stunden-Betreuung",
    ],
  },
  {
    id: "haushaltshilfe",
    icon: Home,
    title: "Haushaltshilfe",
    description:
      "In der sozialen und hauswirtschaftlichen Versorgung helfen wir Ihnen, selbstständig und sicher in Ihrem Zuhause zu leben.",
    examples: [
      "Fördern und Erhalten der Selbständigkeit",
      "Hilfe im Alltag",
      "Begleitung und Betreuung bei Demenz",
      "Angehörigen-Schulungen und -Betreuung",
      "Haushalts- und Einkaufshilfen",
      "Garten- und Winterdienst",
      "Fahrdienst",
      "Botengänge",
    ],
  },
  {
    id: "verhinderungspflege",
    icon: CalendarClock,
    title: "Verhinderungspflege",
    description:
      "Wenn pflegende Angehörige eine Auszeit brauchen, übernehmen wir die Betreuung – professionell, herzlich und zuverlässig.",
    examples: [
      "Verhinderungspflege bei Urlaub oder Auszeit",
      "Bis zu 6 Wochen Kostenübernahme durch die Pflegekasse",
      "Pflegegeld bleibt vollständig erhalten",
      "Professionelle Betreuung im Seniorenzentrum Theaterresidenz",
      "Komfortable Zimmer mit Bad, TV, Telefon und Rufanlage",
      "Freundliches Team für einen angenehmen Aufenthalt",
    ],
  },
  {
    id: "hausmeisterdienst",
    icon: Wrench,
    title: "Hausmeisterdienst",
    description:
      "Damit Haus und Garten in Schuss bleiben: Wir übernehmen handwerkliche und körperlich anstrengende Aufgaben rund um Ihr Zuhause.",
    examples: [
      "Gartenpflege und Rasenmähen",
      "Hecke schneiden und Laub entfernen",
      "Winterdienst",
      "Kleine Reparaturen und Renovierungen",
      "Möbel umstellen",
      "Entrümpelungen",
    ],
  },
  {
    id: "betreutes-wohnen",
    icon: Building2,
    title: "Betreutes Wohnen",
    description:
      "Als Senior in Geborgenheit und Sicherheit leben: Genießen Sie Ihr Leben in einem eigenen, liebevoll gestalteten und barrierefreien Appartement in der Theaterresidenz – selbstständig, privat und ganz nach Ihren persönlichen Vorstellungen. Unterstützung ist da, wenn Sie sie brauchen – durch unsere ambulanten Pflege- und hauswirtschaftlichen Dienste. So verbinden wir Sicherheit und Fürsorge mit einem selbstbestimmten Leben.",
    examples: [
      "Eigenes, barrierefreies Appartement in der Theaterresidenz",
      "Selbstständig und privat wohnen",
      "Ambulante Pflegeleistungen bei Bedarf",
      "Hauswirtschaftliche Unterstützung",
      "Hilfe beim An- und Ausziehen",
      "Unterstützung bei der Medikamenteneinnahme",
      "Individuelle Betreuung mit Einfühlungsvermögen",
      "Sicherheit und Fürsorge im eigenen Zuhause",
    ],
  },
];

const Leistungen = () => {
  useScrollAnimation();

  return (
    <>
      <SEO title="Leistungen" description="Grundpflege, Behandlungspflege, Haushaltshilfe und Verhinderungspflege in Hildesheim. Positana Pflege betreut Sie zuverlässig und einfühlsam." />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-section">
            <h1 className="font-serif text-4xl md:text-5xl mb-4">Unsere Leistungen</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Mit langjähriger Erfahrung und kompetenten Fachkräften garantieren wir eine qualitativ hochwertige und dabei individuelle Rund-um-die-Uhr-Versorgung.
            </p>
          </div>

          <div className="space-y-24">
            {sections.map((section, i) => (
              <div
                key={section.id}
                id={section.id}
                className="fade-in-section scroll-mt-32"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                      <section.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl mb-4">{section.title}</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      {section.description}
                    </p>
                    <Link
                      to="/kontakt"
                      className="bg-accent text-accent-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                    >
                      Beratung anfragen <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="bg-muted rounded-2xl p-8">
                      <h4 className="font-serif text-lg mb-4">Beispiele aus unserem Alltag</h4>
                      <ul className="space-y-3">
                        {section.examples.map((ex) => (
                          <li key={ex} className="flex items-start gap-3">
                            <span className="w-2 h-2 rounded-full bg-accent mt-2.5 shrink-0" />
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Leistungen;
