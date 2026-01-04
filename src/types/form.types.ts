import { z } from 'zod';

export type FieldType = 'text' | 'textarea' | 'select' | 'date' | 'number' | 'email';

export interface SelectOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  helperText?: string;
  validation?: z.ZodType<unknown>;
  options?: SelectOption[];
  rows?: number;
  min?: number;
  max?: number;
  showWhen?: (formData: Record<string, unknown>) => boolean;
}

export interface FormSectionProps {
  fields: FieldConfig[];
  register: unknown;
  errors: Record<string, { message?: string }>;
  control: unknown;
}
