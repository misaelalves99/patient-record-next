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

      <p><strong>Nome:</strong> {patient.firstName} {patient.lastName}</p>
      <p><strong>CPF:</strong> {patient.cpf}</p>
      <p><strong>Email:</strong> {patient.email}</p>
      {patient.phone && <p><strong>Telefone:</strong> {patient.phone}</p>}
      {patient.birthDate && <p><strong>Data de nascimento:</strong> {patient.birthDate}</p>}
      {patient.gender && <p><strong>Gênero:</strong> {patient.gender}</p>}
      {patient.address && <p><strong>Endereço:</strong> {patient.address}</p>}
      {patient.city && <p><strong>Cidade:</strong> {patient.city}</p>}
      {patient.state && <p><strong>UF:</strong> {patient.state}</p>}
      {patient.createdAt && <p><strong>Criado em:</strong> {new Date(patient.createdAt).toLocaleString()}</p>}
      {patient.updatedAt && <p><strong>Última atualização:</strong> {new Date(patient.updatedAt).toLocaleString()}</p>}

      <button className={styles.button} onClick={() => router.back()}>
        Voltar
      </button>
    </div>
  );
};

export default PatientDetailsPage;
