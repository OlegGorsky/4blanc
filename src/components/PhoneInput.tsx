import React from 'react';
import { formatPhoneNumber, formatPhoneDisplay } from '../utils/phoneFormat';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, required }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    if (formatted.length <= 11) {
      onChange(formatted);
    }
  };

  return (
    <input
      type="tel"
      value={formatPhoneDisplay(value)}
      onChange={handleChange}
      required={required}
      placeholder=" "
      className="peer block w-full rounded-md border-2 border-[#00be00] shadow-sm focus:border-[#00be00] focus:ring-[#00be00] text-sm py-2 px-2"
    />
  );
};