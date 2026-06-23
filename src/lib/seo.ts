import type { BlogPost, JobListing } from "@/lib/supabase-schema";
import { LANDING_PAGES, type LandingPage } from "@/lib/landing-pages";

export const SITE_URL = "https://positana-pflege-hildesheim.de";
export const SITE_NAME = "Positana Pflege Hildesheim";
export const SITE_SHORT_NAME = "Positana Pflege";
export const SITE_LANGUAGE = "de-DE";
export const SITE_LOCALE = "de_DE";
export const SITE_LAST_UPDATED = "2026-06-23";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const CONTACT = {
  phoneDisplay: "0176 19312010",
  phoneHref: "tel:017619312010",
  phoneE164: "+4917619312010",
  email: "info@positana-pflege.de",
  streetAddress: "Brückenstr. 3",
  postalCode: "31180",
  locality: "Giesen",
  region: "Niedersachsen",
  country: "DE",
};

export const GEO = {
  region: "DE-NI",
  placename: "Hildesheim, Niedersachsen",
  position: "52.1548;9.9579",
};

export const SERVICE_AREAS = [
  "Hildesheim",
  "Landkreis Hildesheim",
  "Giesen",
  "Sarstedt",
  "Harsum",
  "Algermissen",
  "Nordstemmen",
  "Bad Salzdetfurth",
  "Diekholzen",
  "Söhlde",
  "Schellerten",
  "Holle",
  "Bockenem",
  "Elze",
  "Alfeld (Leine)",
  "Duingen",
  "Freden (Leine)",
  "Lamspringe",
  "Sibbesse",
];

export const SERVICES = [
  {
    name: "Grundpflege",
    description: "Unterstützung bei Körperpflege, Mobilität, Ernährung und täglichen pflegerischen Aufgaben.",
  },
  {
    name: "Behandlungspflege",
    description: "Medizinische Pflege auf ärztliche Verordnung, zum Beispiel Medikamentengabe, Injektionen und Wundversorgung.",
  },
  {
    name: "Haushaltshilfe",
    description: "Hauswirtschaftliche Unterstützung, Einkaufshilfe, Begleitung und Entlastung im Alltag.",
  },
  {
    name: "Verhinderungspflege",
    description: "Zuverlässige Ersatzpflege, wenn pflegende Angehörige Urlaub, Termine oder Erholung benötigen.",
  },
  {
    name: "Betreutes Wohnen",
    description: "Selbstbestimmtes Wohnen mit ambulanter Pflege und hauswirtschaftlicher Unterstützung in der Theaterresidenz Hildesheim.",
  },
  {
    name: "Alltagsbegleitung",
    description: "Begleitung, Betreuung und praktische Hilfe für Seniorinnen, Senioren und Angehörige.",
  },
];

export const ROUTE_LABELS: Record<string, string> = {
  "leistungen": "Leistungen",
  "ueber-uns": "Über uns",
  "ablauf": "Ablauf",
  "abrechnung": "Abrechnung",
  "faq": "FAQ",
  "ratgeber": "Ratgeber",
  "pflege": "Pflege vor Ort",
  "kontakt": "Kontakt",
  "karriere": "Karriere",
  "impressum": "Impressum",
  "datenschutz": "Datenschutz",
  "admin": "Admin",
  "login": "Login",
  "blog": "Blog",
  "jobs": "Stellen",
  "messages": "Kontaktanfragen",
  "applications": "Bewerbungen",
};

