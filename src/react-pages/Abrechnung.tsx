import { Euro, FileCheck, HandCoins } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SEO from "@/components/SEO";

const Abrechnung = () => {
  useScrollAnimation();

  return (
    <>
      <SEO title="Abrechnung & Kosten" description="Pflegeleistungen direkt mit Pflege- und Krankenkasse abrechnen: Pflegesachleistungen §36, Behandlungspflege §37, Entlastungsbetrag §45b und Verhinderungspflege §39. Positana Pflege Hildesheim berät Sie transparent." />
      <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-section">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Abrechnung & Kosten</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Viele unserer Leistungen werden von der Pflegekasse übernommen. Wir kümmern uns um die Abrechnung – Sie kümmern sich um nichts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <div className="fade-in-section p-8 rounded-2xl border border-border">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
              <Euro className="w-7 h-7 text-accent" />
            </div>
            <h2 className="font-serif text-2xl mb-3">Entlastungsbetrag</h2>
            <p className="text-sm text-accent font-semibold mb-3">§ 45b SGB XI</p>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              Ab Pflegegrad 1 stehen Ihnen <strong className="text-foreground">131 € pro Monat</strong> für Entlastungsleistungen zu. Dieser Betrag kann für Haushaltshilfe, Alltagsbegleitung und Fahrdienste genutzt werden.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              Nicht genutzte Beträge können bis zu 18 Monate angespart werden.
            </p>
          </div>

          <div className="fade-in-section p-8 rounded-2xl border border-border">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
              <HandCoins className="w-7 h-7 text-accent" />
            </div>
            <h2 className="font-serif text-2xl mb-3">Verhinderungspflege</h2>
            <p className="text-sm text-accent font-semibold mb-3">§ 39 SGB XI</p>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              Ab Pflegegrad 2 können <strong className="text-foreground">bis zu 3.539 € pro Jahr</strong> für Verhinderungspflege in Anspruch genommen werden – z.B. wenn pflegende Angehörige eine Auszeit brauchen.
            </p>
          </div>
        </div>

        <div className="fade-in-section max-w-2xl mx-auto text-center p-8 rounded-2xl bg-primary text-primary-foreground">
          <FileCheck className="w-10 h-10 mx-auto mb-4 text-accent" />
          <h3 className="font-serif text-2xl mb-3">Wir übernehmen die Abrechnung</h3>
          <p className="text-primary-foreground/80 mb-6">
            Sie müssen sich um nichts kümmern. Wir rechnen direkt mit Ihrer Pflegekasse ab – transparent und unkompliziert.
          </p>
          <Link
            to="/kontakt"
            className="bg-accent text-accent-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            Kostenlose Beratung <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
    </>
  );
};

export default Abrechnung;
