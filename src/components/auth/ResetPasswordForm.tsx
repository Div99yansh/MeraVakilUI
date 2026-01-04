import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../common/Input/Input';
import { Button } from '../common/Button/Button';
import { resetPasswordSchema, ResetPasswordFormData } from '../../utils/validation';
import { ROUTES } from '../../config/constants';
import styles from './AuthForms.module.css';

export function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return;

    try {
      setIsLoading(true);
      await resetPassword(token, data.password);
      setIsSubmitted(true);
      setTimeout(() => navigate(ROUTES.LOGIN), 3000);
    } catch {
      // Error is handled in context
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className={styles.errorState}>
        <h3>Invalid Reset Link</h3>
        <p>This password reset link is invalid or has expired.</p>
        <Link to={ROUTES.FORGOT_PASSWORD}>
          <Button variant="outline">Request New Link</Button>
        </Link>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className={styles.successMessage}>
        <div className={styles.successIcon}>
          <CheckCircle size={48} />
        </div>
        <h3>Password Reset Successful</h3>
        <p>Your password has been reset. Redirecting to login...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        label="New Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter new password"
        leftIcon={<Lock size={18} />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.passwordToggle}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
        error={errors.password?.message}
        helperText="At least 8 characters with uppercase, lowercase, and number"
        fullWidth
        {...register('password')}
      />

      <Input
        label="Confirm New Password"
        type={showConfirmPassword ? 'text' : 'password'}
        placeholder="Confirm new password"
        leftIcon={<Lock size={18} />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={styles.passwordToggle}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
        error={errors.confirmPassword?.message}
        fullWidth
        {...register('confirmPassword')}
      />

      <Button type="submit" isLoading={isLoading} fullWidth>
        Reset Password
      </Button>

      <Link to={ROUTES.LOGIN} className={styles.backLink}>
        <ArrowLeft size={16} />
        Back to login
      </Link>
    </form>
  );
}
