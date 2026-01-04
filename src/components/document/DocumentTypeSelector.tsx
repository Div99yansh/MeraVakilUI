import { FileText, FileCheck, Bell, FileSignature } from 'lucide-react';
import { motion } from 'framer-motion';
import { DocumentType } from '../../types/document.types';
import { DOCUMENT_TYPE_LABELS } from '../../config/constants';
import styles from './DocumentTypeSelector.module.css';

interface DocumentTypeSelectorProps {
  selectedType: DocumentType | null;
  onSelect: (type: DocumentType) => void;
}

const DOCUMENT_TYPES: { type: DocumentType; icon: React.ReactNode; description: string }[] = [
  {
    type: 'plaint',
    icon: <FileText size={24} />,
    description: 'Initiate a civil lawsuit',
  },
  {
    type: 'written-statement',
    icon: <FileCheck size={24} />,
    description: 'Respond to a plaint',
  },
  {
    type: 'notice',
    icon: <Bell size={24} />,
    description: 'Legal notice to a party',
  },
  {
    type: 'affidavit',
    icon: <FileSignature size={24} />,
    description: 'Sworn statement of facts',
  },
];

export function DocumentTypeSelector({ selectedType, onSelect }: DocumentTypeSelectorProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Select Document Type</h2>
      <p className={styles.subtitle}>Choose the type of legal document you want to generate</p>

      <div className={styles.grid}>
        {DOCUMENT_TYPES.map(({ type, icon, description }) => (
          <motion.button
            key={type}
            className={`${styles.card} ${selectedType === type ? styles.selected : ''}`}
            onClick={() => onSelect(type)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={styles.icon}>{icon}</div>
            <div className={styles.content}>
              <h3 className={styles.cardTitle}>{DOCUMENT_TYPE_LABELS[type]}</h3>
              <p className={styles.description}>{description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
