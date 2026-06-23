import { Link } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
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
              ← Zurück zum Ratgeber
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt || post.title}
        type="article"
      />
      <section className="py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link to="/ratgeber" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" />
          Zurück zum Ratgeber
        </Link>

        {post.category && (
          <span className={`text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4 ${categoryColors[post.category] ?? "bg-muted text-foreground"}`}>
            {post.category}
          </span>
        )}

        <h1 className="font-serif text-3xl md:text-4xl mb-4">{post.title}</h1>

        {post.published_at && (
          <p className="text-muted-foreground text-sm mb-8">{formatDate(post.published_at)}</p>
        )}

        {post.excerpt && (
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{post.excerpt}</p>
        )}

        {post.content && (
          <div className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        )}

        <BlogCTA />
      </div>
    </section>
    </>
  );
};

export default BlogPost;
