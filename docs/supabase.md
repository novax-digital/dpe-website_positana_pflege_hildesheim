# Supabase Backend

Das Backend orientiert sich an der Lovable-Codebase und nutzt dieselben Kernobjekte:

- `blog_posts` für den Ratgeber
- `job_listings` für Stellenanzeigen
- `contact_messages` für Kontaktanfragen
- `job_applications` für Bewerbungen
- privater Storage-Bucket `resumes` für Bewerbungsdateien
- öffentlicher Storage-Bucket `blog-images` für Ratgeber-Beitragsbilder

## Environment

```bash
PUBLIC_SUPABASE_URL=https://dein-projekt.supabase.co
PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_DB_URL=postgres://postgres.PROJECT_REF:PASSWORT@REGION.pooler.supabase.com:5432/postgres
SUPABASE_RESUME_BUCKET=resumes
RESEND_API_KEY=...
RESEND_FROM_EMAIL=Positana Pflege <kontakt@positana-pflege-hildesheim.de>
RESEND_NOTIFICATION_EMAIL=info@positana-pflege-hildesheim.de
ADMIN_EMAIL=p.polley@deutsche-pflegeentwicklung.de
ADMIN_PASSWORD=...
```

`SUPABASE_SERVICE_ROLE_KEY` ist server-only und darf nicht in Client-Code landen. Auf Vercel gehört er in die Environment Variables des Projekts.

`SUPABASE_DB_URL` wird nur für das initiale Setup gebraucht. Du findest sie im Supabase Dashboard unter **Connect** als Session-Pooler-Connection-String. Dafür wird das Datenbankpasswort benötigt, nicht das Admin-Login-Passwort der Website.

Für E-Mail-Benachrichtigungen wird Resend genutzt. `RESEND_API_KEY`, `RESEND_FROM_EMAIL` und `RESEND_NOTIFICATION_EMAIL` müssen in Vercel als Environment Variables gesetzt werden. Der Absender sollte eine in Resend verifizierte Domain verwenden. Wenn Resend nicht konfiguriert ist oder der Versand fehlschlägt, werden Kontaktanfragen und Bewerbungen trotzdem in Supabase gespeichert.

## Setup Ausführen

1. `.env.example` nach `.env` kopieren oder die Werte direkt lokal exportieren.
2. `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_URL` und `ADMIN_PASSWORD` setzen.
3. Setup starten:

```bash
npm run supabase:setup
```

Das Script führt alle SQL-Dateien aus `supabase/migrations` aus, prüft Tabellen und Bucket und legt danach den Admin-User an oder aktualisiert ihn.

Wenn nur Migrationen/Buckets geprüft werden sollen und der Admin-User unverändert bleiben soll:

```bash
SKIP_ADMIN_UPSERT=true npm run supabase:setup
```

## Datenmodell

Die SQL-Dateien liegen unter `supabase/migrations`. Sie stammen aus der Lovable-Basis, wurden aber für diese Astro-Version an zwei Stellen angepasst:

- Standard-Ort für Jobs ist `Hildesheim`.
- Kontaktanfragen, Bewerbungen und Datei-Uploads werden nicht öffentlich direkt in Supabase geschrieben, sondern über Astro-API-Routen validiert und mit Service-Role gespeichert.

## Routen

- `/ratgeber` liest veröffentlichte `blog_posts`.
- `/ratgeber/[slug]` liest einen veröffentlichten Beitrag über `slug`.
- `/karriere` liest veröffentlichte `job_listings`.
- `/api/contact` erstellt `contact_messages`.
- `/api/applications/upload-url` erstellt signierte Upload-Ziele für Dateien im Bucket `resumes`.
- `/api/applications` erstellt `job_applications` und speichert die Upload-Pfade im alten Lovable-Feld `resume_url`.

Nach erfolgreichem Speichern sendet `/api/contact` eine Benachrichtigung an `RESEND_NOTIFICATION_EMAIL`. `/api/applications` sendet ebenfalls eine Benachrichtigung und erzeugt für Bewerbungsdateien zeitlich begrenzte Downloadlinks.

## Bewerbungsdateien

Bewerbungsdateien laufen Vercel-tauglich:

1. Das Formular fragt pro Datei eine signierte Upload-URL an.
2. Der Browser lädt die Datei direkt zu Supabase Storage hoch.
3. Die Astro-API speichert danach nur die Storage-Pfade in `job_applications.resume_url`.

Damit umgehen wir das Vercel Function Body Limit für größere Uploads.

## Ratgeberbilder

Der Adminbereich lädt Beitragsbilder direkt in den öffentlichen Supabase-Storage-Bucket `blog-images` hoch. In `blog_posts` werden danach die öffentliche Bild-URL, der Alt-Text, der Autor und die geschätzte Lesedauer gespeichert. Die öffentliche Ratgeberseite nutzt diese Felder für Karten, Artikel-Hero, OpenGraph und `BlogPosting`-JSON-LD.
