import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  HeartPulse,
  HelpCircle,
  MapPin,
  Phone,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import heroImg from "@/assets/hero.webp";
import SEO from "@/components/SEO";
import { getRelatedLandingPages, type LandingPage } from "@/lib/landing-pages";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface SeoLandingPageProps {
  landingPage?: LandingPage | null;
}

const processSteps = [
  {
    icon: Phone,
    title: "Beratung anfragen",
    text: "Sie schildern kurz die Situation, den Ort, vorhandene Unterlagen und den gewünschten Unterstützungsumfang.",
  },
  {
    icon: ClipboardCheck,
    title: "Bedarf klären",
    text: "Wir besprechen Pflegegrad, ärztliche Verordnungen, Einsatzzeiten, Angehörigenentlastung und Abrechnung.",
  },
  {
    icon: HeartPulse,
    title: "Versorgung planen",
    text: "Wenn Kapazität und Bedarf zusammenpassen, stimmen wir die nächsten Schritte und den Start der Pflege ab.",
  },
];

const trustItems = [
  { icon: ShieldCheck, title: "Seit 1993", text: "Erfahrung in Pflege, Betreuung und Begleitung." },
  { icon: Wallet, title: "Direkte Abrechnung", text: "Beratung zu Pflegekasse, Krankenkasse und Eigenanteilen." },
  { icon: BadgeCheck, title: "Persönlich geplant", text: "Pflege, die zu Alltag, Zuhause und Angehörigen passt." },
];

const SeoLandingPage = ({ landingPage }: SeoLandingPageProps) => {
  useScrollAnimation();

  if (!landingPage) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <SEO title="Pflegeseite nicht gefunden" description="Die angeforderte Pflegeseite konnte nicht gefunden werden." noindex />
          <h1 className="font-serif text-4xl mb-4">Seite nicht gefunden</h1>
          <p className="text-muted-foreground mb-8">Diese Pflege-Landingpage ist nicht verfügbar.</p>
          <Link to="/kontakt" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground">
            Beratung anfragen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  const relatedPages = getRelatedLandingPages(landingPage);

  return (
    <>
      <SEO title={landingPage.seoTitle} description={landingPage.description} />

      <section className="relative min-h-[70vh] overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src={heroImg.src}
            width={1600}
            height={1067}
            alt="Pflegekraft begleitet eine Seniorin im Alltag"
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(192,100%,20%,0.9)] via-[hsl(192,100%,24%,0.68)] to-[hsl(192,100%,24%,0.18)]" />
        </div>

        <div className="container relative z-10 mx-auto flex min-h-[70vh] items-center px-4 py-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              <MapPin className="h-4 w-4" />
              {landingPage.eyebrow}
            </div>
            <h1 className="mb-6 font-serif text-4xl leading-tight md:text-6xl">{landingPage.h1}</h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">{landingPage.lead}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-lg font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                Beratung anfragen <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="tel:017619312010"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 text-lg transition-colors hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                0176 19312010
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {trustItems.map((item) => (
              <div key={item.title} className="fade-in-section flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-xl">{item.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="fade-in-section">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-accent">{landingPage.primaryKeyword}</p>
              <h2 className="mb-5 font-serif text-3xl leading-tight md:text-4xl">Pflege, die zu Ihrer Situation passt</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{landingPage.intro}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {landingPage.highlights.map((highlight) => (
                <div key={highlight} className="fade-in-section rounded-xl border border-border bg-card p-5">
                  <CheckCircle2 className="mb-4 h-6 w-6 text-accent" />
                  <p className="font-semibold leading-snug">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {landingPage.sections.map((section) => (
              <article key={section.title} className="fade-in-section rounded-xl border border-border p-7">
                <h2 className="mb-4 font-serif text-2xl">{section.title}</h2>
                <p className="leading-relaxed text-muted-foreground">{section.body}</p>
                {section.items && (
                  <ul className="mt-5 space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="fade-in-section">
              <h2 className="mb-5 font-serif text-3xl md:text-4xl">Wann Unterstützung sinnvoll wird</h2>
              <p className="mb-8 leading-relaxed text-muted-foreground">
                Pflege beginnt oft nicht mit einem großen Einschnitt. Meist sind es mehrere kleine Veränderungen, die zeigen,
                dass professionelle Hilfe entlasten und Sicherheit zurückbringen kann.
              </p>
              <ul className="space-y-4">
                {landingPage.situations.map((situation) => (
                  <li key={situation} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span>{situation}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              {processSteps.map((step) => (
                <div key={step.title} className="fade-in-section rounded-xl bg-background p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                      <step.icon className="h-5 w-5 text-accent" />
                    </div>
                    <h2 className="font-serif text-xl">{step.title}</h2>
                  </div>
                  <p className="leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center fade-in-section">
            <h2 className="mb-4 font-serif text-3xl md:text-4xl">Häufige Fragen</h2>
            <p className="text-muted-foreground">
              Die wichtigsten Antworten zur Pflegeplanung, Finanzierung und Organisation.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {landingPage.faqs.map((faq) => (
              <article key={faq.question} className="fade-in-section rounded-xl border border-border p-6">
                <div className="mb-3 flex items-start gap-3">
                  <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <h2 className="font-serif text-xl">{faq.question}</h2>
                </div>
                <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="fade-in-section max-w-2xl">
              <h2 className="mb-3 font-serif text-3xl md:text-4xl">Weitere passende Pflegeseiten</h2>
              <p className="text-muted-foreground">
                Mehr Informationen zu Leistungen und Versorgung im Landkreis Hildesheim.
              </p>
            </div>
            <Link to="/leistungen" className="fade-in-section inline-flex items-center gap-2 font-semibold text-accent">
              Alle Leistungen ansehen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPages.map((related) => (
              <Link
                key={related.slug}
                to={`/pflege/${related.slug}`}
                className="fade-in-section rounded-xl border border-border p-5 transition-colors hover:border-accent/50"
              >
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-accent">
                  {related.kind === "location" ? "PFLEGE VOR ORT" : "Leistung"}
                </p>
                <h3 className="font-serif text-xl leading-snug">{related.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center fade-in-section">
          <h2 className="mb-4 font-serif text-3xl md:text-4xl">Pflegeberatung persönlich klären</h2>
          <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/80">
            Ein kurzes Gespräch reicht oft, um die nächsten Schritte zu sortieren. Wir beraten zu Bedarf,
            Leistungen, Pflegegrad und möglichem Start der Versorgung.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-lg font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Kontakt aufnehmen <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="tel:017619312010"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-8 py-4 text-lg transition-colors hover:bg-primary-foreground/10"
            >
              <Phone className="h-5 w-5" />
              0176 19312010
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default SeoLandingPage;
