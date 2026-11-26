export interface SendEmailVerificationRequest {
  email: string;
}

export interface SendEmailVerificationResponse {
  message: string;
  code: string;
}

export interface ConfirmOtpRequest {
  email: string;
  code: string;
}

export interface ConfirmOtpResponse {
  message: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface RegisteredUser {
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

export interface RegisterResponse {
  user: RegisteredUser;
  token: string;
}

export interface ApiResponse {
  message: string;
}

export type AuthState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: SendEmailVerificationResponse }
  | { status: 'error'; message: string };

export type OtpState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: ConfirmOtpResponse }
  | { status: 'error'; message: string };
