// src/app/api/doctors/route.ts

import { NextResponse } from "next/server";
import { initDoctors } from "../../lib/fakeDoctorApi";

export const GET = async () => {
  try {
    const doctors = initDoctors(); // usa a função da fake API
    return NextResponse.json(doctors);
  } catch (error) {
    console.error("Erro ao buscar médicos:", error);
    return NextResponse.json(
      { message: "Erro ao buscar médicos" },
      { status: 500 }
    );
  }
};
