// src/app/api/patients/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Patient } from "../../types/patient.types";

// Base de dados temporária
let patients: Patient[] = [
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

// GET: todos os pacientes ou por ID
export async function GET(req: NextRequest, { params }: { params?: { id?: string } }) {
  const id = params?.id;
  if (id) {
    const patient = patients.find((p) => p.id === id);
    if (!patient) return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
    return NextResponse.json(patient);
  }
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

// PUT: atualizar paciente
export async function PUT(req: NextRequest) {
  const updatedPatient = await req.json();
  const index = patients.findIndex((p) => p.id === updatedPatient.id);
  if (index === -1) return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });

  patients[index] = { ...patients[index], ...updatedPatient, updatedAt: new Date().toISOString() };
  return NextResponse.json(patients[index]);
}

// DELETE: deletar paciente
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });

  patients = patients.filter((p) => p.id !== id);
  return NextResponse.json({ success: true });
}
