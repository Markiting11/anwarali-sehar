import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, User, Briefcase, FolderOpen, MessageCircle, FileText, Mail, Sparkles, Settings, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      if (session) {
        const { data } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();
        setIsAdmin(!!data);
      } else {
        setIsAdmin(false);
      }
    };
    checkAdmin();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          checkAdmin();
        } else {
          setIsAdmin(false);
          setIsLoggedIn(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About Me", icon: User },
    { path: "/services", label: "Services", icon: Briefcase },
    { path: "/portfolio", label: "Portfolio", icon: FolderOpen },
    { path: "/work-samples", label: "Work Samples", icon: FileText },
    { path: "/testimonials", label: "Testimonials", icon: MessageCircle },
    { path: "/blog", label: "Blog", icon: FileText },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-navbar border-b border-navbar shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-navbar-foreground hover:opacity-80 transition-opacity">
            <Sparkles className="w-6 h-6 text-primary" />
            <span>Anwar Ali</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? "text-accent-foreground bg-accent shadow-sm"
                      : "text-navbar-foreground/80 hover:text-navbar-foreground hover:bg-navbar-foreground/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive("/admin")
                    ? "text-accent-foreground bg-accent shadow-sm"
                    : "text-navbar-foreground/80 hover:text-navbar-foreground hover:bg-navbar-foreground/10"
                }`}
              >
                <Settings className="w-4 h-4" />
                Admin
              </Link>
            )}
            {!isLoggedIn && (
              <Link
                to="/auth"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive("/auth")
                    ? "text-accent-foreground bg-accent shadow-sm"
                    : "text-navbar-foreground/80 hover:text-navbar-foreground hover:bg-navbar-foreground/10"
                }`}
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}
            <Link to="/contact">
              <Button className="ml-4 shadow-md hover:shadow-lg transition-shadow bg-primary hover:bg-primary/90">
                <Mail className="w-4 h-4 mr-2" />
                Hire Me
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-navbar-foreground hover:bg-navbar-foreground/10"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in border-t border-navbar-foreground/20 mt-2 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? "text-accent-foreground bg-accent shadow-sm"
                      : "text-navbar-foreground/80 hover:text-navbar-foreground hover:bg-navbar-foreground/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive("/admin")
                    ? "text-accent-foreground bg-accent shadow-sm"
                    : "text-navbar-foreground/80 hover:text-navbar-foreground hover:bg-navbar-foreground/10"
                }`}
              >
                <Settings className="w-4 h-4" />
                Admin
              </Link>
            )}
            {!isLoggedIn && (
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive("/auth")
                    ? "text-accent-foreground bg-accent shadow-sm"
                    : "text-navbar-foreground/80 hover:text-navbar-foreground hover:bg-navbar-foreground/10"
                }`}
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <Button className="w-full mt-3 shadow-md bg-primary hover:bg-primary/90">
                <Mail className="w-4 h-4 mr-2" />
                Hire Me
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
