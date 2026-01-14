import { useRef, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { useDocumentChat } from '../../../hooks/useDocumentChat';
import { DocumentType } from '../../../types/document.types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import styles from './DocumentChat.module.css';

interface DocumentChatProps {
  documentId: string | null;
  documentContent: string;
  documentType: DocumentType | null;
  documentTitle: string | null;
  onDocumentUpdate: (content: string) => void;
}

export function DocumentChat({
  documentId,
  documentContent,
  documentType,
  documentTitle,
  onDocumentUpdate,
}: DocumentChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, isLoading } = useDocumentChat({
    documentId,
    documentContent,
    documentType,
    documentTitle,
    onDocumentUpdate,
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <MessageSquare size={20} />
        <h3 className={styles.title}>Document Assistant</h3>
      </div>

      <div className={styles.messagesContainer}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <MessageSquare size={48} strokeWidth={1} />
            <p className={styles.emptyText}>Ask questions or request changes to your document</p>
            <p className={styles.emptyHint}>
              Try: "Make this more formal" or "Add a clause about confidentiality"
            </p>
          </div>
        ) : (
          <div className={styles.messagesList}>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <ChatInput
        onSend={sendMessage}
        isLoading={isLoading}
        disabled={!documentType}
      />
    </div>
  );
}
