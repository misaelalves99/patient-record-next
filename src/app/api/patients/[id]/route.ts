// src/app/api/patients/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Patient } from "../../../types/patient.types";
import { initPatients, savePatients } from "../../../lib/fakePatientApi";

// GET paciente por ID
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const patients = initPatients();
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
  }

  return NextResponse.json(patient);
}

// PUT: atualizar paciente
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const updatedData: Partial<Omit<Patient, "id" | "createdAt">> = await req.json();
  const patients = initPatients();

  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
  }

  patients[index] = { ...patients[index], ...updatedData, updatedAt: new Date().toISOString() };
  savePatients(patients);

  return NextResponse.json(patients[index]);
}

// DELETE: remover paciente
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const patients = initPatients();

  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
  }

  patients.splice(index, 1);
  savePatients(patients);

  return NextResponse.json({ success: true });
}
