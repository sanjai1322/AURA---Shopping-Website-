import React from 'react';
import Card from './Card';

const ProductCardSkeleton: React.FC = () => {
  return (
    <Card isLoading={true}>
      <div className="relative">
        <div className="aspect-square bg-[var(--skeleton-bg)] animate-pulse-bg"></div>
      </div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-[var(--skeleton-bg)] rounded w-1/3 animate-pulse-bg" style={{ animationDelay: '0.05s' }}></div>
        <div className="h-5 bg-[var(--skeleton-bg)] rounded w-4/5 animate-pulse-bg" style={{ animationDelay: '0.1s' }}></div>
        <div className="flex items-center justify-between pt-1">
          <div className="h-6 bg-[var(--skeleton-bg)] rounded w-1/2 animate-pulse-bg" style={{ animationDelay: '0.15s' }}></div>
          <div className="h-5 bg-[var(--skeleton-bg)] rounded w-1/4 animate-pulse-bg" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <div className="h-10 bg-[var(--skeleton-bg)] rounded-full mt-1 animate-pulse-bg" style={{ animationDelay: '0.25s' }}></div>
      </div>
    </Card>
  );
};

export default ProductCardSkeleton;
