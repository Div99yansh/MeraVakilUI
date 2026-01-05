import { createContext, useContext, useState, ReactNode } from 'react';
import { DocumentType } from '../types/document.types';

type ViewMode = 'create' | 'view';

interface DocumentContextType {
  currentDocumentType: DocumentType | null;
  setCurrentDocumentType: (type: DocumentType | null) => void;
  generatedDocument: string | null;
  setGeneratedDocument: (doc: string | null) => void;
  queryId: string | null;
  setQueryId: (id: string | null) => void;
  documentId: string | null;
  setDocumentId: (id: string | null) => void;
  isGenerating: boolean;
  setIsGenerating: (loading: boolean) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  documentTitle: string | null;
  setDocumentTitle: (title: string | null) => void;
  resetToCreate: () => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [currentDocumentType, setCurrentDocumentType] = useState<DocumentType | null>(null);
  const [generatedDocument, setGeneratedDocument] = useState<string | null>(null);
  const [queryId, setQueryId] = useState<string | null>(null);
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('create');
  const [documentTitle, setDocumentTitle] = useState<string | null>(null);

  const resetToCreate = () => {
    setCurrentDocumentType(null);
    setGeneratedDocument(null);
    setQueryId(null);
    setDocumentId(null);
    setViewMode('create');
    setDocumentTitle(null);
  };

  const value: DocumentContextType = {
    currentDocumentType,
    setCurrentDocumentType,
    generatedDocument,
    setGeneratedDocument,
    queryId,
    setQueryId,
    documentId,
    setDocumentId,
    isGenerating,
    setIsGenerating,
    viewMode,
    setViewMode,
    documentTitle,
    setDocumentTitle,
    resetToCreate,
  };

  return <DocumentContext.Provider value={value}>{children}</DocumentContext.Provider>;
}

export function useDocument() {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocument must be used within DocumentProvider');
  }
  return context;
}
