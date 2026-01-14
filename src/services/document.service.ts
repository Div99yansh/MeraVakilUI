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
  UpdateDocumentRequest,
  UpdateDocumentResponse,
} from '../types/document.types';
import { DocumentChatRequest, DocumentChatResponse } from '../types/chat.types';

// Timeout for LLM document generation (6 minutes to handle long processing times)
const GENERATION_TIMEOUT = 360000;

// Timeout for chat responses (3 minutes)
const CHAT_TIMEOUT = 180000;

export const documentService = {
  generatePlaint: (data: GeneratePlaintRequest) => {
    return apiClient.post<DocumentResponse>('/generate/plaint', data, {
      timeout: GENERATION_TIMEOUT,
    });
  },

  generateWrittenStatement: (data: GenerateWrittenStatementRequest) => {
    return apiClient.post<DocumentResponse>('/generate/written-statement', data, {
      timeout: GENERATION_TIMEOUT,
    });
  },

  generateNotice: (data: GenerateNoticeRequest) => {
    return apiClient.post<DocumentResponse>('/generate/notice', data, {
      timeout: GENERATION_TIMEOUT,
    });
  },

  generateAffidavit: (data: GenerateAffidavitRequest) => {
    return apiClient.post<DocumentResponse>('/generate/affidavit', data, {
      timeout: GENERATION_TIMEOUT,
    });
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

  updateDocument: (data: UpdateDocumentRequest) => {
    return apiClient.put<UpdateDocumentResponse>('/documents/update', data);
  },

  chatWithDocument: (data: DocumentChatRequest) => {
    return apiClient.post<DocumentChatResponse>('/chat/document-assist', data, {
      timeout: CHAT_TIMEOUT,
    });
  },
};
