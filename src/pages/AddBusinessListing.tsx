import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ListingForm } from "@/components/listings/ListingForm";

const AddBusinessListing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Add Business Listing - Submit Your Business</title>
        <meta
          name="description"
          content="Add your business to our directory and reach more customers. Simple multi-step process to create your listing."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto mb-8">
              <h1 className="text-4xl font-bold mb-4">Add Business Listing</h1>
              <p className="text-muted-foreground">
                Fill out the form below to add your business to our directory.
                All fields marked with * are required.
              </p>
            </div>
            <ListingForm />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AddBusinessListing;
