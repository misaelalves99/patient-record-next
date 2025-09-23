// src/types/patient.types.ts

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  cpf: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  createdAt: string;
  updatedAt: string;
}
