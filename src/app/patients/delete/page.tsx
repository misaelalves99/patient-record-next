// src/app/patients/delete/page.tsx

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import styles from "./page.module.css";
import { Patient } from "../../types/patient.types";
import { initPatients, savePatients } from "../../lib/fakePatientApi";

function DeletePatientContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchPatient = () => {
      const patients = initPatients();
      const found = patients.find((p) => p.id === id) || null;
      setPatient(found);
      setLoading(false);
    };

    fetchPatient();
  }, [id]);

  const handleDelete = () => {
    if (!patient) return;
    setDeleting(true);

    try {
      const patients = initPatients().filter((p) => p.id !== patient.id);
      savePatients(patients);
      alert("Paciente excluído com sucesso!");
      router.push("/patients");
    } catch (error) {
      console.error("Erro ao excluir paciente:", error);
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
      <p>
        Tem certeza que deseja excluir{" "}
        <strong>
          {patient.firstName} {patient.lastName}
        </strong>
        ?
      </p>

      <div className={styles.actions}>
        <button
          className={styles.deleteButton}
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Excluindo..." : "Excluir"}
        </button>
        <button
          className={styles.button}
          onClick={() => router.push("/patients")}
          disabled={deleting}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default function DeletePatientPage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <DeletePatientContent />
    </Suspense>
  );
}
