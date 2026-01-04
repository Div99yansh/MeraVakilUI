import { AuthLayout } from '../../components/auth/AuthLayout';
import { ForgotPasswordForm } from '../../components/auth/ForgotPasswordForm';

export function ForgotPasswordPage() {
  return (
    <AuthLayout title="Forgot Password" subtitle="We'll help you reset it">
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
