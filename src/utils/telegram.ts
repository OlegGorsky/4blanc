import { TelegramWebApp } from '../types';

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export const getTelegramWebApp = () => {
  const webApp = window.Telegram?.WebApp;
  if (webApp) {
    console.log('Telegram WebApp initialized:', {
      user: webApp.initDataUnsafe?.user,
      version: webApp.version
    });
  } else {
    console.log('Telegram WebApp not found');
  }
  return webApp;
};

export const initializeTelegramWebApp = () => {
  const webApp = getTelegramWebApp();
  if (webApp) {
    webApp.ready();
    webApp.expand();
    
    // Set both background and header color
    const bgColor = 'rgb(240, 253, 244)';
    webApp.setBackgroundColor(bgColor);
    
    // For older versions of Telegram WebApp that might use different methods
    if (webApp.setHeaderColor) {
      webApp.setHeaderColor(bgColor);
    }
    
    webApp.MainButton?.hide();

    // Log initialization success
    console.log('Telegram WebApp initialized successfully');
  }
};