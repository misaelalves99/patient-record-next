// src/types/appointment.types.ts

export interface Appointment {
  id: string;
  patientId: string;
  carePathwayId?: string;
  doctorId: string;
  date: string;
  status: 'scheduled' | 'completed' | 'canceled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
