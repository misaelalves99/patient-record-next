// src/app/patients/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Patient } from "../types/patient.types";
import { initPatients } from "../lib/fakePatientApi";
import {
  AiOutlineEye,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineFileText,
} from "react-icons/ai";

export const PatientsPage: React.FC = () => {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega pacientes do fake API
  const fetchPatients = () => {
    const data = initPatients();
    setPatients(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  if (loading) return <p className={styles.message}>Carregando pacientes...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pacientes</h1>

      <button
        className={styles.createButton}
        onClick={() => router.push("/patients/create")}
      >
        Novo Paciente
      </button>

      {patients.length === 0 ? (
        <p className={styles.message}>Nenhum paciente encontrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  {p.firstName} {p.lastName}
                </td>
                <td>{p.phone}</td>
                <td className={styles.actions}>
                  <AiOutlineEye
                    className={`${styles.iconButton} ${styles.detail}`}
                    title="Detalhes"
                    onClick={() => router.push(`/patients/${p.id}`)}
                  />
                  <AiOutlineEdit
                    className={`${styles.iconButton} ${styles.edit}`}
                    title="Editar"
                    onClick={() => router.push(`/patients/edit?id=${p.id}`)}
                  />
                  <AiOutlineDelete
                    className={`${styles.iconButton} ${styles.delete}`}
                    title="Excluir"
                    onClick={() => router.push(`/patients/delete?id=${p.id}`)}
                  />
                  <AiOutlineFileText
                    className={`${styles.iconButton} ${styles.report}`}
                    title="Relatório"
                    onClick={() => router.push(`/patients/report?id=${p.id}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientsPage;
