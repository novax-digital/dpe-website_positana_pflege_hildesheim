import PublicShell from "@/components/PublicShell";
import Datenschutz from "@/react-pages/Datenschutz";

const DatenschutzPublicPage = ({ currentPath }: { currentPath?: string }) => (
  <PublicShell currentPath={currentPath}>
    <Datenschutz />
  </PublicShell>
);

export default DatenschutzPublicPage;
