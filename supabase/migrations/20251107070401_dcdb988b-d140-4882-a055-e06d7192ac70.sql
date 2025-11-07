-- Add category column to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN category text;