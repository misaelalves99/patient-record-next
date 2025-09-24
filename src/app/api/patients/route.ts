// src/app/api/patients/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Patient } from "../../types/patient.types";
import { initPatients, savePatients } from "../../lib/fakePatientApi";

// GET: listar pacientes ou buscar por query ?id=123
export async function GET(req: NextRequest) {
  const patients = initPatients();
  const id = req.nextUrl.searchParams.get("id");

  if (id) {
    const patient = patients.find((p) => p.id === id);
    if (!patient) {
      return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
    }
    return NextResponse.json(patient);
  }

  return NextResponse.json(patients);
}

// POST: criar novo paciente
export async function POST(req: NextRequest) {
  const newPatient: Omit<Patient, "id" | "createdAt"> = await req.json();
  const patients = initPatients();

  const patient: Patient = {
    id: (Math.max(0, ...patients.map((p) => Number(p.id))) + 1).toString(),
    createdAt: new Date().toISOString(),
    ...newPatient,
  };

  patients.push(patient);
  savePatients(patients);

  return NextResponse.json(patient, { status: 201 });
}

// PUT: atualizar paciente via body { id, ...fields }
export async function PUT(req: NextRequest) {
  const updatedData: Partial<Omit<Patient, "createdAt">> & { id: string } = await req.json();
  const patients = initPatients();

  const index = patients.findIndex((p) => p.id === updatedData.id);
  if (index === -1) {
    return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
  }

  patients[index] = { ...patients[index], ...updatedData, updatedAt: new Date().toISOString() };
  savePatients(patients);

  return NextResponse.json(patients[index]);
}

// DELETE: remover paciente via query ?id=123
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });

  const patients = initPatients();
  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
  }

  patients.splice(index, 1);
  savePatients(patients);

  return NextResponse.json({ success: true });
}
