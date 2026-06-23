import PublicShell from "@/components/PublicShell";
import Kontakt from "@/react-pages/Kontakt";

const KontaktPublicPage = ({ currentPath }: { currentPath?: string }) => (
  <PublicShell currentPath={currentPath}>
    <Kontakt />
  </PublicShell>
);

export default KontaktPublicPage;
