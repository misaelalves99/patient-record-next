// /electronic-patient-record-platform/src/types/patient.types.ts

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  createdAt: string;
  updatedAt: string;
}
