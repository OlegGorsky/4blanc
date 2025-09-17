import React from 'react';
import { Toaster } from 'react-hot-toast';
import RegistrationForm from './components/RegistrationForm';
import { initializeTelegramWebApp } from './utils/telegram';

function App() {
  React.useEffect(() => {
    initializeTelegramWebApp();
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      <RegistrationForm />
    </>
  );
}

export default App;