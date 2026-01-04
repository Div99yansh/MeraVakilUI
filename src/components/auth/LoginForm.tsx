import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../common/Input/Input';
import { Button } from '../common/Button/Button';
import { loginSchema, LoginFormData } from '../../utils/validation';
import { ROUTES } from '../../config/constants';
import styles from './AuthForms.module.css';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate(ROUTES.DASHBOARD);
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
        placeholder="Enter your password"
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
        fullWidth
        {...register('password')}
      />

      <div className={styles.forgotPassword}>
        <Link to={ROUTES.FORGOT_PASSWORD}>Forgot password?</Link>
      </div>

      <Button type="submit" isLoading={isLoading} fullWidth>
        Sign In
      </Button>

      <p className={styles.switchAuth}>
        Don't have an account? <Link to={ROUTES.REGISTER}>Sign up</Link>
      </p>
    </form>
  );
}
