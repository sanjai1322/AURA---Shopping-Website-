import React from 'react';
import GlassContainer from './GlassContainer';
import Button from './Button';
import WarningIcon from './icons/WarningIcon';

interface ErrorMessageProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, message, onRetry }) => {
  return (
    <GlassContainer className="p-8 text-center border-red-500/30 animation-fade-in-up">
      <div className="flex flex-col items-center">
        <WarningIcon className="w-16 h-16 text-red-400/80 mb-4" />
        <h2 className="text-2xl font-bold text-red-400/90 mb-2">{title}</h2>
        <p className="text-[var(--text-secondary)] mb-6 max-w-sm mx-auto">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} className="px-8 py-3">
            Try Again
          </Button>
        )}
      </div>
    </GlassContainer>
  );
};

export default ErrorMessage;