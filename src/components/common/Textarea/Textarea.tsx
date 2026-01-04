import { TextareaHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Textarea.module.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      className,
      disabled,
      required,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={clsx(styles.wrapper, fullWidth && styles.fullWidth)}>
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={clsx(styles.textareaWrapper, error && styles.hasError, disabled && styles.isDisabled)}>
          <textarea
            ref={ref}
            id={textareaId}
            className={clsx(styles.textarea, className)}
            disabled={disabled}
            rows={rows}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
            }
            {...props}
          />
        </div>

        {error && (
          <span id={`${textareaId}-error`} className={styles.errorText} role="alert">
            {error}
          </span>
        )}

        {helperText && !error && (
          <span id={`${textareaId}-helper`} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
