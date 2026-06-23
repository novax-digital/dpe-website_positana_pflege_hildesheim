import { Phone, FileText, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SEO from "@/components/SEO";

const steps = [
  {
    icon: Phone,
    title: "Kostenlose Beratung",
    text: "Der erste Schritt ist ein persönliches Gespräch in Ihrer vertrauten Umgebung – kostenlos und unverbindlich. Wir nehmen uns Zeit, Ihre Situation kennenzulernen und klären gemeinsam Fragen zu Pflegegrad, Budget, Abrechnung mit der Pflegekasse und weiteren Entlastungsmöglichkeiten. So haben Sie von Anfang an einen transparenten Überblick.",
  },
  {
    icon: FileText,
    title: "Angebotserstellung",
    text: "Auf Grundlage der Beratung entwickeln wir ein maßgeschneidertes Angebot. Alle Leistungen werden übersichtlich und nachvollziehbar dargestellt – Sie wissen genau, welche Unterstützung Sie erwartet. Nach Möglichkeit weisen wir Ihnen eine feste Mitarbeiterin zu und vereinbaren die ersten Termine.",
  },
  {
    icon: HandHeart,
    title: "Start der Betreuung",
    text: "Ihre persönliche Pflege- oder Betreuungskraft stellt sich vor und die regelmäßige Versorgung beginnt – verlässlich, einfühlsam und in Ihrem Tempo.",
  },
];

const Ablauf = () => {
  useScrollAnimation();

  return (
    <>
      <SEO title="So läuft es ab" description="In drei einfachen Schritten zu Ihrer persönlichen Pflege und Betreuung in Hildesheim: kostenlose Beratung, individuelles Angebot, Start der Versorgung." />
      <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-section">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">So läuft es ab</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            In drei einfachen Schritten zu Ihrer persönlichen Unterstützung.
          </p>
        </div>

        {/* Vertical timeline */}
        <div className="max-w-2xl mx-auto relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          {steps.map((step, i) => (
            <div key={step.title} className="fade-in-section relative mb-16 last:mb-0">
              <div className={`md:flex items-start gap-8 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background -translate-x-1/2 mt-1 z-10" />

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className={`inline-flex items-center gap-3 mb-3 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-accent" />
                    </div>
                    <span className="text-sm font-semibold text-accent">Schritt {i + 1}</span>
                  </div>
                  <h3 className="font-serif text-2xl mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 fade-in-section">
          <Link
            to="/kontakt"
            className="bg-accent text-accent-foreground px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            Jetzt Beratung anfragen <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
    </>
  );
};

export default Ablauf;
