import React from 'react';
import { X } from 'lucide-react';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Закрыть</span>
        </button>
        
        <div className="mb-4">
          <div className="mx-auto h-12 w-12 text-red-500">
            <X className="h-12 w-12" />
          </div>
        </div>
        
        <div className="text-sm text-gray-600 mb-6 whitespace-pre-line">
          {message}
        </div>
      </div>
    </div>
  );
};