import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { authenticateUser, registerUser, simulateSendVerificationEmail } from "@/utils/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlurContainer from "../ui/BlurContainer";

interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm = ({ type }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate form
      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }
      
      if (type === "register") {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        
        // Register new user with Supabase
        const result = await registerUser(email, password);
        
        if (!result.success) {
          throw new Error("Email already registered or registration failed. Please try again.");
        }
        
        // In a real Supabase app, Supabase handles email verification
        // This is kept for demo purposes
        if (result.verificationToken) {
          simulateSendVerificationEmail(email, result.verificationToken);
        }
        
        // Registration successful
        toast({
          title: "Account created successfully!",
          description: "Please check your email for verification instructions.",
        });
        
      } else {
        // Login existing user with Supabase
        const authResult = await authenticateUser(email, password);
        
        if (!authResult.success) {
          throw new Error(authResult.message);
        }
        
        // Login successful
        toast({
          title: "Welcome back!",
          description: "You are now signed in.",
        });
        
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <BlurContainer className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {type === "login" ? "Sign In" : "Create an Account"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />
        </div>
        
        {type === "register" && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
        )}
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : type === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>
      
      {type === "register" && (
        <p className="mt-4 text-sm text-muted-foreground text-center">
          By registering, you'll receive a verification email with a link to activate your account.
        </p>
      )}
    </BlurContainer>
  );
};

export default AuthForm;
