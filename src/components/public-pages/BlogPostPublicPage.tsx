import PublicShell from "@/components/PublicShell";
import BlogPost from "@/react-pages/BlogPost";
import type { BlogPost as BlogPostEntry } from "@/lib/supabase-schema";

interface BlogPostPublicPageProps {
  currentPath?: string;
  post?: BlogPostEntry | null;
}

const BlogPostPublicPage = ({ currentPath, post = null }: BlogPostPublicPageProps) => (
  <PublicShell currentPath={currentPath}>
    <BlogPost post={post} />
  </PublicShell>
);

export default BlogPostPublicPage;
