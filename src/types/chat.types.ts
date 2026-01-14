export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  hasDocumentUpdate?: boolean;
}

export interface DocumentChatRequest {
  document_id: string | null;
  document_content: string;
  document_type: string;
  document_title: string;
  user_query: string;
}

export interface DocumentChatResponse {
  response: string;
  updated_content?: string;
}
