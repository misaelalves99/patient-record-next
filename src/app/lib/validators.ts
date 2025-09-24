// src/lib/validators.ts

export const isEmailValid = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isRequired = (value: unknown): boolean => {
  return value !== undefined && value !== null && value !== "";
};

export const isMinLength = (value: string, length: number): boolean => {
  return value.length >= length;
};

export const isMaxLength = (value: string, length: number): boolean => {
  return value.length <= length;
};
