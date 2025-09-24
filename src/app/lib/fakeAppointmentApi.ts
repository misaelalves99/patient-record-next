// src/lib/fakeAppointmentApi.ts

import { Appointment } from "../types/appointment.types";

// Chave do localStorage
const STORAGE_KEY = "appointments";

// Carrega appointments do localStorage
export const loadAppointments = (): Appointment[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Salva appointments no localStorage
export const saveAppointments = (appointments: Appointment[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
};

// Inicializa lista padrão se estiver vazia
export const initAppointments = (): Appointment[] => {
  const appointments = loadAppointments();
  if (appointments.length === 0) {
    const now = new Date().toISOString();
    const defaultAppointments: Appointment[] = [
      {
        id: "1",
        patientId: "1",
        doctorId: "1",
        date: now,
        status: "scheduled",
        notes: "Primeira consulta",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "2",
        patientId: "2",
        doctorId: "2",
        date: now,
        status: "completed",
        notes: "Consulta de retorno",
        createdAt: now,
        updatedAt: now,
      },
    ];
    saveAppointments(defaultAppointments);
    return defaultAppointments;
  }
  return appointments;
};

// Adiciona um novo appointment
export const addAppointment = (appt: Omit<Appointment, "id" | "createdAt" | "updatedAt">): Appointment => {
  const appointments = loadAppointments();
  const newAppt: Appointment = {
    ...appt,
    id: (appointments.length + 1).toString(), // apenas número
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const updatedList = [...appointments, newAppt];
  saveAppointments(updatedList);
  return newAppt;
};

// Deleta appointment
export const deleteAppointment = (id: string) => {
  const appointments = loadAppointments();
  const updatedList = appointments.filter((a) => a.id !== id);
  saveAppointments(updatedList);
};
