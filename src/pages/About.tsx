import { Award, BookOpen, TrendingUp, Users, Target, Lightbulb, Rocket, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/about-hero-seo-expert.jpg";
import growthMetrics from "@/assets/seo-growth-metrics.jpg";

const About = () => {
  const certifications = [
    "DigiSkills Certified - Digital Marketing",
    "USAID & UNDP Training Programs",
    "Google Business Profile Optimization",
    "Advanced Local SEO Techniques",
  ];

  const skills = [
    { name: "Local SEO", level: 95 },
    { name: "Link Building", level: 90 },
    { name: "Google Maps Optimization", level: 92 },
    { name: "Directory Submissions", level: 88 },
    { name: "Content Marketing", level: 85 },
    { name: "SEO Analysis", level: 93 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="SEO Expert working on analytics and rankings" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-background/90"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Me
            </h1>
            <p className="text-xl text-muted-foreground">
              Passionate Local SEO Expert dedicated to helping businesses achieve top rankings and sustainable growth
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">My Journey</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>

            {/* Introduction Card */}
            <Card className="p-8 md:p-10 mb-8 border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
              <div className="flex items-start gap-6">
                <div className="hidden md:block w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg">
                  <Rocket className="text-primary-foreground" size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">The Beginning</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    I'm <span className="text-foreground font-semibold">Anwar Ali</span>, a dedicated Local SEO Expert and Digital Marketer with over <span className="text-primary font-semibold">5 years of experience</span> helping businesses dominate their local markets. My journey in digital marketing began with a passion for understanding how search engines work and how businesses can leverage them to grow.
                  </p>
                </div>
              </div>
            </Card>

            {/* Expertise Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-8 hover:shadow-xl transition-all duration-300 border-t-4 border-t-accent animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Mastering the Craft</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Through continuous learning and hands-on experience, I've mastered the art of Local SEO, specializing in Google Business Profile optimization, link building strategies, and comprehensive directory submissions. My expertise has helped numerous businesses achieve first-page rankings and significantly increase their online visibility.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-all duration-300 border-t-4 border-t-primary animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Award className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Professional Excellence</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  I've completed professional training through DigiSkills, USAID, and UNDP programs, combining formal education with practical experience to deliver results that matter. As a top-rated professional on Fiverr, I've built a reputation for excellence, reliability, and measurable outcomes.
                </p>
              </Card>
            </div>

            {/* Approach Card */}
            <Card className="p-8 md:p-10 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 shadow-xl animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-start gap-6">
                <div className="hidden md:block w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg">
                  <Lightbulb className="text-primary-foreground" size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-4">My Approach</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    My approach is simple: I focus on sustainable, white-hat SEO techniques that not only improve rankings but also enhance user experience and drive real business growth.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                      <span className="text-muted-foreground">Sustainable growth strategies</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                      <span className="text-muted-foreground">White-hat SEO techniques</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                      <span className="text-muted-foreground">Enhanced user experience</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                      <span className="text-muted-foreground">Measurable business growth</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Drives Me</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Core values that guide every project I undertake
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Results-Driven</h3>
              <p className="text-sm text-muted-foreground">Focus on measurable outcomes that impact your bottom line</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Excellence</h3>
              <p className="text-sm text-muted-foreground">Commitment to delivering the highest quality work</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Client Success</h3>
              <p className="text-sm text-muted-foreground">Your growth and success are my top priorities</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Continuous Learning</h3>
              <p className="text-sm text-muted-foreground">Staying updated with the latest SEO trends and algorithms</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">My Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-primary font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <img 
                  src={growthMetrics} 
                  alt="SEO growth metrics and analytics dashboard" 
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Certifications & Training
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="p-6 flex items-start space-x-4 hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{cert}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Want to Learn More About My Work?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Check out my portfolio to see real results I've achieved for clients, or get in touch to discuss your project.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/portfolio">
              <Button size="lg" variant="outline">View Portfolio</Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline">See My Services</Button>
            </Link>
            <Link to="/contact">
              <Button size="lg">Get In Touch</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
