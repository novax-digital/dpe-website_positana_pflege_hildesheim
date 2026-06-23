import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RouterProvider } from "@/lib/router";
import Index from "@/react-pages/Index";
import Leistungen from "@/react-pages/Leistungen";
import UeberUns from "@/react-pages/UeberUns";
import Ablauf from "@/react-pages/Ablauf";
import Abrechnung from "@/react-pages/Abrechnung";
import FAQ from "@/react-pages/FAQ";
import Ratgeber from "@/react-pages/Ratgeber";
import BlogPost from "@/react-pages/BlogPost";
import Kontakt from "@/react-pages/Kontakt";
import Karriere from "@/react-pages/Karriere";
import Impressum from "@/react-pages/Impressum";
import Datenschutz from "@/react-pages/Datenschutz";
import type { BlogPost as BlogPostEntry, JobListing } from "@/lib/supabase-schema";

const pages = {
  Index,
  Leistungen,
  UeberUns,
  Ablauf,
  Abrechnung,
  FAQ,
  Ratgeber,
  BlogPost,
  Kontakt,
  Karriere,
  Impressum,
  Datenschutz,
};

type PageKey = keyof typeof pages;

interface PublicPageProps {
  page: PageKey;
  currentPath?: string;
  articles?: BlogPostEntry[];
  jobs?: JobListing[];
  post?: BlogPostEntry | null;
}

const PublicPage = ({ page, currentPath = "/", articles = [], jobs = [], post = null }: PublicPageProps) => {
  const Page = pages[page] as React.ComponentType<{
    articles?: BlogPostEntry[];
    jobs?: JobListing[];
    post?: BlogPostEntry | null;
  }>;

  return (
    <RouterProvider pathname={currentPath}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Page articles={articles} jobs={jobs} post={post} />
        </main>
        <Footer />
      </div>
    </RouterProvider>
  );
};

export default PublicPage;
