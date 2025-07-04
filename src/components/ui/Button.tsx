import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

export default function Button({ 
  children, 
  href, 
  onClick, 
  variant = 'primary',
  className = '',
  type = 'button',
  size = 'medium',
  disabled = false
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 transform focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
  
  const sizeStyles = {
    small: 'px-4 py-2 text-sm rounded-lg',
    medium: 'px-6 py-3 text-base rounded-xl',
    large: 'px-8 py-4 text-lg rounded-xl'
  };
  
  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary'
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href && !disabled) {
    return (
      <a href={href} className={combinedStyles}>
        {children}
      </a>
    );
  }

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={combinedStyles}
      disabled={disabled}
    >
      {children}
    </button>
  );
}