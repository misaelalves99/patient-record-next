// src/app/patients/[id]/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./page.module.css";
import { Patient } from "../../types/patient.types";
import { get } from "../../lib/api";

export const PatientDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      try {
        const data = await get<Patient[]>("/patients");
        const found = data.find((p) => p.id === id);
        setPatient(found || null);
      } catch (error) {
        console.error("Erro ao carregar paciente:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading) return <p>Carregando paciente...</p>;
  if (!patient) return <p>Paciente não encontrado.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {patient.firstName} {patient.lastName}
      </h1>
      <p>Email: {patient.email}</p>
      {patient.phone && <p>Telefone: {patient.phone}</p>}
      {patient.dateOfBirth && <p>Data de nascimento: {patient.dateOfBirth}</p>}
      {patient.gender && <p>Gênero: {patient.gender}</p>}
    </div>
  );
};

export default PatientDetailsPage;
