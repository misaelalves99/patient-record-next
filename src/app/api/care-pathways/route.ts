// src/app/api/care-pathways/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { CarePathway } from '../../types/carePathway.types';

let pathways: CarePathway[] = [
  {
    id: 'cp1',
    name: 'Diabetes Tipo 2',
    type: 'Diabetes',
    description: 'Acompanhamento do paciente diabético',
    startDate: '2025-09-01',
    endDate: '2025-12-31',
    patientId: 'p1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cp2',
    name: 'Cardiologia',
    type: 'Cardiology',
    description: 'Plano de cuidados cardiológicos',
    startDate: '2025-09-10',
    patientId: 'p2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(pathways);
}

export async function POST(req: NextRequest) {
  const newPathway = await req.json();
  newPathway.id = `cp${pathways.length + 1}`;
  newPathway.createdAt = new Date().toISOString();
  newPathway.updatedAt = new Date().toISOString();
  pathways.push(newPathway);
  return NextResponse.json(newPathway, { status: 201 });
}
