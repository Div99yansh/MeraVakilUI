import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import styles from './Tooltip.module.css';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 300,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    const id = setTimeout(() => setIsVisible(true), delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  const positionVariants = {
    top: { initial: { y: 5, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    bottom: { initial: { y: -5, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    left: { initial: { x: 5, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: -5, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={clsx(styles.tooltip, styles[position], className)}
            initial={positionVariants[position].initial}
            animate={positionVariants[position].animate}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {content}
            <div className={clsx(styles.arrow, styles[`arrow-${position}`])} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
