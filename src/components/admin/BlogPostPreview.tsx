import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface BlogPostPreviewProps {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  tags: string[];
  readingTime: string;
  isFeatured: boolean;
  isPublished: boolean;
}

export const BlogPostPreview = ({
  title,
  category,
  excerpt,
  content,
  featuredImage,
  tags,
  readingTime,
  isFeatured,
  isPublished,
}: BlogPostPreviewProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Preview</h2>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant={isPublished ? "default" : "secondary"}>
            {isPublished ? "Published" : "Draft"}
          </Badge>
          {isFeatured && <Badge variant="outline">Featured</Badge>}
          <Badge variant="outline">{category || "Uncategorized"}</Badge>
        </div>
      </div>

      {featuredImage && (
        <div className="w-full h-64 rounded-lg overflow-hidden bg-muted">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>
      )}

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{title || "Untitled Post"}</h1>
        <p className="text-sm text-muted-foreground">{readingTime} min read</p>
      </div>

      {excerpt && (
        <p className="text-lg text-muted-foreground italic border-l-4 border-primary pl-4">
          {excerpt}
        </p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="prose prose-sm max-w-none dark:prose-invert">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {content || "*No content yet*"}
        </ReactMarkdown>
      </div>
    </Card>
  );
};
