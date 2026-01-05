export type DocumentType = 'plaint' | 'written-statement' | 'notice' | 'affidavit';

export interface DocumentBaseFields {
  plaintiff: string;
  defendant: string;
  advocate: string;
  nature_of_dispute: string;
  case_description: string;
}

export interface PlaintSpecificFields {
  court_name: string;
  case_number?: string;
  reliefs_sought: string;
  damages_claimed?: number;
  cause_of_action_date: string;
}

export interface WrittenStatementSpecificFields {
  plaint_date: string;
  court_name: string;
  case_number: string;
  defense_grounds: string;
  counter_claim?: string;
}

export interface NoticeSpecificFields {
  notice_type: string;
  recipient_name: string;
  recipient_address: string;
  issue_details: string;
  action_required: string;
  response_deadline: number;
}

export interface AffidavitSpecificFields {
  affidavit_purpose: string;
  deponent_name: string;
  deponent_relation: string;
  facts_to_affirm: string;
  annexures?: string;
}

export interface GeneratePlaintRequest {
  document_base_fields: DocumentBaseFields;
  document_specific_details: PlaintSpecificFields;
}

export interface GenerateWrittenStatementRequest {
  document_base_fields: DocumentBaseFields;
  document_specific_details: WrittenStatementSpecificFields;
}

export interface GenerateNoticeRequest {
  document_base_fields: DocumentBaseFields;
  document_specific_details: NoticeSpecificFields;
}

export interface GenerateAffidavitRequest {
  document_base_fields: DocumentBaseFields;
  document_specific_details: AffidavitSpecificFields;
}

export interface DocumentResponse {
  status: string;
  draft_text: string;
  document_type: string;
  validation: Record<string, unknown> | null;
  metadata: Record<string, unknown>;
  user_id: string;
  query_id: string | null;
}

export interface SavedDocument {
  id: string;
  query_id: string;
  document_type: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface DocumentHistoryResponse {
  documents: SavedDocument[];
}

export interface SaveDocumentRequest {
  query_id: string;
  document_type: string;
  title: string;
  content: string;
}

export interface SaveDocumentResponse {
  id: string;
  message: string;
}

export interface DeleteDocumentResponse {
  message: string;
}

export interface UpdateDocumentRequest {
  document_id: string;
  title: string;
  content: string;
  document_type: string;
}

export interface UpdateDocumentResponse {
  message: string;
  document: SavedDocument;
}
