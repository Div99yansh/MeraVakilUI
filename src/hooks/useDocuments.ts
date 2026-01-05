import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentService } from '../services/document.service';
import {
  GeneratePlaintRequest,
  GenerateWrittenStatementRequest,
  GenerateNoticeRequest,
  GenerateAffidavitRequest,
  SaveDocumentRequest,
  UpdateDocumentRequest,
} from '../types/document.types';
import toast from 'react-hot-toast';

export function useDocuments() {
  const queryClient = useQueryClient();

  // Fetch document history
  const {
    data: documents,
    isLoading: isLoadingHistory,
    error: historyError,
  } = useQuery({
    queryKey: ['documents', 'history'],
    queryFn: () => documentService.getHistory(),
    select: (response) => response.data.documents,
  });

  // Generate Plaint mutation
  const generatePlaint = useMutation({
    mutationFn: (data: GeneratePlaintRequest) => documentService.generatePlaint(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents', 'history'] });
      toast.success('Plaint generated successfully!');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { detail?: string } } };
      const message = err.response?.data?.detail || 'Failed to generate plaint';
      toast.error(message);
    },
  });

  // Generate Written Statement mutation
  const generateWrittenStatement = useMutation({
    mutationFn: (data: GenerateWrittenStatementRequest) =>
      documentService.generateWrittenStatement(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents', 'history'] });
      toast.success('Written statement generated successfully!');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { detail?: string } } };
      const message = err.response?.data?.detail || 'Failed to generate written statement';
      toast.error(message);
    },
  });

  // Generate Notice mutation
  const generateNotice = useMutation({
    mutationFn: (data: GenerateNoticeRequest) => documentService.generateNotice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents', 'history'] });
      toast.success('Notice generated successfully!');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { detail?: string } } };
      const message = err.response?.data?.detail || 'Failed to generate notice';
      toast.error(message);
    },
  });

  // Generate Affidavit mutation
  const generateAffidavit = useMutation({
    mutationFn: (data: GenerateAffidavitRequest) => documentService.generateAffidavit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents', 'history'] });
      toast.success('Affidavit generated successfully!');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { detail?: string } } };
      const message = err.response?.data?.detail || 'Failed to generate affidavit';
      toast.error(message);
    },
  });

  // Save document mutation
  const saveDocument = useMutation({
    mutationFn: (data: SaveDocumentRequest) => documentService.saveDocument(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents', 'history'] });
      toast.success('Document saved successfully!');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { detail?: string } } };
      const message = err.response?.data?.detail || 'Failed to save document';
      toast.error(message);
    },
  });

  // Delete document mutation
  const deleteDocument = useMutation({
    mutationFn: (id: string) => documentService.deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents', 'history'] });
      toast.success('Document deleted successfully!');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { detail?: string } } };
      const message = err.response?.data?.detail || 'Failed to delete document';
      toast.error(message);
    },
  });

  // Update document mutation
  const updateDocument = useMutation({
    mutationFn: (data: UpdateDocumentRequest) => documentService.updateDocument(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents', 'history'] });
      toast.success('Document updated successfully!');
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { detail?: string } } };
      const message = err.response?.data?.detail || 'Failed to update document';
      toast.error(message);
    },
  });

  return {
    documents: documents || [],
    isLoadingHistory,
    historyError,
    generatePlaint,
    generateWrittenStatement,
    generateNotice,
    generateAffidavit,
    saveDocument,
    deleteDocument,
    updateDocument,
  };
}
