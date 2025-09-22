// src/app/api/patients/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Patient } from '../../types/patient.types';

let patients: Patient[] = [
  {
    id: 'p1',
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao.silva@email.com',
    phone: '11999999999',
    dateOfBirth: '1985-05-20',
    gender: 'male',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'p2',
    firstName: 'Maria',
    lastName: 'Oliveira',
    email: 'maria.oliveira@email.com',
    phone: '11988888888',
    dateOfBirth: '1990-08-15',
    gender: 'female',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(patients);
}

export async function POST(req: NextRequest) {
  const newPatient = await req.json();
  newPatient.id = `p${patients.length + 1}`;
  newPatient.createdAt = new Date().toISOString();
  newPatient.updatedAt = new Date().toISOString();
  patients.push(newPatient);
  return NextResponse.json(newPatient, { status: 201 });
}
