export const ERROR_MESSAGES = {
  // Auth errors
  INVALID_CREDENTIALS: 'Invalid email or password. Please try again.',
  EMAIL_ALREADY_EXISTS: 'An account with this email already exists.',
  INVALID_TOKEN: 'Invalid or expired token. Please request a new one.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',

  // Network errors
  NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
  TIMEOUT_ERROR: 'The request timed out. Please try again.',
  SERVER_ERROR: 'An unexpected server error occurred. Please try again later.',

  // Document errors
  DOCUMENT_GENERATION_FAILED: 'Failed to generate document. Please try again.',
  DOCUMENT_SAVE_FAILED: 'Failed to save document. Please try again.',
  DOCUMENT_DELETE_FAILED: 'Failed to delete document. Please try again.',
  DOCUMENT_NOT_FOUND: 'Document not found.',

  // Form errors
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters.',
  PASSWORDS_DONT_MATCH: "Passwords don't match.",

  // Generic errors
  SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'You do not have permission to access this resource.',
};

export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  const err = error as { response?: { data?: { detail?: string }; status?: number }; message?: string };

  if (err?.response?.data?.detail) {
    return err.response.data.detail;
  }

  if (err?.response?.status === 401) {
    return ERROR_MESSAGES.UNAUTHORIZED;
  }

  if (err?.response?.status === 403) {
    return ERROR_MESSAGES.FORBIDDEN;
  }

  if (err?.response?.status === 500) {
    return ERROR_MESSAGES.SERVER_ERROR;
  }

  if (err?.message === 'Network Error') {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  return ERROR_MESSAGES.SOMETHING_WENT_WRONG;
}
