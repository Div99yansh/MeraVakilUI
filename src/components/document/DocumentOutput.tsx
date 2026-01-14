import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Check, Save, Edit2, Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
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
  const [editableContent, setEditableContent] = useState(content);
  const [isEditMode, setIsEditMode] = useState(false);
  const { queryId, currentDocumentType, documentId, documentTitle, setGeneratedDocument } = useDocument();
  const { saveDocument, updateDocument } = useDocuments();

  // Sync editableContent with incoming content prop
  useEffect(() => {
    setEditableContent(content);
  }, [content]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard(editableContent);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleDownload = () => {
    const filename = `${currentDocumentType || 'document'}_${new Date().toISOString().split('T')[0]}`;
    downloadAsDocx(editableContent, filename);
    toast.success('Download started!');
  };

  const handleUpdateDocument = async () => {
    if (!documentId || !currentDocumentType || !documentTitle) {
      toast.error('Cannot save: document information missing');
      return;
    }

    try {
      const response = await updateDocument.mutateAsync({
        document_id: documentId,
        title: documentTitle,
        content: editableContent,
        document_type: currentDocumentType,
      });
      // Update the context with the new content from the response
      setGeneratedDocument(response.data.document.content);
    } catch {
      // Error handled in hook
    }
  };

  const handleSave = async () => {
    if (!queryId || !currentDocumentType || !localDocumentTitle.trim()) return;

    try {
      await saveDocument.mutateAsync({
        query_id: queryId,
        document_type: currentDocumentType,
        title: localDocumentTitle.trim(),
        content: editableContent,
      });
      setShowSaveModal(false);
      setLocalDocumentTitle('');
    } catch {
      // Error handled in hook
    }
  };

  const hasChanges = editableContent !== content;

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
                onClick={toggleEditMode}
                leftIcon={isEditMode ? <Eye size={16} /> : <Edit2 size={16} />}
              >
                {isEditMode ? 'View' : 'Edit'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                leftIcon={copied ? <Check size={16} /> : <Copy size={16} />}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              {documentId && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleUpdateDocument}
                  leftIcon={<Save size={16} />}
                  isLoading={updateDocument.isPending}
                  disabled={!hasChanges}
                >
                  Save
                </Button>
              )}
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
            {isEditMode ? (
              <textarea
                className={styles.document}
                value={editableContent}
                onChange={(e) => setEditableContent(e.target.value)}
              />
            ) : (
              <div className={styles.markdownContent}>
                <ReactMarkdown>{editableContent}</ReactMarkdown>
              </div>
            )}
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
