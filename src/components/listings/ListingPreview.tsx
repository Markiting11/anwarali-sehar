import { MapPin, Phone, Mail, Globe, MessageCircle, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LISTING_CATEGORIES } from "@/lib/listingCategories";
import ReactMarkdown from "react-markdown";

interface ListingPreviewProps {
  formData: {
    category: string;
    title: string;
    slug: string;
    description: string;
    address: string;
    city: string;
    state?: string;
    postal_code?: string;
    phone: string;
    email?: string;
    website?: string;
    whatsapp_number?: string;
    featured_image_url?: string;
    price_range?: string;
    amenities?: string[];
    meta_title?: string;
    meta_description?: string;
    keywords?: string[];
  };
}

export const ListingPreview = ({ formData }: ListingPreviewProps) => {
  const category = LISTING_CATEGORIES.find((c) => c.value === formData.category);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Listing Preview</CardTitle>
          <p className="text-sm text-muted-foreground">
            Review how your listing will appear to visitors
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Featured Image */}
          {formData.featured_image_url && (
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              <img
                src={formData.featured_image_url}
                alt={formData.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Category & Title */}
          <div>
            {category && (
              <Badge variant="secondary" className="mb-2">
                {category.icon} {category.label}
              </Badge>
            )}
            <h1 className="text-3xl font-bold mb-2">{formData.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>
                {formData.address}, {formData.city}
                {formData.state && `, ${formData.state}`}
              </span>
            </div>
          </div>

          {/* Price Range */}
          {formData.price_range && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="font-medium">{formData.price_range}</span>
            </div>
          )}

          {/* Description */}
          <div className="prose prose-sm max-w-none">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <ReactMarkdown>{formData.description}</ReactMarkdown>
          </div>

          {/* Amenities */}
          {formData.amenities && formData.amenities.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Features & Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {formData.amenities.map((amenity, index) => (
                  <Badge key={index} variant="outline">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>{formData.phone}</span>
              </div>
              {formData.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>{formData.email}</span>
                </div>
              )}
              {formData.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <a
                    href={formData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {formData.website}
                  </a>
                </div>
              )}
              {formData.whatsapp_number && (
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span>{formData.whatsapp_number}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Preview */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Preview</CardTitle>
          <p className="text-sm text-muted-foreground">
            How your listing will appear in Google search results
          </p>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-background">
            <div className="text-sm text-primary mb-1">
              yoursite.com/business-listings/{formData.slug}
            </div>
            <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
              {formData.meta_title || formData.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {formData.meta_description ||
                formData.description.substring(0, 160) + "..."}
            </p>
            {formData.keywords && formData.keywords.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {formData.keywords.slice(0, 5).map((keyword, index) => (
                  <span
                    key={index}
                    className="text-xs bg-muted px-2 py-1 rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
