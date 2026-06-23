import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bucketName = "blog-images";

const parseEnvFile = (filename) => {
  const filePath = path.join(root, filename);
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return Object.fromEntries(
    fs
      .readFileSync(filePath, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        const key = line.slice(0, index).trim();
        let value = line.slice(index + 1).trim();
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }
        return [key, value];
      }),
  );
};

const env = {
  ...parseEnvFile(".env.example"),
  ...parseEnvFile(".env"),
  ...parseEnvFile(".env.local"),
  ...process.env,
};

const required = ["PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];
const missing = required.filter((key) => !env[key]);
if (missing.length > 0) {
  console.error(`Missing required environment values: ${missing.join(", ")}`);
  process.exit(1);
}

const supabase = createClient(env.PUBLIC_SUPABASE_URL.replace(/\/$/, ""), env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const estimateReadingTime = (markdown) => {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]+\]\([^)]+\)/g, " ")
    .replace(/[#>*_\-[\]().,;:!?/\\|]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return Math.max(1, Math.ceil(words.length / 220));
};

const article = ({
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  imageFilename,
  imageAlt,
  intro,
  sections,
  closing,
}) => {
  const content = [
    intro,
    ...sections.flatMap((section) => [
      `## ${section.title}`,
      section.body,
      ...(section.items?.length
        ? [
            section.items.map((item) => `- ${item}`).join("\n"),
          ]
        : []),
    ]),
    closing,
  ].join("\n\n");

  return {
    title,
    slug,
    excerpt,
    category,
    publishedAt,
    imageFilename,
    imageAlt,
    content,
  };
};

const posts = [
  article({
    title: "Ambulante Pflege zu Hause: Woran Angehörige den richtigen Zeitpunkt erkennen",
    slug: "ambulante-pflege-zuhause-richtiger-zeitpunkt",
    excerpt:
      "Ambulante Pflege beginnt oft nicht mit einem großen Einschnitt, sondern mit kleinen Veränderungen im Alltag. Diese Hinweise helfen Angehörigen bei der Einordnung.",
    category: "Pflege & Organisation",
    publishedAt: "2026-01-08T12:00:00.000Z",
    imageFilename: "2026-01-08-ambulante-pflege-zuhause.png",
    imageAlt: "Seniorin und Pflegekraft besprechen ambulante Pflege am Wohnzimmertisch",
    intro:
      "Viele Familien fragen sich, wann professionelle Unterstützung zu Hause sinnvoll wird. Häufig gibt es keinen einzelnen Auslöser. Stattdessen verändern sich Routinen: Einkäufe bleiben liegen, Medikamente werden unregelmäßig genommen oder die Körperpflege fällt schwerer. Ambulante Pflege kann dann helfen, Sicherheit und Selbstständigkeit zu verbinden.",
    sections: [
      {
        title: "Kleine Warnzeichen ernst nehmen",
        body:
          "Ein erster Hinweis ist oft, dass gewohnte Abläufe plötzlich viel Kraft kosten. Wenn Mahlzeiten ausfallen, Termine vergessen werden oder Angehörige bei jedem Besuch neue Unsicherheiten bemerken, lohnt sich ein Gespräch. Wichtig ist, diese Beobachtungen nicht als Vorwurf zu formulieren, sondern als gemeinsame Suche nach Entlastung.",
        items: [
          "Unsicherheit beim Aufstehen, Gehen oder Treppensteigen",
          "vergessene Medikamente oder unklare Einnahmezeiten",
          "weniger Körperpflege, Wäsche oder Haushalt",
          "häufigere Erschöpfung von Angehörigen",
        ],
      },
      {
        title: "Pflege muss nicht alles übernehmen",
        body:
          "Ambulante Pflege ist kein Alles-oder-nichts-Modell. Oft reichen einzelne Einsätze pro Woche, um Struktur und Sicherheit zurückzubringen. Das kann Hilfe bei der Grundpflege sein, Unterstützung bei Medikamenten oder eine feste Ansprechperson, die Veränderungen früh bemerkt.",
      },
      {
        title: "Früh beraten lassen statt abwarten",
        body:
          "Eine frühe Beratung schafft Klarheit über Pflegegrad, Leistungen der Pflegekasse und mögliche Entlastung für Angehörige. Wer erst handelt, wenn eine Krise eintritt, hat weniger Zeit für gute Entscheidungen. Besser ist es, Versorgung Schritt für Schritt aufzubauen.",
      },
      {
        title: "So kann der Einstieg gelingen",
        body:
          "Ein guter Start beginnt mit einem ruhigen Gespräch zu Hause. Dabei werden Bedarf, Wünsche, Tagesrhythmus und Finanzierung besprochen. Danach kann ein passendes Angebot erstellt werden. Bei Positana Pflege Hildesheim achten wir darauf, Unterstützung so einzubinden, dass vertraute Routinen erhalten bleiben.",
      },
    ],
    closing:
      "Wenn Sie unsicher sind, ob ambulante Pflege bereits sinnvoll ist, ist eine unverbindliche Beratung der beste nächste Schritt. Auf unserer Seite [Ablauf](/ablauf) erklären wir, wie der Einstieg funktioniert.",
  }),
  article({
    title: "Pflegegrad beantragen: So bereiten Sie den Antrag gut vor",
    slug: "pflegegrad-beantragen-vorbereitung",
    excerpt:
      "Ein Pflegegrad entscheidet darüber, welche Unterstützung finanziert werden kann. Mit guter Vorbereitung wird der Antrag für Angehörige deutlich übersichtlicher.",
    category: "Pflege & Organisation",
    publishedAt: "2026-01-22T12:00:00.000Z",
    imageFilename: "2026-01-22-pflegegrad-beantragen.png",
    imageAlt: "Angehörige sortieren Unterlagen für den Pflegegrad-Antrag am Küchentisch",
    intro:
      "Der Pflegegrad ist für viele Leistungen der Pflegeversicherung entscheidend. Trotzdem wirkt der Antrag auf Angehörige oft kompliziert. Wer die Situation vor dem Begutachtungstermin gut dokumentiert, kann den tatsächlichen Unterstützungsbedarf besser sichtbar machen.",
    sections: [
      {
        title: "Der Antrag ist der erste Schritt",
        body:
          "Der Pflegegrad wird bei der Pflegekasse beantragt. Dafür genügt zunächst ein formloser Antrag, telefonisch oder schriftlich. Danach meldet sich der Medizinische Dienst oder eine andere beauftragte Stelle zur Begutachtung. Entscheidend ist, wie selbstständig die betroffene Person im Alltag ist.",
      },
      {
        title: "Alltag ehrlich dokumentieren",
        body:
          "Viele Menschen zeigen sich beim Termin besser, als es im Alltag tatsächlich möglich ist. Deshalb hilft ein Pflegetagebuch. Notieren Sie über mehrere Tage, wobei Unterstützung nötig ist und wie lange einzelne Tätigkeiten dauern.",
        items: [
          "Körperpflege, Anziehen und Mobilität",
          "Essen, Trinken und Medikamenteneinnahme",
          "Orientierung, Erinnerung und Tagesstruktur",
          "nächtliche Hilfe oder Sturzrisiken",
        ],
      },
      {
        title: "Unterlagen bereitlegen",
        body:
          "Hilfreich sind Arztberichte, Medikamentenpläne, Krankenhausunterlagen, vorhandene Hilfsmittel und Notizen zu bisherigen Unterstützungsleistungen. Auch Angehörige sollten beim Termin dabei sein, wenn sie den Alltag gut kennen.",
      },
      {
        title: "Nach dem Bescheid prüfen",
        body:
          "Nach der Begutachtung erhalten Sie einen Bescheid. Prüfen Sie ihn in Ruhe. Wenn der Pflegegrad aus Ihrer Sicht nicht zum tatsächlichen Bedarf passt, kann innerhalb der Frist Widerspruch eingelegt werden. Eine Pflegeberatung kann dabei helfen, die nächsten Schritte zu verstehen.",
      },
    ],
    closing:
      "Positana Pflege Hildesheim unterstützt Angehörige dabei, Leistungen einzuordnen und passende Versorgung zu planen. Mehr zu häufigen Fragen finden Sie in unserem [FAQ](/faq).",
  }),
  article({
    title: "Behandlungspflege zu Hause: Welche Leistungen die Krankenkasse übernimmt",
    slug: "behandlungspflege-zuhause-krankenkasse",
    excerpt:
      "Behandlungspflege umfasst medizinische Leistungen auf ärztliche Verordnung. Wir erklären, was darunter fällt und wie die Versorgung zu Hause organisiert wird.",
    category: "Pflege & Organisation",
    publishedAt: "2026-02-06T12:00:00.000Z",
    imageFilename: "2026-02-06-behandlungspflege-krankenkasse.png",
    imageAlt: "Pflegefachkraft misst Blutdruck bei einem Senior zu Hause",
    intro:
      "Behandlungspflege ist medizinische Pflege, die zu Hause durchgeführt wird. Sie wird nicht über die Pflegekasse, sondern in der Regel über die Krankenkasse abgerechnet. Grundlage ist eine ärztliche Verordnung.",
    sections: [
      {
        title: "Was gehört zur Behandlungspflege?",
        body:
          "Zur Behandlungspflege zählen medizinisch notwendige Maßnahmen, die von qualifizierten Pflegefachkräften durchgeführt werden. Welche Leistungen möglich sind, entscheidet die ärztliche Verordnung und die Genehmigung der Krankenkasse.",
        items: [
          "Medikamentengabe und Kontrolle der Einnahme",
          "Blutdruck- oder Blutzuckermessung",
          "Injektionen nach ärztlicher Anordnung",
          "Wundversorgung und Verbandwechsel",
          "An- und Ausziehen von Kompressionsstrümpfen",
        ],
      },
      {
        title: "So läuft die Verordnung ab",
        body:
          "Die Ärztin oder der Arzt stellt eine Verordnung häuslicher Krankenpflege aus. Diese wird bei der Krankenkasse eingereicht. Nach Genehmigung kann der Pflegedienst die verordneten Leistungen übernehmen. In dringenden Fällen sollte die Versorgung möglichst früh abgestimmt werden.",
      },
      {
        title: "Warum feste Abläufe wichtig sind",
        body:
          "Gerade bei Medikamenten oder Verbänden geben feste Zeiten Sicherheit. Ein ambulanter Pflegedienst dokumentiert die Einsätze und achtet darauf, Veränderungen früh zu erkennen. Das schafft Entlastung für Angehörige und Transparenz für behandelnde Ärztinnen und Ärzte.",
      },
      {
        title: "Abgrenzung zur Grundpflege",
        body:
          "Behandlungspflege ist medizinisch verordnet. Grundpflege umfasst dagegen Unterstützung bei alltäglichen Tätigkeiten wie Waschen, Anziehen oder Mobilität und wird meist über Leistungen der Pflegeversicherung organisiert. In der Praxis können beide Bereiche kombiniert werden.",
      },
    ],
    closing:
      "Auf unserer Seite [Leistungen](/leistungen) finden Sie einen Überblick über Behandlungspflege, Grundpflege und weitere Unterstützungsmöglichkeiten in Hildesheim.",
  }),
  article({
    title: "Grundpflege im Alltag: Unterstützung mit Würde und festen Routinen",
    slug: "grundpflege-alltag-wuerde-routinen",
    excerpt:
      "Grundpflege ist mehr als Hilfe beim Waschen oder Anziehen. Gute Pflege erhält Selbstständigkeit, Würde und vertraute Tagesabläufe.",
    category: "Alltag im Alter",
    publishedAt: "2026-02-20T12:00:00.000Z",
    imageFilename: "2026-02-20-grundpflege-alltag.png",
    imageAlt: "Pflegekraft reicht einer Seniorin ein Handtuch in einer hellen Wohnung",
    intro:
      "Wenn alltägliche Dinge schwerer werden, kann Grundpflege entlasten. Dabei geht es nicht darum, Menschen möglichst viel abzunehmen. Gute Pflege unterstützt dort, wo Hilfe nötig ist, und lässt Raum für das, was weiterhin selbst gelingt.",
    sections: [
      {
        title: "Was Grundpflege umfasst",
        body:
          "Grundpflege bezieht sich auf grundlegende Tätigkeiten des täglichen Lebens. Dazu gehören Körperpflege, Ankleiden, Mobilität, Unterstützung beim Essen und Trinken sowie Hilfe beim Aufstehen oder Zubettgehen.",
      },
      {
        title: "Würde beginnt bei der Haltung",
        body:
          "Pflege ist sehr persönlich. Deshalb sind Respekt, Geduld und klare Kommunikation entscheidend. Jede Handlung sollte erklärt werden. Die pflegebedürftige Person entscheidet mit, was ihr angenehm ist und welche Routinen wichtig bleiben.",
      },
      {
        title: "Routinen geben Sicherheit",
        body:
          "Feste Abläufe reduzieren Stress. Wenn Einsätze möglichst zuverlässig geplant sind, können sich Seniorinnen und Senioren besser orientieren. Auch Angehörige wissen dann, wann Unterstützung kommt und welche Aufgaben abgesichert sind.",
        items: [
          "morgendliche Hilfe beim Start in den Tag",
          "regelmäßige Unterstützung bei Körperpflege und Kleidung",
          "sichere Mobilisation und Sturzvorbeugung",
          "Beobachtung von Veränderungen im Allgemeinzustand",
        ],
      },
      {
        title: "Selbstständigkeit bewusst erhalten",
        body:
          "Viele kleine Entscheidungen stärken das Gefühl von Kontrolle: Kleidung auswählen, Tempo bestimmen oder einzelne Handgriffe selbst übernehmen. Pflege sollte vorhandene Fähigkeiten fördern und nicht ersetzen.",
      },
    ],
    closing:
      "Wenn Sie Grundpflege für sich oder Angehörige organisieren möchten, beraten wir Sie gern persönlich. Mehr dazu finden Sie unter [Kontakt](/kontakt).",
  }),
  article({
    title: "Entlastungsbetrag nutzen: 125 Euro monatlich sinnvoll einsetzen",
    slug: "entlastungsbetrag-125-euro-sinnvoll-nutzen",
    excerpt:
      "Der Entlastungsbetrag kann pflegebedürftige Menschen und Angehörige spürbar unterstützen. Wichtig ist, ihn passend zum Alltag einzusetzen.",
    category: "Entlastung für Angehörige",
    publishedAt: "2026-03-06T12:00:00.000Z",
    imageFilename: "2026-03-06-entlastungsbetrag-nutzen.png",
    imageAlt: "Seniorin plant mit Pflegekraft Haushaltshilfe und Alltagstermine am Küchentisch",
    intro:
      "Pflegebedürftige Menschen mit anerkanntem Pflegegrad haben in der Regel Anspruch auf einen monatlichen Entlastungsbetrag. Dieser Betrag soll den Alltag erleichtern und Angehörige entlasten. Entscheidend ist, die Unterstützung so zu planen, dass sie wirklich hilft.",
    sections: [
      {
        title: "Wofür der Entlastungsbetrag gedacht ist",
        body:
          "Der Entlastungsbetrag kann für anerkannte Angebote zur Unterstützung im Alltag eingesetzt werden. Dazu zählen je nach Anbieter und Zulassung Betreuungsleistungen, Begleitung, hauswirtschaftliche Hilfe oder Entlastung pflegender Angehöriger.",
      },
      {
        title: "Typische Einsatzmöglichkeiten",
        body:
          "Oft sind es kleine Aufgaben, die im Alltag den größten Unterschied machen. Eine verlässliche Hilfe beim Einkauf, beim Aufräumen oder bei Terminen kann Angehörige deutlich entlasten und pflegebedürftigen Menschen mehr Sicherheit geben.",
        items: [
          "Begleitung bei Spaziergängen oder Arztterminen",
          "Unterstützung im Haushalt",
          "Betreuung und Aktivierung im Alltag",
          "Entlastung für pflegende Angehörige",
        ],
      },
      {
        title: "Nicht verfallen lassen",
        body:
          "Viele Familien wissen nicht genau, welche Leistungen möglich sind. Dadurch bleibt Unterstützung ungenutzt. Es lohnt sich, früh zu klären, welche Angebote anerkannt sind und wie die Abrechnung funktioniert.",
      },
      {
        title: "Individuell planen",
        body:
          "Der Entlastungsbetrag sollte nicht nach Schema F eingesetzt werden. Entscheidend ist die Frage: Was würde den Alltag konkret leichter machen? Daraus entsteht ein Plan, der zu Bedarf, Pflegegrad und familiärer Situation passt.",
      },
    ],
    closing:
      "Positana Pflege Hildesheim berät transparent zu möglichen Leistungen und zur Abrechnung. Erste Informationen finden Sie auch unter [Abrechnung & Kosten](/abrechnung).",
  }),
  article({
    title: "Verhinderungspflege: Eine Pause für Angehörige gut organisieren",
    slug: "verhinderungspflege-pause-angehoerige-organisieren",
    excerpt:
      "Pflegende Angehörige brauchen Erholung. Verhinderungspflege kann helfen, Versorgung zuverlässig abzusichern, wenn Angehörige ausfallen oder eine Pause benötigen.",
    category: "Entlastung für Angehörige",
    publishedAt: "2026-03-20T12:00:00.000Z",
    imageFilename: "2026-03-20-verhinderungspflege-angehoerige.png",
    imageAlt: "Pflegekraft übernimmt freundlich die Betreuung eines Seniors auf einer Terrasse",
    intro:
      "Wer einen Angehörigen pflegt, leistet viel. Termine, Urlaub, Krankheit oder einfach Erschöpfung machen Pausen notwendig. Verhinderungspflege sorgt dafür, dass die Versorgung weiterläuft, wenn die private Pflegeperson vorübergehend verhindert ist.",
    sections: [
      {
        title: "Was Verhinderungspflege bedeutet",
        body:
          "Verhinderungspflege ist eine Ersatzpflege. Sie kann genutzt werden, wenn die eigentliche Pflegeperson vorübergehend nicht pflegen kann. Voraussetzung ist in der Regel ein Pflegegrad und eine vorherige Pflegezeit durch die private Pflegeperson.",
      },
      {
        title: "Frühzeitig planen",
        body:
          "Am entspanntesten ist Verhinderungspflege, wenn sie nicht erst im Notfall organisiert wird. Legen Sie rechtzeitig fest, wann Unterstützung benötigt wird, welche Aufgaben übernommen werden sollen und welche Gewohnheiten wichtig sind.",
      },
      {
        title: "Informationen für die Vertretung",
        body:
          "Je besser die Ersatzpflege vorbereitet ist, desto sicherer fühlt sich die pflegebedürftige Person. Hilfreich sind Notizen zu Medikamenten, Mahlzeiten, Mobilität, Vorlieben, Telefonnummern und Ansprechpartnern.",
        items: [
          "Tagesablauf und feste Gewohnheiten",
          "wichtige Kontakte und ärztliche Informationen",
          "Hilfsmittel und Besonderheiten in der Wohnung",
          "Wünsche zur Ansprache und Betreuung",
        ],
      },
      {
        title: "Entlastung ohne schlechtes Gewissen",
        body:
          "Viele Angehörige warten zu lange, bevor sie Hilfe annehmen. Dabei ist Entlastung kein Zeichen von Schwäche. Wer regelmäßig Kraft schöpft, kann langfristig stabiler und liebevoller begleiten.",
      },
    ],
    closing:
      "Wir beraten Angehörige gern dazu, wie Verhinderungspflege in Hildesheim praktisch organisiert werden kann. Schreiben Sie uns über [Kontakt](/kontakt).",
  }),
  article({
    title: "Betreutes Wohnen in Hildesheim: Selbstständig leben mit Sicherheit",
    slug: "betreutes-wohnen-hildesheim-selbststaendig-sicher",
    excerpt:
      "Betreutes Wohnen verbindet Privatsphäre mit Unterstützung bei Bedarf. Für viele Seniorinnen und Senioren ist das ein guter Mittelweg.",
    category: "Alltag im Alter",
    publishedAt: "2026-04-07T12:00:00.000Z",
    imageFilename: "2026-04-07-betreutes-wohnen-hildesheim.png",
    imageAlt: "Seniorin in einer hellen barrierearmen Wohnung mit unterstützender Pflegekraft",
    intro:
      "Viele ältere Menschen möchten selbstbestimmt wohnen und gleichzeitig wissen, dass Unterstützung erreichbar ist. Betreutes Wohnen kann genau diesen Rahmen bieten: ein eigenes Zuhause, vertraute Routinen und Hilfe, wenn sie gebraucht wird.",
    sections: [
      {
        title: "Privat wohnen, Hilfe abrufen",
        body:
          "Im Betreuten Wohnen steht die eigene Wohnung im Mittelpunkt. Pflege- oder Betreuungsleistungen werden individuell ergänzt. Das kann hauswirtschaftliche Unterstützung sein, Begleitung im Alltag oder ambulante Pflege nach Bedarf.",
      },
      {
        title: "Sicherheit durch vertraute Ansprechpartner",
        body:
          "Ein wichtiger Vorteil ist die planbare Unterstützung. Wer weiß, an wen er sich wenden kann, fühlt sich sicherer. Auch Angehörige profitieren, weil sie Aufgaben besser teilen und Versorgung verlässlicher organisieren können.",
      },
      {
        title: "Für wen Betreutes Wohnen passt",
        body:
          "Betreutes Wohnen eignet sich für Menschen, die grundsätzlich selbstständig leben möchten, aber Entlastung und Sicherheit wünschen. Besonders hilfreich kann es sein, wenn Treppen, Einsamkeit oder unsichere Versorgung zu Hause zunehmend belastend werden.",
      },
      {
        title: "Theaterresidenz Hildesheim",
        body:
          "Positana Pflege begleitet im Umfeld der Theaterresidenz Hildesheim mit ambulanter Pflege und hauswirtschaftlicher Unterstützung. Leistungen werden nach Bedarf geplant, damit Selbstbestimmung und Versorgung gut zusammenpassen.",
      },
    ],
    closing:
      "Mehr zu diesem Angebot finden Sie auf unserer Seite [Leistungen](/leistungen) im Abschnitt Betreutes Wohnen.",
  }),
  article({
    title: "Sturzprophylaxe zu Hause: Kleine Anpassungen mit großer Wirkung",
    slug: "sturzprophylaxe-zuhause-tipps",
    excerpt:
      "Stürze lassen sich nicht immer verhindern, aber viele Risiken können zu Hause deutlich reduziert werden. Schon kleine Veränderungen helfen.",
    category: "Alltag im Alter",
    publishedAt: "2026-04-21T12:00:00.000Z",
    imageFilename: "2026-04-21-sturzprophylaxe-zuhause.png",
    imageAlt: "Pflegekraft prüft mit einem Senior einen sicheren Flur und Rollator",
    intro:
      "Ein Sturz kann im Alter viel verändern. Deshalb ist Vorbeugung so wichtig. Sturzprophylaxe beginnt nicht erst bei Hilfsmitteln, sondern bei einem wachen Blick auf Wohnung, Routinen und körperliche Sicherheit.",
    sections: [
      {
        title: "Wohnung bewusst ansehen",
        body:
          "Viele Stolperstellen fallen im Alltag kaum auf. Lose Teppiche, schlechte Beleuchtung, Kabel oder enge Wege können jedoch riskant werden. Ein gemeinsamer Rundgang durch die Wohnung zeigt schnell, wo kleine Anpassungen helfen.",
        items: [
          "gute Beleuchtung in Flur, Bad und Schlafzimmer",
          "rutschfeste Matten und sichere Übergänge",
          "freie Wege ohne Kabel oder lose Teppiche",
          "Haltegriffe an passenden Stellen",
        ],
      },
      {
        title: "Hilfsmittel richtig nutzen",
        body:
          "Ein Rollator oder Gehstock hilft nur, wenn er passend eingestellt und regelmäßig genutzt wird. Auch feste Schuhe und gut erreichbare Gegenstände tragen zur Sicherheit bei.",
      },
      {
        title: "Routine statt Hektik",
        body:
          "Viele Stürze passieren in Eile, etwa nachts oder beim schnellen Aufstehen. Feste Abläufe, ausreichend Zeit und gut erreichbare Hilfsmittel reduzieren Risiken. Auch Angehörige sollten ermutigen, Hilfe anzunehmen, bevor es unsicher wird.",
      },
      {
        title: "Pflegedienst als zweites Augenpaar",
        body:
          "Pflegekräfte erkennen Veränderungen häufig früh: unsicherer Gang, Schwindel, neue Medikamente oder mehr Erschöpfung. Diese Beobachtungen können Anlass sein, Hilfsmittel, ärztliche Rücksprache oder zusätzliche Unterstützung zu prüfen.",
      },
    ],
    closing:
      "Wenn Sie unsicher sind, welche Unterstützung zu Hause sinnvoll ist, sprechen Sie uns gern an. Wir beraten im Rahmen unserer Pflegeeinsätze und Erstgespräche.",
  }),
  article({
    title: "Demenz im Alltag: Orientierung, Ruhe und vertraute Routinen schaffen",
    slug: "demenz-alltag-orientierung-routinen",
    excerpt:
      "Bei Demenz helfen klare Strukturen, vertraute Gegenstände und ruhige Kommunikation. Angehörige können den Alltag mit kleinen Maßnahmen spürbar erleichtern.",
    category: "Alltag im Alter",
    publishedAt: "2026-05-08T12:00:00.000Z",
    imageFilename: "2026-05-08-demenz-alltag-routinen.png",
    imageAlt: "Pflegekraft und Seniorin betrachten vertraute Erinnerungsgegenstände im Wohnzimmer",
    intro:
      "Demenz verändert nicht nur das Gedächtnis, sondern oft den gesamten Alltag. Orientierung, Sprache, Stimmung und Sicherheit können schwanken. Gerade deshalb sind Ruhe und vertraute Abläufe so wertvoll.",
    sections: [
      {
        title: "Orientierung sichtbar machen",
        body:
          "Klare Hinweise können helfen, den Tag besser einzuordnen. Ein gut sichtbarer Kalender, feste Plätze für wichtige Gegenstände und einfache Routinen schaffen Verlässlichkeit. Wichtig ist, dass Hilfen nicht überfordern.",
      },
      {
        title: "Kommunikation vereinfachen",
        body:
          "Kurze Sätze, Blickkontakt und eine ruhige Stimme sind oft hilfreicher als viele Erklärungen. Korrekturen oder Diskussionen führen schnell zu Stress. Besser ist es, Sicherheit zu geben und Handlungsschritte einfach anzubieten.",
      },
      {
        title: "Vertraute Dinge nutzen",
        body:
          "Fotos, Musik, Alltagsgegenstände oder bekannte Gerüche können Erinnerungen wecken und Halt geben. Eine kleine Erinnerungsbox kann Gespräche erleichtern und angenehme Momente schaffen.",
      },
      {
        title: "Angehörige entlasten",
        body:
          "Demenzbetreuung fordert viel Geduld. Angehörige sollten Pausen einplanen und Unterstützung annehmen. Ein ambulanter Dienst kann helfen, wiederkehrende Aufgaben zu übernehmen und den Tagesablauf zu stabilisieren.",
      },
    ],
    closing:
      "Jede Demenzerkrankung verläuft anders. Eine persönliche Beratung hilft, die Unterstützung an den Menschen und seine Gewohnheiten anzupassen.",
  }),
  article({
    title: "Nach dem Krankenhaus: Pflege zu Hause schnell und ruhig organisieren",
    slug: "krankenhausentlassung-pflege-zuhause-organisieren",
    excerpt:
      "Nach einem Krankenhausaufenthalt muss Pflege oft kurzfristig organisiert werden. Mit klarer Vorbereitung gelingt der Übergang nach Hause ruhiger.",
    category: "Pflege & Organisation",
    publishedAt: "2026-05-22T12:00:00.000Z",
    imageFilename: "2026-05-22-krankenhausentlassung-pflege.png",
    imageAlt: "Seniorin kommt nach Krankenhausaufenthalt nach Hause und spricht mit Pflegekraft und Angehörigem",
    intro:
      "Die Entlassung aus dem Krankenhaus ist für Familien oft ein Wendepunkt. Plötzlich werden Medikamente, Mobilität, Verbände, Hilfsmittel oder Haushalt zu Hause neu organisiert. Je früher die Planung beginnt, desto ruhiger gelingt der Übergang.",
    sections: [
      {
        title: "Entlassmanagement nutzen",
        body:
          "Krankenhäuser haben ein Entlassmanagement. Fragen Sie früh nach, welche Unterstützung empfohlen wird, welche Verordnungen ausgestellt werden und ob Hilfsmittel benötigt werden. Wichtig sind klare Informationen zu Medikamenten und Folgeterminen.",
      },
      {
        title: "Zu Hause vorbereiten",
        body:
          "Vor der Rückkehr sollte die Wohnung praktisch vorbereitet werden. Wege sollten frei sein, wichtige Dinge gut erreichbar und Schlafplatz sowie Bad sicher nutzbar. Manchmal reichen kleine Anpassungen, manchmal sind Hilfsmittel nötig.",
        items: [
          "Medikamentenplan bereitlegen",
          "ärztliche Verordnungen prüfen",
          "Hilfsmittel organisieren",
          "Kontakt zum Pflegedienst früh aufnehmen",
        ],
      },
      {
        title: "Pflegebedarf realistisch einschätzen",
        body:
          "Nach einem Klinikaufenthalt ist der Bedarf oft höher als vorher. Das kann vorübergehend sein oder dauerhaft bleiben. Eine ambulante Pflege kann Grundpflege, Behandlungspflege oder Alltagshilfe übernehmen und Angehörige entlasten.",
      },
      {
        title: "Nicht alles am ersten Tag lösen",
        body:
          "Der erste Tag zu Hause sollte möglichst ruhig sein. Priorität haben Sicherheit, Medikamente, Essen, Trinken und Orientierung. Weitere Fragen können Schritt für Schritt geklärt werden.",
      },
    ],
    closing:
      "Wenn eine Entlassung bevorsteht, kontaktieren Sie uns möglichst früh. Auf [Kontakt](/kontakt) finden Sie Telefon und Formular für eine schnelle Rückmeldung.",
  }),
  article({
    title: "Angehörige entlasten: Pflege auf mehrere Schultern verteilen",
    slug: "angehoerige-entlasten-pflege-aufteilen",
    excerpt:
      "Pflege gelingt langfristig besser, wenn Aufgaben klar verteilt werden. Angehörige, Pflegedienst und Umfeld können gemeinsam ein stabiles Netz bilden.",
    category: "Entlastung für Angehörige",
    publishedAt: "2026-06-06T12:00:00.000Z",
    imageFilename: "2026-06-06-angehoerige-entlasten.png",
    imageAlt: "Familie und Pflegekraft besprechen gemeinsam einen Pflegeplan am Wohnzimmertisch",
    intro:
      "Viele Angehörige übernehmen Pflege aus Liebe und Verantwortungsgefühl. Mit der Zeit kann daraus eine große Belastung werden. Entlastung beginnt, wenn Aufgaben sichtbar gemacht und fair verteilt werden.",
    sections: [
      {
        title: "Aufgaben ehrlich sammeln",
        body:
          "Oft wird unterschätzt, wie viel Pflege im Alltag bedeutet. Neben Körperpflege oder Medikamenten gehören Organisation, Telefonate, Einkäufe, Haushalt, Termine und emotionale Begleitung dazu. Eine Aufgabenliste schafft Überblick.",
      },
      {
        title: "Familie und Umfeld einbeziehen",
        body:
          "Nicht jede Person kann pflegen, aber fast jede kann etwas beitragen. Manche übernehmen Fahrten, andere Einkäufe oder Papierkram. Wichtig ist, konkrete Aufgaben zu benennen statt allgemein um Hilfe zu bitten.",
      },
      {
        title: "Professionelle Unterstützung gezielt nutzen",
        body:
          "Ein Pflegedienst kann wiederkehrende oder fachlich anspruchsvolle Aufgaben übernehmen. Dadurch entsteht Verlässlichkeit. Angehörige können sich stärker auf Beziehung, Besuche und emotionale Nähe konzentrieren.",
      },
      {
        title: "Regelmäßig neu prüfen",
        body:
          "Pflegebedarf verändert sich. Deshalb sollte die Aufgabenverteilung regelmäßig überprüft werden. Was vor drei Monaten gepasst hat, kann heute zu viel oder zu wenig sein.",
      },
    ],
    closing:
      "Entlastung ist keine Ausnahme, sondern Teil guter Pflege. Positana Pflege Hildesheim unterstützt Familien dabei, tragfähige Lösungen zu finden.",
  }),
  article({
    title: "Hitze im Sommer: Seniorinnen und Senioren im Pflegealltag schützen",
    slug: "hitze-sommer-senioren-pflege",
    excerpt:
      "Heiße Tage können ältere Menschen stark belasten. Mit einfachen Routinen lassen sich Flüssigkeit, Raumklima und Wohlbefinden besser im Blick behalten.",
    category: "Alltag im Alter",
    publishedAt: "2026-06-20T12:00:00.000Z",
    imageFilename: "2026-06-20-hitze-sommer-pflege.png",
    imageAlt: "Pflegekraft reicht einer Seniorin im Sommer ein Glas Wasser auf einem hellen Balkon",
    intro:
      "Sommerhitze ist für ältere Menschen oft anstrengender als für jüngere. Durstgefühl, Kreislauf, Medikamente und Vorerkrankungen können eine Rolle spielen. Gute Pflege achtet deshalb besonders auf Flüssigkeit, Schatten und Ruhe.",
    sections: [
      {
        title: "Trinken sichtbar machen",
        body:
          "Viele Seniorinnen und Senioren trinken zu wenig, ohne es zu bemerken. Getränke sollten gut erreichbar stehen. Kleine Gläser über den Tag verteilt sind oft leichter als große Mengen auf einmal.",
      },
      {
        title: "Wohnung kühl halten",
        body:
          "Morgens lüften, tagsüber beschatten und anstrengende Tätigkeiten auf kühlere Zeiten legen: einfache Maßnahmen können viel bewirken. Auch leichte Kleidung und lauwarme Erfrischung helfen.",
        items: [
          "Getränke sichtbar bereitstellen",
          "Mittagshitze vermeiden",
          "leichte Mahlzeiten anbieten",
          "auf Schwindel, Müdigkeit oder Verwirrtheit achten",
        ],
      },
      {
        title: "Medikamente und Gesundheit beachten",
        body:
          "Manche Medikamente oder Erkrankungen beeinflussen Kreislauf und Flüssigkeitshaushalt. Bei Unsicherheiten sollte ärztlicher Rat eingeholt werden. Pflegekräfte können Veränderungen beobachten und Angehörige informieren.",
      },
      {
        title: "Routinen für heiße Tage",
        body:
          "Ein Sommerplan hilft: feste Trinkzeiten, kurze Wege, Schattenplätze, leichte Kleidung und regelmäßige Nachfrage. So bleibt der Tag auch bei Hitze übersichtlicher und sicherer.",
      },
    ],
    closing:
      "Bei anhaltender Hitze ist Aufmerksamkeit besonders wichtig. Wenn Sie Unterstützung im Alltag wünschen, beraten wir Sie gern zu passenden Pflege- und Betreuungsleistungen.",
  }),
];

const uploadImage = async (post) => {
  const imagePath = path.join(root, "public", "blog", "generated", post.imageFilename);
  if (!fs.existsSync(imagePath)) {
    throw new Error(`Missing image: ${imagePath}`);
  }

  const storagePath = `covers/${post.imageFilename}`;
  const file = fs.readFileSync(imagePath);
  const { error } = await supabase.storage.from(bucketName).upload(storagePath, file, {
    cacheControl: "31536000",
    contentType: "image/png",
    upsert: true,
  });

  if (error) {
    throw new Error(`Image upload failed for ${post.slug}: ${error.message}`);
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(storagePath);
  return data.publicUrl;
};

const seed = async () => {
  const rows = [];

  for (const post of posts) {
    const coverImageUrl = await uploadImage(post);
    rows.push({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author_name: "Positana Pflege Team",
      cover_image_url: coverImageUrl,
      cover_image_alt: post.imageAlt,
      reading_time_minutes: estimateReadingTime(post.content),
      published: true,
      published_at: post.publishedAt,
      created_at: post.publishedAt,
      updated_at: post.publishedAt,
    });
  }

  const { error } = await supabase.from("blog_posts").upsert(rows, {
    onConflict: "slug",
  });

  if (error) {
    throw error;
  }

  console.log(`Seeded ${rows.length} care blog posts.`);
  for (const row of rows) {
    console.log(`${row.published_at.slice(0, 10)}  ${row.slug}`);
  }
};

seed().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
