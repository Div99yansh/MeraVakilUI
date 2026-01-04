import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Check } from 'lucide-react';
import { useDocument } from '../../context/DocumentContext';
import { useDocuments } from '../../hooks/useDocuments';
import { Button } from '../common/Button/Button';
import { GlassCard } from '../ui/GlassCard/GlassCard';
import { Modal, ModalFooter } from '../common/Modal/Modal';
import { Input } from '../common/Input/Input';
import { downloadAsDocx, copyToClipboard } from '../../utils/downloadDocument';
import { DOCUMENT_TYPE_LABELS } from '../../config/constants';
import { normalizeDocType } from '../../config/documentFields.config';
import toast from 'react-hot-toast';
import styles from './DocumentOutput.module.css';

interface DocumentOutputProps {
  content: string;
}

export function DocumentOutput({ content }: DocumentOutputProps) {
  const [copied, setCopied] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [localDocumentTitle, setLocalDocumentTitle] = useState('');
  const { queryId, currentDocumentType } = useDocument();
  const { saveDocument } = useDocuments();

  const handleCopy = async () => {
    try {
      await copyToClipboard(content);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleDownload = () => {
    const filename = `${currentDocumentType || 'document'}_${new Date().toISOString().split('T')[0]}`;
    downloadAsDocx(content, filename);
    toast.success('Download started!');
  };

  const handleSave = async () => {
    if (!queryId || !currentDocumentType || !localDocumentTitle.trim()) return;

    try {
      await saveDocument.mutateAsync({
        query_id: queryId,
        document_type: currentDocumentType,
        title: localDocumentTitle.trim(),
        content,
      });
      setShowSaveModal(false);
      setLocalDocumentTitle('');
    } catch {
      // Error handled in hook
    }
  };

  return (
    <>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <GlassCard padding="none" className={styles.card}>
          <div className={styles.header}>
            <h3 className={styles.title}>
              Generated {currentDocumentType ? DOCUMENT_TYPE_LABELS[normalizeDocType(currentDocumentType)] : 'Document'}
            </h3>
            <div className={styles.actions}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                leftIcon={<Download size={16} />}
              >
                Download
              </Button>
            </div>
          </div>

          <div className={styles.content}>
            <pre className={styles.document}>{content}</pre>
          </div>
        </GlassCard>
      </motion.div>

      <Modal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="Save Document"
        size="sm"
      >
        <Input
          label="Document Title"
          placeholder="Enter a title for this document"
          value={localDocumentTitle}
          onChange={(e) => setLocalDocumentTitle(e.target.value)}
          fullWidth
        />
        <ModalFooter>
          <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            isLoading={saveDocument.isPending}
            disabled={!localDocumentTitle.trim()}
          >
            Save Document
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
