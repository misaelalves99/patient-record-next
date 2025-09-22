// src/lib/validators.ts

export const isEmailValid = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isRequired = (value: any) => {
  return value !== undefined && value !== null && value !== '';
};

export const isMinLength = (value: string, length: number) => {
  return value.length >= length;
};

export const isMaxLength = (value: string, length: number) => {
  return value.length <= length;
};
