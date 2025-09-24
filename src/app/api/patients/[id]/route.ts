// src/app/api/patients/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Patient } from "../../../types/patient.types";
import { initPatients, savePatients } from "../../../lib/fakePatientApi";

// Função util para extrair ID do path
function getIdFromUrl(req: NextRequest) {
  // req.nextUrl.pathname = "/api/patients/123"
  const parts = req.nextUrl.pathname.split("/");
  return parts[parts.length - 1];
}

// GET paciente por ID
export async function GET(req: NextRequest) {
  const id = getIdFromUrl(req);
  const patients = initPatients();
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
  }

  return NextResponse.json(patient);
}

// PUT: atualizar paciente
export async function PUT(req: NextRequest) {
  const id = getIdFromUrl(req);
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
export async function DELETE(req: NextRequest) {
  const id = getIdFromUrl(req);
  const patients = initPatients();

  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
  }

  patients.splice(index, 1);
  savePatients(patients);

  return NextResponse.json({ success: true });
}
