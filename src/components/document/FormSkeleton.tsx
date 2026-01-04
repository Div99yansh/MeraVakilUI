import styles from './FormSkeleton.module.css';

export function FormSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.backButton} />
        <div className={styles.title} />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle} />
        <div className={styles.fields}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={styles.field}>
              <div className={styles.label} />
              <div className={styles.input} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle} />
        <div className={styles.fields}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={styles.field}>
              <div className={styles.label} />
              <div className={styles.input} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
