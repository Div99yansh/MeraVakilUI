import { useState } from "react";
import { FileText, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { SavedDocument } from "../../types/document.types";
import { useDocument } from "../../context/DocumentContext";
import { useDocuments } from "../../hooks/useDocuments";
import { DOCUMENT_TYPE_LABELS } from "../../config/constants";
import { normalizeDocType } from "../../config/documentFields.config";
import { truncateText, formatRelativeTime } from "../../utils/formatting";
import { Modal, ModalFooter } from "../common/Modal/Modal";
import { Button } from "../common/Button/Button";
import styles from "./ChatHistoryItem.module.css";

interface ChatHistoryItemProps {
  document: SavedDocument;
}

export function ChatHistoryItem({ document }: ChatHistoryItemProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { setGeneratedDocument, setQueryId, setCurrentDocumentType, setViewMode, setDocumentTitle } =
    useDocument();
  const { deleteDocument } = useDocuments();

  const handleClick = () => {
    setGeneratedDocument(document.content);
    setQueryId(document.query_id);
    setCurrentDocumentType(normalizeDocType(document.document_type));
    setViewMode('view');
    setDocumentTitle(document.title);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteDocument.mutate(document.id);
    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <motion.div
        className={styles.item}
        onClick={handleClick}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.15 }}
      >
        <div className={styles.icon}>
          <FileText size={16} />
        </div>

        <div className={styles.content}>
          <span className={styles.title}>{truncateText(document.title, 30)}</span>
          <span className={styles.meta}>
            {DOCUMENT_TYPE_LABELS[normalizeDocType(document.document_type)]}{" "}
            • {formatRelativeTime(document.created_at)}
          </span>
        </div>

        <button
          className={styles.deleteButton}
          onClick={handleDeleteClick}
          aria-label="Delete document"
        >
          <Trash2 size={14} />
        </button>
      </motion.div>

      <Modal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        title="Delete Document"
        size="sm"
      >
        <p className={styles.deleteMessage}>
          Are you sure you want to delete "{document.title}"? This action cannot be undone.
        </p>
        <ModalFooter>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            isLoading={deleteDocument.isPending}
          >
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
