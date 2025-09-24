// src/app/api/patients/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Patient } from "../../types/patient.types";
import { initPatients, savePatients } from "../../lib/fakePatientApi";

// GET: retorna todos os pacientes
export async function GET() {
  const patients = initPatients();
  return NextResponse.json(patients);
}

// POST: cria paciente
export async function POST(req: NextRequest) {
  const newPatientData: Omit<Patient, "id" | "createdAt" | "updatedAt"> = await req.json();
  const patients = initPatients();

  const ids = patients.map((p) => parseInt(p.id, 10));
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  const id = String(maxId + 1);
  const now = new Date().toISOString();

  const patient: Patient = { id, ...newPatientData, createdAt: now, updatedAt: now };
  patients.push(patient);
  savePatients(patients);

  return NextResponse.json(patient, { status: 201 });
}
