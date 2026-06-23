import PublicShell from "@/components/PublicShell";
import Ratgeber from "@/react-pages/Ratgeber";
import type { BlogPost } from "@/lib/supabase-schema";

interface RatgeberPublicPageProps {
  currentPath?: string;
  articles?: BlogPost[];
}

const RatgeberPublicPage = ({ currentPath, articles = [] }: RatgeberPublicPageProps) => (
  <PublicShell currentPath={currentPath}>
    <Ratgeber articles={articles} />
  </PublicShell>
);

export default RatgeberPublicPage;
