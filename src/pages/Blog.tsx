import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  meta_description: string;
  featured_image_url: string;
  featured_image_alt: string;
  tags: string[];
  is_featured: boolean;
  read_time: number;
  published: boolean;
  created_at: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  const featuredPost = posts.find(post => post.is_featured) || posts[0];
  const otherPosts = posts.filter(post => post.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>SEO Blog & Insights - Expert Local SEO Tips | Anwar Ali</title>
        <meta name="description" content="Expert SEO tips, case studies, and insights to help you master local SEO and grow your online presence. Learn from proven strategies." />
        <meta name="keywords" content="SEO blog, local SEO tips, SEO insights, SEO case studies, digital marketing blog" />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              SEO Blog & Insights
            </h1>
            <p className="text-xl text-muted-foreground">
              Expert tips, case studies, and insights to help you master local SEO and grow your online presence
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts available yet.</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-16">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-px flex-1 bg-border"></div>
                    <span className="text-sm text-muted-foreground">Featured Post</span>
                    <div className="h-px flex-1 bg-border"></div>
                  </div>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="grid md:grid-cols-2 gap-6">
                      {featuredPost.featured_image_url && (
                        <img 
                          src={featuredPost.featured_image_url} 
                          alt={featuredPost.featured_image_alt || featuredPost.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="p-6 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-4 hover:text-primary transition-colors cursor-pointer">
                          {featuredPost.title}
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          {featuredPost.excerpt || featuredPost.content.slice(0, 150) + "..."}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2" />
                            {new Date(featuredPost.created_at).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-2" />
                            {featuredPost.read_time} min read
                          </div>
                        </div>
                        {featuredPost.tags && featuredPost.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {featuredPost.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        )}
                        <Button className="w-fit">
                          Read Article
                          <ArrowRight className="ml-2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* All Posts Grid */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
                  Latest Articles
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                      {post.featured_image_url && (
                        <img 
                          src={post.featured_image_url} 
                          alt={post.featured_image_alt || post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {post.excerpt || post.content.slice(0, 100) + "..."}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {new Date(post.created_at).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {post.read_time} min read
                          </div>
                        </div>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        )}
                        <Button variant="ghost" size="sm" className="w-full">
                          Read More
                          <ArrowRight className="ml-2" size={14} />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Subscribe to SEO Insights
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest SEO tips, strategies, and case studies delivered to your inbox weekly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button className="sm:w-auto w-full">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Need Professional SEO Help?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            While these tips can help, sometimes you need an expert to implement a comprehensive SEO strategy. Check out my <Link to="/services" className="text-primary hover:underline">services</Link> or <Link to="/contact" className="text-primary hover:underline">get in touch</Link> to discuss your project.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg">Get Expert Help</Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline">View Case Studies</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}