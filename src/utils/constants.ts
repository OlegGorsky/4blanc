export const FORM_CONSTANTS = {
  SERIAL_NUMBER_FORMAT: 'А000000 или Р000000',
  SERIAL_NUMBER_ERROR: 'Неправильный формат серийного номера! Попробуйте еще раз.',
  MODELS: {
    ALIZE: '4BLANC Alize',
    PRO: '4BLANC PRO'
  }
} as const;

export const API_CONSTANTS = {
  WEBHOOK_WITH_RECEIPT: 'https://gorskybase.store/webhook/3c44dcba-14df-4d73-9588-c540bd56dbed',
  WEBHOOK_WITHOUT_RECEIPT: 'https://gorskybase.store/webhook/feec5e94-ad7f-43b5-833a-9d6b945cdbfa'
} as const;