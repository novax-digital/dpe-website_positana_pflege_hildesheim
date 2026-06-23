import PublicShell from "@/components/PublicShell";
import FAQ from "@/react-pages/FAQ";

const FaqPublicPage = ({ currentPath }: { currentPath?: string }) => (
  <PublicShell currentPath={currentPath}>
    <FAQ />
  </PublicShell>
);

export default FaqPublicPage;
