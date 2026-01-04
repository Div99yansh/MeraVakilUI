import { ReactNode, MouseEventHandler } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  'aria-label'?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        (disabled || isLoading) && styles.disabled,
        className
      )}
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {isLoading && (
        <span className={styles.spinner}>
          <svg className={styles.spinnerSvg} viewBox="0 0 24 24">
            <circle
              className={styles.spinnerCircle}
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="3"
            />
          </svg>
        </span>
      )}

      {!isLoading && leftIcon && <span className={styles.icon}>{leftIcon}</span>}

      <span className={clsx(styles.content, isLoading && styles.contentHidden)}>{children}</span>

      {!isLoading && rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    </motion.button>
  );
}
