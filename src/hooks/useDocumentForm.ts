import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { DocumentType } from '../types/document.types';
import { getFieldsForDocumentType, createValidationSchema } from '../config/documentFields.config';
import { useDocument } from '../context/DocumentContext';
import { useDocuments } from './useDocuments';
import { DOCUMENT_TYPE_LABELS } from '../config/constants';

export function useDocumentForm(documentType: DocumentType | null) {
  const { setGeneratedDocument, setQueryId, setIsGenerating, setDocumentTitle } = useDocument();
  const { generatePlaint, generateWrittenStatement, generateNotice, generateAffidavit, saveDocument } =
    useDocuments();

  const fields = useMemo(() => {
    if (!documentType) return [];
    return getFieldsForDocumentType(documentType);
  }, [documentType]);

  const schema = useMemo(() => {
    if (!documentType) return null;
    return createValidationSchema(documentType);
  }, [documentType]);

  const form = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: 'onBlur',
  });

  const onSubmit = async (data: Record<string, unknown>) => {
    if (!documentType) return;

    setIsGenerating(true);

    try {
      // Split data into base fields and specific fields
      const baseFieldNames = ['plaintiff', 'defendant', 'advocate', 'nature_of_dispute', 'case_description'];
      const document_base_fields: Record<string, unknown> = {};
      const document_specific_details: Record<string, unknown> = {};

      Object.entries(data).forEach(([key, value]) => {
        if (baseFieldNames.includes(key)) {
          document_base_fields[key] = value;
        } else {
          document_specific_details[key] = value;
        }
      });

      let response;

      switch (documentType) {
        case 'plaint':
          response = await generatePlaint.mutateAsync({
            document_base_fields: document_base_fields as never,
            document_specific_details: document_specific_details as never,
          });
          break;
        case 'written-statement':
          response = await generateWrittenStatement.mutateAsync({
            document_base_fields: document_base_fields as never,
            document_specific_details: document_specific_details as never,
          });
          break;
        case 'notice':
          response = await generateNotice.mutateAsync({
            document_base_fields: document_base_fields as never,
            document_specific_details: document_specific_details as never,
          });
          break;
        case 'affidavit':
          response = await generateAffidavit.mutateAsync({
            document_base_fields: document_base_fields as never,
            document_specific_details: document_specific_details as never,
          });
          break;
      }

      if (response && response.data.query_id) {
        const draftText = response.data.draft_text;
        const queryIdValue = response.data.query_id;

        // Generate a title based on document type and parties
        const plaintiff = document_base_fields.plaintiff as string || 'Unknown';
        const defendant = document_base_fields.defendant as string || 'Unknown';
        const docLabel = DOCUMENT_TYPE_LABELS[documentType] || documentType;
        const generatedTitle = `${docLabel} - ${plaintiff} vs ${defendant}`;

        // Auto-save the document
        try {
          await saveDocument.mutateAsync({
            query_id: queryIdValue,
            document_type: documentType,
            title: generatedTitle,
            content: draftText,
          });

          setGeneratedDocument(draftText);
          setQueryId(queryIdValue);
          setDocumentTitle(generatedTitle);
        } catch (saveError) {
          // Even if save fails, still show the document
          console.error('Error auto-saving document:', saveError);
          setGeneratedDocument(draftText);
          setQueryId(queryIdValue);
          setDocumentTitle(generatedTitle);
        }
      }
    } catch (error) {
      console.error('Error generating document:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const isSubmitting =
    generatePlaint.isPending ||
    generateWrittenStatement.isPending ||
    generateNotice.isPending ||
    generateAffidavit.isPending ||
    saveDocument.isPending;

  return {
    form,
    fields,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
    reset: form.reset,
  };
}
