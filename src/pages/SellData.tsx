
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Upload, Database, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const SellData = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    isSubscription: false,
    sampleIncluded: true,
    dataFormat: "json"
  });

  // Sample existing listings
  const myListings = [
    {
      id: 1,
      title: "Home Energy Consumption",
      status: "Active",
      purchases: 24,
      revenue: "$478.76"
    },
    {
      id: 2,
      title: "Traffic Data (City Center)",
      status: "Active",
      purchases: 8,
      revenue: "$360.00"
    },
    {
      id: 3,
      title: "Weather Station Readings",
      status: "Inactive",
      purchases: 0,
      revenue: "$0.00"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name) => {
    setFormState(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSelectChange = (name, value) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formState.title || !formState.description || !formState.category || !formState.price) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // In a real app, this would be an API call to create the listing
    toast.success("Data listing created successfully!");
    
    // Clear form or redirect
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Sell Your Data</h1>
          <p className="text-muted-foreground">Create and manage your IoT data listings</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - New listing form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Create New Data Listing</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Listing Title</Label>
                      <Input 
                        id="title"
                        name="title"
                        placeholder="E.g., City Temperature Sensors Data"
                        value={formState.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description"
                        name="description"
                        placeholder="Describe your data set, its sources, and potential uses..."
                        rows={4}
                        value={formState.description}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          value={formState.category} 
                          onValueChange={(value) => handleSelectChange("category", value)}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Environmental">Environmental</SelectItem>
                            <SelectItem value="Industrial">Industrial</SelectItem>
                            <SelectItem value="Energy">Energy</SelectItem>
                            <SelectItem value="Transportation">Transportation</SelectItem>
                            <SelectItem value="Agricultural">Agricultural</SelectItem>
                            <SelectItem value="Smart Home">Smart Home</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="price">Price</Label>
                        <Input 
                          id="price"
                          name="price"
                          placeholder="Enter price (e.g., 19.99)"
                          value={formState.price}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="isSubscription" className="block mb-1">Subscription Model</Label>
                          <p className="text-sm text-muted-foreground">Offer as recurring subscription instead of one-time purchase</p>
                        </div>
                        <Switch 
                          id="isSubscription" 
                          checked={formState.isSubscription}
                          onCheckedChange={() => handleSwitchChange("isSubscription")}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sampleIncluded" className="block mb-1">Include Sample Data</Label>
                          <p className="text-sm text-muted-foreground">Allow potential buyers to preview sample data</p>
                        </div>
                        <Switch 
                          id="sampleIncluded" 
                          checked={formState.sampleIncluded}
                          onCheckedChange={() => handleSwitchChange("sampleIncluded")}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Label htmlFor="dataFormat">Data Format</Label>
                        <Select 
                          value={formState.dataFormat} 
                          onValueChange={(value) => handleSelectChange("dataFormat", value)}
                        >
                          <SelectTrigger id="dataFormat">
                            <SelectValue placeholder="Select data format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="json">JSON</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="xml">XML</SelectItem>
                            <SelectItem value="api">API Access</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Label className="block mb-2">Upload Data Files</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                        <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium mb-1">Drag and drop your files here</p>
                        <p className="text-xs text-muted-foreground mb-4">Supported formats: CSV, JSON, XML (Max 500MB)</p>
                        <Button type="button" variant="outline" size="sm">Select Files</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Button type="submit" className="w-full">
                      Create Listing <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Current listings */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Data Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myListings.map(listing => (
                    <div key={listing.id} className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{listing.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          listing.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {listing.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Purchases</p>
                          <p className="font-medium">{listing.purchases}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Revenue</p>
                          <p className="font-medium">{listing.revenue}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2">
                    <Database className="h-5 w-5 text-primary shrink-0" />
                    <span>Provide clear data documentation to increase your listing's value</span>
                  </li>
                  <li className="flex gap-2">
                    <Clock className="h-5 w-5 text-primary shrink-0" />
                    <span>Regular updates to your data sets will attract more buyers</span>
                  </li>
                  <li className="flex gap-2">
                    <Upload className="h-5 w-5 text-primary shrink-0" />
                    <span>Offering sample data can increase purchase rates by up to 40%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellData;
