import PublicShell from "@/components/PublicShell";
import Ablauf from "@/react-pages/Ablauf";

const AblaufPublicPage = ({ currentPath }: { currentPath?: string }) => (
  <PublicShell currentPath={currentPath}>
    <Ablauf />
  </PublicShell>
);

export default AblaufPublicPage;
