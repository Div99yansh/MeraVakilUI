import { AuthLayout } from '../../components/auth/AuthLayout';
import { RegisterForm } from '../../components/auth/RegisterForm';

export function RegisterPage() {
  return (
    <AuthLayout title="Create Account" subtitle="Get started with LegalDraft">
      <RegisterForm />
    </AuthLayout>
  );
}
