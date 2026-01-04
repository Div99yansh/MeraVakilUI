import { FileText, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { SavedDocument } from "../../types/document.types";
import { useDocument } from "../../context/DocumentContext";
import { useDocuments } from "../../hooks/useDocuments";
import { DOCUMENT_TYPE_LABELS } from "../../config/constants";
import { truncateText, formatRelativeTime } from "../../utils/formatting";
import styles from "./ChatHistoryItem.module.css";
import { info } from "console";

interface ChatHistoryItemProps {
  document: SavedDocument;
}

export function ChatHistoryItem({ document }: ChatHistoryItemProps) {
  const { setGeneratedDocument, setQueryId, setCurrentDocumentType } =
    useDocument();
  const { deleteDocument } = useDocuments();

  const handleClick = () => {
    setGeneratedDocument(document.content);
    setQueryId(document.query_id);
    setCurrentDocumentType(
      document.document_type as
        | "plaint"
        | "written-statement"
        | "notice"
        | "affidavit"
    );
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this document?")) {
      deleteDocument.mutate(document.id);
    }
    console.info("Document is : ", document);
  };

  return (
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
          {DOCUMENT_TYPE_LABELS[document.document_type] ||
            document.document_type}{" "}
          • {formatRelativeTime(document.created_at)}
        </span>
      </div>

      <button
        className={styles.deleteButton}
        onClick={handleDelete}
        aria-label="Delete document"
      >
        <Trash2 size={14} />
      </button>
    </motion.div>
  );
}
