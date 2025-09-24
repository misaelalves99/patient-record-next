// src/app/patients/[id]/page.tsx

import { initPatients } from "../../lib/fakePatientApi";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}

export default function PatientDetailsPage({ params }: PageProps) {
  const { id } = params;

  const patients = initPatients();
  const patient = patients.find(p => p.id === id);
  if (!patient) notFound();

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

        {/* Botão voltar */}
        <Link href="/patients" className={styles.backButton}>
          Voltar
        </Link>
      </div>
    </div>
  );
}
