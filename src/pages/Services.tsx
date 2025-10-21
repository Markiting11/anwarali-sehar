import { MapPin, Link2, FolderOpen, Search, BarChart3, FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import localSeoImage from "@/assets/local-seo-service.jpg";
import linkBuildingImage from "@/assets/link-building-service.jpg";
import directoryImage from "@/assets/directory-service.jpg";
import seoServicesDiagram from "@/assets/seo-services-diagram.jpg";
import gmbRankingsChart from "@/assets/gmb-rankings-chart.jpg";
import gmbProfileLaptop from "@/assets/gmb-profile-laptop.jpg";

const Services = () => {
  const mainServices = [
    {
      id: "local-seo",
      icon: MapPin,
      title: "Local SEO Optimization",
      description: "Dominate local search results and attract more customers from your area with comprehensive local SEO strategies.",
      image: localSeoImage,
      features: [
        "Google Business Profile optimization",
        "Local keyword research and targeting",
        "NAP consistency across all platforms",
        "Local citation building",
        "Review management strategies",
        "Local content optimization",
      ],
    },
    {
      id: "link-building",
      icon: Link2,
      title: "Link Building Services",
      description: "Build high-quality backlinks that improve your domain authority and boost your search engine rankings.",
      image: linkBuildingImage,
      features: [
        "White-hat link building strategies",
        "Guest posting on authority sites",
        "Broken link building",
        "Resource page link building",
        "Competitor backlink analysis",
        "Monthly link building reports",
      ],
    },
    {
      id: "directory",
      icon: FolderOpen,
      title: "Directory Submissions",
      description: "Get your business listed on top directories to increase visibility, build citations, and improve local SEO.",
      image: directoryImage,
      features: [
        "Submission to 50+ top directories",
        "Industry-specific directory listings",
        "Local business directories",
        "Consistent NAP information",
        "Citation tracking and monitoring",
        "Detailed submission reports",
      ],
    },
  ];

  const additionalServices = [
    {
      icon: Search,
      title: "SEO Audit",
      description: "Comprehensive website analysis to identify SEO issues and opportunities for improvement.",
    },
    {
      icon: BarChart3,
      title: "Keyword Research",
      description: "In-depth keyword analysis to find the best opportunities for your business to rank.",
    },
    {
      icon: FileText,
      title: "Content Strategy",
      description: "SEO-optimized content planning and creation that drives traffic and conversions.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/10 to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                My Services
              </h1>
              <p className="text-xl text-muted-foreground">
                Professional SEO services designed to help your business rank higher, attract more customers, and grow online
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <img
                src={seoServicesDiagram}
                alt="Local SEO Services including GMB Optimization, Local Citations, and Google Business Profile management"
                className="rounded-xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {mainServices.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-20 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/20">
                  <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                    <div className={`relative h-64 lg:h-auto overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <img
                        src={service.image}
                        alt={`${service.title} illustration`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                      <Badge className="absolute top-6 left-6 bg-background/90 text-foreground">
                        <service.icon className="mr-2" size={16} />
                        Premium Service
                      </Badge>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                          {service.title}
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                          {service.description}
                        </p>
                        <div className="mb-8">
                          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                            <CheckCircle2 className="text-primary mr-2" size={20} />
                            What's Included:
                          </h3>
                          <ul className="grid gap-3">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start group">
                                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                </div>
                                <span className="text-muted-foreground group-hover:text-foreground transition-colors">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Link to="/contact">
                          <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                            Get Started Today
                            <ArrowRight className="ml-2" size={18} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Additional Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive SEO solutions to support your digital marketing needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {additionalServices.map((service, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <img
                src={gmbRankingsChart}
                alt="Google Business Profile rankings chart showing improved local search performance and increased visibility"
                className="rounded-xl shadow-2xl w-full"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Proven Results That Matter
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                My Local SEO strategies have helped hundreds of businesses improve their Google Business Profile rankings, increase local visibility, and attract more customers through location-targeted optimization.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-muted-foreground">Consistent ranking improvements across multiple locations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-muted-foreground">Enhanced local citations and directory presence</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-primary mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-muted-foreground">Increased Google Business Profile engagement and reviews</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                How I Work
              </h2>
              <p className="text-lg text-muted-foreground">
                A proven process that delivers consistent results through comprehensive Google Business Profile optimization and local search strategies
              </p>
            </div>
            <div>
              <img
                src={gmbProfileLaptop}
                alt="Google Business Profile rankings dashboard showing optimization strategies and local SEO performance metrics"
                className="rounded-xl shadow-2xl w-full"
              />
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Discovery & Analysis",
                  description: "I start by understanding your business, goals, and current online presence. A thorough SEO audit identifies opportunities and challenges.",
                },
                {
                  step: "02",
                  title: "Strategy Development",
                  description: "Based on the analysis, I create a customized SEO strategy tailored to your specific needs and target audience.",
                },
                {
                  step: "03",
                  title: "Implementation",
                  description: "I execute the strategy with precision, focusing on quality over quantity and sustainable, white-hat techniques.",
                },
                {
                  step: "04",
                  title: "Monitoring & Optimization",
                  description: "Continuous tracking, analysis, and optimization ensure your rankings keep improving and your ROI stays strong.",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="p-6 md:p-8 hover:shadow-lg transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-6">
                    <div className="text-4xl font-bold text-primary/30">{item.step}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Boost Your Rankings?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how my SEO services can help your business achieve its goals. Learn more about my work in the <Link to="/portfolio" className="text-primary hover:underline">portfolio section</Link> or get in touch today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg">
                Start Your Project
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
            <Link to="/blog">
              <Button size="lg" variant="outline">
                Read SEO Tips on My Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
