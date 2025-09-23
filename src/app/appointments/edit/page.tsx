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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const appt = await get<Appointment>(`/appointments?id=${id}`); // CORREÇÃO: Usando searchParam
        setAppointment(appt);

        const pats = await get<Patient[]>("/patients");
        setPatients(pats);
      } catch (error) {
        console.error("Erro ao carregar agendamento ou pacientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointment || !id) return;

    setSaving(true);
    try {
      const updated: Appointment = {
        ...appointment,
        updatedAt: new Date().toISOString(),
      };
      await put(`/appointments`, updated); // CORREÇÃO: Enviando o corpo completo da requisição
      router.push("/appointments");
    } catch (error) {
      console.error("Erro ao editar agendamento:", error);
      alert("Falha ao salvar alterações.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className={styles.message}>Carregando...</p>;
  if (!appointment) return <p className={styles.message}>Agendamento não encontrado.</p>;

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
          onChange={(e) =>
            setAppointment({
              ...appointment,
              status: e.target.value as "scheduled" | "completed" | "canceled",
            })
          }
        >
          <option value="scheduled">Agendado</option>
          <option value="completed">Concluído</option>
          <option value="canceled">Cancelado</option>
        </select>

        <button type="submit" className={styles.button} disabled={saving}>
          {saving ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentEditPage;
