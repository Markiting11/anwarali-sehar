import { MapPin, Phone, Eye, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LISTING_CATEGORIES } from "@/lib/listingCategories";

interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    slug: string;
    category: string;
    description: string;
    city: string;
    phone: string;
    whatsapp_number?: string;
    featured_image_url?: string;
    price_range?: string;
    views_count: number;
    is_featured: boolean;
  };
}

export const ListingCard = ({ listing }: ListingCardProps) => {
  const category = LISTING_CATEGORIES.find((c) => c.value === listing.category);
  const truncatedDescription =
    listing.description.length > 120
      ? listing.description.substring(0, 120) + "..."
      : listing.description;

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const number = listing.whatsapp_number || listing.phone;
    window.open(`https://wa.me/${number.replace(/[^0-9]/g, "")}`, "_blank");
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
      <Link to={`/business-listings/${listing.slug}`}>
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {listing.featured_image_url ? (
            <img
              src={listing.featured_image_url}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              {category?.icon || "📋"}
            </div>
          )}
          {listing.is_featured && (
            <Badge className="absolute top-2 right-2 bg-primary">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Featured
            </Badge>
          )}
          {category && (
            <Badge variant="secondary" className="absolute top-2 left-2">
              {category.icon} {category.label}
            </Badge>
          )}
        </div>

        <CardContent className="p-4 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {listing.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <MapPin className="w-4 h-4" />
            <span>{listing.city}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
            {truncatedDescription}
          </p>

          {/* Price Range */}
          {listing.price_range && (
            <div className="text-sm font-medium text-primary mb-3">
              {listing.price_range}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>{listing.views_count} views</span>
            </div>
            <Button
              size="sm"
              onClick={handleWhatsAppClick}
              className="gap-1"
            >
              <Phone className="w-4 h-4" />
              Contact
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
