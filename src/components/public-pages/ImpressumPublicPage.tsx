import PublicShell from "@/components/PublicShell";
import Impressum from "@/react-pages/Impressum";

const ImpressumPublicPage = ({ currentPath }: { currentPath?: string }) => (
  <PublicShell currentPath={currentPath}>
    <Impressum />
  </PublicShell>
);

export default ImpressumPublicPage;
