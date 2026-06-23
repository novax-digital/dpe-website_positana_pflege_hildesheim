export type LandingPageKind = "location" | "service";

export type LandingPageFaq = {
  question: string;
  answer: string;
};

export type LandingPageSection = {
  title: string;
  body: string;
  items?: string[];
};

export type LandingPage = {
  kind: LandingPageKind;
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  breadcrumbLabel: string;
  h1: string;
  eyebrow: string;
  lead: string;
  intro: string;
  areaServed: string;
  serviceType: string;
  primaryKeyword: string;
  keywords: string[];
  highlights: string[];
  sections: LandingPageSection[];
  situations: string[];
  faqs: LandingPageFaq[];
  priority: string;
};

type LocationTarget = {
  name: string;
  slugPart: string;
  context: string;
  nearby: string;
};

type ServiceTarget = {
  slug: string;
  serviceType: string;
  title: string;
  seoTitle: string;
  description: string;
  lead: string;
  intro: string;
  highlights: string[];
  sections: LandingPageSection[];
  situations: string[];
  faqs: LandingPageFaq[];
};

const locationTargets: LocationTarget[] = [
  {
    name: "Hildesheim",
    slugPart: "hildesheim",
    context: "Für Familien in Hildesheim zählt vor allem, dass Pflege schnell erreichbar, persönlich abgestimmt und gut mit Arztterminen, Krankenhausentlassungen und Angehörigenorganisation verbunden ist.",
    nearby: "Moritzberg, Drispenstedt, Ochtersum, Himmelsthür und die Innenstadt",
  },
  {
    name: "Giesen",
    slugPart: "giesen",
    context: "In Giesen ist Positana Pflege mit der Adresse in der Brückenstraße besonders nah an vielen Familien, die Unterstützung im Alltag oder nach einem Krankenhausaufenthalt benötigen.",
    nearby: "Giesen, Ahrbergen, Emmerke, Groß Förste und Hasede",
  },
  {
    name: "Sarstedt",
    slugPart: "sarstedt",
    context: "Sarstedt liegt zwischen Hildesheim und Hannover. Für pflegebedürftige Menschen ist eine verlässliche Abstimmung mit Angehörigen, Praxen und bestehenden Routinen besonders wichtig.",
    nearby: "Sarstedt, Heisede, Giften, Ruthe und Schliekum",
  },
  {
    name: "Harsum",
    slugPart: "harsum",
    context: "In Harsum und den umliegenden Ortschaften geht es häufig darum, vertraute häusliche Strukturen zu erhalten und pflegende Angehörige planbar zu entlasten.",
    nearby: "Harsum, Asel, Borsum, Hüddessum und Machtsum",
  },
  {
    name: "Algermissen",
    slugPart: "algermissen",
    context: "Algermissen ist für viele Familien ein Wohnort mit engem Angehörigennetz. Ambulante Pflege kann helfen, diese Unterstützung sinnvoll mit fachlicher Versorgung zu ergänzen.",
    nearby: "Algermissen, Lühnde, Groß Lobke, Bledeln und Ummeln",
  },
  {
    name: "Nordstemmen",
    slugPart: "nordstemmen",
    context: "In Nordstemmen ist die Organisation von Pflege oft mit Mobilität, Alltagssicherheit und Terminen in Hildesheim oder der Region verbunden.",
    nearby: "Nordstemmen, Barnten, Rössing, Adensen und Burgstemmen",
  },
  {
    name: "Bad Salzdetfurth",
    slugPart: "bad-salzdetfurth",
    context: "Bad Salzdetfurth verbindet Kurortcharakter, Wohngebiete und Ortsteile im Innerstetal. Pflegeplanung sollte hier Wege, Tagesrhythmus und vorhandene Unterstützung gut berücksichtigen.",
    nearby: "Bad Salzdetfurth, Groß Düngen, Wesseln, Wehrstedt und Bodenburg",
  },
  {
    name: "Diekholzen",
    slugPart: "diekholzen",
    context: "In Diekholzen steht häufig der Wunsch im Mittelpunkt, möglichst lange selbstständig im eigenen Zuhause zu bleiben und trotzdem Sicherheit im Alltag zu gewinnen.",
    nearby: "Diekholzen, Söhre, Egenstedt und Barienrode",
  },
  {
    name: "Söhlde",
    slugPart: "soehlde",
    context: "In Söhlde und den umliegenden Dörfern sind klare Absprachen wichtig, damit Pflegeeinsätze, Haushalt und Angehörigenhilfe gut ineinandergreifen.",
    nearby: "Söhlde, Hoheneggelsen, Bettrum, Nettlingen und Steinbrück",
  },
  {
    name: "Schellerten",
    slugPart: "schellerten",
    context: "Schellerten ist geprägt von mehreren Ortsteilen. Gute ambulante Pflege braucht hier eine zuverlässige Einsatzplanung und realistische Beratung zum tatsächlichen Bedarf.",
    nearby: "Schellerten, Dingelbe, Ottbergen, Dinklar und Bettmar",
  },
  {
    name: "Holle",
    slugPart: "holle",
    context: "In Holle geht es bei Pflege zu Hause oft darum, ländliche Wege, vertraute Nachbarschaft und die Entlastung der Familie praktisch zusammenzubringen.",
    nearby: "Holle, Grasdorf, Hackenstedt, Sottrum und Derneburg",
  },
  {
    name: "Bockenem",
    slugPart: "bockenem",
    context: "Bockenem und die Ambergau-Ortschaften erfordern bei Pflege und Betreuung eine gute Planung, damit Versorgung, Einkauf und Termine verlässlich bleiben.",
    nearby: "Bockenem, Bornum, Königsdahlum, Mahlum und Volkersheim",
  },
  {
    name: "Elze",
    slugPart: "elze",
    context: "In Elze kann ambulante Pflege helfen, den Alltag nach Krankheit, Sturz oder zunehmendem Unterstützungsbedarf wieder ruhiger und sicherer zu strukturieren.",
    nearby: "Elze, Mehle, Esbeck, Sehlde und Wülfingen",
  },
  {
    name: "Alfeld (Leine)",
    slugPart: "alfeld-leine",
    context: "Alfeld ist ein wichtiger Standort im südlichen Landkreis. Pflege zu Hause sollte hier medizinische Versorgung, Angehörigenwege und häusliche Routinen zusammendenken.",
    nearby: "Alfeld, Limmer, Föhrste, Brunkensen und Wispenstein",
  },
  {
    name: "Duingen",
    slugPart: "duingen",
    context: "In Duingen zählt eine persönliche, gut erklärte Pflegeplanung, weil Angehörige und pflegebedürftige Menschen häufig mehrere Alltagsaufgaben koordinieren müssen.",
    nearby: "Duingen, Coppengrave, Marienhagen, Weenzen und Fölziehausen",
  },
  {
    name: "Freden (Leine)",
    slugPart: "freden-leine",
    context: "Freden liegt im südlichen Landkreis Hildesheim. Ambulante Pflege kann Familien dort unterstützen, wenn Versorgung zu Hause nicht mehr allein getragen werden soll.",
    nearby: "Freden, Everode, Winzenburg, Meimerhausen und Wetteborn",
  },
  {
    name: "Lamspringe",
    slugPart: "lamspringe",
    context: "In Lamspringe ist Pflege zu Hause oft eng mit Selbstständigkeit, Mobilität und Unterstützung durch Angehörige verbunden.",
    nearby: "Lamspringe, Neuhof, Sehlem, Harbarnsen und Woltershausen",
  },
  {
    name: "Sibbesse",
    slugPart: "sibbesse",
    context: "In Sibbesse und Umgebung ist ambulante Pflege besonders wertvoll, wenn vertraute Wohnumgebung und fachliche Sicherheit miteinander verbunden werden sollen.",
    nearby: "Sibbesse, Adenstedt, Almstedt, Eberholzen und Westfeld",
  },
];

