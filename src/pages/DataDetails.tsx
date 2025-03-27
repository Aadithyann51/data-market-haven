
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Star } from "lucide-react";
import TransactionDialog from "@/components/transaction/TransactionDialog";
import { useToast } from "@/hooks/use-toast";

const DataDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);

  useEffect(() => {
    // Sample data (would be fetched from an API in a real application)
    const dataListings = [
      {
        id: 1,
        title: "City Temperature Sensors",
        description: "Real-time temperature data from 50 sensors across the city center.",
        fullDescription: "This comprehensive dataset includes hourly temperature readings from 50 sensors strategically placed across the city center. The data is updated in real-time and includes historical data for the past 12 months. Each reading includes precise GPS coordinates, timestamp, temperature in Celsius and Fahrenheit, and sensor health status.",
        category: "Environmental",
        price: "$24.99",
        provider: "City IoT Initiative",
        rating: 4.5,
        updatedAt: "2 days ago",
        dataPoints: "1.2 million",
        frequency: "Hourly",
        format: "CSV, JSON"
      },
      {
        id: 2,
        title: "Industrial Machine Status",
        description: "Performance and status data from manufacturing equipment.",
        fullDescription: "Detailed operational data from industrial manufacturing equipment, including performance metrics, maintenance flags, and operational status. This dataset is invaluable for predictive maintenance, efficiency optimization, and fault detection in industrial settings.",
        category: "Industrial",
        price: "$49.99/month",
        provider: "Factory Solutions Inc.",
        rating: 4.2,
        updatedAt: "1 week ago",
        dataPoints: "500,000",
        frequency: "Real-time",
        format: "JSON, XML"
      },
      {
        id: 3,
        title: "Smart Home Energy Consumption",
        description: "Anonymized energy usage patterns from 1000+ households.",
        fullDescription: "Anonymized energy consumption data from over 1,000 smart homes, showing usage patterns by time of day, appliance type, and seasonal variations. Perfect for energy efficiency research, consumption pattern analysis, and smart grid planning.",
        category: "Energy",
        price: "$19.99",
        provider: "GreenGrid Analytics",
        rating: 4.8,
        updatedAt: "3 days ago",
        dataPoints: "2.5 million",
        frequency: "Daily",
        format: "CSV, JSON"
      },
      {
        id: 4,
        title: "Agricultural Soil Sensors",
        description: "Soil moisture, pH, and nutrient data from farming regions.",
        fullDescription: "Comprehensive soil analysis data from multiple agricultural regions, including moisture levels, pH readings, and detailed nutrient profiles. This dataset is crucial for precision agriculture, crop yield optimization, and environmental monitoring.",
        category: "Agricultural",
        price: "$34.99/month",
        provider: "FarmTech Solutions",
        rating: 4.1,
        updatedAt: "5 days ago",
        dataPoints: "800,000",
        frequency: "Daily",
        format: "CSV, JSON, GEOJSON"
      },
      {
        id: 5,
        title: "Urban Traffic Patterns",
        description: "Traffic flow data from city intersections and highways.",
        fullDescription: "Detailed traffic flow information from major city intersections and highways, including vehicle counts, speed measurements, and congestion levels. Ideal for urban planning, transportation optimization, and traffic management systems.",
        category: "Transportation",
        price: "$29.99",
        provider: "SmartCity Transit",
        rating: 4.3,
        updatedAt: "1 day ago",
        dataPoints: "3.1 million",
        frequency: "Hourly",
        format: "CSV, JSON, GEOJSON"
      },
      {
        id: 6,
        title: "Air Quality Index",
        description: "Detailed air quality measurements from monitoring stations.",
        fullDescription: "Comprehensive air quality data from monitoring stations, including measurements of particulate matter (PM2.5 and PM10), ozone, nitrogen dioxide, sulfur dioxide, and carbon monoxide. Essential for environmental research, public health studies, and urban planning initiatives.",
        category: "Environmental",
        price: "$15.99",
        provider: "CleanAir Monitoring",
        rating: 4.7,
        updatedAt: "4 days ago",
        dataPoints: "1.8 million",
        frequency: "Hourly",
        format: "CSV, JSON"
      }
    ];

    setTimeout(() => {
      const foundData = dataListings.find(item => item.id === parseInt(id || "0"));
      setData(foundData);
      setLoading(false);

      // Check if this data has already been purchased
      const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
      const isPurchased = transactions.some((t: any) => t.dataId === foundData?.id);
      setAlreadyPurchased(isPurchased);
    }, 500);
  }, [id]);

  const handlePurchase = () => {
    setIsDialogOpen(true);
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: `${data.title} is being downloaded`,
    });
    
    // Simulate download completion
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${data.title} has been successfully downloaded`,
      });
    }, 3000);
  };

  const handleTransactionComplete = () => {
    setAlreadyPurchased(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Data Not Found</h1>
          <p className="mb-6">The data you are looking for does not exist or has been removed.</p>
          <Button onClick={() => navigate("/browse-data")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Browse
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate("/browse-data")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Browse
        </Button>
        
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <CardTitle className="text-3xl">{data.title}</CardTitle>
                <CardDescription className="mt-2 text-lg">{data.description}</CardDescription>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full text-primary">
                <Star className="fill-primary text-primary h-4 w-4" /> 
                <span className="font-medium">{data.rating}/5.0</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{data.fullDescription}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Dataset Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{data.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Provider:</span>
                    <span className="font-medium">{data.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span>{data.updatedAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-bold">{data.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Technical Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data Points:</span>
                    <span>{data.dataPoints}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Update Frequency:</span>
                    <span>{data.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available Formats:</span>
                    <span>{data.format}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-4 border-t pt-6">
            {alreadyPurchased ? (
              <>
                <div className="flex-grow text-green-600 font-medium">
                  ✓ Purchased
                </div>
                <Button onClick={handleDownload} className="w-full sm:w-auto gap-1">
                  <Download className="h-4 w-4" /> Download Data
                </Button>
              </>
            ) : (
              <>
                <div className="flex-grow">
                  <span className="font-bold text-xl">{data.price}</span>
                  {data.price.includes('/month') && 
                    <span className="ml-2 text-sm text-muted-foreground">(subscription)</span>
                  }
                </div>
                <Button onClick={handlePurchase} className="w-full sm:w-auto">
                  Purchase Data
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
      
      <TransactionDialog 
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        dataItem={data}
        onTransactionComplete={handleTransactionComplete}
      />
    </div>
  );
};

export default DataDetails;
