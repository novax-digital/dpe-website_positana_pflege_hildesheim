import { isValidElement, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, List, Phone, UserRound } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import type { BlogPost as BlogPostType } from "@/lib/supabase-schema";

const categoryColors: Record<string, string> = {
  "Alltag im Alter": "bg-primary/10 text-primary",
  "Entlastung für Angehörige": "bg-accent/10 text-accent",
  "Pflege & Organisation": "bg-muted text-foreground",
};

type TocItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

const formatDate = (value?: string | null) => {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const headingId = (value: string) =>
  value
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const cleanHeading = (value: string) =>
  value
    .replace(/[#*_`~]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();

const extractToc = (markdown?: string | null): TocItem[] => {
  if (!markdown) {
    return [];
  }

  return markdown
    .split(/\r?\n/)
    .map((line) => line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/))
    .filter(Boolean)
    .map((match) => {
      const title = cleanHeading(match?.[2] ?? "");
      return {
        id: headingId(title),
        title,
        level: (match?.[1].length === 3 ? 3 : 2) as 2 | 3,
      };
    })
    .filter((item) => item.title && item.id);
};

const getTextContent = (children: ReactNode): string => {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getTextContent).join("");
  }

  if (isValidElement(children)) {
    return getTextContent((children.props as { children?: ReactNode }).children);
  }

  return "";
};

const coverImage = (post: BlogPostType) => post.cover_image_url || "/og-image.jpg";
const coverAlt = (post: BlogPostType) => post.cover_image_alt || `${post.title} - Positana Pflege Hildesheim`;

const BlogCTA = () => (
  <div className="mt-12 rounded-2xl bg-primary/5 border border-primary/10 p-8 md:p-10 text-center">
    <h2 className="font-serif text-2xl md:text-3xl mb-3">
      Jetzt kostenlos beraten lassen
    </h2>
    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
      Wir beraten Sie unverbindlich zu unseren Leistungen und helfen Ihnen bei der Beantragung des Entlastungsbetrags.
    </p>
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        href="tel:017619312010"
        className="inline-flex items-center gap-2 text-lg font-semibold text-primary hover:underline"
      >
        <Phone className="h-5 w-5" />
        0176 19312010
      </a>
      <Button asChild size="lg">
        <Link to="/kontakt">Zur Kontaktseite</Link>
      </Button>
    </div>
  </div>
);

const BlogPost = ({ post = null }: { post?: BlogPostType | null }) => {
  if (!post) {
    return (
      <>
        <SEO
          title="Beitrag nicht gefunden"
          description="Der angeforderte Ratgeber-Beitrag konnte nicht gefunden werden."
          type="article"
        />
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl mb-4">Beitrag nicht gefunden</h1>
            <Link to="/ratgeber" className="text-primary hover:underline">
              Zurück zum Ratgeber
            </Link>
          </div>
        </section>
      </>
    );
  }

  const toc = extractToc(post.content);
  const hasToc = toc.length >= 2;

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt || post.title}
        type="article"
      />
      <article className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link to="/ratgeber" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" />
            Zurück zum Ratgeber
          </Link>

          <header className="max-w-3xl mb-10">
            {post.category && (
              <span className={`text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4 ${categoryColors[post.category] ?? "bg-muted text-foreground"}`}>
                {post.category}
              </span>
            )}

            <h1 className="font-serif text-4xl md:text-5xl mb-5 leading-tight">{post.title}</h1>

            {post.excerpt && (
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{post.excerpt}</p>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="h-4 w-4" />
                {post.author_name || "Positana Pflege Team"}
              </span>
              {post.published_at && (
                <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
              )}
              {post.reading_time_minutes && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.reading_time_minutes} Min. Lesezeit
                </span>
              )}
            </div>
          </header>

          <img
            src={coverImage(post)}
            alt={coverAlt(post)}
            className="aspect-[16/8] w-full rounded-2xl object-cover border border-border mb-12"
          />

          <div className={hasToc ? "grid lg:grid-cols-[240px_minmax(0,1fr)] gap-10 items-start" : "max-w-3xl"}>
            {hasToc && (
              <aside className="hidden lg:block sticky top-28">
                <nav className="rounded-2xl border border-border p-5 bg-background" aria-label="Inhaltsverzeichnis">
                  <div className="flex items-center gap-2 font-semibold text-foreground mb-4">
                    <List className="h-4 w-4" />
                    Inhalt
                  </div>
                  <ol className="space-y-2 text-sm">
                    {toc.map((item) => (
                      <li key={`${item.id}-${item.title}`} className={item.level === 3 ? "pl-4" : ""}>
                        <a href={`#${item.id}`} className="text-muted-foreground hover:text-accent transition-colors">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>
            )}

            <div className="max-w-3xl">
              {hasToc && (
                <nav className="lg:hidden rounded-2xl border border-border p-5 bg-background mb-8" aria-label="Inhaltsverzeichnis">
                  <div className="flex items-center gap-2 font-semibold text-foreground mb-4">
                    <List className="h-4 w-4" />
                    Inhalt
                  </div>
                  <ol className="space-y-2 text-sm">
                    {toc.map((item) => (
                      <li key={`${item.id}-${item.title}`} className={item.level === 3 ? "pl-4" : ""}>
                        <a href={`#${item.id}`} className="text-muted-foreground hover:text-accent transition-colors">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              {post.content && (
                <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-accent">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: ({ children }) => {
                        const text = getTextContent(children);
                        return <h2 id={headingId(text)} className="scroll-mt-28">{children}</h2>;
                      },
                      h3: ({ children }) => {
                        const text = getTextContent(children);
                        return <h3 id={headingId(text)} className="scroll-mt-28">{children}</h3>;
                      },
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              )}

              <BlogCTA />
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
