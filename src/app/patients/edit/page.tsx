// src/app/patients/edit/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PatientForm } from "../../components/patients/PatientForm";
import { Patient } from "../../types/patient.types";
import { initPatients, savePatients } from "../../lib/fakePatientApi";
import styles from "./page.module.css";

export const EditPatientPage: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔹 Carregar paciente existente da fake API
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchPatient = () => {
      const patients = initPatients();
      const pat = patients.find((p) => p.id === id) || null;
      if (!pat) alert("Paciente não encontrado.");
      setPatient(pat);
      setLoading(false);
    };

    fetchPatient();
  }, [id]);

  // 🔹 Atualizar paciente na fake API
  const handleUpdate = (
    data: Omit<Patient, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!patient || !id) return;

    setSaving(true);

    try {
      const updatedPatient: Patient = {
        ...patient,
        ...data,
        updatedAt: new Date().toISOString(),
      };

      // Atualizar paciente no localStorage
      const patients = initPatients();
      const index = patients.findIndex((p) => p.id === id);
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

  if (loading) return <p>Carregando paciente...</p>;
  if (!patient) return <p>Paciente não encontrado.</p>;

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
};

export default EditPatientPage;
