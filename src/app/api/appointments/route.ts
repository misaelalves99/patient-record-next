// src/app/api/appointments/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Appointment } from "../../types/appointment.types";

// Base de dados temporária em memória
let appointments: Appointment[] = [
  {
    id: "1",
    patientId: "1",
    doctorId: "d1",
    date: new Date().toISOString(),
    status: "scheduled",
    notes: "Primeira consulta",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    patientId: "2",
    doctorId: "d2",
    date: new Date().toISOString(),
    status: "completed",
    notes: "Consulta de retorno",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET: todos ou por query string ?id=
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const appointment = appointments.find((a) => a.id === id);
    if (!appointment)
      return NextResponse.json({ error: "Agendamento não encontrado" }, { status: 404 });
    return NextResponse.json(appointment);
  }

  return NextResponse.json(appointments);
}

// POST: criar novo appointment
export async function POST(req: NextRequest) {
  const newAppt = await req.json();
  const id = `${appointments.length + 1}`;
  const now = new Date().toISOString();

  const appointment: Appointment = {
    id,
    ...newAppt,
    createdAt: now,
    updatedAt: now,
  };

  appointments.push(appointment);
  return NextResponse.json(appointment, { status: 201 });
}

// PUT: atualizar appointment (body deve conter id)
export async function PUT(req: NextRequest) {
  const updatedAppt = await req.json();
  const index = appointments.findIndex((a) => a.id === updatedAppt.id);
  if (index === -1)
    return NextResponse.json({ error: "Agendamento não encontrado" }, { status: 404 });

  appointments[index] = { ...appointments[index], ...updatedAppt, updatedAt: new Date().toISOString() };
  return NextResponse.json(appointments[index]);
}

// DELETE: deletar por query string ?id=
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });

  appointments = appointments.filter((a) => a.id !== id);
  return NextResponse.json({ success: true });
}
