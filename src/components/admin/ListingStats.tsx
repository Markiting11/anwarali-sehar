import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageOpen, Clock, CheckCircle, Eye } from "lucide-react";

export const ListingStats = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-listing-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_listings")
        .select("approval_status, is_published, views_count");

      if (error) throw error;

      const total = data.length;
      const pending = data.filter((l) => l.approval_status === "pending").length;
      const published = data.filter((l) => l.is_published && l.approval_status === "approved").length;
      const totalViews = data.reduce((sum, l) => sum + (l.views_count || 0), 0);

      return { total, pending, published, totalViews };
    },
  });

  const statsCards = [
    {
      title: "Total Listings",
      value: stats?.total || 0,
      icon: PackageOpen,
      color: "text-blue-600",
    },
    {
      title: "Pending Approvals",
      value: stats?.pending || 0,
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Published",
      value: stats?.published || 0,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Total Views",
      value: stats?.totalViews || 0,
      icon: Eye,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
