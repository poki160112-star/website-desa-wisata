import { useState } from 'react';
import { Mountain } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#1b4d3e] via-[#2b624f] to-[#376757] text-white p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Mountain className="w-8 h-8 text-[#a3e635] mb-2 opacity-90" />
        {fallbackTitle && (
          <span className="text-xs font-semibold tracking-tight text-[#f8faf5]/90 max-w-[18ch] line-clamp-2">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
