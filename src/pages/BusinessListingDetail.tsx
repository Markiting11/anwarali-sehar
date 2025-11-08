import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  MessageCircle,
  Share2,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LISTING_CATEGORIES } from "@/lib/listingCategories";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

const BusinessListingDetail = () => {
  const { slug } = useParams();

  const { data: listing, isLoading } = useQuery({
    queryKey: ["business-listing", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_listings")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Increment view count
  useEffect(() => {
    if (listing) {
      supabase
        .from("business_listings")
        .update({ views_count: (listing.views_count || 0) + 1 })
        .eq("id", listing.id)
        .then();
    }
  }, [listing]);

  const category = listing
    ? LISTING_CATEGORIES.find((c) => c.value === listing.category)
    : null;

  const handleContact = (type: string) => {
    if (!listing) return;

    // Increment contact clicks
    supabase
      .from("business_listings")
      .update({ contact_clicks: (listing.contact_clicks || 0) + 1 })
      .eq("id", listing.id)
      .then();

    if (type === "whatsapp" && listing.whatsapp_number) {
      window.open(
        `https://wa.me/${listing.whatsapp_number.replace(/[^0-9]/g, "")}`,
        "_blank"
      );
    } else if (type === "phone") {
      window.location.href = `tel:${listing.phone}`;
    } else if (type === "email" && listing.email) {
      window.location.href = `mailto:${listing.email}`;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing?.title,
        text: listing?.meta_description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded w-64"></div>
            <div className="h-4 bg-muted rounded w-48"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!listing) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Listing not found</h2>
            <p className="text-muted-foreground">
              This business listing doesn't exist or has been removed.
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: listing.title,
    description: listing.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: listing.address,
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.postal_code,
      addressCountry: listing.country,
    },
    telephone: listing.phone,
    email: listing.email,
    url: listing.website,
    image: listing.featured_image_url,
    priceRange: listing.price_range,
  };

  return (
    <>
      <Helmet>
        <title>{listing.meta_title || listing.title}</title>
        <meta
          name="description"
          content={listing.meta_description || listing.description.substring(0, 160)}
        />
        <meta name="keywords" content={listing.keywords?.join(", ")} />

        {/* Open Graph */}
        <meta property="og:title" content={listing.title} />
        <meta
          property="og:description"
          content={listing.meta_description || listing.description.substring(0, 160)}
        />
        <meta property="og:image" content={listing.featured_image_url || ""} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={listing.title} />
        <meta
          name="twitter:description"
          content={listing.meta_description || listing.description.substring(0, 160)}
        />
        <meta name="twitter:image" content={listing.featured_image_url || ""} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow">
          {/* Hero Image */}
          {listing.featured_image_url && (
            <div className="w-full h-96 bg-muted">
              <img
                src={listing.featured_image_url}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Header */}
                <div>
                  {category && (
                    <Badge variant="secondary" className="mb-3">
                      {category.icon} {category.label}
                    </Badge>
                  )}
                  <h1 className="text-4xl font-bold mb-3">{listing.title}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {listing.address}, {listing.city}
                        {listing.state && `, ${listing.state}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{listing.views_count} views</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4">About</h2>
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>{listing.description}</ReactMarkdown>
                    </div>
                  </CardContent>
                </Card>

                {/* Amenities */}
                {listing.amenities && listing.amenities.length > 0 && (
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-2xl font-semibold mb-4">
                        Features & Amenities
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {listing.amenities.map((amenity, index) => (
                          <Badge key={index} variant="outline">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Card */}
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <h3 className="text-xl font-semibold">Contact Information</h3>

                    {listing.price_range && (
                      <div className="text-lg font-medium text-primary">
                        {listing.price_range}
                      </div>
                    )}

                    <div className="space-y-3">
                      <Button
                        className="w-full gap-2"
                        onClick={() => handleContact("phone")}
                      >
                        <Phone className="w-4 h-4" />
                        Call Now
                      </Button>

                      {listing.whatsapp_number && (
                        <Button
                          variant="outline"
                          className="w-full gap-2"
                          onClick={() => handleContact("whatsapp")}
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </Button>
                      )}

                      {listing.email && (
                        <Button
                          variant="outline"
                          className="w-full gap-2"
                          onClick={() => handleContact("email")}
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </Button>
                      )}

                      {listing.website && (
                        <Button
                          variant="outline"
                          className="w-full gap-2"
                          onClick={() => window.open(listing.website, "_blank")}
                        >
                          <Globe className="w-4 h-4" />
                          Visit Website
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        className="w-full gap-2"
                        onClick={handleShare}
                      >
                        <Share2 className="w-4 h-4" />
                        Share Listing
                      </Button>
                    </div>

                    <div className="pt-4 border-t space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 mt-0.5 text-muted-foreground" />
                        <span>{listing.phone}</span>
                      </div>
                      {listing.email && (
                        <div className="flex items-start gap-2">
                          <Mail className="w-4 h-4 mt-0.5 text-muted-foreground" />
                          <span className="break-all">{listing.email}</span>
                        </div>
                      )}
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                        <span>
                          {listing.address}, {listing.city}
                          {listing.state && `, ${listing.state}`}
                          {listing.postal_code && ` ${listing.postal_code}`}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BusinessListingDetail;
