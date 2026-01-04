import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './GradientBorder.module.css';

interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  borderRadius?: string;
  gradient?: 'gold' | 'blue' | 'custom';
  customGradient?: string;
}

export function GradientBorder({
  children,
  className,
  borderWidth = 1,
  borderRadius = 'var(--radius-xl)',
  gradient = 'gold',
  customGradient,
}: GradientBorderProps) {
  const gradientMap = {
    gold: 'var(--gradient-gold)',
    blue: 'var(--gradient-blue)',
    custom: customGradient || 'var(--gradient-gold)',
  };

  return (
    <div
      className={clsx(styles.wrapper, className)}
      style={
        {
          '--border-width': `${borderWidth}px`,
          '--border-radius': borderRadius,
          '--gradient': gradientMap[gradient],
        } as React.CSSProperties
      }
    >
      <div className={styles.content}>{children}</div>
    </div>
  );
}
