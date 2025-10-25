-- Add tags column to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN tags text[] DEFAULT '{}';

-- Add index for better tag search performance
CREATE INDEX idx_blog_posts_tags ON public.blog_posts USING GIN(tags);

-- Add featured flag for featured posts
ALTER TABLE public.blog_posts 
ADD COLUMN is_featured boolean DEFAULT false;

-- Add read time in minutes
ALTER TABLE public.blog_posts 
ADD COLUMN read_time integer DEFAULT 5;