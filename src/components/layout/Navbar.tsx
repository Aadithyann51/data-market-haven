
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/utils/supabaseClient";
import { signOutUser } from "@/utils/auth";
import { toast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setUserEmail(session?.user?.email || null);
    };
    
    checkAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setUserEmail(session?.user?.email || null);
    });
    
    // Handle scroll for navbar styling
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const result = await signOutUser();
    if (result.success) {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      navigate('/');
    } else {
      toast({
        title: "Error signing out",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-8",
        scrolled || location.pathname !== "/" 
          ? "py-3 bg-white/80 backdrop-blur-lg shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-bold tracking-tight text-primary hover:opacity-90 transition-opacity"
        >
          IoT Data Market NTTF
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link 
            to="/" 
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors",
              location.pathname === "/" 
                ? "text-primary" 
                : "text-foreground/80 hover:text-foreground hover:bg-muted"
            )}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors",
              location.pathname === "/about" 
                ? "text-primary" 
                : "text-foreground/80 hover:text-foreground hover:bg-muted"
            )}
          >
            About
          </Link>
          {isAuthenticated && (
            <>
              <Link 
                to="/dashboard" 
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === "/dashboard" 
                    ? "text-primary" 
                    : "text-foreground/80 hover:text-foreground hover:bg-muted"
                )}
              >
                Dashboard
              </Link>
              <Link 
                to="/transactions" 
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === "/transactions" 
                    ? "text-primary" 
                    : "text-foreground/80 hover:text-foreground hover:bg-muted"
                )}
              >
                Transactions
              </Link>
            </>
          )}
        </nav>
        
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground hidden md:inline-block">
                {userEmail}
              </span>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
