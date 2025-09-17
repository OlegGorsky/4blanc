import toast from 'react-hot-toast';

export const showNotifications = {
  submitting: () => 
    toast.loading(
      'Спасибо! Ваши данные отправлены для проверки. Подождите пару секунд.',
      { duration: 4000 }
    ),

  success: (message: string) =>
    toast.success(message, { duration: 4000 }),

  error: () =>
    toast.error(
      'Ошибка при регистрации устройства. Попробуйте еще раз.',
      { duration: 4000 }
    )
};