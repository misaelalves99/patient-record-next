// src/app/appointments/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Appointment } from "../../types/appointment.types";
import { Patient } from "../../types/patient.types";
import { get } from "../../lib/api";

interface AppointmentDetailsPageProps {
  params: { id: string };
}

const AppointmentDetailsPage: React.FC<AppointmentDetailsPageProps> = ({ params }) => {
  const { id } = params; // id da rota dinâmica
  const router = useRouter();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const appt = await get<Appointment>(`/appointments?id=${id}`);
        setAppointment(appt || null);

        if (appt?.patientId) {
          const pat = await get<Patient>(`/patients?id=${appt.patientId}`);
          setPatient(pat || null);
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
        alert("Falha ao carregar detalhes do agendamento.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className={styles.message}>Carregando detalhes...</p>;
  if (!appointment) return <p className={styles.message}>Agendamento não encontrado.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalhes do Agendamento</h1>
      <div className={styles.card}>
        <p>
          <strong>Paciente:</strong>{" "}
          {patient ? `${patient.firstName} ${patient.lastName}` : "Desconhecido"}
        </p>
        <p><strong>Data:</strong> {new Date(appointment.date).toLocaleString()}</p>
        {appointment.notes && <p><strong>Anotações:</strong> {appointment.notes}</p>}
        <p><strong>Status:</strong> {appointment.status}</p>
      </div>
      <button className={styles.button} onClick={() => router.push("/appointments")}>
        Voltar
      </button>
    </div>
  );
};

export default AppointmentDetailsPage;
