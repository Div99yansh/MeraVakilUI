import { motion } from 'framer-motion';
import { Plus, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { SavedDocument } from '../../types/document.types';
import { Button } from '../common/Button/Button';
import { ScrollArea } from '../ui/ScrollArea/ScrollArea';
import { ChatHistory } from '../chat/ChatHistory';
import { useDocument } from '../../context/DocumentContext';
import styles from './Sidebar.module.css';
import clsx from 'clsx';

interface SidebarProps {
  documents: SavedDocument[];
  isLoading: boolean;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ documents, isLoading, isCollapsed = false, onToggle }: SidebarProps) {
  const { resetToCreate } = useDocument();

  const handleNewDocument = () => {
    resetToCreate();
  };

  return (
    <motion.aside
      className={clsx(styles.sidebar, isCollapsed && styles.collapsed)}
      animate={{ width: isCollapsed ? 0 : 320 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {onToggle && (
        <button
          className={clsx(styles.toggleButton, isCollapsed && styles.toggleCollapsed)}
          onClick={onToggle}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      )}

      <div className={styles.sidebarContent}>
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
          <ScrollArea className={styles.scrollWrapper} maxHeight="100%" showScrollbar="always">
            <ChatHistory documents={documents} isLoading={isLoading} />
          </ScrollArea>
        </div>
      </div>
    </motion.aside>
  );
}
