import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { RegistrationData } from '../types';
import { submitRegistration } from '../services/api';
import { getTelegramWebApp } from '../utils/telegram';
import { showNotifications } from '../utils/notifications';
import { ScannerModal } from './ScannerModal';
import { ErrorModal } from './ErrorModal';
import { SuccessModal } from './SuccessModal';
import { Logo } from './Logo';
import { Button } from './Button';
import { FormFields } from './FormFields';

export default function RegistrationForm() {
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    serialNumber: '',
    deviceModel: '',
    purchaseDate: '',
    receipt: null,
    consentGiven: false,
  });
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState({ 
    show: false, 
    message: '',
    showCertificateButton: true 
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const webApp = getTelegramWebApp();
    if (webApp?.initDataUnsafe?.user) {
      const { id, photo_url, username } = webApp.initDataUnsafe.user;
      setFormData(prev => ({
        ...prev,
        userId: String(id),
        userPhoto: photo_url,
        username
      }));
    }
  }, []);

  const handleCloseErrorModal = () => {
    setErrorMessage(null);
  };

  const handleCloseSuccessModal = () => {
    setSuccessData(prev => ({ ...prev, show: false }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'receipt' && files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSerialNumberChange = (value: string) => {
    setFormData(prev => ({ ...prev, serialNumber: value }));
  };

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, consentGiven: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const loadingToast = showNotifications.submitting();

      const result = await submitRegistration(formData);
      
      toast.dismiss(loadingToast);
      
      if (result.success) {
        setSuccessData({ 
          show: true, 
          message: result.message,
          showCertificateButton: result.showCertificateButton 
        });
        setFormData(prev => ({
          name: '',
          surname: '',
          email: '',
          phone: '',
          serialNumber: '',
          deviceModel: '',
          purchaseDate: '',
          receipt: null,
          consentGiven: false,
          userId: prev.userId,
          userPhoto: prev.userPhoto,
          username: prev.username
        }));
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage('Ошибка при регистрации устройства. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-2 px-3 overflow-x-hidden" style={{ backgroundColor: 'rgb(240, 253, 244)' }}>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-3">
          <Logo />
          <h2 className="text-xl font-bold text-gray-900 mb-3 text-center uppercase tracking-wide">
            Регистрация устройства
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <FormFields
              formData={formData}
              handleInputChange={handleInputChange}
              handleSerialNumberChange={handleSerialNumberChange}
              handleConsentChange={handleConsentChange}
              fileInputRef={fileInputRef}
              setIsScannerOpen={setIsScannerOpen}
            />

            <Button 
              type="submit" 
              className="w-full text-sm py-2"
              disabled={isSubmitting || !formData.consentGiven}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Отправка...
                </span>
              ) : (
                'Отправить данные'
              )}
            </Button>
          </form>
        </div>
      </div>

      {isScannerOpen && (
        <ScannerModal
          onClose={() => setIsScannerOpen(false)}
          onScan={(value) => {
            handleSerialNumberChange(value);
            setIsScannerOpen(false);
          }}
        />
      )}

      {errorMessage && (
        <ErrorModal
          message={errorMessage}
          onClose={handleCloseErrorModal}
        />
      )}

      {successData.show && (
        <SuccessModal 
          message={successData.message} 
          showCertificateButton={successData.showCertificateButton}
          onClose={handleCloseSuccessModal}
        />
      )}
    </div>
  );
}