// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { User } from '../../types/auth.types';

const users: User[] = [
  {
    id: 'u1',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@email.com',
    role: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'u2',
    firstName: 'Doctor',
    lastName: 'Smith',
    email: 'doctor@email.com',
    role: 'doctor',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const newUser: User = await req.json();
  newUser.id = `u${users.length + 1}`;
  newUser.createdAt = new Date().toISOString();
  newUser.updatedAt = new Date().toISOString();
  users.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}
