import SEO from "@/components/SEO";

const Impressum = () => (
  <>
    <SEO title="Impressum" description="Impressum von Positana Pflege Hildesheim." noindex />
    <section className="py-20">
    <div className="container mx-auto px-4 max-w-3xl">
      <h1 className="font-serif text-4xl md:text-5xl mb-8">Impressum</h1>

      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Angaben gemäß § 5 TMG</h2>
          <p>
            Positana Pflege Hildesheim<br />
            ein Standort der Positana GmbH
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Adresse (Firmenanschrift)</h2>
          <p>Brückenstr. 3<br />31180 Giesen</p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Geschäftsführer</h2>
          <p>Dr. Anthony Blenn</p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Kontakt</h2>
          <p>
            Telefon: <a href="tel:017619312010" className="text-accent hover:underline">0176 19312010</a><br />
            E-Mail: <a href="mailto:info@positana-pflege.de" className="text-accent hover:underline">info@positana-pflege.de</a>
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Handelsregister</h2>
          <p>
            Die Positana GmbH ist im Handelsregister des Amtsgerichts Hildesheim unter der Nr. HRB 200714 eingetragen.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p className="mt-2">
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
          </p>
          <p className="mt-2">
            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
          <p className="mt-2">
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-foreground mb-2">Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">https://ec.europa.eu/consumers/odr/</a>.
            Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </div>
    </div>
  </section>
  </>
);

export default Impressum;
