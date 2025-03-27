
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { verifyEmail } from "@/utils/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const navigate = useNavigate();
  
  useEffect(() => {
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    
    if (!email || !token) {
      setVerificationStatus('failed');
      toast({
        title: "Verification Failed",
        description: "Invalid verification link. Please try registering again.",
        variant: "destructive",
      });
      return;
    }
    
    // Verify the email
    const isVerified = verifyEmail(email, token);
    
    if (isVerified) {
      setVerificationStatus('success');
      toast({
        title: "Email Verified!",
        description: "Your account is now active. You can now log in.",
      });
    } else {
      setVerificationStatus('failed');
      toast({
        title: "Verification Failed",
        description: "Invalid or expired verification link. Please try registering again.",
        variant: "destructive",
      });
    }
  }, [searchParams]);
  
  return (
    <div className="min-h-screen pt-32 pb-16 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-white to-secondary/30">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-6">Email Verification</h1>
        
        {verificationStatus === 'verifying' && (
          <div className="flex flex-col items-center">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>Verifying your email address...</p>
          </div>
        )}
        
        {verificationStatus === 'success' && (
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Verification Successful!</h2>
            <p className="text-gray-600 mb-6">Your email has been verified and your account is now active.</p>
            <Link to="/login">
              <Button>Proceed to Login</Button>
            </Link>
          </div>
        )}
        
        {verificationStatus === 'failed' && (
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-6">The verification link is invalid or has expired.</p>
            <Link to="/register">
              <Button>Try Registering Again</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
