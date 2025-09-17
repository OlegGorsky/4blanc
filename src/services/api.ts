import { RegistrationData, ApiResponse } from '../types';
import { API_CONSTANTS } from '../utils/constants';
import { API_RESPONSES, getResponseMessage } from '../utils/apiResponses';

export async function submitRegistration(data: RegistrationData): Promise<ApiResponse> {
  try {
    const formData = new FormData();
    
    // Add form fields
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && key !== 'consentGiven') {
        if (key === 'serialNumber') {
          formData.append(key, value.toUpperCase());
        } else {
          formData.append(key, value);
        }
      }
    });

    // Add registration date in Moscow timezone
    const moscowDate = new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    formData.append('registrationDate', moscowDate);

    const webhookUrl = data.receipt 
      ? API_CONSTANTS.WEBHOOK_WITH_RECEIPT 
      : API_CONSTANTS.WEBHOOK_WITHOUT_RECEIPT;

    const response = await fetch(webhookUrl, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      return {
        success: false,
        message: 'Добрый день! Этот серийный номер уже зарегистрирован. Проверьте правильность заполнения поля «Серийный номер». Если все заполнено верно, свяжитесь с нами через чат-бот или по телефону 8-800-301-76-26',
        showCertificateButton: false
      };
    }

    const result = await response.json();
    console.log('N8N Response:', result);

    if (result.result === false) {
      return {
        success: false,
        message: 'Добрый день! Этот серийный номер уже зарегистрирован. Проверьте правильность заполнения поля «Серийный номер». Если все заполнено верно, свяжитесь с нами через чат-бот или по телефону 8-800-301-76-26',
        showCertificateButton: false
      };
    }

    if (typeof result.result === 'string') {
      const resultType = result.result.toLowerCase() as keyof typeof API_RESPONSES;
      
      if (resultType === API_RESPONSES.ERROR) {
        return {
          success: false,
          message: 'Ошибка при регистрации устройства. Попробуйте еще раз.',
          showCertificateButton: false
        };
      }

      return {
        success: resultType === API_RESPONSES.OK || resultType === API_RESPONSES.AGAIN || resultType === API_RESPONSES.MEDIUM,
        message: getResponseMessage(resultType),
        showCertificateButton: resultType === API_RESPONSES.OK
      };
    }

    return {
      success: false,
      message: 'Добрый день! Этот серийный номер уже зарегистрирован. Проверьте правильность заполнения поля «Серийный номер». Если все заполнено верно, свяжитесь с нами через чат-бот или по телефону 8-800-301-76-26',
      showCertificateButton: false
    };
  } catch (error) {
    console.error('Error submitting registration:', error);
    return {
      success: false,
      message: 'Добрый день! Этот серийный номер уже зарегистрирован. Проверьте правильность заполнения поля «Серийный номер». Если все заполнено верно, свяжитесь с нами через чат-бот или по телефону 8-800-301-76-26',
      showCertificateButton: false
    };
  }
}