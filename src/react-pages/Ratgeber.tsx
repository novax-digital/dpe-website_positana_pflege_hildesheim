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

const Ratgeber = ({ articles = [] }: { articles?: BlogPost[] }) => {
  useScrollAnimation();

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/ratgeber/${article.slug}`}
                className="fade-in-section group"
              >
                <div className="rounded-2xl border border-border p-6 h-full flex flex-col hover:border-accent/30 transition-colors">
                  {article.category && (
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4 ${categoryColors[article.category] ?? "bg-muted text-foreground"}`}>
                      {article.category}
                    </span>
                  )}
                  <h3 className="font-serif text-xl mb-3 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  {article.excerpt && <p className="text-muted-foreground flex-1 mb-4">{article.excerpt}</p>}
                  {article.published_at && (
                    <p className="text-sm text-muted-foreground">{formatDate(article.published_at)}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
    </>
  );
};

export default Ratgeber;
