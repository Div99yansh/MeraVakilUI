import { FileText } from 'lucide-react';
import styles from './EmptyHistoryState.module.css';

export function EmptyHistoryState() {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <FileText size={32} />
      </div>
      <h3 className={styles.title}>No documents yet</h3>
      <p className={styles.description}>
        Start generating legal documents and they'll appear here.
      </p>
    </div>
  );
}
