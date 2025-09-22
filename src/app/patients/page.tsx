// src/app/patients/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Patient } from "../types/patient.types";
import { get } from "../lib/api";

export const PatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await get<Patient[]>("/patients");
        setPatients(data);
      } catch (error) {
        console.error("Erro ao carregar pacientes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  if (loading) return <p>Carregando pacientes...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pacientes</h1>
      {patients.length === 0 ? (
        <p>Nenhum paciente encontrado.</p>
      ) : (
        <ul className={styles.list}>
          {patients.map((patient) => (
            <li key={patient.id} className={styles.item}>
              {patient.firstName} {patient.lastName} ({patient.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientsPage;
