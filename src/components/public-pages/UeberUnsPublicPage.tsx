import PublicShell from "@/components/PublicShell";
import UeberUns from "@/react-pages/UeberUns";

const UeberUnsPublicPage = ({ currentPath }: { currentPath?: string }) => (
  <PublicShell currentPath={currentPath}>
    <UeberUns />
  </PublicShell>
);

export default UeberUnsPublicPage;
