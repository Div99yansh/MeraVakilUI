import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { DocumentType } from '../types/document.types';
import { getFieldsForDocumentType, createValidationSchema } from '../config/documentFields.config';
import { useDocument } from '../context/DocumentContext';
import { useDocuments } from './useDocuments';

export function useDocumentForm(documentType: DocumentType | null) {
  const { setGeneratedDocument, setQueryId, setIsGenerating } = useDocument();
  const { generatePlaint, generateWrittenStatement, generateNotice, generateAffidavit } =
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

      if (response) {
        setGeneratedDocument(response.data.draft_text);
        setQueryId(response.data.query_id);
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
    generateAffidavit.isPending;

  return {
    form,
    fields,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
    reset: form.reset,
  };
}
