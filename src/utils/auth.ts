
// Simple in-memory storage for registered users
// In a real application, this would be a database
const registeredUsers: Record<string, { email: string; password: string; verified: boolean; verificationToken: string }> = {};

export const registerUser = (email: string, password: string): { success: boolean; verificationToken?: string } => {
  // Check if user already exists
  if (registeredUsers[email]) {
    return { success: false };
  }
  
  // Generate a verification token (in a real app, this would be a secure random token)
  const verificationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  // Register the user (not verified yet)
  registeredUsers[email] = { email, password, verified: false, verificationToken };
  
  // Store in localStorage for persistence across page refreshes
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
  users[email] = { email, password, verified: false, verificationToken };
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  
  return { success: true, verificationToken };
};

export const authenticateUser = (email: string, password: string): { success: boolean; message: string } => {
  // Load users from localStorage
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
  
  // Check if user exists
  if (!users[email]) {
    return { success: false, message: "User not found. Please register first." };
  }
  
  // Check if user is verified
  if (!users[email].verified) {
    return { success: false, message: "Please verify your email before logging in." };
  }
  
  // Check if password matches
  if (users[email].password !== password) {
    return { success: false, message: "Invalid password. Please try again." };
  }
  
  return { success: true, message: "Login successful!" };
};

export const verifyEmail = (email: string, token: string): boolean => {
  // Load users from localStorage
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
  
  // Check if user exists and token matches
  if (users[email] && users[email].verificationToken === token) {
    // Update verification status
    users[email].verified = true;
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    // Update in-memory storage as well
    if (registeredUsers[email]) {
      registeredUsers[email].verified = true;
    }
    
    return true;
  }
  
  return false;
};

export const loadRegisteredUsers = (): void => {
  // Load registered users from localStorage on app initialization
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
  Object.keys(users).forEach(email => {
    registeredUsers[email] = users[email];
  });
};

export const simulateSendVerificationEmail = (email: string, token: string): void => {
  // In a real application, this would send an actual email
  // For demo purposes, we'll just log the verification link to the console
  const verificationLink = `${window.location.origin}/verify-email?email=${encodeURIComponent(email)}&token=${token}`;
  
  console.log("=== SIMULATED EMAIL ===");
  console.log(`To: ${email}`);
  console.log(`Subject: Verify your account for IoT Data Market NTTF`);
  console.log(`Body:`);
  console.log(`Hello,`);
  console.log(`Please verify your account by clicking the link below:`);
  console.log(verificationLink);
  console.log(`This link will expire in 24 hours.`);
  console.log(`Thank you,`);
  console.log(`IoT Data Market NTTF Team`);
  console.log("=====================");
  
  // Display a toast notification with instructions to check console
  import("@/components/ui/use-toast").then(({ toast }) => {
    toast({
      title: "Verification Email Sent (Simulated)",
      description: "Since this is a demo, please check the console (F12) to see the verification link.",
    });
  });
};
