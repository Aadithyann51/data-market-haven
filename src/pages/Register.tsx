
import AuthForm from "@/components/auth/AuthForm";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen pt-32 pb-16 px-4 flex flex-col justify-center bg-gradient-to-b from-white to-secondary/30">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
        <p className="text-muted-foreground">
          Join our community of IoT data providers and consumers
        </p>
      </div>
      
      <AuthForm type="register" />
      
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
