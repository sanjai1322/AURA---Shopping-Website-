import React, { useState } from 'react';

interface ImageWithLoaderProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'className'> {
  className?: string; // For the container
  imgClassName?: string; // For the img element itself
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ src, alt, className = '', imgClassName = '', ...props }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative bg-[var(--skeleton-bg)] overflow-hidden ${className}`}>
      {/* Shimmer effect that fades out */}
      <div
        className={`absolute inset-0 animate-shimmer transition-opacity duration-500 ${!isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
      <img
        src={src}
        alt={alt}
        className={`w-full h-full transition-all duration-700 ease-in-out ${imgClassName} ${isLoading ? 'opacity-0 blur-md scale-105' : 'opacity-100 blur-0 scale-100'}`}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
};
export default ImageWithLoader;