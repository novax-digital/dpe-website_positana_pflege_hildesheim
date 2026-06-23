import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RouterProvider } from "@/lib/router";
import type { ReactNode } from "react";

interface PublicShellProps {
  currentPath?: string;
  children: ReactNode;
}

const PublicShell = ({ currentPath = "/", children }: PublicShellProps) => (
  <RouterProvider pathname={currentPath}>
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  </RouterProvider>
);

export default PublicShell;
