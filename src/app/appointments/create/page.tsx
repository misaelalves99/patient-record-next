// src/app/appointments/create/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Patient } from "../../types/patient.types";
import { post, get } from "../../lib/api";

const AppointmentCreatePage: React.FC = () => {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientId, setPatientId] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"scheduled" | "completed" | "canceled">(
    "scheduled"
  );

  useEffect(() => {
    get<Patient[]>("/patients").then(setPatients).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await post("/appointments", { patientId, date, notes, status });
      router.push("/appointments");
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Novo Agendamento</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Paciente</label>
        <select
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          required
        >
          <option value="">Selecione...</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.firstName} {p.lastName}
            </option>
          ))}
        </select>

        <label>Data</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Anotações</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />

        <label>Status</label>
        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as "scheduled" | "completed" | "canceled"
            )
          }
        >
          <option value="scheduled">Agendado</option>
          <option value="completed">Concluído</option>
          <option value="canceled">Cancelado</option>
        </select>

        <button type="submit" className={styles.button}>
          Salvar
        </button>
      </form>
    </div>
  );
};

export default AppointmentCreatePage;
