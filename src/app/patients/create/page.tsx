// src/app/patients/create/page.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PatientForm } from "../../components/patients/PatientForm";
import { Patient } from "../../types/patient.types";
import { initPatients, savePatients } from "../../lib/fakePatientApi";
import styles from "./page.module.css";

export const CreatePatientPage: React.FC = () => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleCreate = (data: Omit<Patient, "id" | "createdAt" | "updatedAt">) => {
    setSaving(true);

    try {
      const patients = initPatients(); // Carrega pacientes existentes
      const ids = patients.map((p) => parseInt(p.id, 10));
      const maxId = ids.length > 0 ? Math.max(...ids) : 0;
      const id = String(maxId + 1);
      const now = new Date().toISOString();

      const newPatient: Patient = {
        id,
        ...data,
        createdAt: now,
        updatedAt: now,
      };

      patients.push(newPatient);
      savePatients(patients); // Salva no localStorage / memória fake

      alert("Paciente criado com sucesso!");
      router.push("/patients");
    } catch (error) {
      console.error("Erro ao criar paciente:", error);
      alert("Falha ao criar paciente.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastrar Paciente</h1>
      <PatientForm onSubmit={handleCreate} saving={saving} />
    </div>
  );
};

export default CreatePatientPage;
