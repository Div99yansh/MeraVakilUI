import { SavedDocument } from '../../types/document.types';
import { ChatHistoryItem } from './ChatHistoryItem';
import { ChatHistorySkeleton } from './ChatHistorySkeleton';
import { EmptyHistoryState } from './EmptyHistoryState';
import styles from './ChatHistory.module.css';

interface ChatHistoryProps {
  documents: SavedDocument[];
  isLoading: boolean;
}

export function ChatHistory({ documents, isLoading }: ChatHistoryProps) {
  if (isLoading) {
    return <ChatHistorySkeleton />;
  }

  if (documents.length === 0) {
    return <EmptyHistoryState />;
  }

  // Group documents by date
  const groupedDocuments = groupByDate(documents);

  return (
    <div className={styles.container}>
      {Object.entries(groupedDocuments).map(([date, docs]) => (
        <div key={date} className={styles.group}>
          <h3 className={styles.groupTitle}>{date}</h3>
          <div className={styles.list}>
            {docs.map((doc) => (
              <ChatHistoryItem key={doc.id} document={doc} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function groupByDate(documents: SavedDocument[]): Record<string, SavedDocument[]> {
  const groups: Record<string, SavedDocument[]> = {};
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  documents.forEach((doc) => {
    const docDate = new Date(doc.created_at);
    let label: string;

    if (isSameDay(docDate, today)) {
      label = 'Today';
    } else if (isSameDay(docDate, yesterday)) {
      label = 'Yesterday';
    } else if (isWithinDays(docDate, today, 7)) {
      label = 'Previous 7 Days';
    } else if (isWithinDays(docDate, today, 30)) {
      label = 'Previous 30 Days';
    } else {
      label = docDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }

    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(doc);
  });

  return groups;
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isWithinDays(date: Date, reference: Date, days: number): boolean {
  const diffTime = reference.getTime() - date.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= days && diffDays > 0;
}
