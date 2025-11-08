import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Edit, Trash2, ExternalLink, Star, Eye, MousePointerClick, PackageOpen } from "lucide-react";
import { useState } from "react";
import { ListingApprovalActions } from "./ListingApprovalActions";
import { format } from "date-fns";

interface AdminListingCardProps {
  listing: any;
  onEdit: (listing: any) => void;
}

export const AdminListingCard = ({ listing, onEdit }: AdminListingCardProps) => {
  const queryClient = useQueryClient();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("business_listings")
        .delete()
        .eq("id", listing.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Listing deleted successfully");
      setShowDeleteDialog(false);
      queryClient.invalidateQueries({ queryKey: ["admin-listings"] });
      queryClient.invalidateQueries({ queryKey: ["admin-listing-stats"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete listing");
    },
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("business_listings")
        .update({ is_featured: !listing.is_featured })
        .eq("id", listing.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(
        listing.is_featured
          ? "Removed from featured listings"
          : "Added to featured listings"
      );
      queryClient.invalidateQueries({ queryKey: ["admin-listings"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to toggle featured status");
    },
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      pending: { variant: "secondary", label: "Pending" },
      approved: { variant: "default", label: "Approved" },
      rejected: { variant: "destructive", label: "Rejected" },
    };
    return variants[status] || variants.pending;
  };

  const statusBadge = getStatusBadge(listing.approval_status);

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            {/* Thumbnail */}
            <div className="flex-shrink-0">
              {listing.featured_image_url ? (
                <img
                  src={listing.featured_image_url}
                  alt={listing.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              ) : (
                <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                  <PackageOpen className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{listing.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{listing.slug}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant={listing.is_published ? "default" : "secondary"}>
                  {listing.is_published ? "Published" : "Draft"}
                </Badge>
                <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                {listing.is_featured && (
                  <Badge variant="outline" className="gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    Featured
                  </Badge>
                )}
                <Badge variant="outline">{listing.category}</Badge>
              </div>

              <div className="text-sm text-muted-foreground space-y-1 mb-3">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {listing.views_count || 0} views
                  </span>
                  <span className="flex items-center gap-1">
                    <MousePointerClick className="h-3 w-3" />
                    {listing.contact_clicks || 0} clicks
                  </span>
                </div>
                <div>
                  Created: {format(new Date(listing.created_at), "MMM d, yyyy")}
                </div>
                {listing.city && <div>📍 {listing.city}</div>}
              </div>

              {listing.rejection_reason && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-md p-2 mb-3">
                  <p className="text-sm text-destructive">
                    <strong>Rejection reason:</strong> {listing.rejection_reason}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <ListingApprovalActions
                  listingId={listing.id}
                  currentStatus={listing.approval_status}
                  listingTitle={listing.title}
                />
                
                <Button size="sm" variant="outline" onClick={() => onEdit(listing)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleFeaturedMutation.mutate()}
                  disabled={toggleFeaturedMutation.isPending}
                >
                  <Star
                    className={`h-4 w-4 mr-1 ${
                      listing.is_featured ? "fill-current" : ""
                    }`}
                  />
                  {listing.is_featured ? "Unfeature" : "Feature"}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    window.open(`/business-listings/${listing.slug}`, "_blank")
                  }
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Listing</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{listing.title}"? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate()}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
