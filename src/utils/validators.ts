export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateSerialNumber = (serialNumber: string): boolean => {
  // Accepts А or Р (Russian letters) in any case followed by any number of digits
  const serialRegex = /^[АРар]\d+$/;
  return serialRegex.test(serialNumber);
};