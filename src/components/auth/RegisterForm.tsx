import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../common/Input/Input';
import { Button } from '../common/Button/Button';
import { registerSchema, RegisterFormData } from '../../utils/validation';
import { ROUTES } from '../../config/constants';
import styles from './AuthForms.module.css';

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        user_email_id: data.user_email_id,
        password: data.password,
      });
      navigate(ROUTES.LOGIN);
    } catch {
      // Error is handled in context
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        leftIcon={<Mail size={18} />}
        error={errors.user_email_id?.message}
        fullWidth
        {...register('user_email_id')}
      />

      <Input
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Create a password"
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
        label="Confirm Password"
        type={showConfirmPassword ? 'text' : 'password'}
        placeholder="Confirm your password"
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
        Create Account
      </Button>

      <p className={styles.switchAuth}>
        Already have an account? <Link to={ROUTES.LOGIN}>Sign in</Link>
      </p>
    </form>
  );
}
