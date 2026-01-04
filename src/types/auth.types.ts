export interface User {
  user_email_id: string;
  created_at: string;
}

export interface LoginCredentials {
  user_email_id: string;
  password: string;
}

export interface RegisterData {
  user_email_id: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_email_id: string;
}

export interface RegisterResponse {
  user_email_id: string;
  created_at: string;
}

export interface ForgotPasswordResponse {
  message: string;
  user_email_id: string;
}

export interface ResetPasswordResponse {
  message: string;
  user_email_id: string;
}
