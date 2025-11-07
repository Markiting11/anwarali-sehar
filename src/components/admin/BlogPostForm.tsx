import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface BlogPostFormProps {
  post?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export function BlogPostForm({ post, onSuccess, onCancel }: BlogPostFormProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [featuredImageAlt, setFeaturedImageAlt] = useState("");
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [readTime, setReadTime] = useState(5);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const contentTextareaRef = useState<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setSlug(post.slug || "");
      setContent(post.content || "");
      setExcerpt(post.excerpt || "");
      setMetaDescription(post.meta_description || "");
      setCategory(post.category || "");
      setFeaturedImageUrl(post.featured_image_url || "");
      setFeaturedImageAlt(post.featured_image_alt || "");
      setImagePreview(post.featured_image_url || "");
      setTags(post.tags || []);
      setIsFeatured(post.is_featured || false);
      setReadTime(post.read_time || 5);
      setPublished(post.published || false);
    }
  }, [post]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!post) {
      setSlug(generateSlug(value));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

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
  };

  const uploadImage = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      toast.error("Failed to upload image");
      throw error;
    }
  };

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      const markdownImage = `\n![Image description](${imageUrl})\n`;
      
      // Insert at cursor position or append
      const textarea = document.getElementById('content') as HTMLTextAreaElement;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newContent = content.substring(0, start) + markdownImage + content.substring(end);
        setContent(newContent);
        
        // Reset cursor position
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + markdownImage.length, start + markdownImage.length);
        }, 0);
      } else {
        setContent(content + markdownImage);
      }
      
      toast.success("Image uploaded and inserted!");
      e.target.value = ""; // Reset input
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      // Upload image if a file is selected
      let imageUrl = featuredImageUrl;
      if (featuredImageFile) {
        setUploading(true);
        imageUrl = await uploadImage(featuredImageFile);
        setUploading(false);
      }

      const postData = {
        title,
        slug,
        content,
        excerpt,
        meta_description: metaDescription,
        category,
        featured_image_url: imageUrl,
        featured_image_alt: featuredImageAlt,
        tags,
        is_featured: isFeatured,
        read_time: readTime,
        published,
        author_id: session.user.id
      };

      if (post) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", post.id);

        if (error) throw error;
        toast.success("Post updated successfully!");
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert([postData]);

        if (error) throw error;
        toast.success("Post created successfully!");
      }

      // Reset form
      setTitle("");
      setSlug("");
      setContent("");
      setExcerpt("");
      setMetaDescription("");
      setCategory("");
      setFeaturedImageUrl("");
      setFeaturedImageAlt("");
      setFeaturedImageFile(null);
      setImagePreview("");
      setTags([]);
      setTagInput("");
      setIsFeatured(false);
      setReadTime(5);
      setPublished(false);
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          placeholder="Enter post title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">URL Slug *</Label>
        <Input
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          placeholder="post-url-slug"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g., Local SEO, Link Building, Google Maps"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief summary"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content * (Supports Markdown)</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Write your post content using Markdown formatting:&#10;&#10;# Heading 1&#10;## Heading 2&#10;### Heading 3&#10;&#10;**Bold text**&#10;*Italic text*&#10;&#10;[Link text](https://example.com)&#10;&#10;- List item 1&#10;- List item 2&#10;&#10;![Image](url)"
          rows={12}
          className="font-mono text-sm"
        />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Use Markdown formatting: # for headings, **bold**, [links](url), - for lists</span>
        </div>
        <div className="flex gap-2 items-center">
          <Label htmlFor="inlineImage" className="cursor-pointer">
            <Button type="button" variant="outline" size="sm" disabled={uploading} asChild>
              <span>
                {uploading ? "Uploading..." : "📎 Insert Image"}
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
            Upload image to insert into content
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="metaDescription">Meta Description (SEO)</Label>
        <Textarea
          id="metaDescription"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          placeholder="SEO description (160 characters max)"
          maxLength={160}
          rows={2}
        />
      </div>

      <div className="space-y-3">
        <Label>Featured Image</Label>
        
        {/* Image Preview */}
        {imagePreview && (
          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleRemoveImage}
            >
              Remove
            </Button>
          </div>
        )}

        {/* File Upload Button */}
        <div className="flex gap-2">
          <Input
            id="imageFile"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="flex-1"
          />
        </div>

        {/* OR URL Input */}
        <div className="space-y-2">
          <Label htmlFor="featuredImageUrl" className="text-xs text-muted-foreground">
            Or paste image URL:
          </Label>
          <Input
            id="featuredImageUrl"
            value={featuredImageUrl}
            onChange={(e) => {
              setFeaturedImageUrl(e.target.value);
              setImagePreview(e.target.value);
            }}
            placeholder="https://example.com/image.jpg"
            type="url"
          />
        </div>

        {/* Alt Text */}
        <div className="space-y-2">
          <Label htmlFor="imageAlt">Image Alt Text (SEO) *</Label>
          <Input
            id="imageAlt"
            value={featuredImageAlt}
            onChange={(e) => setFeaturedImageAlt(e.target.value)}
            placeholder="Describe the image for accessibility and SEO"
          />
        </div>

        <p className="text-xs text-muted-foreground">
          📝 Tip: Upload an image or paste a URL. Alt text improves SEO and accessibility.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (SEO Keywords)</Label>
        <div className="flex gap-2">
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            placeholder="Add tag and press Enter"
          />
          <Button type="button" onClick={handleAddTag} variant="outline">
            Add
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-destructive"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="readTime">Reading Time (minutes)</Label>
        <Input
          id="readTime"
          type="number"
          value={readTime}
          onChange={(e) => setReadTime(parseInt(e.target.value) || 5)}
          min="1"
          placeholder="5"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={isFeatured}
          onCheckedChange={setIsFeatured}
        />
        <Label htmlFor="featured">Mark as Featured Post</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="published"
          checked={published}
          onCheckedChange={setPublished}
        />
        <Label htmlFor="published">Publish immediately</Label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={loading || uploading} className="flex-1">
          {uploading ? "Uploading Image..." : loading ? "Saving..." : post ? "Update Post" : "Create Post"}
        </Button>
        {post && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}