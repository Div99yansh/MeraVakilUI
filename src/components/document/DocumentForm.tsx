import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import { useDocument } from '../../context/DocumentContext';
import { useDocumentForm } from '../../hooks/useDocumentForm';
import { DocumentTypeSelector } from './DocumentTypeSelector';
import { FieldRenderer } from './FieldRenderer';
import { Button } from '../common/Button/Button';
import { GlassCard } from '../ui/GlassCard/GlassCard';
import { BASE_FIELDS, DOCUMENT_SPECIFIC_FIELDS, normalizeDocType } from '../../config/documentFields.config';
import { DOCUMENT_TYPE_LABELS } from '../../config/constants';
import styles from './DocumentForm.module.css';

export function DocumentForm() {
  const { currentDocumentType, setCurrentDocumentType, isGenerating } = useDocument();
  const { form, onSubmit, reset } = useDocumentForm(currentDocumentType);

  const { register, formState: { errors }, control } = form;

  // Reset form when document type changes
  useEffect(() => {
    reset();
  }, [currentDocumentType, reset]);

  const handleBack = () => {
    setCurrentDocumentType(null);
    reset();
  };

  if (!currentDocumentType) {
    return (
      <DocumentTypeSelector
        selectedType={currentDocumentType}
        onSelect={(type) => setCurrentDocumentType(type)}
      />
    );
  }

  const specificFields = DOCUMENT_SPECIFIC_FIELDS[normalizeDocType(currentDocumentType)];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button variant="ghost" size="sm" onClick={handleBack} leftIcon={<ArrowLeft size={16} />}>
          Back
        </Button>
        <h2 className={styles.title}>
          Generate {DOCUMENT_TYPE_LABELS[normalizeDocType(currentDocumentType)]}
        </h2>
      </div>

      <form onSubmit={onSubmit} className={styles.form}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDocumentType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard padding="lg" className={styles.section}>
              <h3 className={styles.sectionTitle}>Basic Information</h3>
              <div className={styles.fields}>
                {BASE_FIELDS.map((field) => (
                  <div key={field.name} className={styles.fieldWrapper}>
                    <FieldRenderer
                      field={field}
                      register={register}
                      errors={errors}
                      control={control}
                    />
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard padding="lg" className={styles.section}>
              <h3 className={styles.sectionTitle}>
                {DOCUMENT_TYPE_LABELS[normalizeDocType(currentDocumentType)]} Details
              </h3>
              <div className={styles.fields}>
                {specificFields.map((field) => (
                  <div key={field.name} className={styles.fieldWrapper}>
                    <FieldRenderer
                      field={field}
                      register={register}
                      errors={errors}
                      control={control}
                    />
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        <div className={styles.actions}>
          <Button
            type="submit"
            size="lg"
            isLoading={isGenerating}
            rightIcon={<Send size={18} />}
          >
            Generate Document
          </Button>
        </div>
      </form>
    </div>
  );
}
