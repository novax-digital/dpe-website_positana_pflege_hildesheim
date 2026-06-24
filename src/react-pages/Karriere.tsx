import { useState } from "react";
import {
  CheckCircle2, MapPin, Clock, Phone, Mail, Upload,
  Heart, Users, Car, Shield, BookOpen, ChevronDown, ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SEO from "@/components/SEO";
import { supabaseBrowser } from "@/lib/supabase.browser";
import type { JobListing } from "@/lib/supabase-schema";

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const MAX_FILES = 5;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

const benefits = [
  { icon: Shield, text: "Sozialversicherungspflichtige Anstellung in Voll-, Teilzeit oder auf Minijob-Basis" },
  { icon: Car, text: "Dienstwagen, der auch privat genutzt werden kann" },
  { icon: Heart, text: "Attraktive, faire Vergütung" },
  { icon: MapPin, text: "Feste Einsatzgebiete in Wohnortnähe" },
  { icon: Users, text: "Wertschätzender Umgang und persönliche Ansprechpartner" },
  { icon: BookOpen, text: "Sorgfältige Einarbeitung und kontinuierliche Unterstützung" },
  { icon: CheckCircle2, text: "Sinnstiftende Tätigkeit mit direkter Anerkennung durch unsere Kunden" },
];

const hasAllowedExtension = (filename: string) => {
  const lowerName = filename.toLowerCase();
  return ALLOWED_EXTENSIONS.some((extension) => lowerName.endsWith(extension));
};

type UploadTarget = {
  bucket: string;
  path: string;
  token: string;
};

const Karriere = ({ jobs = [] }: { jobs?: JobListing[] }) => {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    job_listing_id: "",
    name: "",
    phone: "",
    email: "",
    cover_text: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setSubmitError("");
    setSubmitting(true);

    try {
      const resumePaths: string[] = [];

      if (files.length > 0) {
        if (!supabaseBrowser) {
          throw new Error("Supabase ist noch nicht konfiguriert.");
        }

        for (const file of files) {
          const uploadResponse = await fetch("/api/applications/upload-url", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              filename: file.name,
              size: file.size,
            }),
          });

          const uploadTarget = await uploadResponse.json().catch(() => null) as UploadTarget | { message?: string } | null;
          if (!uploadResponse.ok || !uploadTarget || !("path" in uploadTarget)) {
            const message = uploadTarget && "message" in uploadTarget
              ? uploadTarget.message
              : "Upload konnte nicht vorbereitet werden.";
            throw new Error(message ?? "Upload konnte nicht vorbereitet werden.");
          }

          const { error: uploadError } = await supabaseBrowser.storage
            .from(uploadTarget.bucket)
            .uploadToSignedUrl(uploadTarget.path, uploadTarget.token, file, {
              contentType: file.type || undefined,
            });

          if (uploadError) {
            throw new Error("Datei konnte nicht hochgeladen werden.");
          }

          resumePaths.push(uploadTarget.path);
        }
      }

      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          resume_paths: resumePaths,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message ?? "Bewerbung konnte nicht gesendet werden.");
      }

      setSubmitted(true);
      setForm({ job_listing_id: "", name: "", phone: "", email: "", cover_text: "" });
      setFiles([]);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Bewerbung konnte nicht gesendet werden.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <SEO title="Karriere" description="Pflegejobs bei Positana Pflege Hildesheim. Bewerben Sie sich als Pflegefachkraft, Pflegehilfskraft oder Alltagsbegleiter:in – flexible Arbeitszeiten, faire Vergütung." />
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-sm uppercase tracking-widest mb-4 opacity-80">Pflegejobs</p>
          <h1 className="font-serif text-4xl md:text-5xl mb-6">Pflege mit Herz und Haltung</h1>
          <p className="text-lg leading-relaxed opacity-90 max-w-2xl mx-auto">
            Die Positana Pflege Hildesheim ist Teil der Positana GmbH – eines inhabergeführten
            Unternehmens mit langjähriger Erfahrung in der stationären und ambulanten Pflege- und Betreuungsbranche.
            Werden Sie Teil eines Teams, in dem Menschlichkeit und Fachkompetenz zusammengehören.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-lg leading-relaxed text-muted-foreground">
            In unserer Hildesheimer Filiale arbeiten ortsansässige Pflegekräfte für Seniorinnen und Senioren
            sowie Menschen mit Pflegegrad. Ob in der Grund- und Behandlungspflege, in der Alltagsbegleitung
            oder im Betreuten Wohnen in der Theaterresidenz – Sie leisten einen wertvollen Beitrag zur
            Lebensqualität unserer Kundinnen und Kunden. Vertrauen, Menschlichkeit und fachliche
            Leistungsbereitschaft sind die Werte, die uns leiten.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-3xl mb-10 text-center">Ihre Vorteile bei uns</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-background">
                <b.icon className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-3xl mb-10 text-center">Aktuelle Stellen</h2>
          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedJob(expandedJob === String(job.id) ? null : String(job.id))}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <h3 className="font-serif text-xl mb-1">{job.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {job.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>}
                        {job.employment_type && <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{job.employment_type}</span>}
                      </div>
                    </div>
                    {expandedJob === String(job.id) ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                  {expandedJob === String(job.id) && job.description && (
                    <div className="px-6 pb-6 border-t border-border pt-4">
                      <div className="prose prose-sm max-w-none whitespace-pre-line text-muted-foreground">
                        {job.description}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Derzeit keine offenen Stellen.</p>
          )}
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-card" id="bewerben">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-serif text-3xl mb-2 text-center">Jetzt bewerben</h2>
          <p className="text-center text-muted-foreground mb-8">
            Haben wir Ihr Interesse geweckt? Dann freuen wir uns auf Ihre Bewerbung – gerne unkompliziert
            telefonisch, per E-Mail oder über das Formular.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 text-sm">
            <a href="tel:017619312010" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
              <Phone className="h-4 w-4" /> 0176 19312010
            </a>
            <a href="mailto:info@positana-pflege-hildesheim.de" className="flex items-center gap-2 text-primary hover:text-accent transition-colors">
              <Mail className="h-4 w-4" /> info@positana-pflege-hildesheim.de
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 bg-background rounded-2xl p-6 md:p-8 border border-border">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Für welche Stelle möchten Sie sich bewerben?</label>
              <Select value={form.job_listing_id} onValueChange={(v) => setForm({ ...form, job_listing_id: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Bitte wählen…" />
                </SelectTrigger>
                <SelectContent>
                  {jobs.map((j) => (
                    <SelectItem key={j.id} value={String(j.id)}>{j.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Vor-/Nachname *</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Telefonnummer *</label>
              <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">E-Mail *</label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Bewerbung / Kurzlebenslauf</label>
              <div className="border border-input rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  multiple
                  className="hidden"
                  id="resume-upload"
                  onChange={(e) => {
                    const selected = Array.from(e.target.files || []);
                    const oversized = selected.find((f) => f.size > MAX_FILE_SIZE);
                    const unsupported = selected.find((f) => !hasAllowedExtension(f.name));

                    if (oversized) {
                      setFileError(`"${oversized.name}" ist zu groß (max. 20 MB).`);
                      return;
                    }

                    if (unsupported) {
                      setFileError(`"${unsupported.name}" hat ein nicht unterstütztes Dateiformat.`);
                      return;
                    }

                    if (files.length + selected.length > MAX_FILES) {
                      setFileError(`Bitte laden Sie maximal ${MAX_FILES} Dateien hoch.`);
                      return;
                    }

                    setFileError("");
                    setFiles((prev) => [...prev, ...selected]);
                    e.target.value = "";
                  }}
                />
                <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Upload className="h-6 w-6" />
                  <span className="text-sm">Dateien auswählen (PDF, DOC, DOCX – max. 20 MB pro Datei)</span>
                </label>
              </div>
              {fileError && <p className="mt-2 text-sm text-destructive">{fileError}</p>}
              {files.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {files.map((f, i) => (
                    <li key={i} className="flex items-center justify-between text-sm bg-muted rounded px-3 py-1.5">
                      <span className="truncate">{f.name}</span>
                      <button
                        type="button"
                        className="text-destructive hover:underline text-xs ml-2 shrink-0"
                        onClick={() => setFiles(files.filter((_, j) => j !== i))}
                      >
                        Entfernen
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Persönlicher Bewerbungstext</label>
              <Textarea
                rows={5}
                value={form.cover_text}
                onChange={(e) => setForm({ ...form, cover_text: e.target.value })}
                placeholder="Erzählen Sie uns etwas über sich…"
              />
            </div>

            <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:opacity-90" disabled={submitting}>
              {submitting ? "Wird gesendet..." : "Bewerbung absenden"}
            </Button>
            {submitted && (
              <p className="text-sm text-primary text-center">
                Vielen Dank für Ihre Bewerbung. Wir melden uns zeitnah bei Ihnen.
              </p>
            )}
            {submitError && <p className="text-sm text-destructive text-center">{submitError}</p>}
          </form>
        </div>
      </section>
    </div>
  );
};

export default Karriere;
