// src/app/appointments/[id]/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./page.module.css";
import { Appointment } from "../../types/appointment.types";
import { Patient } from "../../types/patient.types";
import { get } from "../../lib/api";

export const AppointmentDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const appts = await get<Appointment[]>("/appointments");
        const pats = await get<Patient[]>("/patients");
        const found = appts.find((a) => a.id === id);
        setAppointment(found || null);
        setPatients(pats);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const getPatientName = (id: string) => {
    const patient = patients.find((p) => p.id === id);
    return patient ? `${patient.firstName} ${patient.lastName}` : "Desconhecido";
  };

  if (loading) return <p className={styles.message}>Carregando detalhes do agendamento...</p>;
  if (!appointment) return <p className={styles.message}>Agendamento não encontrado.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalhes do Agendamento</h1>
      <div className={styles.card}>
        <p><strong>Paciente:</strong> {getPatientName(appointment.patientId)}</p>
        <p><strong>Data:</strong> {new Date(appointment.date).toLocaleString()}</p>
        {appointment.notes && <p><strong>Anotações:</strong> {appointment.notes}</p>}
        <p><strong>Status:</strong> {appointment.status}</p>
      </div>
    </div>
  );
};

export default AppointmentDetailsPage;
