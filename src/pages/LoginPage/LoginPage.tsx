import { AuthLayout } from '../../components/auth/AuthLayout';
import { LoginForm } from '../../components/auth/LoginForm';

export function LoginPage() {
  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to continue to LegalDraft">
      <LoginForm />
    </AuthLayout>
  );
}
