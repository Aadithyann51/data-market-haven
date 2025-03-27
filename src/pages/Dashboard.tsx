
import { Button } from "@/components/ui/button";
import BlurContainer from "@/components/ui/BlurContainer";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BarChart3, Upload, Download, Clock, Settings, Plus } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  // Sample data
  const recentTransactions = [
    { id: 1, type: "Purchase", description: "Temperature Data (City A)", amount: "$24.99", date: "2 days ago" },
    { id: 2, type: "Sale", description: "Humidity Data (Home Sensors)", amount: "$15.50", date: "1 week ago" },
    { id: 3, type: "Purchase", description: "Air Quality Index (Region B)", amount: "$35.00", date: "2 weeks ago" },
  ];
  
  const myListings = [
    { id: 1, name: "Home Energy Consumption", price: "$19.99/mo", status: "Active" },
    { id: 2, name: "Traffic Data (City Center)", price: "$45.00", status: "Active" },
    { id: 3, name: "Weather Station Readings", price: "$29.99/mo", status: "Inactive" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your IoT data and marketplace activity</p>
        </header>
        
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <BlurContainer className="flex items-center">
            <div className="p-3 bg-primary/10 rounded-lg mr-4">
              <Upload className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Listings</p>
              <h3 className="text-2xl font-semibold">12</h3>
            </div>
          </BlurContainer>
          
          <BlurContainer className="flex items-center">
            <div className="p-3 bg-primary/10 rounded-lg mr-4">
              <Download className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Data Purchases</p>
              <h3 className="text-2xl font-semibold">8</h3>
            </div>
          </BlurContainer>
          
          <BlurContainer className="flex items-center">
            <div className="p-3 bg-primary/10 rounded-lg mr-4">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
              <h3 className="text-2xl font-semibold">$340.50</h3>
            </div>
          </BlurContainer>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            <BlurContainer>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">My Data Listings</h2>
                <Link to="/sell-data">
                  <Button size="sm" className="flex items-center">
                    <Plus className="h-4 w-4 mr-1" /> New Listing
                  </Button>
                </Link>
              </div>
              
              {myListings.length > 0 ? (
                <div className="space-y-3">
                  {myListings.map((listing) => (
                    <div key={listing.id} className="p-3 bg-muted rounded-lg flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{listing.name}</h3>
                        <p className="text-sm text-muted-foreground">{listing.price}</p>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          listing.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        } mr-3`}>
                          {listing.status}
                        </span>
                        <Button variant="ghost" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You don't have any active listings</p>
                  <Link to="/sell-data">
                    <Button className="mt-4">Create Your First Listing</Button>
                  </Link>
                </div>
              )}
            </BlurContainer>
            
            <BlurContainer>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center py-3 border-b last:border-b-0">
                  <div className={`p-2 rounded-lg mr-3 ${
                    transaction.type === "Purchase" ? "bg-blue-100" : "bg-green-100"
                  }`}>
                    {transaction.type === "Purchase" ? (
                      <Download className={`h-4 w-4 ${
                        transaction.type === "Purchase" ? "text-blue-600" : "text-green-600"
                      }`} />
                    ) : (
                      <Upload className={`h-4 w-4 ${
                        transaction.type === "Purchase" ? "text-blue-600" : "text-green-600"
                      }`} />
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {transaction.date}
                    </p>
                  </div>
                  <div className={`font-medium ${
                    transaction.type === "Sale" ? "text-green-600" : ""
                  }`}>
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </BlurContainer>
          </div>
          
          {/* Right column */}
          <div className="space-y-8">
            <BlurContainer>
              <h2 className="text-xl font-semibold mb-4">Marketplace</h2>
              
              <div className="space-y-3">
                <Link to="/browse-data" className="block w-full">
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" /> Browse Data
                  </Button>
                </Link>
                <Link to="/sell-data" className="block w-full">
                  <Button className="w-full justify-start" variant="outline">
                    <Upload className="h-4 w-4 mr-2" /> Sell Data
                  </Button>
                </Link>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="h-4 w-4 mr-2" /> API Settings
                </Button>
              </div>
            </BlurContainer>
            
            <BlurContainer>
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Storage Used</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">API Calls</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "28%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Bandwidth</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
              </div>
            </BlurContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
