// src/components/appointments/AppointmentForm.tsx

import React from "react";
import styles from "./AppointmentForm.module.css";
import { Patient } from "../../types/patient.types";
import { Appointment } from "../../types/appointment.types";

type AppointmentFormProps = {
  appointment?: Appointment;
  patients: Patient[];
  doctors: { id: string; name: string }[]; // adicionei lista de médicos
  loading?: boolean;
  saving?: boolean;
  onSubmit: (data: Omit<Appointment, "id" | "createdAt" | "updatedAt">) => void;
  onCancel?: () => void;
};

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  appointment,
  patients,
  doctors,
  loading = false,
  saving = false,
  onSubmit,
  onCancel,
}) => {
  const [patientId, setPatientId] = React.useState(appointment?.patientId || "");
  const [doctorId, setDoctorId] = React.useState(appointment?.doctorId || "");
  const [date, setDate] = React.useState(appointment?.date || "");
  const [notes, setNotes] = React.useState(appointment?.notes || "");
  const [status, setStatus] = React.useState<"scheduled" | "completed" | "canceled">(
    appointment?.status || "scheduled"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ patientId, doctorId, date, notes, status });
  };

  if (loading) return <p className={styles.message}>Carregando...</p>;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Paciente */}
      <label className={styles.label}>
        Paciente
        <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required>
          <option value="">Selecione...</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.firstName} {p.lastName}
            </option>
          ))}
        </select>
      </label>

      {/* Médico */}
      <label className={styles.label}>
        Médico
        <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
          <option value="">Selecione...</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </label>

      {/* Data */}
      <label className={styles.label}>
        Data
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>

      {/* Anotações */}
      <label className={styles.label}>
        Anotações
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </label>

      {/* Status */}
      <label className={styles.label}>
        Status
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "scheduled" | "completed" | "canceled")}
        >
          <option value="scheduled">Agendado</option>
          <option value="completed">Concluído</option>
          <option value="canceled">Cancelado</option>
        </select>
      </label>

      {/* Botões */}
      <button type="submit" className={styles.button} disabled={saving}>
        {saving ? "Salvando..." : "Salvar"}
      </button>

      {onCancel && (
        <button type="button" className={styles.backButton} onClick={onCancel}>
          Voltar
        </button>
      )}
    </form>
  );
};
