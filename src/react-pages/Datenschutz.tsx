import SEO from "@/components/SEO";

const Datenschutz = () => (
  <>
    <SEO title="Datenschutz" description="Datenschutzerklärung der Positana Pflege Hildesheim gemäß DSGVO." noindex />
    <section className="py-20">
    <div className="container mx-auto px-4 max-w-3xl">
      <h1 className="font-serif text-4xl md:text-5xl mb-8">Datenschutzerklärung</h1>

      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <p>
          Im Folgenden informieren wir Sie über die Erhebung, Verarbeitung und Nutzung personenbezogener Daten (nachfolgend „Daten") im Rahmen der Nutzung unserer Website und der damit verbundenen Online-Dienste. Die verwendeten Begrifflichkeiten entsprechen den Definitionen des Art. 4 DSGVO.
        </p>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Verantwortliche Stelle</h2>
          <p>Dr. Anthony Blenn</p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Datenschutzbeauftragter</h2>
          <p>
            Martin Lange<br />
            Teichstr. 23<br />
            31141 Hildesheim<br />
            Tel.: 05121 206 900 0<br />
            E-Mail: <a href="mailto:daten@positana.com" className="text-accent hover:underline">daten@positana.com</a>
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Rechte der betroffenen Personen</h2>
          <p className="mb-2">Sie haben gemäß DSGVO folgende Rechte:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Auskunft über die bei uns gespeicherten Daten (Art. 15 DSGVO),</li>
            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
            <li>Löschung Ihrer Daten (Art. 17 DSGVO),</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO),</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO),</li>
            <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO).</li>
          </ul>
          <p className="mt-2">
            Darüber hinaus haben Sie das Recht, Beschwerde bei der zuständigen Aufsichtsbehörde einzureichen (Art. 77 DSGVO). Eine Übersicht der Aufsichtsbehörden finden Sie hier:{" "}
            <a href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">
              https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Zwecke der Verarbeitung</h2>
          <p className="mb-2">Wir verarbeiten personenbezogene Daten ausschließlich zu folgenden Zwecken:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Bereitstellung und Betrieb unseres Onlineangebotes,</li>
            <li>Bearbeitung von Kontaktanfragen und Kommunikation mit Nutzern,</li>
            <li>Vertragserfüllung und Serviceleistungen,</li>
            <li>Sicherheit und Stabilität der Systeme, Gefahrenabwehr,</li>
            <li>Reichweitenmessung, Optimierung und ggf. Marketing.</li>
          </ul>
          <p className="mt-2">
            Eine Weitergabe an Dritte erfolgt nur bei gesetzlicher Grundlage, auf Basis berechtigter Interessen, zur Vertragserfüllung oder aufgrund Ihrer ausdrücklichen Einwilligung.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Rechtsgrundlagen</h2>
          <p>
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a (Einwilligung), b (Vertrag), c (rechtliche Verpflichtung) und f (berechtigtes Interesse) DSGVO.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Übermittlung in Drittländer</h2>
          <p>
            Eine Verarbeitung von Daten in Drittländern (außerhalb EU/EWR) erfolgt nur bei Vorliegen der gesetzlichen Voraussetzungen gemäß Art. 44 ff. DSGVO, z. B. durch EU-Standardvertragsklauseln oder das EU-US Data Privacy Framework.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Hosting</h2>
          <p>
            Unsere Website wird bei folgendem Anbieter gehostet:
          </p>
          <p className="mt-2">
            Lovable (Lovable Technologies AB)<br />
            Stockholm, Schweden<br />
            Datenschutzerklärung:{" "}
            <a href="https://lovable.dev/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              https://lovable.dev/privacy
            </a>
          </p>
          <p className="mt-2">
            Die Domain wird über SiteGround Spain S.L. (Calle de Prim 19, 28004 Madrid, Spanien) verwaltet.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Erfassung von Zugriffsdaten (Server-Logfiles)</h2>
          <p className="mb-2">
            Beim Besuch unserer Website erhebt der Hostinganbieter automatisch Daten („Server-Logfiles"), darunter:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>aufgerufene Seite/Datei, Datum und Uhrzeit,</li>
            <li>übertragene Datenmenge, Statusmeldungen,</li>
            <li>Browsertyp und -version, Betriebssystem,</li>
            <li>Referrer-URL, IP-Adresse und anfragender Provider.</li>
          </ul>
          <p className="mt-2">
            Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO zur Sicherstellung der Funktionsfähigkeit, Sicherheit und Optimierung unseres Onlineangebots.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Cookies</h2>
          <p>
            Unsere Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Cookies können Sitzungs-Cookies (werden beim Schließen des Browsers gelöscht), persistente Cookies (bleiben gespeichert) oder Drittanbieter-Cookies sein.
          </p>
          <p className="mt-2">
            Sie können Cookies in den Browsereinstellungen jederzeit deaktivieren; dies kann jedoch zu Funktionseinschränkungen führen.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Kontaktaufnahme</h2>
          <p>
            Bei einer Kontaktaufnahme per E-Mail oder Kontaktformular verarbeiten wir die von Ihnen angegebenen Daten (z. B. Name, E-Mail, Telefonnummer) zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO). Die Daten werden gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten bestehen.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Eingebundene Dienste</h2>
          <h3 className="font-semibold text-foreground mt-4 mb-1">Google Webfonts</h3>
          <p>
            Zur einheitlichen Darstellung nutzen wir Google Webfonts. Beim Abruf wird eine Verbindung zu Google hergestellt. Datenschutzerklärung:{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              https://policies.google.com/privacy
            </a>
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">SSL-/TLS-Verschlüsselung</h2>
          <p>
            Zur Sicherheit nutzen wir eine aktuelle SSL-/TLS-Verschlüsselung (HTTPS).
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Löschung von Daten</h2>
          <p>
            Daten werden gelöscht, sobald der Verarbeitungszweck entfällt und keine gesetzlichen Aufbewahrungspflichten (i. d. R. 6–10 Jahre) entgegenstehen.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Änderung der Datenschutzerklärung</h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen. Es gilt die jeweils aktuelle Version auf unserer Website.
          </p>
        </div>
      </div>
    </div>
  </section>
  </>
);

export default Datenschutz;