const locationPage = ({ name, slugPart, context, nearby }: LocationTarget): LandingPage => {
  const primaryKeyword = `Ambulante Pflege ${name}`;

  return {
    kind: "location",
    slug: `ambulante-pflege-${slugPart}`,
    title: `Ambulante Pflege in ${name}`,
    seoTitle: `Ambulante Pflege ${name}`,
    description: `Ambulante Pflege in ${name}: Positana Pflege unterstützt bei Grundpflege, Behandlungspflege, Haushaltshilfe und Entlastung für Angehörige im Landkreis Hildesheim.`,
    breadcrumbLabel: `Pflege ${name}`,
    h1: `Ambulante Pflege in ${name}`,
    eyebrow: "Pflege vor Ort",
    lead: `Wenn Pflege zu Hause in ${name} nötig wird, unterstützt Positana Pflege mit persönlicher Beratung, verlässlicher Organisation und Leistungen, die zum Alltag der Familie passen.`,
    intro: context,
    areaServed: name,
    serviceType: "Ambulante Pflege",
    primaryKeyword,
    keywords: [
      primaryKeyword,
      `Pflegedienst ${name}`,
      `Grundpflege ${name}`,
      `Behandlungspflege ${name}`,
      `Seniorenbetreuung ${name}`,
      "Pflege Landkreis Hildesheim",
    ],
    highlights: [
      `Beratung für ${name} und Umgebung`,
      "Grundpflege und Behandlungspflege",
      "Entlastung für pflegende Angehörige",
    ],
    sections: [
      {
        title: `Pflege zu Hause in ${name}`,
        body: `Wir schauen gemeinsam, welche Unterstützung im Alltag wirklich gebraucht wird: Hilfe bei der Körperpflege, medizinische Behandlungspflege nach ärztlicher Verordnung, Haushaltshilfe, Begleitung oder Entlastung für Angehörige. Dabei geht es nicht um starre Pakete, sondern um einen Pflegeplan, der zur Wohnsituation in ${name} passt.`,
        items: [
          "persönliche Einschätzung des Pflegebedarfs",
          "feste Absprachen zu Zeiten, Umfang und Zuständigkeiten",
          "transparente Beratung zu Pflegekasse, Krankenkasse und Eigenanteilen",
        ],
      },
      {
        title: "Leistungen, die den Alltag stabilisieren",
        body: `Viele Familien merken zuerst an kleinen Dingen, dass Unterstützung nötig wird: Medikamente werden vergessen, Körperpflege fällt schwerer oder Wege im Haushalt werden unsicher. In solchen Situationen kann ambulante Pflege früh entlasten, ohne die Selbstständigkeit unnötig einzuschränken.`,
        items: [
          "Grundpflege, Mobilität und Hilfe beim An- und Auskleiden",
          "Medikamentengabe, Kompressionsstrümpfe, Messungen und Wundversorgung nach Verordnung",
          "hauswirtschaftliche Hilfe, Betreuung und Alltagsbegleitung",
        ],
      },
      {
        title: `Versorgung im Raum ${name} planen`,
        body: `Zum Einzugsgebiet gehören je nach Kapazität auch Orte wie ${nearby}. Wir prüfen im Gespräch, welche Einsätze sinnvoll und realistisch möglich sind. So entsteht eine Versorgung, die für Pflegebedürftige, Angehörige und Mitarbeitende verlässlich bleibt.`,
      },
    ],
    situations: [
      "ein Pflegegrad wurde bewilligt oder soll beantragt werden",
      "nach einem Krankenhausaufenthalt wird kurzfristig Hilfe benötigt",
      "Angehörige brauchen planbare Entlastung im Alltag",
      "medizinische Maßnahmen sollen sicher zu Hause durchgeführt werden",
      "die Wohnung soll trotz Pflegebedarf vertrauter Lebensmittelpunkt bleiben",
    ],
    faqs: [
      {
        question: `Kommt Positana Pflege nach ${name}?`,
        answer: `Wir versorgen Menschen in Hildesheim und im Landkreis Hildesheim. Für ${name} prüfen wir im Beratungsgespräch die aktuelle Kapazität, die benötigten Leistungen und die gewünschten Einsatzzeiten.`,
      },
      {
        question: `Welche Pflegeleistungen sind in ${name} möglich?`,
        answer: "Möglich sind je nach Bedarf Grundpflege, Behandlungspflege auf ärztliche Verordnung, Haushaltshilfe, Alltagsbegleitung und Entlastungsleistungen für Angehörige.",
      },
      {
        question: `Wie startet die Pflegeberatung für ${name}?`,
        answer: "Sie erreichen uns telefonisch oder über das Kontaktformular. Wir klären die Situation, vorhandene Pflegegrade, ärztliche Verordnungen und die nächsten Schritte für eine passende Versorgung.",
      },
    ],
    priority: name === "Hildesheim" || name === "Giesen" ? "0.82" : "0.72",
  };
};

