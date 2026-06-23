import PublicShell from "@/components/PublicShell";
import SeoLandingPage from "@/react-pages/SeoLandingPage";
import type { LandingPage } from "@/lib/landing-pages";

interface SeoLandingPublicPageProps {
  currentPath?: string;
  landingPage?: LandingPage | null;
}

const SeoLandingPublicPage = ({ currentPath, landingPage = null }: SeoLandingPublicPageProps) => (
  <PublicShell currentPath={currentPath}>
    <SeoLandingPage landingPage={landingPage} />
  </PublicShell>
);

export default SeoLandingPublicPage;
