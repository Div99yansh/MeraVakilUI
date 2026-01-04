import { ReactNode } from 'react';
import { Header } from './Header';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>{children}</div>
    </div>
  );
}