const serviceTargets: ServiceTarget[] = [
  {
    slug: "grundpflege-hildesheim",
    serviceType: "Grundpflege",
    title: "Grundpflege in Hildesheim",
    seoTitle: "Grundpflege Hildesheim",
    description: "Grundpflege in Hildesheim: Unterstützung bei Körperpflege, Mobilität, Ernährung und Tagesstruktur durch Positana Pflege.",
    lead: "Grundpflege unterstützt Menschen bei täglichen Aufgaben, die alleine schwerer werden. Positana Pflege achtet dabei auf Würde, Ruhe und feste Routinen.",
    intro: "Wenn Waschen, Anziehen, Aufstehen oder Essen zunehmend Kraft kosten, kann Grundpflege den Alltag stabilisieren und Angehörige entlasten.",
    highlights: ["Körperpflege und Mobilität", "feste Routinen zu Hause", "Abrechnung über Pflegekasse möglich"],
    sections: [
      {
        title: "Was zur Grundpflege gehört",
        body: "Grundpflege umfasst körpernahe Unterstützung im Alltag. Der genaue Umfang richtet sich nach Pflegegrad, persönlichem Bedarf und den Gewohnheiten der pflegebedürftigen Person.",
        items: ["Hilfe beim Waschen, Duschen und Ankleiden", "Unterstützung beim Aufstehen und bei Mobilität", "Begleitung bei Mahlzeiten und Tagesstruktur"],
      },
      {
        title: "Warum feste Abläufe wichtig sind",
        body: "Vertraute Zeiten und bekannte Bezugspersonen geben Sicherheit. Das ist besonders wichtig, wenn Pflege erst neu beginnt oder Menschen mit Demenz zusätzliche Orientierung brauchen.",
      },
      {
        title: "Beratung zu Kosten und Pflegegrad",
        body: "Wir erklären, welche Leistungen über die Pflegekasse abgerechnet werden können und wie sich Grundpflege mit Behandlungspflege, Haushaltshilfe oder Entlastungsbetrag kombinieren lässt.",
      },
    ],
    situations: ["Körperpflege fällt zunehmend schwer", "Angehörige sind täglich stark eingebunden", "ein Pflegegrad ist vorhanden oder beantragt", "Routinen sollen sicherer werden"],
    faqs: [
      {
        question: "Kann Grundpflege direkt mit der Pflegekasse abgerechnet werden?",
        answer: "Bei vorhandenem Pflegegrad können Grundpflegeleistungen in vielen Fällen über Pflegesachleistungen abgerechnet werden. Wir beraten transparent zu den Möglichkeiten.",
      },
      {
        question: "Wie oft kann Grundpflege stattfinden?",
        answer: "Das hängt vom Bedarf und den verfügbaren Leistungen ab. Möglich sind regelmäßige Einsätze, zum Beispiel morgens, abends oder an einzelnen Tagen pro Woche.",
      },
    ],
  },
  {
    slug: "behandlungspflege-hildesheim",
    serviceType: "Behandlungspflege",
    title: "Behandlungspflege in Hildesheim",
    seoTitle: "Behandlungspflege Hildesheim",
    description: "Behandlungspflege in Hildesheim: medizinische Pflege zu Hause auf ärztliche Verordnung, zum Beispiel Medikamente, Injektionen, Wundversorgung und Kompression.",
    lead: "Behandlungspflege bringt medizinische Versorgung sicher nach Hause. Grundlage ist eine ärztliche Verordnung und die Genehmigung durch die Krankenkasse.",
    intro: "Viele medizinische Maßnahmen müssen nicht dauerhaft in einer Praxis oder Klinik stattfinden. Qualifizierte Pflegefachkräfte können sie zu Hause übernehmen.",
    highlights: ["medizinische Pflege auf Verordnung", "Wundversorgung und Medikamente", "Abrechnung über Krankenkasse"],
    sections: [
      {
        title: "Typische Leistungen der Behandlungspflege",
        body: "Welche Maßnahmen möglich sind, richtet sich nach ärztlicher Verordnung und Krankenkasse. Wir helfen bei der praktischen Organisation der Versorgung.",
        items: ["Medikamentengabe, Injektionen und Messungen", "Wundversorgung und Verbandwechsel", "Kompressionsstrümpfe, Katheter-, Stoma- oder Portversorgung"],
      },
      {
        title: "Sicher zu Hause versorgt",
        body: "Behandlungspflege braucht Sorgfalt, Dokumentation und klare Kommunikation mit Arztpraxis, Angehörigen und Krankenkasse. So bleiben Veränderungen früh sichtbar.",
      },
      {
        title: "Schnelle Abstimmung nach Verordnung",
        body: "Wenn eine Verordnung vorliegt, prüfen wir die benötigte Leistung, Einsatzzeiten und Unterlagen. Danach kann die Versorgung je nach Kapazität geplant werden.",
      },
    ],
    situations: ["eine ärztliche Verordnung liegt vor", "Medikamente sollen sicher eingenommen werden", "Wunden müssen regelmäßig versorgt werden", "nach Klinikaufenthalt ist medizinische Pflege nötig"],
    faqs: [
      {
        question: "Wer bezahlt Behandlungspflege?",
        answer: "Behandlungspflege wird in der Regel über die Krankenkasse abgerechnet, wenn eine ärztliche Verordnung vorliegt und die Leistung genehmigt wird.",
      },
      {
        question: "Braucht man für Behandlungspflege einen Pflegegrad?",
        answer: "Nein, Behandlungspflege hängt nicht zwingend vom Pflegegrad ab. Entscheidend ist die medizinische Notwendigkeit und die ärztliche Verordnung.",
      },
    ],
  },
  {
    slug: "haushaltshilfe-alltagsbegleitung-hildesheim",
    serviceType: "Haushaltshilfe und Alltagsbegleitung",
    title: "Haushaltshilfe und Alltagsbegleitung in Hildesheim",
    seoTitle: "Haushaltshilfe Pflege Hildesheim",
    description: "Haushaltshilfe und Alltagsbegleitung in Hildesheim: Unterstützung bei Einkäufen, Haushalt, Terminen und Betreuung für Seniorinnen, Senioren und Angehörige.",
    lead: "Haushaltshilfe und Alltagsbegleitung entlasten dort, wo kleine Aufgaben im Alltag plötzlich groß werden.",
    intro: "Nicht jeder Unterstützungsbedarf ist medizinisch. Oft geht es um Einkauf, Ordnung, Begleitung, Gespräche und eine verlässliche Person im Alltag.",
    highlights: ["Hilfe im Haushalt", "Begleitung und Betreuung", "Entlastungsbetrag nutzbar"],
    sections: [
      {
        title: "Praktische Hilfe im Alltag",
        body: "Hauswirtschaftliche Unterstützung kann dazu beitragen, dass Menschen länger selbstständig zu Hause leben. Wir stimmen ab, welche Aufgaben wirklich entlasten.",
        items: ["Einkauf, Botengänge und einfache Haushaltsaufgaben", "Begleitung zu Terminen oder Spaziergängen", "Betreuung, Aktivierung und Orientierung im Alltag"],
      },
      {
        title: "Entlastung für Angehörige",
        body: "Wenn Angehörige Arbeit, Familie und Pflege vereinbaren müssen, schaffen feste Unterstützungszeiten Planbarkeit. Das schützt vor Überlastung und gibt mehr Ruhe in der Beziehung.",
      },
      {
        title: "Finanzierung über Entlastungsleistungen",
        body: "Bei Pflegegrad kann der Entlastungsbetrag für anerkannte Angebote genutzt werden. Wir beraten, welche Leistungen passend sind und wie die Abrechnung funktioniert.",
      },
    ],
    situations: ["Haushalt und Einkauf werden zu viel", "Angehörige benötigen regelmäßige Entlastung", "Demenz oder Unsicherheit erfordert Begleitung", "der Entlastungsbetrag soll sinnvoll genutzt werden"],
    faqs: [
      {
        question: "Kann der Entlastungsbetrag genutzt werden?",
        answer: "Bei Pflegegrad kann der monatliche Entlastungsbetrag für anerkannte Entlastungsleistungen eingesetzt werden. Wir prüfen gemeinsam, was möglich ist.",
      },
      {
        question: "Ist Haushaltshilfe auch ohne Pflegegrad möglich?",
        answer: "Ja, Unterstützung kann auch privat vereinbart werden. Mit Pflegegrad bestehen zusätzliche Finanzierungsmöglichkeiten.",
      },
    ],
  },
  {
    slug: "verhinderungspflege-hildesheim",
    serviceType: "Verhinderungspflege",
    title: "Verhinderungspflege in Hildesheim",
    seoTitle: "Verhinderungspflege Hildesheim",
    description: "Verhinderungspflege in Hildesheim: Ersatzpflege und Entlastung, wenn pflegende Angehörige Urlaub, Termine oder Erholung brauchen.",
    lead: "Verhinderungspflege gibt Angehörigen Luft, ohne dass die Versorgung zu Hause abbrechen muss.",
    intro: "Pflegende Angehörige leisten viel. Wenn sie krank sind, Urlaub brauchen oder einfach eine Pause benötigen, kann Verhinderungspflege die Versorgung überbrücken.",
    highlights: ["Ersatzpflege bei Ausfall", "planbare Angehörigenentlastung", "Beratung zu Pflegekassenleistungen"],
    sections: [
      {
        title: "Wann Verhinderungspflege sinnvoll ist",
        body: "Verhinderungspflege kann stundenweise oder über längere Zeiträume helfen. Entscheidend ist, dass Pflegebedürftige weiter zuverlässig betreut werden.",
        items: ["Urlaub oder Erholung für Angehörige", "Termine, Krankheit oder berufliche Verpflichtungen", "stundenweise Entlastung zur Stabilisierung des Alltags"],
      },
      {
        title: "Gut vorbereiten statt kurzfristig improvisieren",
        body: "Wer Verhinderungspflege früh plant, kann Wünsche, Zeiten, Pflegebedarf und Finanzierung in Ruhe klären. Das macht die Vertretung für alle Beteiligten leichter.",
      },
      {
        title: "Kombination mit anderen Leistungen",
        body: "Je nach Situation lässt sich Verhinderungspflege mit Grundpflege, Betreuung oder hauswirtschaftlicher Unterstützung verbinden. Wir erklären die Optionen verständlich.",
      },
    ],
    situations: ["pflegende Angehörige brauchen Urlaub", "kurzfristige Termine müssen überbrückt werden", "regelmäßige Pausen sollen entstehen", "die Versorgung darf nicht ausfallen"],
    faqs: [
      {
        question: "Wie beantragt man Verhinderungspflege?",
        answer: "Die Leistung wird über die Pflegekasse abgerechnet, wenn die Voraussetzungen erfüllt sind. Wir beraten, welche Angaben und Nachweise wichtig sind.",
      },
      {
        question: "Ist Verhinderungspflege stundenweise möglich?",
        answer: "Ja, Verhinderungspflege kann auch stundenweise organisiert werden. Das ist für viele Angehörige im Alltag besonders hilfreich.",
      },
    ],
  },
  {
    slug: "betreutes-wohnen-hildesheim",
    serviceType: "Betreutes Wohnen",
    title: "Betreutes Wohnen in Hildesheim",
    seoTitle: "Betreutes Wohnen Hildesheim",
    description: "Betreutes Wohnen in Hildesheim: selbstständig leben in der Theaterresidenz mit ambulanter Pflege und hauswirtschaftlicher Unterstützung nach Bedarf.",
    lead: "Betreutes Wohnen verbindet Selbstständigkeit mit der Sicherheit, Unterstützung in erreichbarer Nähe zu haben.",
    intro: "Für viele Seniorinnen und Senioren ist nicht die Pflege allein entscheidend, sondern eine Wohnform, die Alltag, Sicherheit und Privatsphäre gut ausbalanciert.",
    highlights: ["Theaterresidenz Hildesheim", "barrierearmes Wohnen", "Pflege nach Bedarf"],
    sections: [
      {
        title: "Selbstständig wohnen, Unterstützung nutzen",
        body: "Im Betreuten Wohnen bleibt das eigene Appartement der private Mittelpunkt. Ambulante Pflege und hauswirtschaftliche Unterstützung können bei Bedarf ergänzt werden.",
        items: ["eigenes Appartement", "Unterstützung bei Pflege und Haushalt", "Sicherheit durch erreichbare Ansprechpartner"],
      },
      {
        title: "Für wen Betreutes Wohnen passt",
        body: "Die Wohnform eignet sich für Menschen, die selbstständig leben möchten, aber für bestimmte Alltagssituationen mehr Sicherheit wünschen.",
      },
      {
        title: "Pflegeleistungen flexibel ergänzen",
        body: "Je nach Pflegegrad und Bedarf können Grundpflege, Behandlungspflege oder Alltagsbegleitung eingebunden werden. Wir beraten zu Ablauf und Kosten.",
      },
    ],
    situations: ["die bisherige Wohnung wird zu unpraktisch", "Sicherheit soll steigen, ohne Eigenständigkeit aufzugeben", "Pflege soll bei Bedarf verfügbar sein", "Angehörige wünschen mehr Verlässlichkeit"],
    faqs: [
      {
        question: "Ist Betreutes Wohnen dasselbe wie ein Pflegeheim?",
        answer: "Nein. Betreutes Wohnen bedeutet selbstständiges Wohnen im eigenen Appartement mit optionaler Unterstützung. Es ist keine stationäre Pflegeeinrichtung.",
      },
      {
        question: "Kann ambulante Pflege im Betreuten Wohnen genutzt werden?",
        answer: "Ja, ambulante Pflegeleistungen können bei Bedarf eingebunden und je nach Voraussetzung über Pflege- oder Krankenkasse abgerechnet werden.",
      },
    ],
  },
  {
    slug: "pflegeberatung-pflegegrad-hildesheim",
    serviceType: "Pflegeberatung und Pflegegrad-Unterstützung",
    title: "Pflegeberatung und Pflegegrad in Hildesheim",
    seoTitle: "Pflegeberatung Pflegegrad Hildesheim",
    description: "Pflegeberatung in Hildesheim: Unterstützung bei Pflegegrad, Leistungen der Pflegekasse, Versorgung zu Hause und passenden nächsten Schritten.",
    lead: "Eine gute Pflegeberatung schafft Klarheit, bevor der Alltag zur Krise wird.",
    intro: "Viele Familien wissen nicht, welche Leistungen möglich sind oder wann ein Pflegegrad beantragt werden sollte. Wir helfen, die Situation zu sortieren.",
    highlights: ["Pflegegrad einordnen", "Leistungen verstehen", "Versorgung planen"],
    sections: [
      {
        title: "Pflegebedarf realistisch einschätzen",
        body: "Gemeinsam betrachten wir, welche Hilfe im Alltag bereits nötig ist, welche Angehörigenaufgaben bestehen und welche Leistungen sinnvoll kombiniert werden können.",
        items: ["Grundpflege und Haushalt", "Behandlungspflege und ärztliche Verordnung", "Entlastungsbetrag, Pflegesachleistungen und Verhinderungspflege"],
      },
      {
        title: "Vorbereitung auf Pflegegrad und Begutachtung",
        body: "Ein Pflegetagebuch, klare Beobachtungen und passende Unterlagen helfen, den tatsächlichen Unterstützungsbedarf sichtbar zu machen.",
      },
      {
        title: "Vom Gespräch zur Versorgung",
        body: "Nach der Beratung erstellen wir bei Bedarf ein Angebot, klären Abrechnung und stimmen mögliche Einsätze ab. So entsteht ein realistischer Startpunkt.",
      },
    ],
    situations: ["ein Pflegegrad soll beantragt werden", "nach Klinikentlassung ist unklar, was jetzt nötig ist", "Angehörige fühlen sich mit Leistungen überfordert", "Pflege soll erstmals organisiert werden"],
    faqs: [
      {
        question: "Wann ist Pflegeberatung sinnvoll?",
        answer: "Sobald der Alltag unsicherer wird, Angehörige regelmäßig unterstützen oder Fragen zu Pflegegrad, Abrechnung und Leistungen entstehen.",
      },
      {
        question: "Hilft Positana Pflege beim Pflegegrad-Antrag?",
        answer: "Wir können erklären, welche Schritte wichtig sind, wie Bedarf dokumentiert wird und welche Leistungen nach einem Pflegegrad infrage kommen.",
      },
    ],
  },
];

