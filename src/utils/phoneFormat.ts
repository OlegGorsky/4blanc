export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const numbers = value.replace(/\D/g, '');
  
  // Ensure the number starts with 7
  if (!numbers.startsWith('7') && numbers.length > 0) {
    return `7${numbers}`;
  }
  
  return numbers;
};

export const formatPhoneDisplay = (value: string): string => {
  const numbers = formatPhoneNumber(value);
  if (!numbers) return '+7';
  
  let result = '+7';
  if (numbers.length > 1) result += ` (${numbers.slice(1, 4)}`;
  if (numbers.length > 4) result += `) ${numbers.slice(4, 7)}`;
  if (numbers.length > 7) result += `-${numbers.slice(7, 9)}`;
  if (numbers.length > 9) result += `-${numbers.slice(9, 11)}`;
  
  return result;
};