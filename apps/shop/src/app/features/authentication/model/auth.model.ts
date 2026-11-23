// Start Login
export interface Login {
  username: string;
  password: string;
}
export interface authResponse {
  user: User;
  token: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}
// End Login

// Start Register

export interface Register {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
}

// End Register