export const PUBLIC_SEO_ROUTES = [
  {
    path: "/",
    label: "Startseite",
    title: "Ambulante Pflege in Hildesheim",
    description:
      "Ambulante Pflege, Grund- und Behandlungspflege, Betreutes Wohnen in der Theaterresidenz und Alltagsbegleitung in Hildesheim. Seit 1993.",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    path: "/leistungen",
    label: "Leistungen",
    title: "Pflegeleistungen in Hildesheim",
    description:
      "Grundpflege, Behandlungspflege, Haushaltshilfe, Verhinderungspflege und Betreutes Wohnen in Hildesheim und Umgebung.",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    path: "/ueber-uns",
    label: "Über uns",
    title: "Über Positana Pflege Hildesheim",
    description:
      "Positana Pflege begleitet Seniorinnen und Senioren in Hildesheim seit 1993 mit ambulanter Pflege, Betreuung und festen Bezugspersonen.",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/ablauf",
    label: "Ablauf",
    title: "Pflegeberatung & Ablauf in Hildesheim",
    description:
      "Von kostenloser Beratung über individuelles Pflegeangebot bis zum Start der Versorgung: So beginnt ambulante Pflege mit Positana Pflege Hildesheim.",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/abrechnung",
    label: "Abrechnung",
    title: "Pflegekosten & Abrechnung",
    description:
      "Pflegeleistungen über Pflegekasse und Krankenkasse abrechnen: Positana Pflege Hildesheim berät zu Pflegesachleistungen, Entlastungsbetrag und Verhinderungspflege.",
    changefreq: "monthly",
    priority: "0.75",
  },
  {
    path: "/faq",
    label: "FAQ",
    title: "FAQ zu Pflege in Hildesheim",
    description:
      "Antworten auf häufige Fragen zu Pflegegrad, ambulanter Pflege, Behandlungspflege, Betreutem Wohnen und Kosten in Hildesheim.",
    changefreq: "monthly",
    priority: "0.65",
  },
  {
    path: "/ratgeber",
    label: "Ratgeber",
    title: "Pflege-Ratgeber Hildesheim",
    description:
      "Ratgeberwissen zu Pflege, Entlastung, Alltag im Alter und Organisation der häuslichen Versorgung in Hildesheim.",
    changefreq: "weekly",
    priority: "0.7",
  },
  {
    path: "/kontakt",
    label: "Kontakt",
    title: "Kontakt & Pflegeberatung in Hildesheim",
    description:
      "Kostenlose Pflegeberatung in Hildesheim anfragen: Positana Pflege telefonisch unter 0176 19312010, per E-Mail oder Kontaktformular erreichen.",
    changefreq: "monthly",
    priority: "0.85",
  },
  {
    path: "/karriere",
    label: "Karriere",
    title: "Pflegejobs in Hildesheim",
    description:
      "Pflegejobs bei Positana Pflege Hildesheim: Stellen für Pflegefachkräfte, Pflegehilfskräfte und Alltagsbegleiterinnen und Alltagsbegleiter.",
    changefreq: "weekly",
    priority: "0.65",
  },
  ...LANDING_PAGES.map((page) => ({
    path: `/pflege/${page.slug}`,
    label: page.breadcrumbLabel,
    title: page.seoTitle,
    description: page.description,
    changefreq: "monthly",
    priority: page.priority,
  })),
] as const;

export const absoluteUrl = (pathOrUrl = "/") => {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return new URL(pathOrUrl, SITE_URL).toString();
};

export const normalizePath = (pathname: string) => {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/$/, "");
};

export const getRouteByPath = (path: string) => PUBLIC_SEO_ROUTES.find((route) => route.path === normalizePath(path));

export const serviceAreaJsonLd = SERVICE_AREAS.map((name) => ({
  "@type": name === "Landkreis Hildesheim" ? "AdministrativeArea" : "City",
  name,
}));

export const addressJsonLd = {
  "@type": "PostalAddress",
  streetAddress: CONTACT.streetAddress,
  postalCode: CONTACT.postalCode,
  addressLocality: CONTACT.locality,
  addressRegion: CONTACT.region,
  addressCountry: CONTACT.country,
};

export const organizationJsonLd = (imageUrl = absoluteUrl("/og-image.jpg")) => ({
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  legalName: "Positana GmbH",
  alternateName: SITE_SHORT_NAME,
  description:
    "Ambulanter Pflegedienst in Hildesheim: Grundpflege, Behandlungspflege, Verhinderungspflege, Betreutes Wohnen in der Theaterresidenz und Alltagsbegleitung. Seit 1993.",
  url: SITE_URL,
  logo: absoluteUrl("/favicon.svg"),
  image: imageUrl,
  telephone: CONTACT.phoneE164,
  email: CONTACT.email,
  priceRange: "$$",
  address: addressJsonLd,
  areaServed: serviceAreaJsonLd,
  foundingDate: "1993",
  openingHours: "Mo-Fr 08:00-14:00",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "14:00",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: CONTACT.phoneE164,
      email: CONTACT.email,
      contactType: "customer service",
      areaServed: "DE-NI",
      availableLanguage: ["de"],
    },
  ],
  medicalSpecialty: "Geriatric",
  knowsAbout: [
    "Ambulante Pflege Hildesheim",
    "Grundpflege",
    "Behandlungspflege",
    "Verhinderungspflege",
    "Betreutes Wohnen",
    "Pflegegrad",
    "Entlastungsbetrag",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Pflege- und Betreuungsleistungen",
    itemListElement: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: {
          "@id": ORGANIZATION_ID,
        },
        areaServed: serviceAreaJsonLd,
      },
    })),
  },
});

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  alternateName: SITE_SHORT_NAME,
  url: SITE_URL,
  inLanguage: SITE_LANGUAGE,
  publisher: {
    "@id": ORGANIZATION_ID,
  },
};

export const serviceCatalogJsonLd = (canonicalUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${canonicalUrl}#services`,
  name: "Pflegeleistungen von Positana Pflege Hildesheim",
  description: "Ambulante Pflege- und Betreuungsleistungen in Hildesheim und Umgebung.",
  itemListElement: SERVICES.map((service, index) => ({
    "@type": "Offer",
    position: index + 1,
    itemOffered: {
      "@type": "Service",
      name: service.name,
      description: service.description,
      provider: {
        "@id": ORGANIZATION_ID,
      },
      areaServed: serviceAreaJsonLd,
      serviceType: service.name,
    },
  })),
});

