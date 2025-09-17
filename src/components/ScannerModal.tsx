import React from 'react';
import { useZxing } from 'react-zxing';

interface ScannerModalProps {
  onClose: () => void;
  onScan: (value: string) => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({ onClose, onScan }) => {
  const { ref } = useZxing({
    onDecodeResult(result) {
      onScan(result.getText());
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-3 rounded-lg w-[90vw] max-w-sm">
        <video ref={ref} className="w-full rounded" />
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full bg-gray-600 text-white py-2 rounded-md text-sm"
        >
          Закрыть сканер
        </button>
      </div>
    </div>
  );
};