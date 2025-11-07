import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  meta_description: string | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  tags: string[] | null;
  category: string | null;
  read_time: number | null;
  created_at: string;
  published: boolean;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("slug", slug)
          .eq("published", true)
          .maybeSingle();

        if (error) throw error;
        
        if (!data) {
          toast.error("Blog post not found");
        } else {
          setPost(data);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        toast.error("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 pb-12 px-4">
          <div className="container mx-auto text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-24 pb-12 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | SEO Expert Blog</title>
        <meta name="description" content={post.meta_description || post.excerpt || ""} />
        <meta name="keywords" content={post.tags?.join(", ") || ""} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.meta_description || post.excerpt || ""} />
        {post.featured_image_url && (
          <meta property="og:image" content={post.featured_image_url} />
        )}
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://anwarali-sehar.lovable.app/blog/${post.slug}`} />
      </Helmet>

      <Navbar />
      
      <article className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          {/* Featured Image */}
          {post.featured_image_url && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={post.featured_image_url}
                alt={post.featured_image_alt || post.title}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.created_at}>
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              {post.read_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.read_time} min read</span>
                </div>
              )}
            </div>

            {/* Category */}
            {post.category && (
              <div className="mb-3">
                <Badge variant="default" className="text-sm">
                  {post.category}
                </Badge>
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-4xl font-extrabold mb-6 mt-8 text-foreground" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-3xl font-bold mb-4 mt-6 text-foreground" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-2xl font-bold mb-3 mt-5 text-foreground" {...props} />
                ),
                h4: ({ node, ...props }) => (
                  <h4 className="text-xl font-bold mb-2 mt-4 text-foreground" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="mb-4 leading-relaxed text-muted-foreground" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-extrabold text-foreground" {...props} />
                ),
                em: ({ node, ...props }) => (
                  <em className="italic text-muted-foreground" {...props} />
                ),
                a: ({ node, href, ...props }) => (
                  <a
                    href={href}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline font-medium cursor-pointer transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc ml-6 mb-4 space-y-2 text-muted-foreground" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal ml-6 mb-4 space-y-2 text-muted-foreground" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="mb-2" {...props} />
                ),
                img: ({ node, ...props }) => (
                  <img className="rounded-lg shadow-md my-6 w-full h-auto" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4" {...props} />
                ),
                code: ({ node, inline, ...props }: any) =>
                  inline ? (
                    <code className="bg-muted text-primary px-2 py-1 rounded font-mono text-sm" {...props} />
                  ) : (
                    <code className="block bg-muted p-4 rounded-lg overflow-x-auto font-mono text-sm" {...props} />
                  ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      <Footer />
    </>
  );
};

export default BlogPost;
