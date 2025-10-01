import React from 'react';
import GlassContainer from './GlassContainer';
import CheckIcon from './icons/CheckIcon';

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <GlassContainer className="p-3 shadow-2xl animation-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-green-500/20 text-green-300 border border-green-500/30">
            <CheckIcon className="w-5 h-5" />
        </div>
        <p className="text-sm font-semibold text-[var(--text-primary)]">{message}</p>
      </div>
    </GlassContainer>
  );
};

export default Toast;
