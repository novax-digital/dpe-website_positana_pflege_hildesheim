import { Heart, Shield, MapPin, Building2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SEO from "@/components/SEO";

const UeberUns = () => {
  useScrollAnimation();

  return (
    <>
      <SEO title="Über uns" description="Positana Pflege – seit 1993 Ihr verlässlicher Partner für Senioren in Hildesheim. Erfahren Sie mehr über unser Team und unsere Werte." />
      <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 fade-in-section">
          <h1 className="font-serif text-4xl md:text-5xl mb-6">Über uns</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Die Positana GmbH ist ein inhabergeführtes Unternehmen mit Hauptsitz im Landkreis Hildesheim. Seit 1993 stehen wir für Kompetenz, Menschlichkeit und Verlässlichkeit in der Pflegebranche.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-20 fade-in-section space-y-6">
          <p className="text-lg leading-relaxed">
            In Hildesheim betreiben wir eine eigenständig agierende Filiale „Positana Pflege Hildesheim“, deren Leitung und Mitarbeitende vor Ort wohnhaft sind und die Region bestens kennen. Mit großem Engagement und Empathie begleiten sie Seniorinnen und Senioren zuverlässig durch ihr Leben.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Unser Ziel ist es, Senioren und Menschen mit Pflegegrad darin zu unterstützen, den Alltag so angenehm und selbstbestimmt wie möglich zu erleben. Dabei legen wir größten Wert auf die Wünsche, Vorlieben und Bedürfnisse unserer Kunden. Ihre Privatsphäre diskret zu behandeln, ist für uns selbstverständlich.
          </p>
        </div>

        {/* Highlight: Betreutes Wohnen */}
        <div className="max-w-3xl mx-auto mb-20 fade-in-section">
          <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 via-background to-primary/5 p-8 md:p-10">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>
                <span className="text-sm uppercase tracking-wider text-accent font-medium">Unser besonderes Angebot</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl mb-4">Betreutes Wohnen in der Theaterresidenz</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Ein Herzstück unserer Arbeit ist das <strong className="text-foreground font-medium">Betreute Wohnen</strong> in der Theaterresidenz Hildesheim. Hier verbinden wir das selbstbestimmte Leben in einem barrierefreien Appartement mit der Sicherheit, dass unsere ambulanten Pflege- und hauswirtschaftlichen Dienste jederzeit für Sie da sind – ganz nach Ihrem persönlichen Bedarf.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Heart,
              title: "Menschlichkeit",
              text: "Wir begegnen jedem Menschen mit Wärme und Respekt – denn gute Betreuung kommt von Herzen.",
            },
            {
              icon: Shield,
              title: "Verlässlichkeit",
              text: "Pünktlich, verbindlich und beständig. Auf uns können Sie sich verlassen.",
            },
            {
              icon: MapPin,
              title: "Regionale Nähe",
              text: "Wir kennen die Region und ihre Menschen. Kurze Wege, persönliche Beziehungen.",
            },
          ].map((value) => (
            <div key={value.title} className="fade-in-section text-center p-8 rounded-2xl border border-border">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
    </>
  );
};

export default UeberUns;
