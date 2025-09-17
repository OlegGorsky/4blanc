export interface RegistrationData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  serialNumber: string;
  deviceModel: string;
  purchaseDate: string;
  receipt: File | null;
  userId?: string;
  userPhoto?: string;
  username?: string;
  consentGiven: boolean;
}

export interface TelegramWebApp {
  ready: () => void;
  MainButton: {
    show: () => void;
    hide: () => void;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
  };
  initDataUnsafe: {
    user?: {
      id: number;
      photo_url?: string;
      username?: string;
    };
  };
  expand: () => void;
  setBackgroundColor: (color: string) => void;
  setHeaderColor: (color: string) => void;
  close: () => void;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  showCertificateButton: boolean;
}