// src/app/appointments/delete/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Appointment } from "../../types/appointment.types";
import { initAppointments, saveAppointments } from "../../lib/fakeAppointmentApi";

export default function AppointmentDeletePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchAppointment = () => {
      const appointments = initAppointments();
      const found = appointments.find((a) => a.id === id) || null;
      setAppointment(found);
      setLoading(false);
    };

    fetchAppointment();
  }, [id]);

  const handleDelete = () => {
    if (!appointment) return;
    setDeleting(true);
    try {
      const updated = initAppointments().filter((a) => a.id !== appointment.id);
      saveAppointments(updated);
      alert("Agendamento excluído com sucesso!");
      router.push("/appointments");
    } catch (error) {
      console.error("Erro ao excluir agendamento:", error);
      alert("Falha ao excluir agendamento.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className={styles.message}>Carregando agendamento...</p>;
  if (!appointment) return <p className={styles.message}>Agendamento não encontrado.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Excluir Agendamento</h1>
      <p>
        Tem certeza que deseja excluir o agendamento do paciente{" "}
        <strong>{appointment.patientId}</strong> em{" "}
        <strong>{new Date(appointment.date).toLocaleString()}</strong>?
      </p>
      <div className={styles.actions}>
        <button
          className={styles.deleteButton}
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Excluindo..." : "Confirmar"}
        </button>
        <button
          className={styles.button}
          onClick={() => router.push("/appointments")}
          disabled={deleting}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
