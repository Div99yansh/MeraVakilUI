import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { DocumentProvider } from './context/DocumentContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { LoadingOverlay } from './components/common/LoadingSpinner/LoadingSpinner';
import { ROUTES } from './config/constants';

// Lazy load pages for code splitting
const LandingPage = lazy(() =>
  import('./pages/LandingPage/LandingPage').then((m) => ({ default: m.LandingPage }))
);
const LoginPage = lazy(() =>
  import('./pages/LoginPage/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const RegisterPage = lazy(() =>
  import('./pages/RegisterPage/RegisterPage').then((m) => ({ default: m.RegisterPage }))
);
const ForgotPasswordPage = lazy(() =>
  import('./pages/ForgotPasswordPage/ForgotPasswordPage').then((m) => ({
    default: m.ForgotPasswordPage,
  }))
);
const ResetPasswordPage = lazy(() =>
  import('./pages/ResetPasswordPage/ResetPasswordPage').then((m) => ({
    default: m.ResetPasswordPage,
  }))
);
const DashboardPage = lazy(() =>
  import('./pages/DashboardPage/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DocumentProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingOverlay />}>
              <Routes>
                {/* Public routes */}
                <Route path={ROUTES.HOME} element={<LandingPage />} />
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
                <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />

                {/* Protected routes */}
                <Route
                  path={ROUTES.DASHBOARD}
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />

                {/* Catch all - redirect to home */}
                <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>

          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1a1a1a',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '12px 16px',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </DocumentProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
