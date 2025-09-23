// src/app/api/patients/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Patient } from "../../types/patient.types";

// Base de dados temporária (persistirá na memória enquanto o servidor rodar)
export let patients: Patient[] = [
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET: todos os pacientes
export async function GET() {
  return NextResponse.json(patients);
}

// POST: criar paciente
export async function POST(req: NextRequest) {
  const newPatient = await req.json();
  const id = `${patients.length + 1}`;
  const now = new Date().toISOString();

  const patient: Patient = {
    id,
    ...newPatient,
    createdAt: now,
    updatedAt: now,
  };

  patients.push(patient);
  return NextResponse.json(patient, { status: 201 });
}
