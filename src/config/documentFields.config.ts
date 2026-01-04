import { z } from 'zod';
import { DocumentType } from '../types/document.types';
import { FieldConfig } from '../types/form.types';

// Base fields common to all documents
export const BASE_FIELDS: FieldConfig[] = [
  {
    name: 'plaintiff',
    label: 'Plaintiff Name',
    type: 'text',
    required: true,
    placeholder: 'Enter plaintiff name',
    helperText: 'Full name of the plaintiff',
    validation: z.string().min(2, 'Name must be at least 2 characters'),
  },
  {
    name: 'defendant',
    label: 'Defendant Name',
    type: 'text',
    required: true,
    placeholder: 'Enter defendant name',
    helperText: 'Full name of the defendant',
    validation: z.string().min(2, 'Name must be at least 2 characters'),
  },
  {
    name: 'advocate',
    label: 'Advocate/Representative',
    type: 'text',
    required: true,
    placeholder: 'Enter advocate name',
    helperText: 'Name of the legal representative',
    validation: z.string().min(2, 'Name must be at least 2 characters'),
  },
  {
    name: 'nature_of_dispute',
    label: 'Nature of Dispute',
    type: 'select',
    required: true,
    placeholder: 'Select dispute type',
    options: [
      { value: 'civil', label: 'Civil' },
      { value: 'criminal', label: 'Criminal' },
      { value: 'commercial', label: 'Commercial' },
      { value: 'property', label: 'Property' },
      { value: 'family', label: 'Family' },
      { value: 'labour', label: 'Labour' },
      { value: 'other', label: 'Other' },
    ],
    validation: z.string().min(1, 'Please select dispute type'),
  },
  {
    name: 'case_description',
    label: 'Brief Description of Case',
    type: 'textarea',
    required: true,
    placeholder: 'Provide a brief description of the case...',
    helperText: 'Brief summary of facts and circumstances',
    rows: 4,
    validation: z.string().min(50, 'Description must be at least 50 characters'),
  },
];

