// src/app/patients/edit/page.tsx

"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PatientForm } from "../../components/patients/PatientForm";
import { Patient } from "../../types/patient.types";
import { initPatients, savePatients } from "../../lib/fakePatientApi";
import styles from "./page.module.css";

function EditPatientContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id");
    if (!id) {
      setLoading(false);
      return;
    }

    const patients = initPatients();
    const pat = patients.find((p) => p.id === id) || null;

    if (!pat) alert("Paciente não encontrado.");

    setPatient(pat);
    setLoading(false);
  }, [searchParams]);

  const handleUpdate = (
    data: Omit<Patient, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!patient) return;

    setSaving(true);

    try {
      const updatedPatient: Patient = {
        ...patient,
        ...data,
        updatedAt: new Date().toISOString(),
      };

      const patients = initPatients();
      const index = patients.findIndex((p) => p.id === patient.id);
      if (index !== -1) {
        patients[index] = updatedPatient;
        savePatients(patients);
      }

      alert("Paciente atualizado com sucesso!");
      router.push("/patients");
    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
      alert("Falha ao atualizar paciente.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className={styles.message}>Carregando paciente...</p>;
  if (!patient) return <p className={styles.message}>Paciente não encontrado.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Editar Paciente</h1>
      <PatientForm
        patient={patient}
        onSubmit={handleUpdate}
        saving={saving}
        loading={loading}
      />
    </div>
  );
}

export default function EditPatientPage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <EditPatientContent />
    </Suspense>
  );
}
