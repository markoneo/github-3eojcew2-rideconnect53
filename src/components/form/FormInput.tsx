import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import FormError from './FormError';

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  icon?: LucideIcon;
  min?: number;
  error?: string;
  className?: string;
}

export default function FormInput({
  label,
  name,
  type,
  value,
  onChange,
  required = false,
  icon: Icon,
  min,
  error,
  className = ''
}: FormInputProps) {
  const getPlaceholder = () => {
    if (type === 'tel') {
      return '+1 (555) 123-4567';
    } else if (type === 'date') {
      return 'dd. mm. yyyy';
    } else if (type === 'time') {
      return '--:--';
    }
    return '';
  };

  return (
    <div className={`space-y-2 w-full ${className}`}>
      <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
        {Icon && <Icon size={18} className="text-primary-600" />}
        {label}
      </label>
      <div className="relative group w-full">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 group-hover:text-primary-500 transition-colors duration-300 pointer-events-none">
            <Icon size={18} strokeWidth={2} />
          </div>
        )}
        
        {/* Enhanced focus ring */}
        <div className="absolute inset-0 border border-primary-300 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
        
        {type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            rows={4}
            className={`form-input ${Icon ? 'pl-10' : ''} ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            min={min}
            className={`form-input ${Icon ? 'pl-10' : ''} ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}`}
            placeholder={getPlaceholder()}
          />
        )}
      </div>
      {error && <FormError message={error} />}
    </div>
  );
}