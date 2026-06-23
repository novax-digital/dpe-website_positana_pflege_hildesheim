import PublicShell from "@/components/PublicShell";
import Abrechnung from "@/react-pages/Abrechnung";

const AbrechnungPublicPage = ({ currentPath }: { currentPath?: string }) => (
  <PublicShell currentPath={currentPath}>
    <Abrechnung />
  </PublicShell>
);

export default AbrechnungPublicPage;
