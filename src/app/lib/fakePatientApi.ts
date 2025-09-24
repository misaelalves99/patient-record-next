// src/lib/fakePatientApi.ts

import { Patient } from "../types/patient.types";

const STORAGE_KEY = "patients";

// Carrega pacientes do localStorage (ou retorna array vazio no server-side)
export const loadPatients = (): Patient[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Salva pacientes no localStorage
export const savePatients = (patients: Patient[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
};

// Inicializa pacientes padrão se não existirem
export const initPatients = (): Patient[] => {
  let patients = loadPatients();
  if (patients.length === 0) {
    const now = new Date().toISOString();
    patients = [
      {
        id: "1",
        firstName: "João",
        lastName: "Silva",
        cpf: "123.456.789-00",
        birthDate: "1985-05-20",
        gender: "male",
        phone: "11999999999",
        email: "joao.silva@email.com",
        address: "Rua A, 123",
        city: "São Paulo",
        state: "SP",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "2",
        firstName: "Maria",
        lastName: "Oliveira",
        cpf: "987.654.321-00",
        birthDate: "1990-08-15",
        gender: "female",
        phone: "11988888888",
        email: "maria.oliveira@email.com",
        address: "Av. B, 456",
        city: "Rio de Janeiro",
        state: "RJ",
        createdAt: now,
        updatedAt: now,
      },
    ];
    savePatients(patients);
  }
  return patients;
};
