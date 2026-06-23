import SEO from "@/components/SEO";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h2 className="font-serif text-xl text-foreground mb-2">{title}</h2>
    <div className="space-y-2">{children}</div>
  </div>
);

const Datenschutz = () => (
  <>
    <SEO title="Datenschutz" description="Datenschutzerklärung der Positana Pflege Hildesheim gemäß DSGVO." noindex />
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl mb-3">Datenschutzerklärung</h1>
        <p className="text-sm text-muted-foreground mb-8">Stand: 23. Juni 2026</p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <p>
            Im Folgenden informieren wir Sie darüber, welche personenbezogenen Daten wir beim Besuch
            dieser Website und bei der Nutzung unserer Online-Funktionen verarbeiten. Personenbezogene
            Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare Person
            beziehen.
          </p>

          <Section title="1. Verantwortlicher">
            <p>
              Positana Pflege Hildesheim<br />
              ein Standort der Positana GmbH<br />
              Brückenstr. 3<br />
              31180 Giesen
            </p>
            <p>
              Vertreten durch den Geschäftsführer Dr. Anthony Blenn.
            </p>
            <p>
              Telefon: <a href="tel:017619312010" className="text-accent hover:underline">0176 19312010</a><br />
              E-Mail: <a href="mailto:info@positana-pflege.de" className="text-accent hover:underline">info@positana-pflege.de</a>
            </p>
          </Section>

          <Section title="2. Datenschutzbeauftragter">
            <p>
              Martin Lange<br />
              Teichstr. 23<br />
              31141 Hildesheim<br />
              Telefon: 05121 206 900 0<br />
              E-Mail: <a href="mailto:daten@positana.com" className="text-accent hover:underline">daten@positana.com</a>
            </p>
          </Section>

          <Section title="3. Rechtsgrundlagen der Verarbeitung">
            <p>
              Wir verarbeiten personenbezogene Daten insbesondere auf Grundlage von Art. 6 Abs. 1 lit. b
              DSGVO, wenn dies zur Bearbeitung einer Anfrage, zur Durchführung vorvertraglicher Maßnahmen
              oder zur Vertragserfüllung erforderlich ist. Soweit wir gesetzliche Pflichten erfüllen müssen,
              erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Für den sicheren,
              stabilen und nutzerfreundlichen Betrieb der Website stützen wir uns auf Art. 6 Abs. 1 lit. f
              DSGVO. Soweit eine Einwilligung erforderlich ist, erfolgt die Verarbeitung auf Grundlage von
              Art. 6 Abs. 1 lit. a DSGVO.
            </p>
            <p>
              Bewerbungsdaten verarbeiten wir zur Entscheidung über die Begründung eines
              Beschäftigungsverhältnisses zusätzlich auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO und,
              soweit anwendbar, § 26 BDSG. Enthalten Bewerbungsunterlagen besondere Kategorien
              personenbezogener Daten, verarbeiten wir diese nur, soweit dies rechtlich zulässig und für das
              Bewerbungsverfahren erforderlich ist.
            </p>
          </Section>

          <Section title="4. Hosting und technische Bereitstellung über Vercel">
            <p>
              Diese Website wird mit Astro betrieben und über Vercel bereitgestellt. Anbieter ist Vercel Inc.,
              440 N Barranca Ave #4133, Covina, CA 91723, USA.
            </p>
            <p>
              Beim Aufruf der Website verarbeitet der Hostinganbieter technisch erforderliche Zugriffsdaten.
              Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des Abrufs, angeforderte URL,
              Referrer-URL, Browsertyp, Betriebssystem, übertragene Datenmenge und Statuscodes gehören.
            </p>
            <p>
              Zweck der Verarbeitung ist die Auslieferung der Website, die Sicherstellung der Stabilität und
              Sicherheit sowie die Fehleranalyse. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser
              berechtigtes Interesse liegt im sicheren und zuverlässigen Betrieb unseres Online-Angebots.
            </p>
            <p>
              Eine Übermittlung in die USA kann nicht ausgeschlossen werden. Soweit erforderlich, erfolgt
              diese auf Grundlage geeigneter Garantien gemäß Art. 44 ff. DSGVO, insbesondere
              EU-Standardvertragsklauseln und ergänzender Schutzmaßnahmen.
            </p>
          </Section>

          <Section title="5. Kontaktformular und Kontaktaufnahme">
            <p>
              Wenn Sie uns über das Kontaktformular, per E-Mail oder telefonisch kontaktieren, verarbeiten
              wir die von Ihnen angegebenen Daten zur Bearbeitung Ihrer Anfrage. Beim Kontaktformular sind
              dies Name, E-Mail-Adresse und Nachricht; die Telefonnummer kann freiwillig angegeben werden.
            </p>
            <p>
              Die Daten werden über eine Astro-API-Route validiert und in unserer Supabase-Datenbank als
              Kontaktanfrage gespeichert. Zusätzlich wird eine interne E-Mail-Benachrichtigung über Resend
              ausgelöst, damit wir Ihre Anfrage zeitnah bearbeiten können.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf eine Beratung,
              vorvertragliche Maßnahmen oder eine Leistung gerichtet ist. Im Übrigen erfolgt die Verarbeitung
              auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in der
              effizienten Bearbeitung eingehender Anfragen.
            </p>
          </Section>

          <Section title="6. Bewerbungsformular und Bewerbungsdateien">
            <p>
              Wenn Sie sich über das Bewerbungsformular bewerben, verarbeiten wir die von Ihnen
              eingegebenen Daten. Dazu gehören die ausgewählte Stelle, Name, Telefonnummer,
              E-Mail-Adresse, ein optionaler Bewerbungstext sowie optional hochgeladene Dateien wie
              Lebenslauf oder Bewerbungsunterlagen.
            </p>
            <p>
              Dateien werden über eine signierte Upload-URL direkt in einen privaten Supabase-Storage-Bucket
              hochgeladen. Zugelassen sind PDF-, DOC- und DOCX-Dateien mit maximal 20 MB pro Datei und
              maximal fünf Dateien. In der Datenbank speichern wir die Bewerbung und die zugehörigen
              Speicherpfade. Für interne Benachrichtigungen erzeugen wir zeitlich begrenzte Downloadlinks.
            </p>
            <p>
              Zweck der Verarbeitung ist die Durchführung des Bewerbungsverfahrens. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. b DSGVO und, soweit anwendbar, § 26 BDSG. Bitte übermitteln Sie keine
              besonderen Kategorien personenbezogener Daten, sofern diese für Ihre Bewerbung nicht
              erforderlich sind.
            </p>
            <p>
              Bewerbungsdaten löschen wir grundsätzlich nach Abschluss des Bewerbungsverfahrens, sobald
              sie nicht mehr benötigt werden und keine gesetzlichen Aufbewahrungspflichten oder berechtigten
              Interessen entgegenstehen. In der Regel erfolgt die Löschung spätestens sechs Monate nach
              Abschluss des Bewerbungsverfahrens, sofern keine Einstellung erfolgt und keine längere
              Speicherung vereinbart wurde.
            </p>
          </Section>

          <Section title="7. Supabase als Backend, Datenbank, Authentifizierung und Storage">
            <p>
              Wir nutzen Supabase als Backend-Dienst für Ratgeberbeiträge, Stellenanzeigen, Kontaktanfragen,
              Bewerbungen, Admin-Zugänge und den privaten Datei-Speicher für Bewerbungsunterlagen. Anbieter
              ist Supabase Inc., USA.
            </p>
            <p>
              In Supabase werden je nach Funktion folgende Daten verarbeitet: veröffentlichte Inhalte der
              Website, Kontaktanfragen, Bewerbungsdaten, Bewerbungsdateien bzw. Speicherpfade,
              Admin-Benutzerkonten, Rollen sowie technische Authentifizierungsdaten.
            </p>
            <p>
              Der Adminbereich ist nicht öffentlich. Für angemeldete Administratoren speichert Supabase Auth
              technisch erforderliche Sitzungsinformationen im Browser, damit der Login aufrechterhalten und
              der Zugriff geschützt werden kann. Besucherinnen und Besucher der öffentlichen Website benötigen
              hierfür keinen Admin-Account.
            </p>
            <p>
              Rechtsgrundlagen sind je nach Nutzung Art. 6 Abs. 1 lit. b, lit. c und lit. f DSGVO sowie bei
              Bewerbungen zusätzlich § 26 BDSG, soweit anwendbar. Eine Übermittlung in Drittländer kann nicht
              ausgeschlossen werden und erfolgt, soweit erforderlich, auf Grundlage geeigneter Garantien gemäß
              Art. 44 ff. DSGVO.
            </p>
          </Section>

          <Section title="8. E-Mail-Benachrichtigungen über Resend">
            <p>
              Für interne Benachrichtigungen zu Kontaktanfragen und Bewerbungen nutzen wir Resend. Anbieter
              ist Plus Five Five, Inc. („Resend"), USA.
            </p>
            <p>
              Bei Kontaktanfragen können Name, E-Mail-Adresse, Telefonnummer und Nachricht über Resend an
              interne Empfänger übermittelt werden. Bei Bewerbungen können Name, E-Mail-Adresse,
              Telefonnummer, ausgewählte Stelle, Bewerbungstext und zeitlich begrenzte Links zu
              Bewerbungsdateien verarbeitet werden.
            </p>
            <p>
              Resend wird auf dieser Website nicht für Newsletter oder werbliche Massenmailings eingesetzt,
              sondern für transaktionale Benachrichtigungen an unser Team. Rechtsgrundlagen sind Art. 6
              Abs. 1 lit. b und lit. f DSGVO. Eine Übermittlung in die USA kann nicht ausgeschlossen werden
              und erfolgt, soweit erforderlich, auf Grundlage geeigneter Garantien gemäß Art. 44 ff. DSGVO.
            </p>
          </Section>

          <Section title="9. Lokale Schriftarten">
            <p>
              Zur einheitlichen Darstellung der Website nutzen wir die Schriftarten DM Sans und Lora. Die
              Schriftdateien werden lokal auf unserem Webserver bereitgestellt und zusammen mit der Website
              ausgeliefert.
            </p>
            <p>
              Beim Laden der Schriftarten wird keine Verbindung zu Google Fonts, Google-Servern oder anderen
              externen Schriftanbieter-Servern hergestellt. Eine gesonderte Übermittlung personenbezogener
              Daten an Google findet durch die Schriftanzeige daher nicht statt.
            </p>
          </Section>

          <Section title="10. Cookies, Local Storage und Tracking">
            <p>
              Die öffentliche Website setzt nach aktuellem Stand keine Analyse- oder Marketing-Cookies und
              nutzt keine externen Trackingdienste wie Google Analytics, Meta Pixel oder vergleichbare
              Dienste.
            </p>
            <p>
              Im geschützten Adminbereich können technisch erforderliche Authentifizierungsinformationen durch
              Supabase im Browser gespeichert werden, insbesondere in Local Storage oder vergleichbaren
              Speichermechanismen. Diese Speicherung dient ausschließlich dazu, angemeldete Administratoren
              zu authentifizieren und den Adminbereich abzusichern.
            </p>
          </Section>

          <Section title="11. Empfänger und Auftragsverarbeiter">
            <p>
              Zugriff auf personenbezogene Daten erhalten nur die Stellen, die diese Daten zur Bearbeitung
              Ihrer Anfrage, Bewerbung oder zur technischen Betreuung benötigen. Zudem setzen wir technische
              Dienstleister ein, insbesondere Vercel, Supabase und Resend. Soweit diese Dienstleister in
              unserem Auftrag personenbezogene Daten verarbeiten, erfolgt dies auf Grundlage eines
              Auftragsverarbeitungsvertrages gemäß Art. 28 DSGVO, soweit erforderlich.
            </p>
          </Section>

          <Section title="12. Übermittlung in Drittländer">
            <p>
              Einige der eingesetzten Dienstleister haben ihren Sitz in den USA oder können Daten dort
              verarbeiten. Eine Übermittlung personenbezogener Daten in Staaten außerhalb der Europäischen
              Union bzw. des Europäischen Wirtschaftsraums erfolgt nur, wenn die Voraussetzungen der Art. 44 ff.
              DSGVO erfüllt sind, insbesondere durch einen Angemessenheitsbeschluss, EU-Standardvertragsklauseln
              oder andere geeignete Garantien.
            </p>
          </Section>

          <Section title="13. Speicherdauer und Löschung">
            <p>
              Wir speichern personenbezogene Daten nur so lange, wie dies für die jeweiligen Zwecke
              erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Kontaktanfragen löschen wir,
              sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen oder vertraglichen
              Aufbewahrungspflichten entgegenstehen.
            </p>
            <p>
              Daten, die aufgrund handels- oder steuerrechtlicher Pflichten aufzubewahren sind, werden für die
              gesetzlich vorgeschriebenen Fristen gespeichert und anschließend gelöscht. Bewerbungsdaten werden
              nach Maßgabe des Abschnitts zum Bewerbungsformular gelöscht.
            </p>
          </Section>

          <Section title="14. Datensicherheit">
            <p>
              Wir treffen technische und organisatorische Maßnahmen, um personenbezogene Daten gegen Verlust,
              Missbrauch, unbefugten Zugriff und unbefugte Offenlegung zu schützen. Die Übertragung der
              Website erfolgt verschlüsselt über HTTPS. Bewerbungsdateien werden in einem privaten
              Storage-Bucket gespeichert und nur über zeitlich begrenzte Links zugänglich gemacht.
            </p>
          </Section>

          <Section title="15. Ihre Rechte">
            <p>Sie haben nach Maßgabe der DSGVO insbesondere folgende Rechte:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Auskunft über die bei uns gespeicherten personenbezogenen Daten (Art. 15 DSGVO),</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
              <li>Löschung Ihrer Daten (Art. 17 DSGVO),</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO),</li>
              <li>Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO),</li>
              <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO).</li>
            </ul>
            <p>
              Zur Ausübung Ihrer Rechte können Sie sich jederzeit an uns oder unseren Datenschutzbeauftragten
              wenden.
            </p>
          </Section>

          <Section title="16. Beschwerderecht bei einer Aufsichtsbehörde">
            <p>
              Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Für Niedersachsen
              ist dies der Landesbeauftragte für den Datenschutz Niedersachsen.
            </p>
            <p>
              Online-Beschwerde:{" "}
              <a href="https://www.lfd.niedersachsen.de/beschwerde" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">
                https://www.lfd.niedersachsen.de/beschwerde
              </a>
            </p>
          </Section>

          <Section title="17. Keine automatisierte Entscheidungsfindung">
            <p>
              Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO
              findet über diese Website nicht statt.
            </p>
          </Section>

          <Section title="18. Änderungen dieser Datenschutzerklärung">
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich die technische Umsetzung
              der Website, eingesetzte Dienstleister oder rechtliche Anforderungen ändern. Es gilt die jeweils
              auf dieser Website veröffentlichte Fassung.
            </p>
          </Section>
        </div>
      </div>
    </section>
  </>
);

export default Datenschutz;
