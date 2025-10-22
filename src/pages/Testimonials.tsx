import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import sarahJohnsonImg from "@/assets/testimonials/sarah-johnson.jpg";
import michaelChenImg from "@/assets/testimonials/michael-chen.jpg";
import emilyRodriguezImg from "@/assets/testimonials/emily-rodriguez.jpg";
import davidThompsonImg from "@/assets/testimonials/david-thompson.jpg";
import amandaWhiteImg from "@/assets/testimonials/amanda-white.jpg";
import jamesMartinezImg from "@/assets/testimonials/james-martinez.jpg";
import lisaAndersonImg from "@/assets/testimonials/lisa-anderson.jpg";
import robertTaylorImg from "@/assets/testimonials/robert-taylor.jpg";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Restaurant Owner",
      company: "The Local Bistro",
      rating: 5,
      text: "Anwar transformed our online presence! Our restaurant now appears at the top of Google Maps, and we've seen a 250% increase in new customers finding us online. His local SEO expertise is unmatched!",
      initials: "SJ",
      image: sarahJohnsonImg,
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "HomeServe Plus",
      rating: 5,
      text: "Working with Anwar was a game-changer for our business. The quality backlinks he built increased our domain authority significantly, and our organic traffic tripled within 6 months. Highly recommend!",
      initials: "MC",
      image: michaelChenImg,
    },
    {
      name: "Emily Rodriguez",
      role: "Founder",
      company: "Legal Associates",
      rating: 5,
      text: "Anwar's directory submission service was incredibly thorough. Our law firm now has consistent listings across 100+ directories, and our local search visibility has improved dramatically. Professional and reliable!",
      initials: "ER",
      image: emilyRodriguezImg,
    },
    {
      name: "David Thompson",
      role: "E-commerce Manager",
      company: "Urban Style Co.",
      rating: 5,
      text: "The complete SEO overhaul Anwar provided doubled our organic revenue in just 4 months. His attention to detail and strategic approach to link building and content optimization delivered exceptional results.",
      initials: "DT",
      image: davidThompsonImg,
    },
    {
      name: "Dr. Amanda White",
      role: "Practice Owner",
      company: "Wellness Medical Center",
      rating: 5,
      text: "Our patient inquiries increased by 500% after Anwar optimized our Google Business Profile and local SEO. He's knowledgeable, responsive, and truly cares about his clients' success.",
      initials: "AW",
      image: amandaWhiteImg,
    },
    {
      name: "James Martinez",
      role: "Real Estate Broker",
      company: "Premier Properties",
      rating: 5,
      text: "Anwar's SEO and link building campaign put us on the first page for our target neighborhoods. Our lead generation increased by 150%, and the quality of leads improved significantly. Worth every penny!",
      initials: "JM",
      image: jamesMartinezImg,
    },
    {
      name: "Lisa Anderson",
      role: "Small Business Owner",
      company: "Boutique Flowers",
      rating: 5,
      text: "As a small business owner, I needed affordable but effective SEO. Anwar delivered beyond my expectations. My flower shop now ranks #1 locally, and orders have never been better!",
      initials: "LA",
      image: lisaAndersonImg,
    },
    {
      name: "Robert Taylor",
      role: "Digital Marketing Lead",
      company: "Tech Solutions Inc",
      rating: 5,
      text: "Anwar's technical SEO knowledge and ethical approach to link building set him apart. He's transparent, communicates clearly, and always delivers on his promises. A true professional!",
      initials: "RT",
      image: robertTaylorImg,
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
              Client Testimonials
            </h1>
            <p className="text-xl text-muted-foreground">
              Don't just take my word for it. Here's what clients say about working with me and the results they've achieved.
            </p>
          </div>
        </div>
      </section>

      {/* Rating Summary */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">4.9</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-primary fill-primary" size={20} />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">300+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">5-Star Reviews</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-shadow animate-fade-in relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Quote className="absolute top-4 right-4 text-primary/10" size={48} />
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.image} alt={`${testimonial.name} - ${testimonial.role}`} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-primary fill-primary" size={16} />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  "{testimonial.text}"
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fiverr Reviews Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Top Rated on Fiverr
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              As a Top 5% seller on Fiverr, I maintain consistently high ratings and positive feedback from clients worldwide.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">Top 5%</div>
                <div className="text-sm text-muted-foreground">Fiverr Seller Ranking</div>
              </Card>
              <Card className="p-6">
                <div className="flex justify-center mb-2">
                  <span className="text-3xl font-bold text-primary mr-1">4.9</span>
                  <Star className="text-primary fill-primary mt-1" size={24} />
                </div>
                <div className="text-sm text-muted-foreground">Fiverr Rating</div>
              </Card>
              <Card className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Join These Success Stories?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's work together to achieve similar results for your business. Check out my <Link to="/portfolio" className="text-primary hover:underline">portfolio</Link> to see more examples of my work, or get in touch to start your project.
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

export default Testimonials;
