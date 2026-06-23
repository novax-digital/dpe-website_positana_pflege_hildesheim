import PublicShell from "@/components/PublicShell";
import Leistungen from "@/react-pages/Leistungen";

const LeistungenPublicPage = ({ currentPath }: { currentPath?: string }) => (
  <PublicShell currentPath={currentPath}>
    <Leistungen />
  </PublicShell>
);

export default LeistungenPublicPage;
