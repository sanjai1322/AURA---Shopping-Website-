import React from 'react';
import { useToast } from '../hooks/useToast';
import Toast from './Toast';

const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-8 right-8 z-[200] space-y-3 w-full max-w-xs">
      {toasts.map(toast => (
        <Toast key={toast.id} message={toast.message} />
      ))}
    </div>
  );
};

export default ToastContainer;
