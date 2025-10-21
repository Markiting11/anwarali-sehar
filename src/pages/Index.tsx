import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, TrendingUp, Link2, FolderOpen, Award, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroProfile from "@/assets/hero-profile.jpg";
import localCitationsInfographic from "@/assets/local-citations-infographic.jpg";
import localSeoSearch from "@/assets/local-seo-search.jpg";

const Index = () => {
  const services = [
    {
      icon: MapPin,
      title: "Local SEO",
      description: "Boost your local visibility and dominate Google Maps rankings with proven local SEO strategies.",
    },
    {
      icon: Link2,
      title: "Link Building",
      description: "High-quality backlinks that improve your domain authority and search engine rankings.",
    },
    {
      icon: FolderOpen,
      title: "Directory Submissions",
      description: "Get listed on top business directories to increase online presence and local citations.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-50"></div>
        <div className="container mx-auto px-4 py-24 md:py-40 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                  Hi, I'm <span className="text-primary drop-shadow-lg">Anwar Ali</span>
                </h1>
                <p className="text-2xl md:text-3xl text-foreground/80 font-medium">
                  Local SEO Expert & Digital Marketer
                </p>
                <p className="text-lg text-muted-foreground/90 max-w-xl">
                  Helping businesses dominate local search with proven Local SEO, Link Building, and Directory Submission strategies. Let's grow your online presence together 🚀
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button size="lg" className="shadow-glow hover:scale-105 transition-all duration-300 bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                    Hire Me
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button size="lg" variant="outline" className="border-2 border-primary/20 hover:border-primary hover:bg-primary/5 text-lg px-8 py-6 transition-all duration-300">
                    View My Work
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-fade-in md:order-last" style={{ animationDelay: "0.2s" }}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                  <img
                    src={heroProfile}
                    alt="Anwar Ali - Local SEO Expert"
                    className="w-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-accent opacity-30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20 max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                What I Can Do For You
              </h2>
              <p className="text-xl text-foreground/80 leading-relaxed">
                Specialized SEO services to help your business dominate local search results through proven Google Business Profile optimization, local citations, and strategic GMB management.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I help businesses improve their visibility in Google Maps, increase local citations, and optimize their Google Business Profile to attract more customers from location-based searches.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-card">
                <img
                  src={localCitationsInfographic}
                  alt="Local Citations and GMB Optimization Service showing Google Business Profile management strategies"
                  className="w-full hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-glow transition-all duration-300 animate-fade-in hover:-translate-y-2 border-0 shadow-card bg-background/50 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <service.icon className="text-primary" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                <Link to="/services" className="text-primary font-semibold inline-flex items-center hover:gap-2 transition-all group">
                  Learn more
                  <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" size="lg" className="border-2 border-primary/30 hover:border-primary hover:bg-primary/5 text-lg px-8 py-6 transition-all duration-300">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto mb-16">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 bg-gradient-to-l from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-card">
                <img
                  src={localSeoSearch}
                  alt="Local SEO optimization showing Google Maps search results with local citations, GMB optimization service, and business reviews"
                  className="w-full hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Comprehensive Local SEO Solutions
              </h2>
              <p className="text-xl text-foreground/80 leading-relaxed">
                From local citations and Google Business Profile optimization to complete GMB management, I provide end-to-end Local SEO services that help your business rank higher in local search results and Google Maps.
              </p>
              <Link to="/services">
                <Button variant="outline" size="lg" className="border-2 border-primary/30 hover:border-primary hover:bg-primary/5 text-lg px-8 py-6 transition-all duration-300">
                  Explore All Services
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold text-primary mb-3 drop-shadow-lg">5+</div>
              <div className="text-base font-medium text-foreground/80">Years Experience</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold text-primary mb-3 drop-shadow-lg">1000+</div>
              <div className="text-base font-medium text-foreground/80">Projects Completed</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold text-primary mb-3 drop-shadow-lg">300+</div>
              <div className="text-base font-medium text-foreground/80">Happy Clients</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-transparent hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold text-primary mb-3 drop-shadow-lg">Top 5%</div>
              <div className="text-base font-medium text-foreground/80">Fiverr Seller</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-background"></div>
        <div className="absolute inset-0 gradient-accent opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Ready to Boost Your Local Rankings?
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Let's work together to improve your local SEO, build quality backlinks, and grow your online presence.
            </p>
            <Link to="/contact">
              <Button size="lg" className="shadow-glow hover:scale-105 transition-all duration-300 text-lg px-10 py-7">
                Let's Work Together
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
