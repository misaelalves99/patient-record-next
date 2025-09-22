// /electronic-patient-record-platform/src/contexts/AppointmentContext.tsx
import { createContext } from 'react';
import { Appointment } from '../types/appointment.types';
export interface AppointmentContextType { appointments: Appointment[]; addAppointment: (appointment: Appointment) => void; updateAppointment: (appointment: Appointment) => void; removeAppointment: (id: string) => void; }
export const AppointmentContext = createContext<AppointmentContextType>({ appointments: [], addAppointment: () => {}, updateAppointment: () => {}, removeAppointment: () => {}, });