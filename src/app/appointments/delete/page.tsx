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
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchAppointment = async () => {
      try {
        // <-- CORREÇÃO: URL com query string
        const found = await get<Appointment>(`/appointments?id=${id}`);
        setAppointment(found || null);
      } catch (error) {
        console.error("Erro ao carregar agendamento:", error);
        alert("Falha ao carregar agendamento.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleDelete = async () => {
    if (!appointment) return;
    setDeleting(true);
    try {
      // <-- CORREÇÃO: DELETE com query string
      await del(`/appointments?id=${appointment.id}`);
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
        Tem certeza que deseja excluir o agendamento de{" "}
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
        <button className={styles.button} onClick={() => router.push("/appointments")}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AppointmentDeletePage;
