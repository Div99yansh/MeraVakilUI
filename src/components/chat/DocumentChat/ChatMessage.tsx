import { motion } from 'framer-motion';
import { FileEdit } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../../types/chat.types';
import styles from './ChatMessage.module.css';
import clsx from 'clsx';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      className={clsx(styles.messageWrapper, isUser && styles.user)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className={clsx(styles.message, isUser ? styles.userMessage : styles.assistantMessage)}>
        <p className={styles.content}>{message.content}</p>
        {message.hasDocumentUpdate && (
          <div className={styles.updateBadge}>
            <FileEdit size={12} />
            <span>Document updated</span>
          </div>
        )}
      </div>
      <span className={styles.timestamp}>
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </motion.div>
  );
}
