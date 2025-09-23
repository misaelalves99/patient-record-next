// src/app/patients/delete/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Patient } from "../../types/patient.types";
import { get, del } from "../../lib/api";

export const DeletePatientPage: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!patient) return;
    setDeleting(true);
    try {
      await del(`/patients/${patient.id}`);
      alert("Paciente excluído com sucesso!");
      router.push("/patients");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir paciente.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className={styles.message}>Carregando paciente...</p>;
  if (!patient) return <p className={styles.message}>Paciente não encontrado.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Excluir Paciente</h1>
      <p>Tem certeza que deseja excluir {patient.firstName} {patient.lastName}?</p>
      <button className={styles.deleteButton} onClick={handleDelete} disabled={deleting}>
        {deleting ? "Excluindo..." : "Excluir"}
      </button>
      <button className={styles.button} onClick={() => router.push("/patients")}>
        Cancelar
      </button>
    </div>
  );
};

export default DeletePatientPage;
