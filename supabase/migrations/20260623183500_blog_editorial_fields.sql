ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS author_name TEXT NOT NULL DEFAULT 'Positana Pflege Team',
  ADD COLUMN IF NOT EXISTS cover_image_url TEXT,
  ADD COLUMN IF NOT EXISTS cover_image_alt TEXT,
  ADD COLUMN IF NOT EXISTS reading_time_minutes INTEGER NOT NULL DEFAULT 1;

UPDATE public.blog_posts
SET cover_image_alt = title
WHERE cover_image_url IS NOT NULL
  AND (cover_image_alt IS NULL OR btrim(cover_image_alt) = '');

UPDATE public.blog_posts
SET reading_time_minutes = 1
WHERE reading_time_minutes IS NULL OR reading_time_minutes < 1;

ALTER TABLE public.blog_posts
  DROP CONSTRAINT IF EXISTS blog_posts_reading_time_minutes_check;

ALTER TABLE public.blog_posts
  ADD CONSTRAINT blog_posts_reading_time_minutes_check
  CHECK (reading_time_minutes >= 1 AND reading_time_minutes <= 60);

INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO UPDATE
SET public = true;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Anyone can view blog images'
  ) THEN
    CREATE POLICY "Anyone can view blog images"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'blog-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Admins can upload blog images'
  ) THEN
    CREATE POLICY "Admins can upload blog images"
      ON storage.objects FOR INSERT
      TO authenticated
      WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Admins can update blog images'
  ) THEN
    CREATE POLICY "Admins can update blog images"
      ON storage.objects FOR UPDATE
      TO authenticated
      USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'))
      WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND policyname = 'Admins can delete blog images'
  ) THEN
    CREATE POLICY "Admins can delete blog images"
      ON storage.objects FOR DELETE
      TO authenticated
      USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;
