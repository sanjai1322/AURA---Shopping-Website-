import React, { useEffect } from 'react';
import GlassContainer from './GlassContainer';
import Button from './Button';
import XIcon from './icons/XIcon';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[100] p-4 animation-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-dialog-title"
    >
      <GlassContainer
        className="relative w-full max-w-md p-8 animation-zoom-in"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] z-10 p-1 rounded-full hover:bg-[var(--glass-bg)]"
          aria-label="Close"
        >
          <XIcon className="w-5 h-5" />
        </button>

        <h2 id="confirmation-dialog-title" className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-[var(--text-secondary)] mb-8">{message}</p>

        <div className="flex justify-end gap-4">
          <Button
            onClick={onClose}
            className="px-6 py-2 bg-transparent dark:bg-[var(--glass-bg)] hover:bg-[var(--glass-bg)] dark:hover:bg-[rgba(255,255,255,0.1)]"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 border-red-500/50 text-red-300"
          >
            Confirm
          </Button>
        </div>
      </GlassContainer>
    </div>
  );
};

export default ConfirmationModal;
