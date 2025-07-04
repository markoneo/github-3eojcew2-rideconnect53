import React from 'react';

interface MobileOptimizedSectionProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  background?: 'white' | 'gray' | 'primary' | 'transparent';
}

export default function MobileOptimizedSection({
  children,
  className = '',
  padding = 'medium',
  background = 'transparent'
}: MobileOptimizedSectionProps) {
  const paddingClasses = {
    none: '',
    small: 'py-8 px-4 sm:py-12 sm:px-6 lg:px-8',
    medium: 'py-12 px-4 sm:py-16 sm:px-6 lg:px-8',
    large: 'py-16 px-4 sm:py-20 sm:px-6 lg:px-8'
  };

  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-neutral-50',
    primary: 'bg-primary-50',
    transparent: 'bg-transparent'
  };

  return (
    <section className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}