// src/app/patients/[id]/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Patient } from "../../types/patient.types";
import { get } from "../../lib/api";

interface PatientDetailsPageProps {
  params: { id: string };
}

export const PatientDetailsPage: React.FC<PatientDetailsPageProps> = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      try {
        const data = await get<Patient[]>("/patients");
        const found = data.find((p) => p.id.replace(/^p/, "") === id); 
        setPatient(found || null);
      } catch (error) {
        console.error("Erro ao carregar paciente:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading) return <p className={styles.message}>Carregando paciente...</p>;
  if (!patient) return <p className={styles.message}>Paciente não encontrado.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalhes do Paciente</h1>

      <div className={styles.card}>
        <div className={styles.row}>
          <span className={styles.label}>Nome:</span>
          <span className={styles.value}>{patient.firstName} {patient.lastName}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>CPF:</span>
          <span className={styles.value}>{patient.cpf}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>{patient.email}</span>
        </div>
        {patient.phone && (
          <div className={styles.row}>
            <span className={styles.label}>Telefone:</span>
            <span className={styles.value}>{patient.phone}</span>
          </div>
        )}
        {patient.birthDate && (
          <div className={styles.row}>
            <span className={styles.label}>Data de nascimento:</span>
            <span className={styles.value}>{patient.birthDate}</span>
          </div>
        )}
        {patient.gender && (
          <div className={styles.row}>
            <span className={styles.label}>Gênero:</span>
            <span className={styles.value}>{patient.gender}</span>
          </div>
        )}
        {patient.address && (
          <div className={styles.row}>
            <span className={styles.label}>Endereço:</span>
            <span className={styles.value}>{patient.address}</span>
          </div>
        )}
        {patient.city && (
          <div className={styles.row}>
            <span className={styles.label}>Cidade:</span>
            <span className={styles.value}>{patient.city}</span>
          </div>
        )}
        {patient.state && (
          <div className={styles.row}>
            <span className={styles.label}>UF:</span>
            <span className={styles.value}>{patient.state}</span>
          </div>
        )}
        {patient.createdAt && (
          <div className={styles.row}>
            <span className={styles.label}>Criado em:</span>
            <span className={styles.value}>{new Date(patient.createdAt).toLocaleString()}</span>
          </div>
        )}
        {patient.updatedAt && (
          <div className={styles.row}>
            <span className={styles.label}>Última atualização:</span>
            <span className={styles.value}>{new Date(patient.updatedAt).toLocaleString()}</span>
          </div>
        )}
      </div>

      <button className={styles.backButton} onClick={() => router.back()}>
        Voltar
      </button>
    </div>
  );
};

export default PatientDetailsPage;
