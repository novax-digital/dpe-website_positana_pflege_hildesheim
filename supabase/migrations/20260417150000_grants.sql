GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT SELECT ON public.job_listings TO anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_listings TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_applications TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_listings TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_applications TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_roles TO service_role;
