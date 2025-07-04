import React, { useState, useCallback } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fallback?: string;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  fallback,
  sizes,
  objectFit = 'cover'
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setImageError(true);
    setIsLoading(false);
  }, []);

  // Generate WebP and fallback sources
  const generateSources = (originalSrc: string) => {
    // For external URLs, we'll optimize what we can
    if (originalSrc.includes('postimg.cc') || originalSrc.includes('pexels.com')) {
      return {
        webp: originalSrc,
        fallback: originalSrc
      };
    }
    return { webp: originalSrc, fallback: originalSrc };
  };

  const { webp, fallback: fallbackSrc } = generateSources(src);
  const finalSrc = imageError ? (fallback || fallbackSrc) : webp;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 bg-neutral-300 rounded animate-pulse"></div>
        </div>
      )}
      
      <img
        src={finalSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${objectFit === 'cover' ? 'object-cover' : `object-${objectFit}`} w-full h-full`}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
      />
    </div>
  );
}