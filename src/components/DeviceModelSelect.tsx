import React from 'react';
import { FORM_CONSTANTS } from '../utils/constants';
import { ChevronDown } from 'lucide-react';

interface DeviceModelSelectProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const DeviceModelSelect: React.FC<DeviceModelSelectProps> = ({ value, onChange, required }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="peer block w-full rounded-md border-2 border-[#00be00] shadow-sm focus:border-[#00be00] focus:ring-[#00be00] text-sm h-[42px] px-2 appearance-none bg-white pr-8"
      >
        <option value="">Выберите модель</option>
        <option value={FORM_CONSTANTS.MODELS.ALIZE}>{FORM_CONSTANTS.MODELS.ALIZE}</option>
        <option value={FORM_CONSTANTS.MODELS.PRO}>{FORM_CONSTANTS.MODELS.PRO}</option>
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
    </div>
  );
};