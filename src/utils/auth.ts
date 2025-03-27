
// Simple in-memory storage for registered users
// In a real application, this would be a database
const registeredUsers: Record<string, { email: string; password: string }> = {};

export const registerUser = (email: string, password: string): boolean => {
  // Check if user already exists
  if (registeredUsers[email]) {
    return false;
  }
  
  // Register the user
  registeredUsers[email] = { email, password };
  
  // Store in localStorage for persistence across page refreshes
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
  users[email] = { email, password };
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  
  return true;
};

export const authenticateUser = (email: string, password: string): boolean => {
  // Load users from localStorage
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
  
  // Check if user exists and password matches
  return users[email] && users[email].password === password;
};

export const loadRegisteredUsers = (): void => {
  // Load registered users from localStorage on app initialization
  const users = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
  Object.keys(users).forEach(email => {
    registeredUsers[email] = users[email];
  });
};
