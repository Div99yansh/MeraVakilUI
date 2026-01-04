import { ReactNode, useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './ScrollArea.module.css';

interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
  maxHeight?: string | number;
  showScrollbar?: 'always' | 'hover' | 'never';
}

export function ScrollArea({
  children,
  className,
  maxHeight = '100%',
  showScrollbar = 'hover',
}: ScrollAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      if (scrollRef.current) {
        setIsScrollable(scrollRef.current.scrollHeight > scrollRef.current.clientHeight);
      }
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [children]);

  const showScroll =
    showScrollbar === 'always' ||
    (showScrollbar === 'hover' && isHovered && isScrollable);

  return (
    <div
      className={clsx(styles.wrapper, className)}
      style={{ maxHeight }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={scrollRef}
        className={clsx(styles.scrollArea, showScroll && styles.showScrollbar)}
      >
        {children}
      </div>
    </div>
  );
}