const servicePage = (target: ServiceTarget): LandingPage => ({
  kind: "service",
  slug: target.slug,
  title: target.title,
  seoTitle: target.seoTitle,
  description: target.description,
  breadcrumbLabel: target.title,
  h1: target.title,
  eyebrow: "Pflegeleistung",
  lead: target.lead,
  intro: target.intro,
  areaServed: "Hildesheim und Landkreis Hildesheim",
  serviceType: target.serviceType,
  primaryKeyword: target.seoTitle,
  keywords: [
    target.seoTitle,
    `${target.serviceType} Landkreis Hildesheim`,
    "Ambulante Pflege Hildesheim",
    "Positana Pflege Hildesheim",
  ],
  highlights: target.highlights,
  sections: target.sections,
  situations: target.situations,
  faqs: target.faqs,
  priority: target.slug === "betreutes-wohnen-hildesheim" ? "0.82" : "0.78",
});

export const LOCATION_LANDING_PAGES = locationTargets.map(locationPage);
export const SERVICE_LANDING_PAGES = serviceTargets.map(servicePage);
export const LANDING_PAGES = [...LOCATION_LANDING_PAGES, ...SERVICE_LANDING_PAGES] as const;

export const getLandingPageBySlug = (slug: string) => LANDING_PAGES.find((page) => page.slug === slug) ?? null;

export const getRelatedLandingPages = (page: LandingPage, limit = 6) => {
  const preferredSlugs =
    page.kind === "location"
      ? [
          "grundpflege-hildesheim",
          "behandlungspflege-hildesheim",
          "pflegeberatung-pflegegrad-hildesheim",
          "verhinderungspflege-hildesheim",
          "ambulante-pflege-hildesheim",
          "ambulante-pflege-giesen",
          "ambulante-pflege-sarstedt",
          "ambulante-pflege-harsum",
        ]
      : [
          "ambulante-pflege-hildesheim",
          "ambulante-pflege-giesen",
          "ambulante-pflege-sarstedt",
          "ambulante-pflege-harsum",
          "ambulante-pflege-bad-salzdetfurth",
          "ambulante-pflege-nordstemmen",
        ];

  const preferred = preferredSlugs
    .filter((slug) => slug !== page.slug)
    .map(getLandingPageBySlug)
    .filter((item): item is LandingPage => Boolean(item));
  const fallback = LANDING_PAGES.filter((item) => item.slug !== page.slug && !preferred.some((related) => related.slug === item.slug));

  return [...preferred, ...fallback].slice(0, limit);
};
