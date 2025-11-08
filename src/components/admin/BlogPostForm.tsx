import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import MDEditor from "@uiw/react-md-editor";
import { StepIndicator } from "./StepIndicator";
import { BlogPostPreview } from "./BlogPostPreview";

interface BlogPostFormProps {
  post?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const BLOG_CATEGORIES = [
  "Local SEO",
  "Google Maps Ranking",
  "Link Building",
  "Citation Building",
  "GMB Optimization",
  "SEO Strategy",
  "Case Studies",
  "SEO Tips",
  "Industry News",
];

const STEPS = ["Basics", "Content", "Media & SEO", "Preview & Publish"];

export function BlogPostForm({ post, onSuccess, onCancel }: BlogPostFormProps) {
  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [featuredImageAlt, setFeaturedImageAlt] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [readTime, setReadTime] = useState(5);
  const [isFeatured, setIsFeatured] = useState(false);
  const [published, setPublished] = useState(false);
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Load existing post
  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setSlug(post.slug || "");
      setCategory(post.category || "");
      setContent(post.content || "");
      setExcerpt(post.excerpt || "");
      setFeaturedImageUrl(post.featured_image_url || "");
      setFeaturedImageAlt(post.featured_image_alt || "");
      setImagePreview(post.featured_image_url || "");
      setMetaDescription(post.meta_description || "");
      setTags(post.tags || []);
      setReadTime(post.read_time || 5);
      setIsFeatured(post.is_featured || false);
      setPublished(post.published || false);
    }
  }, [post]);

  // Auto-save to localStorage
  useEffect(() => {
    const draftKey = `blog-draft-${post?.id || 'new'}`;
    const draft = {
      title, slug, category, content, excerpt, featuredImageUrl,
      featuredImageAlt, metaDescription, tags, readTime, isFeatured, published
    };
    localStorage.setItem(draftKey, JSON.stringify(draft));
  }, [title, slug, category, content, excerpt, featuredImageUrl, featuredImageAlt, metaDescription, tags, readTime, isFeatured, published, post?.id]);

  // Auto-generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!post && !slug) {
      setSlug(generateSlug(value));
    }
  };

  // Auto-generate excerpt from content
  const autoGenerateExcerpt = () => {
    const plainText = content.replace(/[#*`\[\]()]/g, "").trim();
    const firstParagraph = plainText.split("\n\n")[0];
    const excerpt = firstParagraph.substring(0, 160);
    setExcerpt(excerpt);
    toast.success("Excerpt generated from content!");
  };

  // Auto-calculate reading time
  useEffect(() => {
    if (content) {
      const words = content.split(/\s+/).length;
      const minutes = Math.ceil(words / 200); // Average reading speed: 200 words/min
      setReadTime(minutes);
    }
  }, [content]);

  // Validation for each step
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!title.trim()) {
          toast.error("Title is required");
          return false;
        }
        if (!slug.trim()) {
          toast.error("URL Slug is required");
          return false;
        }
        if (!category) {
          toast.error("Please select a category");
          return false;
        }
        return true;
      case 2:
        if (!content.trim() || content.length < 50) {
          toast.error("Content must be at least 50 characters");
          return false;
        }
        return true;
      case 3:
        if ((featuredImageUrl || imagePreview) && !featuredImageAlt.trim()) {
          toast.error("Image Alt Text is required when featured image is present");
          return false;
        }
        return true;
      case 4:
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Image handling
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFeaturedImageFile(null);
    setImagePreview("");
    setFeaturedImageUrl("");
    setFeaturedImageAlt("");
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("blog-images")
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      const markdownImage = `![Image description](${imageUrl})`;
      setContent(content + (content ? '\n\n' : '') + markdownImage);
      toast.success("Image uploaded and inserted!");
      e.target.value = "";
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Upload error:', error);
      }
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  // Tag management
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;

    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      let imageUrl = featuredImageUrl;
      if (featuredImageFile) {
        imageUrl = await uploadImage(featuredImageFile);
      }

      const postData = {
        title,
        slug,
        category,
        content,
        excerpt,
        featured_image_url: imageUrl,
        featured_image_alt: featuredImageAlt,
        meta_description: metaDescription,
        tags,
        read_time: readTime,
        is_featured: isFeatured,
        published,
        author_id: session.user.id,
      };

      if (post?.id) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", post.id);

        if (error) throw error;
        toast.success("Post updated successfully!");
      } else {
        const { error } = await supabase.from("blog_posts").insert([postData]);

        if (error) throw error;
        toast.success("Post created successfully!");
      }

      // Clear draft from localStorage
      const draftKey = `blog-draft-${post?.id || 'new'}`;
      localStorage.removeItem(draftKey);

      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <StepIndicator
        steps={STEPS}
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={handleStepClick}
      />

      <div className="min-h-[500px] animate-fade-in">
        {/* Step 1: Basics & Category */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Basic Information</h2>
            
            <div className="space-y-2">
              <Label htmlFor="title">Post Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter an engaging title for your post"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="url-friendly-slug"
                required
              />
              <p className="text-xs text-muted-foreground">
                This will be used in the URL: /blog/{slug || "your-slug"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {BLOG_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 2: Content Creation */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Content Creation</h2>

            <div className="space-y-2">
              <Label htmlFor="content">Content * (Rich Text Editor)</Label>
              <div data-color-mode="light">
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val || "")}
                  preview="live"
                  height={500}
                  visibleDragbar={false}
                  className="!bg-background !text-foreground"
                />
              </div>
              <div className="flex gap-2 items-center mt-2">
                <Label htmlFor="inlineImage" className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm" disabled={uploading} asChild>
                    <span>
                      {uploading ? "Uploading..." : "📎 Upload & Insert Image"}
                    </span>
                  </Button>
                </Label>
                <Input
                  id="inlineImage"
                  type="file"
                  accept="image/*"
                  onChange={handleInlineImageUpload}
                  className="hidden"
                />
                <span className="text-xs text-muted-foreground">
                  Or paste formatted text directly - formatting will be preserved!
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={autoGenerateExcerpt}
                  disabled={!content}
                >
                  Auto-Generate
                </Button>
              </div>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of your post (shown in listings)"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                {excerpt.length}/160 characters (recommended)
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Media & SEO */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Media & SEO Settings</h2>

            <div className="space-y-4">
              <Label>Featured Image</Label>
              {imagePreview ? (
                <div className="space-y-2">
                  <div className="relative w-full h-64 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRemoveImage}
                    className="w-full"
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    id="featuredImageUpload"
                  />
                  <div className="text-center text-muted-foreground">or</div>
                  <Input
                    value={featuredImageUrl}
                    onChange={(e) => {
                      setFeaturedImageUrl(e.target.value);
                      setImagePreview(e.target.value);
                    }}
                    placeholder="Enter image URL"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageAlt">
                Image Alt Text {(featuredImageUrl || imagePreview) && "*"}
              </Label>
              <Input
                id="imageAlt"
                value={featuredImageAlt}
                onChange={(e) => setFeaturedImageAlt(e.target.value)}
                placeholder="Describe the image for accessibility and SEO"
                required={!!(featuredImageUrl || imagePreview)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="SEO meta description (shown in search results)"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                {metaDescription.length}/160 characters (recommended)
              </p>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                />
                <Button type="button" onClick={handleAddTag} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-destructive"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Preview & Publish */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Review & Publish</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="readingTime">Reading Time (minutes)</Label>
                <Input
                  id="readingTime"
                  type="number"
                  value={readTime}
                  onChange={(e) => setReadTime(parseInt(e.target.value) || 5)}
                  min="1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  checked={isFeatured}
                  onCheckedChange={setIsFeatured}
                />
                <Label htmlFor="isFeatured">Featured Post</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={published}
                  onCheckedChange={setPublished}
                />
                <Label htmlFor="published">Publish Now</Label>
              </div>
            </div>

            <BlogPostPreview
              title={title}
              category={category}
              excerpt={excerpt}
              content={content}
              featuredImage={imagePreview || featuredImageUrl}
              tags={tags}
              readingTime={readTime.toString()}
              isFeatured={isFeatured}
              isPublished={published}
            />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <div className="flex gap-2">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          {post && (
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          {currentStep < 4 ? (
            <Button type="button" onClick={handleNext}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? "Saving..." : post ? "Update Post" : "Create Post"}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
