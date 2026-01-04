import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../common/Input/Input';
import { Button } from '../common/Button/Button';
import { forgotPasswordSchema, ForgotPasswordFormData } from '../../utils/validation';
import { ROUTES } from '../../config/constants';
import styles from './AuthForms.module.css';

export function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);
      await forgotPassword(data.user_email_id);
      setIsSubmitted(true);
    } catch {
      // Error is handled in context
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.successMessage}>
        <div className={styles.successIcon}>
          <CheckCircle size={48} />
        </div>
        <h3>Check your email</h3>
        <p>We've sent a password reset link to your email address.</p>
        <Link to={ROUTES.LOGIN} className={styles.backLink}>
          <ArrowLeft size={16} />
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <p className={styles.description}>
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        leftIcon={<Mail size={18} />}
        error={errors.user_email_id?.message}
        fullWidth
        {...register('user_email_id')}
      />

      <Button type="submit" isLoading={isLoading} fullWidth>
        Send Reset Link
      </Button>

      <Link to={ROUTES.LOGIN} className={styles.backLink}>
        <ArrowLeft size={16} />
        Back to login
      </Link>
    </form>
  );
}
