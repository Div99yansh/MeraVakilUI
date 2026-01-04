import styles from './ChatHistorySkeleton.module.css';

export function ChatHistorySkeleton() {
  return (
    <div className={styles.container}>
      {[...Array(5)].map((_, i) => (
        <div key={i} className={styles.item}>
          <div className={styles.icon} />
          <div className={styles.content}>
            <div className={styles.title} />
            <div className={styles.meta} />
          </div>
        </div>
      ))}
    </div>
  );
}
