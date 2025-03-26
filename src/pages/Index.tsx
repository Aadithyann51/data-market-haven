
import { Button } from "@/components/ui/button";
import BlurContainer from "@/components/ui/BlurContainer";
import { ArrowRight, BarChart3, Shield, Download, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight * 0.85) {
          element.classList.add('animate-visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to check for elements already in view
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-gray-50 z-0" />
        
        <div className="z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6 animate-fade-in">
            The Premier IoT Data Marketplace
          </span>
          
          <h1 className="heading-xl text-balance mb-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
            Exchange IoT Data<br className="hidden md:block" /> with Confidence
          </h1>
          
          <p className="max-w-2xl text-lg text-muted-foreground mb-10 text-balance animate-fade-in" style={{animationDelay: '0.3s'}}>
            Buy and sell IoT data in a secure, transparent marketplace. 
            Connect with data providers and consumers worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Link to="/register">
              <Button size="lg" className="rounded-full">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="rounded-full">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-pulse-slow">
          <ArrowRight className="h-6 w-6 rotate-90 text-primary/60" />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-secondary text-primary/80 px-4 py-1.5 rounded-full text-sm font-medium mb-4 inline-block animate-on-scroll">
              Why Choose DataMarket
            </span>
            <h2 className="heading-lg mb-4 animate-on-scroll">Revolutionizing IoT Data Exchange</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground animate-on-scroll">
              Our platform makes it simple to monetize your IoT data or find the exact data sets you need for your projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BlurContainer className="animate-on-scroll">
              <div className="p-2 bg-primary/10 inline-flex rounded-lg mb-4">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sell Your Data</h3>
              <p className="text-muted-foreground">
                Monetize IoT data from your devices and sensors. Set your own pricing and terms.
              </p>
            </BlurContainer>
            
            <BlurContainer className="animate-on-scroll" style={{transitionDelay: '0.1s'}}>
              <div className="p-2 bg-primary/10 inline-flex rounded-lg mb-4">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Access Quality Data</h3>
              <p className="text-muted-foreground">
                Find and purchase precisely the data you need from thousands of verified providers.
              </p>
            </BlurContainer>
            
            <BlurContainer className="animate-on-scroll" style={{transitionDelay: '0.2s'}}>
              <div className="p-2 bg-primary/10 inline-flex rounded-lg mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-muted-foreground">
                All transactions and data transfers are encrypted and secure. Your privacy is our priority.
              </p>
            </BlurContainer>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/5 to-primary/10 py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="heading-lg mb-6 animate-on-scroll">Ready to Get Started?</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-10 animate-on-scroll">
            Join thousands of businesses already buying and selling IoT data on our platform.
          </p>
          <Link to="/register" className="animate-on-scroll inline-block">
            <Button size="lg" className="rounded-full">
              Create Your Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
