import { UseFormRegister, FieldErrors, Control } from 'react-hook-form';
import { Input } from '../common/Input/Input';
import { Select } from '../common/Select/Select';
import { Textarea } from '../common/Textarea/Textarea';
import { FieldConfig } from '../../types/form.types';

interface FieldRendererProps {
  field: FieldConfig;
  register: UseFormRegister<Record<string, unknown>>;
  errors: FieldErrors<Record<string, unknown>>;
  control: Control<Record<string, unknown>>;
}

export function FieldRenderer({ field, register, errors }: FieldRendererProps) {
  const error = errors[field.name]?.message as string | undefined;

  switch (field.type) {
    case 'select':
      return (
        <Select
          label={field.label}
          options={field.options || []}
          placeholder={field.placeholder}
          helperText={field.helperText}
          error={error}
          required={field.required}
          fullWidth
          {...register(field.name)}
        />
      );

    case 'textarea':
      return (
        <Textarea
          label={field.label}
          placeholder={field.placeholder}
          helperText={field.helperText}
          rows={field.rows || 4}
          error={error}
          required={field.required}
          fullWidth
          {...register(field.name)}
        />
      );

    case 'number':
      return (
        <Input
          type="number"
          label={field.label}
          placeholder={field.placeholder}
          helperText={field.helperText}
          min={field.min}
          max={field.max}
          error={error}
          required={field.required}
          fullWidth
          {...register(field.name, { valueAsNumber: true })}
        />
      );

    case 'date':
      return (
        <Input
          type="date"
          label={field.label}
          helperText={field.helperText}
          error={error}
          required={field.required}
          fullWidth
          {...register(field.name)}
        />
      );

    case 'email':
      return (
        <Input
          type="email"
          label={field.label}
          placeholder={field.placeholder}
          helperText={field.helperText}
          error={error}
          required={field.required}
          fullWidth
          {...register(field.name)}
        />
      );

    case 'text':
    default:
      return (
        <Input
          type="text"
          label={field.label}
          placeholder={field.placeholder}
          helperText={field.helperText}
          error={error}
          required={field.required}
          fullWidth
          {...register(field.name)}
        />
      );
  }
}