// Document-specific fields
export const DOCUMENT_SPECIFIC_FIELDS: Record<DocumentType, FieldConfig[]> = {
  plaint: [
    {
      name: 'court_name',
      label: 'Court Name',
      type: 'text',
      required: true,
      placeholder: 'Enter court name',
      validation: z.string().min(3, 'Court name required'),
    },
    {
      name: 'case_number',
      label: 'Case Number (if any)',
      type: 'text',
      required: false,
      placeholder: 'e.g., CS 123/2024',
    },
    {
      name: 'reliefs_sought',
      label: 'Reliefs Sought',
      type: 'textarea',
      required: true,
      placeholder: 'Describe the reliefs you are seeking...',
      rows: 3,
      validation: z.string().min(20, 'Please describe the reliefs sought'),
    },
    {
      name: 'damages_claimed',
      label: 'Damages Claimed (if any)',
      type: 'number',
      required: false,
      placeholder: 'Enter amount',
      min: 0,
    },
    {
      name: 'cause_of_action_date',
      label: 'Date of Cause of Action',
      type: 'date',
      required: true,
      helperText: 'When did the cause of action arise?',
      validation: z.string().min(1, 'Date is required'),
    },
  ],

  'written-statement': [
    {
      name: 'plaint_date',
      label: 'Date of Plaint',
      type: 'date',
      required: true,
      helperText: 'Date when the plaint was filed',
      validation: z.string().min(1, 'Date is required'),
    },
    {
      name: 'court_name',
      label: 'Court Name',
      type: 'text',
      required: true,
      placeholder: 'Enter court name',
      validation: z.string().min(3, 'Court name required'),
    },
    {
      name: 'case_number',
      label: 'Case Number',
      type: 'text',
      required: true,
      placeholder: 'e.g., CS 123/2024',
      validation: z.string().min(3, 'Case number required'),
    },
    {
      name: 'defense_grounds',
      label: 'Grounds of Defense',
      type: 'textarea',
      required: true,
      placeholder: 'Describe your defense...',
      rows: 4,
      helperText: 'Main arguments in defense',
      validation: z.string().min(50, 'Please provide detailed defense grounds'),
    },
    {
      name: 'counter_claim',
      label: 'Counter Claim (if any)',
      type: 'textarea',
      required: false,
      placeholder: 'Describe counter claim if applicable...',
      rows: 3,
    },
  ],

  notice: [
    {
      name: 'notice_type',
      label: 'Type of Notice',
      type: 'select',
      required: true,
      options: [
        { value: 'legal', label: 'Legal Notice' },
        { value: 'termination', label: 'Termination Notice' },
        { value: 'demand', label: 'Demand Notice' },
        { value: 'eviction', label: 'Eviction Notice' },
        { value: 'other', label: 'Other' },
      ],
      validation: z.string().min(1, 'Please select notice type'),
    },
    {
      name: 'recipient_name',
      label: 'Recipient Name',
      type: 'text',
      required: true,
      placeholder: 'Name of the person/entity receiving notice',
      validation: z.string().min(2, 'Recipient name required'),
    },
    {
      name: 'recipient_address',
      label: 'Recipient Address',
      type: 'textarea',
      required: true,
      placeholder: 'Complete address of recipient...',
      rows: 3,
      validation: z.string().min(10, 'Complete address required'),
    },
    {
      name: 'issue_details',
      label: 'Issue Details',
      type: 'textarea',
      required: true,
      placeholder: 'Describe the issue in detail...',
      rows: 4,
      helperText: 'Facts and circumstances',
      validation: z.string().min(50, 'Please provide detailed issue description'),
    },
    {
      name: 'action_required',
      label: 'Action Required',
      type: 'textarea',
      required: true,
      placeholder: 'What action is required from the recipient...',
      rows: 3,
      validation: z.string().min(20, 'Please specify action required'),
    },
    {
      name: 'response_deadline',
      label: 'Response Deadline (Days)',
      type: 'number',
      required: true,
      placeholder: 'Number of days',
      min: 1,
      max: 90,
      helperText: 'Typically 7-30 days',
      validation: z.coerce.number().min(1).max(90),
    },
  ],

  affidavit: [
    {
      name: 'affidavit_purpose',
      label: 'Purpose of Affidavit',
      type: 'select',
      required: true,
      options: [
        { value: 'general', label: 'General Affidavit' },
        { value: 'verification', label: 'Verification of Facts' },
        { value: 'identity', label: 'Identity Proof' },
        { value: 'support', label: 'Support Document' },
        { value: 'other', label: 'Other' },
      ],
      validation: z.string().min(1, 'Please select purpose'),
    },
    {
      name: 'deponent_name',
      label: 'Deponent Name',
      type: 'text',
      required: true,
      placeholder: 'Name of person making the affidavit',
      helperText: 'Person swearing to the facts',
      validation: z.string().min(2, 'Deponent name required'),
    },
    {
      name: 'deponent_relation',
      label: 'Deponent Relation to Case',
      type: 'text',
      required: true,
      placeholder: 'e.g., Plaintiff, Witness, etc.',
      validation: z.string().min(2, 'Relation required'),
    },
    {
      name: 'facts_to_affirm',
      label: 'Facts to be Affirmed',
      type: 'textarea',
      required: true,
      placeholder: 'List the facts to be sworn to...',
      rows: 5,
      helperText: 'Be specific and truthful',
      validation: z.string().min(100, 'Please provide detailed facts (min 100 characters)'),
    },
    {
      name: 'annexures',
      label: 'Annexures/Attachments (if any)',
      type: 'textarea',
      required: false,
      placeholder: 'List any documents attached as annexures...',
      rows: 2,
    },
  ],
};

// Get all fields for a document type
export function getFieldsForDocumentType(docType: DocumentType): FieldConfig[] {
  return [...BASE_FIELDS, ...DOCUMENT_SPECIFIC_FIELDS[docType]];
}

// Create Zod validation schema for a document type
export function createValidationSchema(docType: DocumentType) {
  const fields = getFieldsForDocumentType(docType);
  const schemaObject: Record<string, z.ZodType<unknown>> = {};

  fields.forEach((field) => {
    if (field.validation) {
      schemaObject[field.name] = field.required
        ? field.validation
        : field.validation.optional();
    } else {
      // Default validations
      if (field.type === 'email') {
        schemaObject[field.name] = field.required
          ? z.string().email('Invalid email').min(1, 'Required')
          : z.string().email('Invalid email').optional();
      } else if (field.type === 'number') {
        const numSchema = z.coerce.number();
        schemaObject[field.name] = field.required ? numSchema : numSchema.optional();
      } else {
        const strSchema = z.string();
        schemaObject[field.name] = field.required
          ? strSchema.min(1, `${field.label} is required`)
          : strSchema.optional();
      }
    }
  });

  return z.object(schemaObject);
}
