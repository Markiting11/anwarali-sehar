import { Mail, MessageSquare, Linkedin, MapPin, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you within 24 hours.");
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "Arshad2097@gmail.com",
      link: "mailto:Arshad2097@gmail.com",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      value: "+92 345-9842097",
      link: "https://wa.me/923459842097",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "Connect on LinkedIn",
      link: "https://www.linkedin.com/in/anwar-sehar",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Available Worldwide",
      link: null,
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
              Let's Work Together
            </h1>
            <p className="text-xl text-muted-foreground">
              Ready to boost your local rankings and grow your business? Get in touch and let's discuss how I can help you achieve your SEO goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Send Me a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service">Service Interested In</Label>
                    <select
                      id="service"
                      className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="local-seo">Local SEO</option>
                      <option value="link-building">Link Building</option>
                      <option value="directory">Directory Submissions</option>
                      <option value="full-seo">Complete SEO Campaign</option>
                      <option value="consultation">SEO Consultation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project and SEO goals..."
                      rows={6}
                      required
                      className="mt-2"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                    <Send className="ml-2" size={18} />
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-8">
                  Feel free to reach out through any of these channels. I typically respond within 24 hours.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="font-semibold text-foreground mb-3">
                  Quick Response Guaranteed
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  I understand that time is valuable. That's why I commit to responding to all inquiries within 24 hours, usually much sooner.
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">Available Now</span>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-3">
                  Prefer a Quick Chat?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For immediate assistance, feel free to message me on WhatsApp or check out my Fiverr profile for quick gig bookings.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/923459842097"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2" size={16} />
                      WhatsApp
                    </Button>
                  </a>
                  <a
                    href="https://www.fiverr.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      Fiverr Profile
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Common Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "How long does it take to see SEO results?",
                  a: "Typically, you can start seeing improvements in 2-3 months, with significant results by 6 months. Local SEO often shows results faster than national campaigns.",
                },
                {
                  q: "What's included in your local SEO service?",
                  a: "Google Business Profile optimization, local keyword targeting, citation building, NAP consistency, review management, and ongoing optimization.",
                },
                {
                  q: "Do you provide monthly reports?",
                  a: "Yes, I provide detailed monthly reports showing rankings, traffic improvements, links built, and other key metrics.",
                },
                {
                  q: "What's your pricing structure?",
                  a: "Pricing varies based on project scope and requirements. Contact me for a custom quote tailored to your needs and budget.",
                },
              ].map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
