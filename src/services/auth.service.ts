import { apiClient } from './api';
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  RegisterResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
} from '../types/auth.types';

export const authService = {
  login: (credentials: LoginCredentials) => {
    return apiClient.post<AuthResponse>('/login', credentials);
  },

  register: (data: RegisterData) => {
    return apiClient.post<RegisterResponse>('/register', data);
  },

  forgotPassword: (email: string) => {
    return apiClient.post<ForgotPasswordResponse>('/forgot-password', {
      user_email_id: email,
    });
  },

  resetPassword: (token: string, newPassword: string) => {
    return apiClient.post<ResetPasswordResponse>('/reset-password', {
      token,
      new_password: newPassword,
    });
  },

  healthCheck: () => {
    return apiClient.get('/health');
  },
};
