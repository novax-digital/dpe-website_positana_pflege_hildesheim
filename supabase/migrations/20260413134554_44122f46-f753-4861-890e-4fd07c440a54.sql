ALTER TABLE public.blog_posts
ADD COLUMN published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();

-- Set existing posts' published_at to their created_at
UPDATE public.blog_posts SET published_at = created_at;