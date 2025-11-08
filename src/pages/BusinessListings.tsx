import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingFilters } from "@/components/listings/ListingFilters";

const BusinessListings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const { data: listings, isLoading } = useQuery({
    queryKey: ["business-listings", selectedCategory, sortBy],
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    queryFn: async () => {
      let query = supabase
        .from("business_listings")
        .select("*")
        .eq("is_published", true);

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }

      if (sortBy === "newest") {
        query = query.order("created_at", { ascending: false });
      } else if (sortBy === "oldest") {
        query = query.order("created_at", { ascending: true });
      } else if (sortBy === "most-viewed") {
        query = query.order("views_count", { ascending: false });
      } else if (sortBy === "featured") {
        query = query.order("is_featured", { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const filteredListings = listings?.filter((listing) =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Business Listings - Find Local Businesses & Services</title>
        <meta
          name="description"
          content="Browse business listings including restaurants, real estate, services, doctors, education centers and more. Find trusted local businesses in your area."
        />
        <meta
          name="keywords"
          content="business listings, local businesses, services, restaurants, real estate, doctors, education"
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 px-4">
            <div className="container mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Business Listings
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover trusted local businesses and services in your area
              </p>
              <Link to="/business-listings/add">
                <Button size="lg" className="gap-2">
                  <Plus className="w-5 h-5" />
                  Add Your Business
                </Button>
              </Link>
            </div>
          </section>

          {/* Listings Section */}
          <section className="py-12 px-4">
            <div className="container mx-auto">
              <ListingFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-96 bg-muted animate-pulse rounded-lg"
                    />
                  ))}
                </div>
              ) : filteredListings && filteredListings.length > 0 ? (
                <>
                  <div className="mb-6 text-muted-foreground">
                    Showing {filteredListings.length} listing{filteredListings.length !== 1 ? 's' : ''}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredListings.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-semibold mb-4">
                    No listings found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Be the first to add a listing in this category
                  </p>
                  <Link to="/business-listings/add">
                    <Button className="gap-2">
                      <Plus className="w-5 h-5" />
                      Add Your Business
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BusinessListings;
