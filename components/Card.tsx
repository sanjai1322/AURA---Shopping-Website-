import React from 'react';
import GlassContainer from './GlassContainer';

// Allow standard HTML attributes to be passed down
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', isLoading = false, ...props }) => {
  return (
    <div className="relative h-full" {...props}>
      <GlassContainer className={`relative flex flex-col h-full ${className}`} isLoading={isLoading}>
        {children}
      </GlassContainer>
    </div>
  );
};

export default Card;
