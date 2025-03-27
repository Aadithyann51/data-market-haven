
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Eye } from "lucide-react";

const BrowseData = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Sample data
  const dataListings = [
    {
      id: 1,
      title: "City Temperature Sensors",
      description: "Real-time temperature data from 50 sensors across the city center.",
      category: "Environmental",
      price: "$24.99",
      provider: "City IoT Initiative",
      rating: 4.5,
      updatedAt: "2 days ago"
    },
    {
      id: 2,
      title: "Industrial Machine Status",
      description: "Performance and status data from manufacturing equipment.",
      category: "Industrial",
      price: "$49.99/month",
      provider: "Factory Solutions Inc.",
      rating: 4.2,
      updatedAt: "1 week ago"
    },
    {
      id: 3,
      title: "Smart Home Energy Consumption",
      description: "Anonymized energy usage patterns from 1000+ households.",
      category: "Energy",
      price: "$19.99",
      provider: "GreenGrid Analytics",
      rating: 4.8,
      updatedAt: "3 days ago"
    },
    {
      id: 4,
      title: "Agricultural Soil Sensors",
      description: "Soil moisture, pH, and nutrient data from farming regions.",
      category: "Agricultural",
      price: "$34.99/month",
      provider: "FarmTech Solutions",
      rating: 4.1,
      updatedAt: "5 days ago"
    },
    {
      id: 5,
      title: "Urban Traffic Patterns",
      description: "Traffic flow data from city intersections and highways.",
      category: "Transportation",
      price: "$29.99",
      provider: "SmartCity Transit",
      rating: 4.3,
      updatedAt: "1 day ago"
    },
    {
      id: 6,
      title: "Air Quality Index",
      description: "Detailed air quality measurements from monitoring stations.",
      category: "Environmental",
      price: "$15.99",
      provider: "CleanAir Monitoring",
      rating: 4.7,
      updatedAt: "4 days ago"
    }
  ];

  // Filter data based on search and category
  const filteredData = dataListings.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = [...new Set(dataListings.map(item => item.category))];

  const handleViewDetails = (id: number) => {
    navigate(`/data/${id}`);
  };

  // Check for purchased items
  const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
  const isPurchased = (id: number) => {
    return transactions.some((t: any) => t.dataId === id);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Data</h1>
          <p className="text-muted-foreground">Find and purchase IoT data sets for your projects</p>
        </header>
        
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for data sets..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            className="gap-1"
            onClick={() => navigate("/transactions")}
          >
            My Purchases
          </Button>
        </div>
        
        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <Card key={item.id} className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription className="mt-2">{item.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Category:</span>
                      <span className="text-sm font-medium">{item.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Provider:</span>
                      <span className="text-sm font-medium">{item.provider}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Updated:</span>
                      <span className="text-sm">{item.updatedAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Rating:</span>
                      <span className="text-sm font-medium">{item.rating}/5.0</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <span className="font-bold">{item.price}</span>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="gap-1"
                      onClick={() => handleViewDetails(item.id)}
                    >
                      <Eye className="h-4 w-4" /> Details
                    </Button>
                    {isPurchased(item.id) ? (
                      <Button 
                        size="sm" 
                        className="gap-1"
                        onClick={() => handleViewDetails(item.id)}
                      >
                        <Download className="h-4 w-4" /> Download
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        className="gap-1"
                        onClick={() => handleViewDetails(item.id)}
                      >
                        Purchase
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground mb-2">No results found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseData;
