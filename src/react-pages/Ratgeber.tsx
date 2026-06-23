import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import type { BlogPost } from "@/lib/supabase-schema";

const categoryColors: Record<string, string> = {
  "Alltag im Alter": "bg-primary/10 text-primary",
  "Entlastung für Angehörige": "bg-accent/10 text-accent",
  "Pflege & Organisation": "bg-muted text-foreground",
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

const coverImage = (article: BlogPost) => article.cover_image_url || "/og-image.jpg";
const coverAlt = (article: BlogPost) => article.cover_image_alt || `${article.title} - Positana Pflege Hildesheim`;

const ArticleMeta = ({ article }: { article: BlogPost }) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
    <span>{article.author_name || "Positana Pflege Team"}</span>
    {article.published_at && (
      <>
        <span aria-hidden="true">·</span>
        <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
      </>
    )}
    {article.reading_time_minutes && (
      <>
        <span aria-hidden="true">·</span>
        <span>{article.reading_time_minutes} Min. Lesezeit</span>
      </>
    )}
  </div>
);

const Ratgeber = ({ articles = [] }: { articles?: BlogPost[] }) => {
  useScrollAnimation();
  const [featuredArticle, ...regularArticles] = articles;

  return (
    <>
      <SEO title="Ratgeber" description="Tipps und Wissen rund um Pflege, Entlastung und Alltag im Alter. Der Ratgeber von Positana Pflege Hildesheim." />
      <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-section">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Ratgeber</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Wissen, Tipps und Erfahrungen rund um Pflege, Alltag und Entlastung.
          </p>
        </div>

        {!articles.length ? (
          <p className="text-center text-muted-foreground">Bald finden Sie hier hilfreiche Beiträge.</p>
        ) : (
          <div className="space-y-12">
            {featuredArticle && (
              <Link to={`/ratgeber/${featuredArticle.slug}`} className="fade-in-section group block">
                <article className="grid lg:grid-cols-[1.1fr_0.9fr] overflow-hidden rounded-2xl border border-border bg-background hover:border-accent/30 transition-colors">
                  <img
                    src={coverImage(featuredArticle)}
                    alt={coverAlt(featuredArticle)}
                    className="aspect-[16/10] h-full w-full object-cover"
                    loading="eager"
                  />
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    {featuredArticle.category && (
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4 ${categoryColors[featuredArticle.category] ?? "bg-muted text-foreground"}`}>
                        {featuredArticle.category}
                      </span>
                    )}
                    <h2 className="font-serif text-3xl md:text-4xl mb-4 group-hover:text-accent transition-colors">
                      {featuredArticle.title}
                    </h2>
                    {featuredArticle.excerpt && (
                      <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                        {featuredArticle.excerpt}
                      </p>
                    )}
                    <ArticleMeta article={featuredArticle} />
                  </div>
                </article>
              </Link>
            )}

            {regularArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/ratgeber/${article.slug}`}
                    className="fade-in-section group"
                  >
                    <article className="rounded-2xl border border-border h-full overflow-hidden flex flex-col hover:border-accent/30 transition-colors bg-background">
                      <img
                        src={coverImage(article)}
                        alt={coverAlt(article)}
                        className="aspect-[16/10] w-full object-cover"
                        loading="lazy"
                      />
                      <div className="p-6 flex flex-col flex-1">
                        {article.category && (
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4 ${categoryColors[article.category] ?? "bg-muted text-foreground"}`}>
                            {article.category}
                          </span>
                        )}
                        <h3 className="font-serif text-xl mb-3 group-hover:text-accent transition-colors">
                          {article.title}
                        </h3>
                        {article.excerpt && <p className="text-muted-foreground flex-1 mb-5">{article.excerpt}</p>}
                        <ArticleMeta article={article} />
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
    </>
  );
};

export default Ratgeber;
