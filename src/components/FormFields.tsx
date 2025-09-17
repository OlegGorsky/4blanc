import React from 'react';
import { Upload } from 'lucide-react';
import { RegistrationData } from '../types';
import { PhoneInput } from './PhoneInput';
import { DeviceModelSelect } from './DeviceModelSelect';
import { FloatingLabelInput } from './FloatingLabelInput';
import { SerialNumberHelp } from './SerialNumberHelp';
import { Button } from './Button';

interface FormFieldsProps {
  formData: RegistrationData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSerialNumberChange: (value: string) => void;
  handleConsentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  setIsScannerOpen: (open: boolean) => void;
}

export const FormFields: React.FC<FormFieldsProps> = ({
  formData,
  handleInputChange,
  handleSerialNumberChange,
  handleConsentChange,
  fileInputRef,
  setIsScannerOpen
}) => {
  const handleSerialInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any spaces and convert to uppercase
    const value = e.target.value.replace(/\s/g, '').toUpperCase();
    handleSerialNumberChange(value);
  };

  return (
    <>
      <FloatingLabelInput
        label="Имя"
        name="name"
        required
        value={formData.name}
        onChange={handleInputChange}
      />

      <FloatingLabelInput
        label="Фамилия"
        name="surname"
        required
        value={formData.surname}
        onChange={handleInputChange}
      />

      <FloatingLabelInput
        label="Email"
        name="email"
        type="email"
        required
        value={formData.email}
        onChange={handleInputChange}
      />

      <div className="relative">
        <PhoneInput
          value={formData.phone}
          onChange={(value) => handleInputChange({
            target: { name: 'phone', value }
          } as React.ChangeEvent<HTMLInputElement>)}
          required
        />
        <label className="absolute text-sm text-gray-500 duration-150 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-1 after:content-['*'] after:ml-0.5 after:text-red-500">
          Телефон
        </label>
      </div>

      <div className="flex">
        <div className="flex-grow relative">
          <input
            type="text"
            name="serialNumber"
            required
            placeholder=" "
            value={formData.serialNumber}
            onChange={handleSerialInput}
            className="peer block w-full rounded-l-md border-2 border-[#00be00] shadow-sm focus:border-[#00be00] focus:ring-[#00be00] text-sm h-[42px] px-2"
          />
          <label className="absolute text-sm text-gray-500 duration-150 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 after:content-['*'] after:ml-0.5 after:text-red-500">
            Серийный номер
          </label>
        </div>
        <button
          type="button"
          onClick={() => setIsScannerOpen(true)}
          className="inline-flex items-center px-4 border-2 border-l-0 border-[#00be00] bg-[#00be00] text-white text-sm h-[42px] hover:bg-[#00a000]"
        >
          <span className="sr-only">Сканировать QR-код</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><rect width="7" height="7" x="7" y="7" rx="1" /><rect width="7" height="7" x="10" y="10" rx="1" />
          </svg>
        </button>
        <SerialNumberHelp />
      </div>

      <div className="relative">
        <DeviceModelSelect
          value={formData.deviceModel}
          onChange={(value) => handleInputChange({
            target: { name: 'deviceModel', value }
          } as React.ChangeEvent<HTMLInputElement>)}
          required
        />
        <label className="absolute text-sm text-gray-500 duration-150 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-1 after:content-['*'] after:ml-0.5 after:text-red-500">
          Модель устройства
        </label>
      </div>

      <FloatingLabelInput
        type="date"
        label="Дата покупки"
        name="purchaseDate"
        required
        value={formData.purchaseDate}
        onChange={handleInputChange}
      />

      <div>
        <input
          type="file"
          name="receipt"
          ref={fileInputRef}
          accept="image/*,.pdf"
          onChange={handleInputChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
          className="w-full justify-center py-2.5 text-sm border-2"
        >
          <Upload className="h-4 w-4 mr-2" />
          <div>
            <div>Загрузить чек о покупке</div>
            <div className="text-xs text-gray-500 font-normal mt-1">(необязательно)</div>
          </div>
        </Button>
        {formData.receipt && (
          <p className="mt-1 text-xs text-gray-500">
            Выбран: {formData.receipt.name}
          </p>
        )}
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          id="consent"
          checked={formData.consentGiven}
          onChange={handleConsentChange}
          required
          className="mt-1 mr-2"
        />
        <label htmlFor="consent" className="text-sm text-gray-600">
          Согласие на обработку персональных данных и получение рекламных рассылок от компании 4BLANC <span className="text-red-500">*</span>
        </label>
      </div>
    </>
  );
};