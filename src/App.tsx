import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BrowseData from "./pages/BrowseData";
import SellData from "./pages/SellData";
import DataDetails from "./pages/DataDetails";
import Transactions from "./pages/Transactions";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import VerifyEmail from "./pages/VerifyEmail";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { supabase } from "./utils/supabaseClient";

// Create a client
const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setAuthenticated(!!session);
      setLoading(false);
    };
    
    checkAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
      setLoading(false);
    });
    
    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }
  
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Check if we're in a GitHub Pages environment
// This helps determine which router to use
const isGitHubPages = window.location.hostname.includes('github.io');

const App = () => {
  // Use environment variables if available, otherwise default to false
  const useHashRouter = isGitHubPages || import.meta.env.VITE_USE_HASH_ROUTER === 'true';
  
  const Router = useHashRouter ? HashRouter : BrowserRouter;
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Navbar />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/about" element={<About />} />
              <Route path="/browse-data" element={<BrowseData />} />
              <Route path="/data/:id" element={<DataDetails />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/transactions" element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              } />
              <Route path="/sell-data" element={
                <ProtectedRoute>
                  <SellData />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
