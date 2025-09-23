// src/app/api/patients/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { patients } from "../route";

// GET paciente por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
  }
  return NextResponse.json(patient);
}

// PUT: atualizar paciente
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const updatedData = await req.json();

  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
  }

  patients[index] = {
    ...patients[index],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json(patients[index]);
}

// DELETE: remover paciente
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const index = patients.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
  }

  patients.splice(index, 1);
  return NextResponse.json({ success: true });
}
