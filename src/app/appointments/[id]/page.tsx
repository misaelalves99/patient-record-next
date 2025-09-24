// src/app/appointments/[id]/page.tsx

import { initAppointments } from "../../lib/fakeAppointmentApi";
import { initPatients } from "../../lib/fakePatientApi";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}

export default function AppointmentDetailsPage({ params }: PageProps) {
  const { id } = params;

  // Buscar agendamento específico
  const appointments = initAppointments();
  const appointment = appointments.find(a => a.id === id);
  if (!appointment) notFound();

  // Buscar paciente correspondente
  const patients = initPatients();
  const patient = patients.find(p => p.id === appointment.patientId) || null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalhes do Agendamento</h1>

      <div className={styles.card}>
        <div className={styles.row}>
          <span className={styles.label}>Paciente:</span>
          <span className={styles.value}>
            {patient ? `${patient.firstName} ${patient.lastName}` : "Desconhecido"}
          </span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Data:</span>
          <span className={styles.value}>{new Date(appointment.date).toLocaleString()}</span>
        </div>

        {appointment.notes && (
          <div className={styles.row}>
            <span className={styles.label}>Anotações:</span>
            <span className={styles.value}>{appointment.notes}</span>
          </div>
        )}

        <div className={styles.row}>
          <span className={styles.label}>Status:</span>
          <span className={styles.value}>{appointment.status}</span>
        </div>
        <Link href="/appointments" className={styles.backButton}>
          Voltar
        </Link>
      </div>
    </div>
  );
}
