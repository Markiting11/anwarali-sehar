import { Download, FileSpreadsheet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const WorkSamples = () => {
  const samples = [
    {
      title: "200 Directories - Utility Contractor San Diego",
      description: "Comprehensive directory submission report for a utility contractor in San Diego. Includes 200+ high-quality directory listings with verified citations.",
      fileName: "200_Directories_Utility_Contractor_San_Diego.xlsx",
      filePath: "/samples/200_Directories_Utility_Contractor_San_Diego.xlsx",
      fileSize: "45 KB",
      category: "Directory Submissions",
    },
    {
      title: "Derek Auto Repair 万通汽车修理 - 200 Directories",
      description: "Complete directory submission campaign for an auto repair business. Features 200 business directory listings with consistent NAP information and category optimization.",
      fileName: "Derek_Auto_Repair_万通汽车修理_-200.xlsx",
      filePath: "/samples/Derek_Auto_Repair_万通汽车修理_-200.xlsx",
      fileSize: "52 KB",
      category: "Auto Repair",
    },
    {
      title: "TOP UK 100 - Directory Submissions",
      description: "Premium UK business directory submissions featuring top 100 directories with high domain authority and local SEO value.",
      fileName: "TOP_UK_100.xlsx",
      filePath: "/samples/TOP_UK_100.xlsx",
      fileSize: "38 KB",
      category: "UK Directories",
    },
    {
      title: "UAE Business List - 100 Premium Directories",
      description: "Specialized UAE directory submission report covering 100 top business directories in the United Arab Emirates region with verified local citations.",
      fileName: "UAE_LIST-100.xlsx",
      filePath: "/samples/UAE_LIST-100.xlsx",
      fileSize: "42 KB",
      category: "UAE Directories",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Work Samples
            </h1>
            <p className="text-xl text-muted-foreground">
              Download sample reports to see the quality and detail of my work. These examples showcase the comprehensive approach I take with every project.
            </p>
          </div>
        </div>
      </section>

      {/* Samples Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {samples.map((sample, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-xl transition-all animate-fade-in hover-scale border-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileSpreadsheet className="text-primary" size={28} />
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1 bg-accent/50 text-accent-foreground text-xs font-medium rounded-full mb-2">
                      {sample.category}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {sample.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {sample.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    <div className="font-medium text-foreground">{sample.fileName}</div>
                    <div className="text-xs">{sample.fileSize}</div>
                  </div>
                  <a href={sample.filePath} download>
                    <Button className="shadow-md hover:shadow-lg transition-shadow">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                What's Included in These Samples?
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Each sample report demonstrates the thorough and professional approach I take with every client project. These Excel spreadsheets include:
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">✓</span>
                    <span><strong>Complete Directory URLs</strong> - Direct links to every submission</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">✓</span>
                    <span><strong>Business Information</strong> - NAP (Name, Address, Phone) consistency</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">✓</span>
                    <span><strong>Category Classifications</strong> - Relevant business categories for each listing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">✓</span>
                    <span><strong>Submission Status</strong> - Verification status for each directory</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">✓</span>
                    <span><strong>Notes & Recommendations</strong> - Additional insights for maximizing results</span>
                  </li>
                </ul>
                <p className="pt-4">
                  These samples represent real work completed for actual clients, with sensitive information removed. They showcase the level of detail and organization you can expect when you work with me.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Get Similar Results?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let me create a customized strategy for your business with the same level of detail and professionalism shown in these samples.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg">
                Start Your Project
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline">
                View More Examples
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WorkSamples;
