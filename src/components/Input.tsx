import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div>
      {label && (
        <label className="block mb-1">
          {label}
        </label>
      )}
      <input
        className={`block w-full rounded-md border-[#00be00] shadow-sm focus:border-[#00be00] focus:ring-[#00be00] text-sm py-1.5 px-2 ${className}`}
        {...props}
      />
    </div>
  );
};