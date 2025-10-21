import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import localSeoSearch from "@/assets/local-seo-search.jpg";
import linkBuildingService from "@/assets/link-building-service.jpg";
import gmbProfileLaptop from "@/assets/gmb-profile-laptop.jpg";
import directoryService from "@/assets/directory-service.jpg";
import localCitationsInfographic from "@/assets/local-citations-infographic.jpg";
import seoServicesDiagram from "@/assets/seo-services-diagram.jpg";

const Blog = () => {
  const posts = [
    {
      title: "10 Essential Local SEO Tips for Small Businesses in 2025",
      excerpt: "Learn the most effective local SEO strategies including Google Business Profile optimization, local citations, and link building techniques that help your small business dominate local search results and attract more customers from your area.",
      category: "Local SEO",
      date: "January 15, 2025",
      readTime: "8 min read",
      tags: ["Local SEO", "Small Business", "Google Maps"],
      slug: "local-seo-tips-2025",
      image: localSeoSearch,
      imageAlt: "Local SEO optimization strategies showing Google Maps search results with local business listings and citations",
    },
    {
      title: "The Complete Guide to Google Business Profile Optimization",
      excerpt: "Master the art of optimizing your Google Business Profile to increase visibility, attract more customers, and improve your local search rankings. Learn how GBP optimization integrates with local citations and link building strategies.",
      category: "Google Business",
      date: "January 10, 2025",
      readTime: "12 min read",
      tags: ["GBP", "Local SEO", "Optimization"],
      slug: "google-business-profile-guide",
      image: gmbProfileLaptop,
      imageAlt: "Google Business Profile optimization dashboard showing local SEO performance metrics and rankings",
    },
    {
      title: "Link Building Strategies That Actually Work in 2025",
      excerpt: "Discover proven white-hat link building techniques that complement your local SEO efforts and Google Business Profile optimization. Boost your domain authority and improve search engine rankings sustainably with strategic directory submissions.",
      category: "Link Building",
      date: "January 5, 2025",
      readTime: "10 min read",
      tags: ["Link Building", "SEO", "Backlinks"],
      slug: "link-building-strategies-2025",
      image: linkBuildingService,
      imageAlt: "Link building service showing quality backlinks, domain authority growth, and SEO strategy implementation",
    },
    {
      title: "How to Choose the Right Business Directories for Your Niche",
      excerpt: "Not all directories are created equal. Learn how to identify and submit to the most valuable directories that enhance your local SEO, support your Google Business Profile, and create powerful link building opportunities for your specific industry and location.",
      category: "Directory Submissions",
      date: "December 28, 2024",
      readTime: "7 min read",
      tags: ["Directories", "Citations", "Local SEO"],
      slug: "choosing-business-directories",
      image: directoryService,
      imageAlt: "Business directory submission service showing local citations, NAP consistency, and directory listings",
    },
    {
      title: "Understanding NAP Consistency and Why It Matters for Local SEO",
      excerpt: "NAP consistency is crucial for local SEO success and Google Business Profile credibility. Learn what it is, why it matters for link building and citations, and how to maintain it across all your online listings and directories.",
      category: "Local SEO",
      date: "December 20, 2024",
      readTime: "6 min read",
      tags: ["NAP", "Citations", "Local SEO"],
      slug: "nap-consistency-guide",
      image: localCitationsInfographic,
      imageAlt: "Local citations infographic explaining NAP consistency across business directories and Google Business Profile",
    },
    {
      title: "SEO Case Study: How We Increased Organic Traffic by 300%",
      excerpt: "A detailed breakdown of a successful SEO campaign combining local SEO tactics, Google Business Profile optimization, strategic link building, and directory submissions. See the strategies used, challenges faced, and measurable results achieved.",
      category: "Case Studies",
      date: "December 15, 2024",
      readTime: "15 min read",
      tags: ["Case Study", "SEO", "Results"],
      slug: "seo-case-study-300-percent",
      image: seoServicesDiagram,
      imageAlt: "SEO case study results showing traffic growth through local SEO, GBP optimization, and link building strategies",
    },
  ];

  const categories = ["All", "Local SEO", "Link Building", "Google Business", "Case Studies"];

  return (
    <div className="min-h-screen bg-background">
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

      {/* Categories */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4">Featured Post</Badge>
            <Card className="p-8 md:p-12 hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Badge variant="secondary" className="mb-3">
                    {posts[0].category}
                  </Badge>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {posts[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {posts[0].excerpt}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {posts[0].date}
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2" />
                      {posts[0].readTime}
                    </div>
                  </div>
                  <Button>
                    Read Article
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={posts[0].image} 
                    alt={posts[0].imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-shadow animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.imageAlt}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <Badge variant="secondary" className="mb-3">
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full">
                    Read More
                    <ArrowRight className="ml-2" size={14} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
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
};

export default Blog;
