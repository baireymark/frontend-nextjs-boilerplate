import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';

type FieldBaseProps = {
  label: string;
  error?: string;
};

const controlClass =
  'mt-1 block w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm aria-invalid:border-danger';

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-1 text-sm text-danger">
      {error}
    </p>
  );
}

export function TextField({
  label,
  error,
  className,
  ...props
}: FieldBaseProps & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        className={controlClass}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      <FieldError id={errorId} error={error} />
    </div>
  );
}

export function TextAreaField({
  label,
  error,
  className,
  ...props
}: FieldBaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <textarea
        id={id}
        className={cn(controlClass, 'min-h-28')}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      <FieldError id={errorId} error={error} />
    </div>
  );
}
