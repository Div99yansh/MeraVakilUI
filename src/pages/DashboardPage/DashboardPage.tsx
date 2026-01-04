import { MainLayout } from '../../components/layout/MainLayout';
import { Sidebar } from '../../components/layout/Sidebar';
import { DocumentForm } from '../../components/document/DocumentForm';
import { DocumentOutput } from '../../components/document/DocumentOutput';
import { useDocument } from '../../context/DocumentContext';
import { useDocuments } from '../../hooks/useDocuments';
import styles from './DashboardPage.module.css';

export function DashboardPage() {
  const { generatedDocument, viewMode } = useDocument();
  const { documents, isLoadingHistory } = useDocuments();

  return (
    <MainLayout>
      <div className={styles.container}>
        <Sidebar documents={documents} isLoading={isLoadingHistory} />

        <main className={styles.mainContent}>
          {viewMode === 'create' && (
            <>
              <div className={styles.formSection}>
                <DocumentForm />
              </div>

              {generatedDocument && (
                <div className={styles.outputSection}>
                  <DocumentOutput content={generatedDocument} />
                </div>
              )}
            </>
          )}

          {viewMode === 'view' && generatedDocument && (
            <div className={styles.outputSection}>
              <DocumentOutput content={generatedDocument} />
            </div>
          )}
        </main>
      </div>
    </MainLayout>
  );
}
