import * as React from "react";

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
};

const RouterPathContext = React.createContext("/");

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...props }, ref) => (
  <a ref={ref} href={to} {...props} />
));

Link.displayName = "Link";

export const useLocation = () => {
  const initialPathname = React.useContext(RouterPathContext);
  const readPathname = () => (typeof window === "undefined" ? initialPathname : window.location.pathname);
  const [pathname, setPathname] = React.useState(initialPathname);

  React.useEffect(() => {
    const update = () => setPathname(readPathname());
    update();
    window.addEventListener("popstate", update);
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  return { pathname };
};

export const useParams = () => {
  const { pathname } = useLocation();
  const ratgeberMatch = pathname.match(/^\/ratgeber\/([^/]+)\/?$/);

  return {
    slug: ratgeberMatch?.[1] ? decodeURIComponent(ratgeberMatch[1]) : undefined,
  };
};

export const BrowserRouter = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const RouterProvider = ({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string;
}) => <RouterPathContext.Provider value={pathname}>{children}</RouterPathContext.Provider>;
export const Routes = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const Route = () => null;
export const Outlet = () => null;
