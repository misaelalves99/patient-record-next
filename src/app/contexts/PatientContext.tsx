// /electronic-patient-record-platform/src/contexts/PatientContext.tsx

"use client";

import { createContext } from "react";
import { Patient } from "../types/patient.types";

export interface PatientContextType {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  updatePatient: (patient: Patient) => void;
  removePatient: (id: string) => void;
}

export const PatientContext = createContext<PatientContextType>({
  patients: [],
  addPatient: () => {},
  updatePatient: () => {},
  removePatient: () => {},
});
