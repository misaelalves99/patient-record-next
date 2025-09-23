// src/app/appointments/edit/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Appointment } from "../../types/appointment.types";
import { Patient } from "../../types/patient.types";
import { get, put } from "../../lib/api";

const AppointmentEditPage: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const appt = await get<Appointment>(`/appointments/${id}`);
        setAppointment(appt);
        const pats = await get<Patient[]>("/patients");
        setPatients(pats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointment || !id) return;

    try {
      await put(`/appointments/${id}`, appointment);
      router.push("/appointments");
    } catch (error) {
      console.error("Erro ao editar agendamento:", error);
    }
  };

  if (!appointment) return <p className={styles.message}>Carregando...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Editar Agendamento</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Paciente</label>
        <select
          value={appointment.patientId}
          onChange={(e) => setAppointment({ ...appointment, patientId: e.target.value })}
          required
        >
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.firstName} {p.lastName}
            </option>
          ))}
        </select>

        <label>Data</label>
        <input
          type="datetime-local"
          value={appointment.date.slice(0, 16)}
          onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
          required
        />

        <label>Anotações</label>
        <textarea
          value={appointment.notes || ""}
          onChange={(e) => setAppointment({ ...appointment, notes: e.target.value })}
        />

        <label>Status</label>
        <select
          value={appointment.status}
          onChange={(e) => setAppointment({ ...appointment, status: e.target.value as "scheduled" | "completed" | "canceled" })}
        >
          <option value="scheduled">Agendado</option>
          <option value="completed">Concluído</option>
          <option value="canceled">Cancelado</option>
        </select>

        <button type="submit" className={styles.button}>
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default AppointmentEditPage;
