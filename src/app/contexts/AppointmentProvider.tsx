// /electronic-patient-record-platform/src/contexts/AppointmentProvider.tsx

"use client";

import React, { useState, ReactNode } from 'react';
import { AppointmentContext } from './AppointmentContext';
import { Appointment } from '../types/appointment.types';

interface AppointmentProviderProps { children: ReactNode; }

export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({ children }) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const addAppointment = (appointment: Appointment) => setAppointments((prev) => [...prev, appointment]);
    const updateAppointment = (updated: Appointment) => setAppointments((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
    const removeAppointment = (id: string) => setAppointments((prev) => prev.filter((a) => a.id !== id));
    return (<AppointmentContext.Provider value={{ appointments, addAppointment, updateAppointment, removeAppointment }}>{children}</AppointmentContext.Provider>);
};
