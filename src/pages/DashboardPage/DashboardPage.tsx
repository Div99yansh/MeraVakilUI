import { useEffect } from 'react';
import clsx from 'clsx';
import { MainLayout } from '../../components/layout/MainLayout';
import { Sidebar } from '../../components/layout/Sidebar';
import { DocumentForm } from '../../components/document/DocumentForm';
import { DocumentOutput } from '../../components/document/DocumentOutput';
import { DocumentChat } from '../../components/chat/DocumentChat';
import { useDocument } from '../../context/DocumentContext';
import { useDocuments } from '../../hooks/useDocuments';
import styles from './DashboardPage.module.css';

const MOBILE_BREAKPOINT = 1200;

export function DashboardPage() {
  const {
    generatedDocument,
    viewMode,
    documentId,
    currentDocumentType,
    documentTitle,
    setGeneratedDocument,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
  } = useDocument();
  const { documents, isLoadingHistory } = useDocuments();

  // Auto-collapse sidebar on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < MOBILE_BREAKPOINT) {
        setIsSidebarCollapsed(true);
      }
    };

    // Check on mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsSidebarCollapsed]);

  const showChatPanel = !!generatedDocument;

  const handleDocumentUpdate = (newContent: string) => {
    setGeneratedDocument(newContent);
  };

  const handleBackdropClick = () => {
    if (window.innerWidth < MOBILE_BREAKPOINT && !isSidebarCollapsed) {
      setIsSidebarCollapsed(true);
    }
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <Sidebar
          documents={documents}
          isLoading={isLoadingHistory}
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Backdrop overlay for mobile when sidebar is open */}
        {!isSidebarCollapsed && (
          <div
            className={styles.sidebarBackdrop}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        )}

        <main className={clsx(styles.mainContent, showChatPanel && styles.withChat)}>
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

        {showChatPanel && (
          <div className={styles.chatPanel}>
            <DocumentChat
              documentId={documentId}
              documentContent={generatedDocument}
              documentType={currentDocumentType}
              documentTitle={documentTitle}
              onDocumentUpdate={handleDocumentUpdate}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
