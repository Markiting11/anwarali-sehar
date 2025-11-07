import { useState } from "react";
import { Mail, MessageSquare, Linkedin, MapPin, Send, ArrowUpRight, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    try {
      contactSchema.parse(formData);
      
      // Format WhatsApp message
      const whatsappNumber = "923459842097";
      const message = `*New Contact Form Submission*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone || "Not provided"}
*Service:* ${formData.service}

*Message:*
${formData.message}`;

      // Open WhatsApp with pre-filled message
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
      
      toast.success("Opening WhatsApp to send your message!");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Please fill out all required fields correctly.");
      }
    }
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
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="mt-2"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="service">Service Interested In</Label>
                    <select
                      id="service"
                      className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="">Select a service</option>
                      <option value="Local SEO">Local SEO</option>
                      <option value="Link Building">Link Building</option>
                      <option value="Directory Submissions">Directory Submissions</option>
                      <option value="Complete SEO Campaign">Complete SEO Campaign</option>
                      <option value="SEO Consultation">SEO Consultation</option>
                      <option value="Other">Other</option>
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
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                  <Card 
                    key={index} 
                    className="group relative overflow-hidden p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300 bg-gradient-to-br from-background to-primary/5"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="relative">
                          <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <item.icon className="text-primary" size={26} />
                          </div>
                          <div className="absolute inset-0 w-14 h-14 bg-primary/20 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2 text-lg">
                            {item.title}
                          </h3>
                          {item.link ? (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group/link"
                            >
                              <span>{item.value}</span>
                              <ArrowUpRight size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                            </a>
                          ) : (
                            <p className="text-muted-foreground">{item.value}</p>
                          )}
                        </div>
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
      <section className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl mb-6">
                <HelpCircle className="text-primary" size={32} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Common Questions
              </h2>
              <p className="text-muted-foreground text-lg">
                Everything you need to know about my SEO services
              </p>
            </div>
            
            <Card className="p-2 md:p-4 border-2 shadow-xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    q: "How long does it take to see SEO results?",
                    a: "Typically, you can start seeing improvements in 2-3 months, with significant results by 6 months. Local SEO often shows results faster than national campaigns. The timeline depends on factors like competition, current site status, and the scope of optimization work.",
                  },
                  {
                    q: "What's included in your local SEO service?",
                    a: "Google Business Profile optimization, local keyword targeting, citation building, NAP consistency, review management, and ongoing optimization. I also provide competitive analysis, local content creation, and regular performance tracking to ensure consistent growth.",
                  },
                  {
                    q: "Do you provide monthly reports?",
                    a: "Yes, I provide detailed monthly reports showing rankings, traffic improvements, links built, and other key metrics. Reports include visual analytics, insights, and recommendations for continuous improvement.",
                  },
                  {
                    q: "What's your pricing structure?",
                    a: "Pricing varies based on project scope and requirements. Contact me for a custom quote tailored to your needs and budget. I offer flexible packages for different business sizes and objectives.",
                  },
                ].map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border-b last:border-b-0 px-2 md:px-4"
                  >
                    <AccordionTrigger className="text-left hover:text-primary transition-colors py-6 text-base md:text-lg font-semibold">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>

            <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <p className="text-muted-foreground mb-4">
                Still have questions?
              </p>
              <Button variant="outline" size="lg" asChild>
                <a href="#contact-form" className="inline-flex items-center gap-2">
                  Get in Touch
                  <Send size={16} />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
