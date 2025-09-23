// src/app/appointments/[id]/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Appointment } from "../../types/appointment.types";
import { Patient } from "../../types/patient.types";
import { get } from "../../lib/api";

const AppointmentDetailsPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const appt = await get<Appointment>(`/appointments/${id}`);
        setAppointment(appt);

        if (appt.patientId) {
          const pat = await get<Patient>(`/patients/${appt.patientId}`);
          setPatient(pat);
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!appointment) return <p className={styles.message}>Carregando detalhes...</p>;

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
