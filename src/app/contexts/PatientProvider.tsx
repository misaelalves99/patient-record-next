// /electronic-patient-record-platform/src/contexts/PatientProvider.tsx

import React, { useState, ReactNode } from "react";
import { PatientContext } from "./PatientContext";
import { Patient } from "../types/patient.types";

interface PatientProviderProps {
  children: ReactNode;
}

export const PatientProvider: React.FC<PatientProviderProps> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);

  const addPatient = (patient: Patient) => {
    setPatients((prev) => [...prev, patient]);
  };

  const updatePatient = (updated: Patient) => {
    setPatients((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const removePatient = (id: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PatientContext.Provider
      value={{ patients, addPatient, updatePatient, removePatient }}
    >
      {children}
    </PatientContext.Provider>
  );
};
