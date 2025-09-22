// /electronic-patient-record-platform/src/types/auth.types.ts

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'doctor' | 'nurse' | 'patient';
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'doctor' | 'nurse' | 'patient';
}
