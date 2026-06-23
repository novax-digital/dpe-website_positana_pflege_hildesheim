import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SEO from "@/components/SEO";

const faqs = [
  {
    q: "Welche Pflegeleistungen bieten Sie an?",
    a: "Wir bieten ein umfassendes Spektrum an Pflege- und Betreuungsleistungen: Grundpflege (z. B. Körperpflege, Mobilisation), Behandlungspflege (z. B. Medikamentengabe, Wundversorgung, Injektionen), Verhinderungspflege, Alltagsbegleitung sowie Betreutes Wohnen in der Theaterresidenz Hildesheim. Gerne stellen wir Ihnen ein individuelles Pflegekonzept zusammen.",
  },
  {
    q: "Entstehen für mich Kosten?",
    a: "Die meisten unserer Leistungen rechnen wir direkt mit Ihrer Pflegekasse oder Krankenkasse ab. Je nach Pflegegrad stehen Ihnen Pflegesachleistungen (§ 36 SGB XI), der Entlastungsbetrag (§ 45b SGB XI) und die Verhinderungspflege (§ 39 SGB XI) zu. In vielen Fällen entstehen damit keine oder nur geringe Eigenkosten. Wir beraten Sie transparent zu Ihren individuellen Ansprüchen.",
  },
  {
    q: "Brauche ich einen Pflegegrad?",
    a: "Für viele Leistungen ist ein Pflegegrad Voraussetzung. Falls Sie noch keinen haben, unterstützen wir Sie gerne bei der Antragstellung und bereiten Sie auf den Begutachtungstermin durch den Medizinischen Dienst (MD) vor. Behandlungspflege auf ärztliche Verordnung sowie Selbstzahler-Leistungen sind auch ohne Pflegegrad möglich.",
  },
  {
    q: "Wie schnell kann die Pflege starten?",
    a: "Nach einem ersten Beratungsgespräch – gerne bei Ihnen zu Hause – erstellen wir zeitnah ein individuelles Pflegeangebot. In dringenden Fällen, z. B. nach einem Krankenhausaufenthalt, kann die Versorgung oft innerhalb weniger Tage beginnen. Rufen Sie uns einfach an, wir finden gemeinsam eine schnelle Lösung.",
  },
  {
    q: "Bekomme ich immer die gleiche Pflegekraft?",
    a: "Ja, feste Bezugspflegekräfte sind uns sehr wichtig. Vertrauen, Kontinuität und persönliche Nähe sind die Basis guter Pflege. Bei Urlaub oder Krankheit sorgen wir innerhalb unseres Teams für eine zuverlässige und gut eingearbeitete Vertretung.",
  },
  {
    q: "Was ist der Unterschied zwischen Grund- und Behandlungspflege?",
    a: "Grundpflege (SGB XI) umfasst Körperpflege, Ernährung und Mobilität und wird über die Pflegekasse abgerechnet. Behandlungspflege (SGB V) umfasst medizinische Tätigkeiten wie Medikamentengabe, Injektionen, Verbandswechsel oder Kompressionstherapie – sie wird vom Arzt verordnet und über die Krankenkasse abgerechnet.",
  },
  {
    q: "Wie funktioniert das Betreute Wohnen in der Theaterresidenz?",
    a: "In der Theaterresidenz Hildesheim verbinden Sie selbstbestimmtes Wohnen in einer barrierefreien Wohnung mit der Sicherheit einer ambulanten Pflege vor Ort. Sie entscheiden selbst, welche Leistungen Sie in Anspruch nehmen – von hauswirtschaftlicher Unterstützung bis zur umfassenden pflegerischen Versorgung.",
  },
  {
    q: "Können Angehörige die Pflege für ihre Eltern organisieren?",
    a: "Selbstverständlich. Viele Anfragen kommen von Töchtern, Söhnen oder Partnern, die sich um eine gute Versorgung ihrer Liebsten kümmern. Wir nehmen uns Zeit für ein ausführliches Gespräch, beraten zu Pflegegraden und Leistungen und entlasten Sie bei allen organisatorischen Schritten.",
  },
];

const FAQ = () => {
  useScrollAnimation();

  return (
    <>
      <SEO title="Häufige Fragen (FAQ)" description="Antworten auf häufige Fragen zu Pflege, Pflegegrad, Behandlungspflege, Betreutes Wohnen und Abrechnung in Hildesheim. Positana Pflege klärt auf." />
      <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-section">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Häufige Fragen</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Hier finden Sie Antworten auf die wichtigsten Fragen rund um unsere Leistungen.
          </p>
        </div>

        <div className="max-w-2xl mx-auto fade-in-section">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-6 data-[state=open]:border-accent/30">
                <AccordionTrigger className="text-left text-lg hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
    </>
  );
};

export default FAQ;
