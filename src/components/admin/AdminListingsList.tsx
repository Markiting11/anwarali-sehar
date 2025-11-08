import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AdminListingCard } from "./AdminListingCard";
import { AdminListingEdit } from "./AdminListingEdit";
import { Loader2, Search, X } from "lucide-react";

export const AdminListingsList = () => {
  const [search, setSearch] = useState("");
  const [approvalFilter, setApprovalFilter] = useState("all");
  const [publishedFilter, setPublishedFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingListing, setEditingListing] = useState<any>(null);

  const { data: listings, isLoading } = useQuery({
    queryKey: ["admin-listings", search, approvalFilter, publishedFilter, categoryFilter],
    queryFn: async () => {
      let query = supabase
        .from("business_listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (search) {
        query = query.ilike("title", `%${search}%`);
      }

      if (approvalFilter !== "all") {
        query = query.eq("approval_status", approvalFilter as "pending" | "approved" | "rejected");
      }

      if (publishedFilter !== "all") {
        query = query.eq("is_published", publishedFilter === "published");
      }

      if (categoryFilter !== "all") {
        query = query.eq("category", categoryFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_listings")
        .select("category")
        .order("category");

      if (error) throw error;
      const uniqueCategories = Array.from(new Set(data.map((item) => item.category)));
      return uniqueCategories;
    },
  });

  const clearFilters = () => {
    setSearch("");
    setApprovalFilter("all");
    setPublishedFilter("all");
    setCategoryFilter("all");
  };

  const hasActiveFilters =
    search || approvalFilter !== "all" || publishedFilter !== "all" || categoryFilter !== "all";

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card rounded-lg border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Filters</h3>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </Button>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="approval">Approval Status</Label>
            <Select value={approvalFilter} onValueChange={setApprovalFilter}>
              <SelectTrigger id="approval">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="published">Published Status</Label>
            <Select value={publishedFilter} onValueChange={setPublishedFilter}>
              <SelectTrigger id="published">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Listings */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : listings && listings.length > 0 ? (
        <div className="space-y-4">
          {listings.map((listing) => (
            <AdminListingCard
              key={listing.id}
              listing={listing}
              onEdit={setEditingListing}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No listings found</p>
        </div>
      )}

      {/* Edit Dialog */}
      {editingListing && (
        <AdminListingEdit
          listing={editingListing}
          open={!!editingListing}
          onOpenChange={(open) => !open && setEditingListing(null)}
        />
      )}
    </div>
  );
};
