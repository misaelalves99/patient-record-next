// src/app/patients/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Patient } from "../types/patient.types";
import { get } from "../lib/api";
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

  if (loading)
    return <p className={styles.message}>Carregando pacientes...</p>;

  // Função para normalizar ID (remove prefixo "p")
  const normalizeId = (id: string) => id.replace(/^p/, "");

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
            {patients.map((p) => {
              const cleanId = normalizeId(p.id);
              return (
                <tr key={p.id}>
                  <td>{cleanId}</td>
                  <td>
                    {p.firstName} {p.lastName}
                  </td>
                  <td>{p.phone}</td>
                  <td className={styles.actions}>
                    <AiOutlineEye
                      className={`${styles.iconButton} ${styles.detail}`}
                      title="Detalhes"
                      onClick={() => router.push(`/patients/${cleanId}`)}
                    />
                    <AiOutlineEdit
                      className={`${styles.iconButton} ${styles.edit}`}
                      title="Editar"
                      onClick={() => router.push(`/patients/edit?id=${cleanId}`)}
                    />
                    <AiOutlineDelete
                      className={`${styles.iconButton} ${styles.delete}`}
                      title="Excluir"
                      onClick={() => router.push(`/patients/delete?id=${cleanId}`)}
                    />
                    <AiOutlineFileText
                      className={`${styles.iconButton} ${styles.report}`}
                      title="Relatório de Tratamento"
                      onClick={() =>
                        router.push(`/patients/report?id=${cleanId}`)
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientsPage;
