import React from 'react';
import { X } from 'lucide-react';
import { getTelegramWebApp } from '../utils/telegram';

interface SuccessModalProps {
  message: string;
  showCertificateButton?: boolean;
  onClose?: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ 
  message, 
  showCertificateButton = true,
  onClose 
}) => {
  const handleGetCertificate = () => {
    const webApp = getTelegramWebApp();
    if (webApp) {
      webApp.close();
    } else {
      window.location.href = 'https://t.me/blanc_reg_bot';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Закрыть</span>
          </button>
        )}
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-[#00be00]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="text-sm text-gray-600 mb-6 whitespace-pre-line [&_a]:whitespace-nowrap">
          {message}
        </div>
        {showCertificateButton && (
          <button 
            onClick={handleGetCertificate}
            className="w-full bg-[#00be00] hover:bg-[#00a000] text-white font-medium py-3 px-4 rounded-md text-base transition-colors active:bg-[#009000]"
          >
            Получить сертификат
          </button>
        )}
      </div>
    </div>
  );
}