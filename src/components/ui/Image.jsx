import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Reusable Image component that handles:
 * - Lazy loading
 * - Skeleton placeholder while loading
 * - Fallback elegant UI if image fails to load
 */
const Image = ({ src, alt, className, containerClassName, aspectRatio = 'aspect-[3/2]' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset states if src changes
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return (
      <div 
        className={twMerge(
          clsx('bg-border/30 flex items-center justify-center overflow-hidden', aspectRatio),
          containerClassName
        )}
      >
        <span className="text-text-muted font-sans text-xs uppercase tracking-widest font-medium">
          No Image Available
        </span>
      </div>
    );
  }

  return (
    <div className={twMerge(clsx('relative overflow-hidden bg-border/20', aspectRatio), containerClassName)}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-border/30 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt || 'News image'}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={twMerge(
          clsx(
            'w-full h-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0'
          ),
          className
        )}
      />
    </div>
  );
};

export default Image;
