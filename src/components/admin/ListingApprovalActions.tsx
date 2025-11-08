import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface ListingApprovalActionsProps {
  listingId: string;
  currentStatus: string;
  listingTitle: string;
}

export const ListingApprovalActions = ({
  listingId,
  currentStatus,
  listingTitle,
}: ListingApprovalActionsProps) => {
  const queryClient = useQueryClient();
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const approveMutation = useMutation({
    mutationFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      const { error } = await supabase
        .from("business_listings")
        .update({
          approval_status: "approved",
          approved_by: session?.user.id,
          approved_at: new Date().toISOString(),
          rejection_reason: null,
        })
        .eq("id", listingId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(`"${listingTitle}" approved successfully!`);
      queryClient.invalidateQueries({ queryKey: ["admin-listings"] });
      queryClient.invalidateQueries({ queryKey: ["admin-listing-stats"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to approve listing");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (reason: string) => {
      const { data: { session } } = await supabase.auth.getSession();
      
      const { error } = await supabase
        .from("business_listings")
        .update({
          approval_status: "rejected",
          approved_by: session?.user.id,
          approved_at: new Date().toISOString(),
          rejection_reason: reason,
        })
        .eq("id", listingId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(`"${listingTitle}" rejected`);
      setShowRejectDialog(false);
      setRejectionReason("");
      queryClient.invalidateQueries({ queryKey: ["admin-listings"] });
      queryClient.invalidateQueries({ queryKey: ["admin-listing-stats"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to reject listing");
    },
  });

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    rejectMutation.mutate(rejectionReason);
  };

  if (currentStatus === "approved") {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <CheckCircle className="h-4 w-4" />
        Approved
      </div>
    );
  }

  if (currentStatus === "rejected") {
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={() => approveMutation.mutate()}
        disabled={approveMutation.isPending}
      >
        {approveMutation.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <CheckCircle className="h-4 w-4 mr-1" />
            Re-approve
          </>
        )}
      </Button>
    );
  }

  return (
    <>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="default"
          onClick={() => approveMutation.mutate()}
          disabled={approveMutation.isPending}
        >
          {approveMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-1" />
              Approve
            </>
          )}
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => setShowRejectDialog(true)}
          disabled={rejectMutation.isPending}
        >
          <XCircle className="h-4 w-4 mr-1" />
          Reject
        </Button>
      </div>

      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Listing</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting "{listingTitle}". The user will see
              this message.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                placeholder="e.g., Images are not clear, business details are incomplete, etc."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowRejectDialog(false);
                setRejectionReason("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={rejectMutation.isPending}
            >
              {rejectMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Reject Listing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
