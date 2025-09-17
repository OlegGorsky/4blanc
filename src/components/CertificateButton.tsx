import React from 'react';
import { Button } from './Button';

export const CertificateButton: React.FC = () => {
  const handleClick = () => {
    window.open('https://t.me/blanc_reg_bot', '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      className="mt-4 bg-white border-[#00be00] text-[#00be00] hover:bg-green-50"
      variant="secondary"
    >
      Получить сертификат
    </Button>
  );
};