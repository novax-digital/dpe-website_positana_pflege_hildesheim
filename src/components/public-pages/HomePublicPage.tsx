import PublicShell from "@/components/PublicShell";
import Index from "@/react-pages/Index";

const HomePublicPage = ({ currentPath }: { currentPath?: string }) => (
  <PublicShell currentPath={currentPath}>
    <Index />
  </PublicShell>
);

export default HomePublicPage;
