// src/app/appointments/delete/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Appointment } from "../../types/appointment.types";
import { get, del } from "../../lib/api";

const AppointmentDeletePage: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    if (id) {
      get<Appointment>(`/appointments/${id}`).then(setAppointment).catch(console.error);
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await del(`/appointments/${id}`);
      router.push("/appointments");
    } catch (error) {
      console.error("Erro ao excluir agendamento:", error);
    }
  };

  if (!appointment) return <p className={styles.message}>Carregando...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Excluir Agendamento</h1>
      <p>Tem certeza que deseja excluir o agendamento de <strong>{appointment.patientId}</strong> em <strong>{new Date(appointment.date).toLocaleString()}</strong>?</p>
      <div className={styles.actions}>
        <button className={styles.deleteButton} onClick={handleDelete}>Confirmar</button>
        <button className={styles.button} onClick={() => router.push("/appointments")}>Cancelar</button>
      </div>
    </div>
  );
};

export default AppointmentDeletePage;
