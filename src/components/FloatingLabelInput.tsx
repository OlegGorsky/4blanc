import React from 'react';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  required,
  className = '',
  ...props
}) => {
  return (
    <div className="relative">
      <input
        {...props}
        placeholder=" "
        className={`peer block w-full rounded-md border-2 border-[#00be00] shadow-sm focus:border-[#00be00] focus:ring-[#00be00] text-sm h-[42px] px-2 ${className} ${props.type === 'date' ? 'appearance-none' : ''}`}
        required={required}
      />
      <label
        className={`absolute text-sm text-gray-500 duration-150 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] 
          bg-white px-2 peer-placeholder-shown:px-2 peer-focus:px-2
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75 peer-focus:-translate-y-4 left-1 cursor-text
          ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}`}
        onClick={(e) => {
          const input = (e.target as HTMLLabelElement).parentElement?.querySelector('input');
          if (input) {
            input.focus();
          }
        }}
      >
        {label}
      </label>
    </div>
  );
};