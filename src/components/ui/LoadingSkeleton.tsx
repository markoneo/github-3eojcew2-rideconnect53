import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'text' | 'circle' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
}

export default function LoadingSkeleton({
  variant = 'rectangular',
  width = '100%',
  height = '1rem',
  lines = 1,
  className = ''
}: LoadingSkeletonProps) {
  const baseClasses = 'bg-neutral-200 animate-pulse rounded relative overflow-hidden';
  
  const shimmerClasses = `
    before:absolute before:inset-0 
    before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent
    before:translate-x-[-100%] before:animate-[shimmer_2s_infinite]
  `;

  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return `h-4 ${shimmerClasses}`;
      case 'circle':
        return `rounded-full aspect-square ${shimmerClasses}`;
      case 'rectangular':
        return `${shimmerClasses}`;
      case 'card':
        return `rounded-xl p-4 ${shimmerClasses}`;
      default:
        return shimmerClasses;
    }
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${getVariantClasses()}`}
            style={{
              width: i === lines - 1 ? '75%' : width,
              height: height
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={{ width, height }}
    />
  );
}