import { apiClient } from './api';
import {
  GeneratePlaintRequest,
  GenerateWrittenStatementRequest,
  GenerateNoticeRequest,
  GenerateAffidavitRequest,
  DocumentResponse,
  DocumentHistoryResponse,
  SaveDocumentRequest,
  SaveDocumentResponse,
  DeleteDocumentResponse,
} from '../types/document.types';

export const documentService = {
  generatePlaint: (data: GeneratePlaintRequest) => {
    return apiClient.post<DocumentResponse>('/generate/plaint', data);
  },

  generateWrittenStatement: (data: GenerateWrittenStatementRequest) => {
    return apiClient.post<DocumentResponse>('/generate/written-statement', data);
  },

  generateNotice: (data: GenerateNoticeRequest) => {
    return apiClient.post<DocumentResponse>('/generate/notice', data);
  },

  generateAffidavit: (data: GenerateAffidavitRequest) => {
    return apiClient.post<DocumentResponse>('/generate/affidavit', data);
  },

  getHistory: () => {
    return apiClient.get<DocumentHistoryResponse>('/documents/history');
  },

  saveDocument: (data: SaveDocumentRequest) => {
    return apiClient.post<SaveDocumentResponse>('/documents/save', data);
  },

  deleteDocument: (id: string) => {
    return apiClient.delete<DeleteDocumentResponse>(`/documents/${id}`);
  },
};
