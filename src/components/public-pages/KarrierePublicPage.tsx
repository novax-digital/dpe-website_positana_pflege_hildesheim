import PublicShell from "@/components/PublicShell";
import Karriere from "@/react-pages/Karriere";
import type { JobListing } from "@/lib/supabase-schema";

interface KarrierePublicPageProps {
  currentPath?: string;
  jobs?: JobListing[];
}

const KarrierePublicPage = ({ currentPath, jobs = [] }: KarrierePublicPageProps) => (
  <PublicShell currentPath={currentPath}>
    <Karriere jobs={jobs} />
  </PublicShell>
);

export default KarrierePublicPage;
