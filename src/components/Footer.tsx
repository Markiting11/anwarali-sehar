import { Link } from "react-router-dom";
import { Linkedin, Mail, MessageSquare, Facebook, Phone, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navbar border-t border-navbar-foreground/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold text-navbar-foreground mb-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold">AA</span>
              </div>
              Anwar Ali
            </h3>
            <p className="text-navbar-foreground/70 text-sm mb-6 leading-relaxed">
              Local SEO Expert & Digital Marketer helping businesses grow online with proven SEO strategies, link building, and directory submissions.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/anwar-sehar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.facebook.com/arshad.ali.7146557"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-110"
                aria-label="Facebook Profile"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://wa.me/923459842097"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageSquare size={20} />
              </a>
              <a
                href="mailto:Arshad2097@gmail.com"
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-110"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-navbar-foreground mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-primary rounded"></div>
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-navbar-foreground/70 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-navbar-foreground/70 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-navbar-foreground/70 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/work-samples" className="text-sm text-navbar-foreground/70 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                  Work Samples
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-semibold text-navbar-foreground mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-primary rounded"></div>
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services#local-seo" className="text-sm text-navbar-foreground/70 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                  Local SEO
                </Link>
              </li>
              <li>
                <Link to="/services#link-building" className="text-sm text-navbar-foreground/70 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                  Link Building
                </Link>
              </li>
              <li>
                <Link to="/services#directory" className="text-sm text-navbar-foreground/70 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                  Directory Submissions
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-sm text-navbar-foreground/70 hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-sm font-semibold text-navbar-foreground mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-primary rounded"></div>
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-green-500" size={20} />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-navbar-foreground mb-1">Phone</h5>
                  <a href="tel:+923459842097" className="text-sm text-navbar-foreground/70 hover:text-primary transition-colors">
                    +92 345 984 2097
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-purple-500" size={20} />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-navbar-foreground mb-1">Email</h5>
                  <a href="mailto:Arshad2097@gmail.com" className="text-sm text-navbar-foreground/70 hover:text-primary transition-colors break-all">
                    Arshad2097@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="text-blue-500" size={20} />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-navbar-foreground mb-1">Response Time</h5>
                  <p className="text-sm text-navbar-foreground/70">
                    Within 2 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-navbar-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-navbar-foreground/60 text-center md:text-left">
              © {new Date().getFullYear()} Anwar Ali. All rights reserved.
            </p>
            <p className="text-sm text-navbar-foreground/60 text-center md:text-right">
              Built with expertise in Local SEO & Digital Marketing 🚀
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
