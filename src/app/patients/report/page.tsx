// src/app/patients/report/page.tsx

"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Patient } from "../../types/patient.types";
import { loadPatients } from "../../lib/fakePatientApi";

import { PatientHeader } from "../../components/patients/PatientHeader";
import { AppointmentsSection } from "../../components/patients/AppointmentsSection";
import { ObservationsSection } from "../../components/patients/ObservationsSection";
import { AdminArea } from "../../components/patients/AdminArea";
import styles from "./page.module.css";

function PatientReportContent() {
  const searchParams = useSearchParams();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("id"); // 🔹 acessar dentro do useEffect

    if (!id) {
      setError("ID do paciente não fornecido.");
      setLoading(false);
      return;
    }

    const patients = loadPatients();
    const found = patients.find((p) => String(p.id) === String(id));

    if (!found) {
      setError("Paciente não encontrado.");
    } else {
      setPatient(found);
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) return <div className={styles.message}>Carregando relatório...</div>;
  if (error || !patient) return <div className={styles.message}>{error || "Paciente não encontrado."}</div>;

  const mockAdminData = { consultas: 31, exames: 2, vacinas: 0, cirurgias: 2, procedimentos: 47, cancelados: 0 };

  return (
    <div className={styles.container}>
      <PatientHeader patient={patient} />
      <div className={styles.contentGrid}>
        <AppointmentsSection />
        <ObservationsSection />
        <AdminArea data={mockAdminData} />
      </div>
    </div>
  );
}

export default function PatientReportPage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <PatientReportContent />
    </Suspense>
  );
}
