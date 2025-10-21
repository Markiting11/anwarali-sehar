import { ExternalLink, TrendingUp, Star, Download, FileSpreadsheet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const projects = [
    {
      title: "Local Restaurant Chain",
      category: "Local SEO",
      description: "Improved local search visibility for a restaurant chain across 5 locations, achieving #1 rankings on Google Maps.",
      results: [
        "250% increase in Google Maps views",
        "180% increase in website clicks",
        "First page rankings for 15+ keywords",
      ],
      tags: ["Local SEO", "Google Maps", "Citations"],
    },
    {
      title: "Home Services Company",
      category: "Link Building",
      description: "Built high-quality backlinks for a plumbing services company, increasing domain authority and organic traffic.",
      results: [
        "Domain Authority increased from 25 to 42",
        "50+ quality backlinks acquired",
        "300% increase in organic traffic",
      ],
      tags: ["Link Building", "SEO", "Content Marketing"],
    },
    {
      title: "Legal Firm Directory Listings",
      category: "Directory Submissions",
      description: "Submitted law firm to 100+ relevant directories, improving local citations and search visibility.",
      results: [
        "Listed on 100+ directories",
        "Consistent NAP across platforms",
        "40% increase in local search traffic",
      ],
      tags: ["Directory Submissions", "Citations", "Local SEO"],
    },
    {
      title: "E-commerce Store SEO",
      category: "Full SEO Campaign",
      description: "Complete SEO overhaul for an online store, including on-page optimization, link building, and content strategy.",
      results: [
        "Rankings improved for 50+ keywords",
        "200% increase in organic revenue",
        "Reduced bounce rate by 35%",
      ],
      tags: ["SEO Audit", "Link Building", "Content Strategy"],
    },
    {
      title: "Medical Practice Optimization",
      category: "Local SEO",
      description: "Optimized Google Business Profile and local SEO for a medical practice, dramatically increasing patient inquiries.",
      results: [
        "500% increase in phone calls",
        "Top 3 rankings for target keywords",
        "4.9-star average rating achieved",
      ],
      tags: ["Local SEO", "Reputation Management", "GBP"],
    },
    {
      title: "Real Estate Agency",
      category: "Link Building & SEO",
      description: "Comprehensive SEO and link building campaign for a real estate agency targeting multiple neighborhoods.",
      results: [
        "First page rankings in 8 neighborhoods",
        "150% increase in lead generation",
        "Built 75+ quality backlinks",
      ],
      tags: ["SEO", "Link Building", "Local SEO"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              My Portfolio
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Real results from real projects. See how I've helped businesses improve their rankings, increase traffic, and grow their online presence.
            </p>
            <a
              href="https://www.fiverr.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline">
                View My Fiverr Profile
                <ExternalLink className="ml-2" size={18} />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-sm text-muted-foreground">Completed Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">300+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <span className="text-3xl font-bold text-primary mr-1">4.9</span>
                <Star className="text-primary fill-primary" size={20} />
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">Top 5%</div>
              <div className="text-sm text-muted-foreground">Fiverr Seller</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-shadow animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">
                  <Badge variant="secondary" className="mb-3">
                    {project.category}
                  </Badge>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                    <TrendingUp size={16} className="mr-2 text-primary" />
                    Key Results:
                  </h4>
                  <ul className="space-y-2">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Work Samples - Downloadable Files */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Download Work Samples
              </h2>
              <p className="text-lg text-muted-foreground">
                Real examples of local citations and directory submissions work for clients
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Sample 1 */}
              <Card className="p-6 hover:shadow-xl transition-all hover-scale animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileSpreadsheet className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      200 Directory Submissions
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete directory submission report for Utility Contractor San Diego - 200+ live citations with URLs, login details, and status tracking.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">US Directories</Badge>
                      <Badge variant="secondary" className="text-xs">200+ Citations</Badge>
                      <Badge variant="secondary" className="text-xs">Live URLs</Badge>
                    </div>
                    <a 
                      href="/samples/200_Directories_Utility_Contractor_San_Diego.xlsx" 
                      download
                      className="inline-block"
                    >
                      <Button className="w-full shadow-md hover:shadow-lg transition-shadow">
                        <Download className="w-4 h-4 mr-2" />
                        Download Sample (XLSX)
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>

              {/* Sample 2 */}
              <Card className="p-6 hover:shadow-xl transition-all hover-scale animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileSpreadsheet className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Top 100 UK Directories
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Premium UK directory submissions for Website Spot - 100+ high-authority citations with domain authority tracking and live links.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">UK Directories</Badge>
                      <Badge variant="secondary" className="text-xs">100+ Citations</Badge>
                      <Badge variant="secondary" className="text-xs">High DA</Badge>
                    </div>
                    <a 
                      href="/samples/TOP_UK_100.xlsx" 
                      download
                      className="inline-block"
                    >
                      <Button className="w-full shadow-md hover:shadow-lg transition-shadow">
                        <Download className="w-4 h-4 mr-2" />
                        Download Sample (XLSX)
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-8 p-6 bg-card rounded-lg border border-border text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <p className="text-sm text-muted-foreground mb-4">
                <strong className="text-foreground">Note:</strong> These are real work samples showing the quality and detail of my directory submission and local citation services. Each file contains live URLs, submission status, and complete tracking information.
              </p>
              <Link to="/contact">
                <Button variant="outline">
                  Request Custom Quote
                  <ExternalLink className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Client Success Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Client Success Stories
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              These results represent real businesses that have transformed their online presence through strategic SEO
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">250%</div>
                <div className="text-sm text-muted-foreground">Average Traffic Increase</div>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">1st Page</div>
                <div className="text-sm text-muted-foreground">Rankings Achieved</div>
              </Card>
              <Card className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">300%</div>
                <div className="text-sm text-muted-foreground">ROI on Average</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to See Similar Results?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's work together to improve your local SEO, build quality backlinks, and grow your business online. Check out what <Link to="/testimonials" className="text-primary hover:underline">clients are saying</Link> about working with me.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg">Start Your Project</Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline">View Services</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
