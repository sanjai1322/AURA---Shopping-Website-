import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text, className = '' }) => {
  return (
    <div className={`relative group flex items-center ${className}`}>
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max whitespace-nowrap bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
        {text}
        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-black/50"></div>
      </div>
    </div>
  );
};

export default Tooltip;
