import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ListingStepIndicator } from "./ListingStepIndicator";
import { ListingPreview } from "./ListingPreview";
import { LISTING_CATEGORIES, PRICE_RANGES } from "@/lib/listingCategories";
import { ChevronLeft, ChevronRight, Upload, Loader2 } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";

const listingSchema = z.object({
  category: z.string().min(1, "Category is required"),
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  address: z.string().min(10, "Full address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  whatsapp_number: z.string().optional(),
  featured_image_url: z.string().optional(),
  price_range: z.string().optional(),
  amenities: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  keywords: z.string().optional(),
  is_published: z.boolean().default(false),
});

type ListingFormData = z.infer<typeof listingSchema>;

const STEPS = [
  { number: 1, title: "Category & Title", description: "Basic info" },
  { number: 2, title: "Details & Location", description: "Description" },
  { number: 3, title: "Media & Contact", description: "Images & info" },
  { number: 4, title: "Preview & Publish", description: "Review" },
];

export const ListingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      is_published: false,
    },
  });

  const formData = watch();

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && currentStep === 1) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 100);
      setValue("slug", slug);
    }
  }, [formData.title, currentStep, setValue]);

  // Auto-generate meta fields
  useEffect(() => {
    if (formData.title && !formData.meta_title) {
      setValue("meta_title", `${formData.title} - ${formData.city || ""}`);
    }
    if (formData.description && !formData.meta_description) {
      const excerpt = formData.description.substring(0, 160);
      setValue("meta_description", excerpt);
    }
  }, [formData.title, formData.description, formData.city, formData.meta_title, formData.meta_description, setValue]);

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("listing-draft", JSON.stringify(formData));
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem("listing-draft");
    if (draft) {
      const parsedDraft = JSON.parse(draft);
      Object.keys(parsedDraft).forEach((key) => {
        setValue(key as any, parsedDraft[key]);
      });
    }
  }, [setValue]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setUploadingImage(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("listing-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("listing-images")
        .getPublicUrl(filePath);

      setValue("featured_image_url", publicUrl);
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      return !!(formData.category && formData.title && formData.slug);
    }
    if (step === 2) {
      return !!(
        formData.description &&
        formData.address &&
        formData.city &&
        formData.phone
      );
    }
    if (step === 3) {
      return true; // Optional fields
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: ListingFormData) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to create a listing");
        navigate("/auth");
        return;
      }

      const amenitiesArray = data.amenities
        ? data.amenities.split(",").map((a) => a.trim())
        : [];
      const keywordsArray = data.keywords
        ? data.keywords.split(",").map((k) => k.trim())
        : [];

      const { error } = await supabase.from("business_listings").insert({
        user_id: user.id,
        category: data.category,
        title: data.title,
        slug: data.slug,
        description: data.description,
        address: data.address,
        city: data.city,
        state: data.state,
        postal_code: data.postal_code,
        phone: data.phone,
        email: data.email,
        website: data.website,
        whatsapp_number: data.whatsapp_number,
        featured_image_url: data.featured_image_url,
        price_range: data.price_range,
        amenities: amenitiesArray,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        keywords: keywordsArray,
        is_published: data.is_published,
      });

      if (error) throw error;

      localStorage.removeItem("listing-draft");
      toast.success("Listing created successfully!");
      navigate("/business-listings");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
      <ListingStepIndicator
        currentStep={currentStep}
        completedSteps={completedSteps}
        steps={STEPS}
        onStepClick={setCurrentStep}
      />

      <Card className="mb-6">
        <CardContent className="pt-6">
          {/* Step 1: Category & Title */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setValue("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {LISTING_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="title">Listing Title *</Label>
                <Input
                  {...register("title")}
                  placeholder="e.g., Modern 2 Bedroom Apartment in DHA"
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <Input {...register("slug")} placeholder="auto-generated-from-title" />
                <p className="text-xs text-muted-foreground mt-1">
                  This will be your listing URL
                </p>
                {errors.slug && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.slug.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Details & Location */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <Label>Description *</Label>
                <div data-color-mode="light">
                  <MDEditor
                    value={formData.description}
                    onChange={(value) => setValue("description", value || "")}
                    preview="edit"
                    height={300}
                  />
                </div>
                {errors.description && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="address">Full Address *</Label>
                <Input
                  {...register("address")}
                  placeholder="Street address, building number"
                />
                {errors.address && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input {...register("city")} placeholder="Karachi" />
                  {errors.city && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="state">State/Province</Label>
                  <Input {...register("state")} placeholder="Sindh" />
                </div>
                <div>
                  <Label htmlFor="postal_code">Postal Code</Label>
                  <Input {...register("postal_code")} placeholder="75500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    {...register("phone")}
                    placeholder="+92 300 1234567"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
                  <Input
                    {...register("whatsapp_number")}
                    placeholder="+92 300 1234567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="contact@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    {...register("website")}
                    placeholder="https://example.com"
                  />
                  {errors.website && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.website.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Media & Contact */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <Label>Featured Image</Label>
                <div className="space-y-4">
                  {formData.featured_image_url && (
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <img
                        src={formData.featured_image_url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                    {uploadingImage && (
                      <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading image...
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="price_range">Price Range</Label>
                <Select
                  value={formData.price_range}
                  onValueChange={(value) => setValue("price_range", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRICE_RANGES.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="amenities">Features & Amenities</Label>
                <Textarea
                  {...register("amenities")}
                  placeholder="Parking, WiFi, AC, etc. (comma separated)"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate multiple amenities with commas
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Preview & Publish */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <ListingPreview
                formData={{
                  category: formData.category || "",
                  title: formData.title || "",
                  slug: formData.slug || "",
                  description: formData.description || "",
                  address: formData.address || "",
                  city: formData.city || "",
                  state: formData.state,
                  postal_code: formData.postal_code,
                  phone: formData.phone || "",
                  email: formData.email,
                  website: formData.website,
                  whatsapp_number: formData.whatsapp_number,
                  featured_image_url: formData.featured_image_url,
                  price_range: formData.price_range,
                  amenities: formData.amenities
                    ? formData.amenities.split(",").map((a) => a.trim())
                    : [],
                  meta_title: formData.meta_title,
                  meta_description: formData.meta_description,
                  keywords: formData.keywords
                    ? formData.keywords.split(",").map((k) => k.trim())
                    : [],
                }}
              />

              <Card className="bg-muted/50">
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label htmlFor="meta_title">SEO Meta Title</Label>
                    <Input {...register("meta_title")} />
                  </div>
                  <div>
                    <Label htmlFor="meta_description">SEO Meta Description</Label>
                    <Textarea {...register("meta_description")} rows={3} />
                  </div>
                  <div>
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      {...register("keywords")}
                      placeholder="keyword1, keyword2, keyword3"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="is_published">Publish Immediately</Label>
                      <p className="text-xs text-muted-foreground">
                        Make this listing visible to everyone
                      </p>
                    </div>
                    <Switch
                      checked={formData.is_published}
                      onCheckedChange={(checked) =>
                        setValue("is_published", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {currentStep < 4 ? (
          <Button type="button" onClick={handleNext}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Listing"
            )}
          </Button>
        )}
      </div>
    </form>
  );
};
