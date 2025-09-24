// src/app/appointments/[id]/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Appointment } from "../../types/appointment.types";
import { Patient } from "../../types/patient.types";
import { initAppointments } from "../../lib/fakeAppointmentApi";
import { initPatients } from "../../lib/fakePatientApi";

interface PageProps {
  params: { id: string };
}

const AppointmentDetailsPage = ({ params }: PageProps) => {
  const { id } = params;
  const router = useRouter();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = () => {
      // Buscar agendamento específico
      const appointments = initAppointments();
      const appt = appointments.find(a => a.id === id) || null;
      setAppointment(appt);

      // Buscar paciente correspondente
      if (appt) {
        const patients = initPatients();
        const pat = patients.find(p => p.id === appt.patientId) || null;
        setPatient(pat);
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <p className={styles.message}>Carregando detalhes...</p>;
  if (!appointment) return <p className={styles.message}>Agendamento não encontrado.</p>;

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
      </div>

      <button className={styles.backButton} onClick={() => router.push("/appointments")}>
        Voltar
      </button>
    </div>
  );
};

export default AppointmentDetailsPage;
