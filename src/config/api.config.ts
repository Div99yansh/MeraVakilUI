export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  TIMEOUT: 30000,
  ENDPOINTS: {
    // Auth
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    HEALTH: '/health',

    // Documents
    GENERATE_PLAINT: '/generate/plaint',
    GENERATE_WRITTEN_STATEMENT: '/generate/written-statement',
    GENERATE_NOTICE: '/generate/notice',
    GENERATE_AFFIDAVIT: '/generate/affidavit',
    DOCUMENTS_HISTORY: '/documents/history',
    DOCUMENTS_SAVE: '/documents/save',
    DOCUMENTS_DELETE: (id: string) => `/documents/${id}`,
  },
};
