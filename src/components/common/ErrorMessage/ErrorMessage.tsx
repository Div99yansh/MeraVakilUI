import { AlertCircle, XCircle, RefreshCw } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '../Button/Button';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  title?: string;
  message: string;
  variant?: 'inline' | 'block';
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({
  title = 'Error',
  message,
  variant = 'inline',
  onRetry,
  className,
}: ErrorMessageProps) {
  if (variant === 'inline') {
    return (
      <div className={clsx(styles.inline, className)}>
        <AlertCircle size={16} />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <div className={clsx(styles.block, className)}>
      <div className={styles.iconWrapper}>
        <XCircle size={48} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} leftIcon={<RefreshCw size={16} />}>
          Try Again
        </Button>
      )}
    </div>
  );
}

interface ErrorBoundaryFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorBoundaryFallback({ error, resetErrorBoundary }: ErrorBoundaryFallbackProps) {
  return (
    <div className={styles.boundaryFallback}>
      <ErrorMessage
        title="Something went wrong"
        message={error.message || 'An unexpected error occurred'}
        variant="block"
        onRetry={resetErrorBoundary}
      />
    </div>
  );
}
