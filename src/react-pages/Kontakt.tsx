import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SEO from "@/components/SEO";

const Kontakt = () => {
  useScrollAnimation();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setSubmitError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message ?? "Nachricht konnte nicht gesendet werden.");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Nachricht konnte nicht gesendet werden.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Kontakt" description="Kontaktieren Sie Positana Pflege in Hildesheim. Kostenlose Beratung unter 0176 19312010 oder per Kontaktformular." />
      <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-section">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Kontakt</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Wir freuen uns auf Ihre Nachricht. Rufen Sie uns an oder schreiben Sie uns – wir beraten Sie gerne.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit} className="fade-in-section lg:col-span-3 space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-1.5">E-Mail *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Telefon</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">Nachricht *</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 transition resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-accent text-accent-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {submitting ? "Wird gesendet..." : "Nachricht senden"}
            </button>
            {submitted && (
              <p className="text-sm text-primary">
                Vielen Dank. Ihre Nachricht wurde gesendet.
              </p>
            )}
            {submitError && <p className="text-sm text-destructive">{submitError}</p>}
          </form>

          {/* Info */}
          <div className="fade-in-section lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl border border-border space-y-5">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Telefon</p>
                  <a href="tel:017619312010" className="text-muted-foreground hover:text-accent transition-colors block">0176 19312010</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">E-Mail</p>
                  <a href="mailto:info@positana-pflege-hildesheim.de" className="text-muted-foreground hover:text-accent transition-colors">
                    info@positana-pflege-hildesheim.de
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Adresse</p>
                  <p className="text-muted-foreground">Brückenstr. 3<br />31180 Giesen</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Öffnungszeiten</p>
                  <p className="text-muted-foreground">Mo – Fr: 8:00 – 14:00 Uhr</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Kontakt;
