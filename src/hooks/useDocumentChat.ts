import { useState, useEffect, useCallback } from 'react';
import { documentService } from '../services/document.service';
import { ChatMessage } from '../types/chat.types';
import { DocumentType } from '../types/document.types';
import toast from 'react-hot-toast';

interface UseDocumentChatProps {
  documentId: string | null;
  documentContent: string;
  documentType: DocumentType | null;
  documentTitle: string | null;
  onDocumentUpdate: (content: string) => void;
}

interface UseDocumentChatReturn {
  messages: ChatMessage[];
  sendMessage: (query: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearMessages: () => void;
}

export function useDocumentChat({
  documentId,
  documentContent,
  documentType,
  documentTitle,
  onDocumentUpdate,
}: UseDocumentChatProps): UseDocumentChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear messages when document changes
  useEffect(() => {
    setMessages([]);
    setError(null);
  }, [documentId]);

  const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const sendMessage = useCallback(async (query: string) => {
    if (!query.trim() || !documentType) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: query.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await documentService.chatWithDocument({
        document_id: documentId,
        document_content: documentContent,
        document_type: documentType,
        document_title: documentTitle || '',
        user_query: query.trim(),
      });

      const hasUpdate = !!response.data.updated_content;

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date(),
        hasDocumentUpdate: hasUpdate,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // If there's updated content, update the document
      if (response.data.updated_content) {
        onDocumentUpdate(response.data.updated_content);
        toast.success('Document updated');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      toast.error(errorMessage);

      // Add error message to chat
      const errorChatMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorChatMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [documentId, documentContent, documentType, documentTitle, onDocumentUpdate]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    sendMessage,
    isLoading,
    error,
    clearMessages,
  };
}
