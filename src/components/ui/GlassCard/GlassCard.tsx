import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import styles from './GlassCard.module.css';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  gradient?: boolean;
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function GlassCard({
  children,
  gradient = false,
  interactive = false,
  padding = 'md',
  className,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={interactive ? { y: -2 } : undefined}
      className={clsx(
        styles.glassCard,
        gradient && styles.gradient,
        interactive && styles.interactive,
        styles[`padding-${padding}`],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
