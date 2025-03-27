import { supabase, UserCredentials, AuthResponse } from './supabaseClient';
import { toast } from '@/components/ui/use-toast';

// Register a new user
export const registerUser = async (email: string, password: string): Promise<{ success: boolean; verificationToken?: string }> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/verify-email`,
      },
    });

    if (error) {
      console.error('Error during registration:', error.message);
      return { success: false };
    }

    // Supabase handles email verification automatically
    return { 
      success: true,
      // In a real Supabase setup, we don't need to return a token as Supabase handles this
      verificationToken: 'supabase-handles-verification'
    };
  } catch (error) {
    console.error('Unexpected error during registration:', error);
    return { success: false };
  }
};

// Authenticate a user
export const authenticateUser = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        return { success: false, message: "Please verify your email before logging in." };
      }
      return { success: false, message: error.message };
    }

    return { success: true, message: "Login successful!", user: data.user };
  } catch (error) {
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
};

// Sign out the current user
export const signOutUser = async (): Promise<AuthResponse> => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return { success: false, message: error.message };
    }
    
    return { success: true, message: "Signed out successfully!" };
  } catch (error) {
    return { success: false, message: "An unexpected error occurred during sign out." };
  }
};

// Verify email function (for backward compatibility)
export const verifyEmail = async (email: string, token: string): Promise<boolean> => {
  // With Supabase, verification happens on their end
  // This function is kept for backward compatibility
  // In a real app using Supabase, we would verify by checking if the user's email is confirmed
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.email_confirmed_at != null;
  } catch (error) {
    console.error('Error checking email verification:', error);
    return false;
  }
};

// This is just for compatibility with the existing code
// In a real Supabase app, Supabase handles the email sending
export const simulateSendVerificationEmail = (email: string, token: string): void => {
  // We'll keep this for the demo, but in reality, Supabase handles this
  // Log a message to the console for demonstration purposes
  console.log("=== SIMULATED EMAIL (Handled by Supabase) ===");
  console.log(`To: ${email}`);
  console.log(`Subject: Verify your account for IoT Data Market NTTF`);
  console.log(`Body: In a real Supabase implementation, Supabase would send this email automatically.`);
  console.log(`Verification will happen through Supabase's built-in confirmation flow.`);
  console.log("=====================");
  
  toast({
    title: "Verification Email Sent",
    description: "Please check your email to verify your account. (In a real app, Supabase would handle this.)",
  });
};

// No longer needed as Supabase manages users
export const loadRegisteredUsers = (): void => {
  // This function is kept empty for backward compatibility
  // Supabase handles this automatically
};
