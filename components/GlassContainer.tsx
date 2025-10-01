import React from 'react';

// FIX: Extend with HTMLAttributes to allow passing standard DOM props like onClick.
interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

// FIX: Wrap component in React.forwardRef to allow passing refs to the underlying div.
const GlassContainer = React.forwardRef<HTMLDivElement, GlassContainerProps>(
  ({ children, className = '', isLoading = false, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className={`relative bg-[var(--glass-bg)] backdrop-blur-[30px] rounded-2xl border border-[var(--glass-border)] shadow-lg dark:shadow-black/20 overflow-hidden ${className}`}>
      {/* Glossy sheen for light mode */}
      <div className="hidden dark:hidden absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
      
      {children}

      {isLoading && (
        <div className="absolute inset-0 animate-shimmer pointer-events-none"></div>
      )}
    </div>
  );
});

GlassContainer.displayName = 'GlassContainer';

export default GlassContainer;
