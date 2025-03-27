
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">IoT Data Market NTTF</h3>
            <p className="text-muted-foreground text-sm">
              The premier marketplace for IoT data exchange. Connect, buy, and sell data securely.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/browse-data" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  Browse Data
                </Link>
              </li>
              <li>
                <Link to="/sell-data" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  Sell Data
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} IoT Data Market NTTF. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
