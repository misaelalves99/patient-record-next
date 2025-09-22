// src/app/api/appointments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Appointment } from '../../types/appointment.types';

let appointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    doctorId: 'd1',
    date: new Date().toISOString(),
    status: 'scheduled',
    notes: 'Primeira consulta',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'a2',
    patientId: 'p2',
    doctorId: 'd2',
    date: new Date().toISOString(),
    status: 'completed',
    notes: 'Consulta de retorno',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(appointments);
}

export async function POST(req: NextRequest) {
  const newAppt = await req.json();
  newAppt.id = `a${appointments.length + 1}`;
  newAppt.createdAt = new Date().toISOString();
  newAppt.updatedAt = new Date().toISOString();
  appointments.push(newAppt);
  return NextResponse.json(newAppt, { status: 201 });
}
