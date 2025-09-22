// src/lib/constants.ts

export const ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  NURSE: 'nurse',
  PATIENT: 'patient',
} as const;

export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELED: 'canceled',
} as const;

export const CARE_PATHWAY_TYPES = {
  DIABETES: 'Diabetes',
  CARDIO: 'Cardiology',
  ORTHO: 'Orthopedics',
} as const;
