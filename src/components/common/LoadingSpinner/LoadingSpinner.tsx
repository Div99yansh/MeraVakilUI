import clsx from 'clsx';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <div className={clsx(styles.spinner, styles[size], className)}>
      <svg className={styles.svg} viewBox="0 0 50 50">
        <circle
          className={styles.circle}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
}

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message = 'Loading...' }: LoadingOverlayProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.overlayContent}>
        <LoadingSpinner size="lg" />
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
}
