import { Plus } from 'lucide-react';
import { SavedDocument } from '../../types/document.types';
import { Button } from '../common/Button/Button';
import { ScrollArea } from '../ui/ScrollArea/ScrollArea';
import { ChatHistory } from '../chat/ChatHistory';
import { useDocument } from '../../context/DocumentContext';
import styles from './Sidebar.module.css';

interface SidebarProps {
  documents: SavedDocument[];
  isLoading: boolean;
}

export function Sidebar({ documents, isLoading }: SidebarProps) {
  const { setCurrentDocumentType, setGeneratedDocument, setQueryId } = useDocument();

  const handleNewDocument = () => {
    setCurrentDocumentType(null);
    setGeneratedDocument(null);
    setQueryId(null);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <Button
          variant="primary"
          size="sm"
          fullWidth
          leftIcon={<Plus size={18} />}
          onClick={handleNewDocument}
        >
          New Document
        </Button>
      </div>

      <div className={styles.content}>
        <ScrollArea maxHeight="calc(100vh - var(--header-height) - 100px)">
          <ChatHistory documents={documents} isLoading={isLoading} />
        </ScrollArea>
      </div>
    </aside>
  );
}