export const careProcessJsonLd = (canonicalUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${canonicalUrl}#pflege-ablauf`,
  name: "So startet die Pflege durch Positana Pflege Hildesheim",
  description: "In drei Schritten von der kostenlosen Beratung bis zum Start der persönlichen Versorgung.",
  totalTime: "P3D",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Kostenlose Beratung",
      text: "Persönliches Gespräch zur Situation, zu Pflegegrad, Budget, Abrechnung und Entlastungsmöglichkeiten.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Angebotserstellung",
      text: "Individuelles Pflegeangebot mit transparent dargestellten Leistungen und ersten Terminen.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Start der Betreuung",
      text: "Die persönliche Pflege- oder Betreuungskraft stellt sich vor und die Versorgung beginnt.",
    },
  ],
});

const landingAreaServedJsonLd = (page: LandingPage) =>
  page.kind === "location"
    ? [
        {
          "@type": "City",
          name: page.areaServed,
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Landkreis Hildesheim",
          },
        },
      ]
    : serviceAreaJsonLd;

export const landingPageJsonLd = (page: LandingPage, canonicalUrl: string) => [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    name: page.title,
    alternateName: page.primaryKeyword,
    description: page.description,
    url: canonicalUrl,
    serviceType: page.serviceType,
    provider: {
      "@id": ORGANIZATION_ID,
    },
    areaServed: landingAreaServedJsonLd(page),
    audience: {
      "@type": "Audience",
      audienceType: "Pflegebedürftige, Seniorinnen, Senioren und Angehörige",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl("/kontakt"),
      servicePhone: {
        "@type": "ContactPoint",
        telephone: CONTACT.phoneE164,
        contactType: "customer service",
        availableLanguage: ["de"],
      },
    },
    termsOfService: absoluteUrl("/leistungen"),
    keywords: page.keywords,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonicalUrl}#faq`,
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
];

export const blogCollectionJsonLd = (posts: BlogPost[], canonicalUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${canonicalUrl}#blog`,
  name: "Pflege-Ratgeber Hildesheim",
  description: "Ratgeberwissen von Positana Pflege zu Pflege, Alltag im Alter und Entlastung in Hildesheim.",
  url: canonicalUrl,
  inLanguage: SITE_LANGUAGE,
  publisher: {
    "@id": ORGANIZATION_ID,
  },
  blogPost: posts.slice(0, 20).map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.title,
    url: absoluteUrl(`/ratgeber/${post.slug}`),
    image: post.cover_image_url ? [post.cover_image_url] : [absoluteUrl("/og-image.jpg")],
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    author: blogAuthorJsonLd(post.author_name),
  })),
});

const blogAuthorJsonLd = (authorName?: string | null) => {
  const name = authorName?.trim() || SITE_SHORT_NAME;
  const isOrganization = name.toLowerCase().includes("positana");

  return isOrganization
    ? {
        "@type": "Organization",
        name,
        url: SITE_URL,
      }
    : {
        "@type": "Person",
        name,
      };
};

const wordCount = (markdown?: string | null) => {
  if (!markdown) {
    return undefined;
  }

  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]+\]\([^)]+\)/g, " ")
    .replace(/[#>*_\-[\]().,;:!?/\\|]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return words.length || undefined;
};

export const blogPostJsonLd = (post: BlogPost, canonicalUrl: string, imageUrl = absoluteUrl("/og-image.jpg")) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${canonicalUrl}#article`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
  },
  headline: post.title,
  description: post.excerpt || post.title,
  image: [post.cover_image_url || imageUrl],
  datePublished: post.published_at,
  dateModified: post.updated_at || post.published_at,
  author: blogAuthorJsonLd(post.author_name),
  publisher: {
    "@id": ORGANIZATION_ID,
  },
  inLanguage: SITE_LANGUAGE,
  articleSection: post.category || "Pflege-Ratgeber",
  keywords: [post.category, "Pflege Hildesheim", "Ambulante Pflege", "Seniorenbetreuung"].filter(Boolean),
  ...(post.cover_image_alt ? { thumbnailUrl: post.cover_image_url || imageUrl } : {}),
  ...(post.reading_time_minutes ? { timeRequired: `PT${post.reading_time_minutes}M` } : {}),
  ...(wordCount(post.content) ? { wordCount: wordCount(post.content) } : {}),
});

const normalizeEmploymentType = (employmentType: string) => {
  const value = employmentType.toLowerCase();

  if (value.includes("voll")) {
    return "FULL_TIME";
  }

  if (value.includes("teil")) {
    return "PART_TIME";
  }

  if (value.includes("mini") || value.includes("520") || value.includes("538")) {
    return "OTHER";
  }

  return "OTHER";
};

export const jobPostingJsonLd = (job: JobListing) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: job.title,
  description: job.description || `${job.title} bei Positana Pflege Hildesheim.`,
  datePosted: job.created_at,
  employmentType: normalizeEmploymentType(job.employment_type || ""),
  hiringOrganization: {
    "@id": ORGANIZATION_ID,
  },
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: job.location || "Hildesheim",
      addressRegion: CONTACT.region,
      addressCountry: CONTACT.country,
    },
  },
  applicantLocationRequirements: {
    "@type": "Country",
    name: "Deutschland",
  },
  directApply: true,
});
