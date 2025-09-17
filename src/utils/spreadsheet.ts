import { GoogleSpreadsheet } from 'google-spreadsheet';
import { RegistrationData } from '../types';
import { SPREADSHEET_ID, SHEET_ID, GOOGLE_CREDENTIALS } from './constants';

export async function checkAndSubmitData(data: RegistrationData) {
  try {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    await doc.useServiceAccountAuth(GOOGLE_CREDENTIALS);
    await doc.loadInfo();
    
    const sheet = doc.sheetsById[SHEET_ID];
    const rows = await sheet.getRows();
    const existingDevice = rows.find(row => row.serialNumber === data.serialNumber);

    const rowData = {
      'Имя': data.name,
      'Телефон': data.phone,
      'Серийный номер': data.serialNumber,
      'Модель устройства': data.deviceModel,
      'Дата покупки': data.purchaseDate,
      'Зарегистрирован': 'true',
      'Дата регистрации': new Date().toLocaleDateString('ru-RU')
    };

    if (existingDevice) {
      Object.keys(rowData).forEach(key => {
        existingDevice[key] = rowData[key];
      });
      await existingDevice.save();
      return {
        success: true,
        message: 'Устройство успешно зарегистрировано!'
      };
    } else {
      await sheet.addRow(rowData);
      return {
        success: true,
        message: 'Новое устройство успешно зарегистрировано!'
      };
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Ошибка при регистрации устройства');
  }
}