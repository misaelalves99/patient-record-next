// src/app/appointments/edit/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AppointmentForm } from "../../components/appointments/AppointmentForm";
import { Appointment } from "../../types/appointment.types";
import { Patient } from "../../types/patient.types";
import {
  initAppointments,
  saveAppointments,
  loadAppointments,
} from "../../lib/fakeAppointmentApi";
import { initPatients } from "../../lib/fakePatientApi";
import { initDoctors } from "../../lib/fakeDoctorApi";
import styles from "./page.module.css";

export default function AppointmentEditPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔹 Carrega dados da fake API
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = () => {
      const appointments = initAppointments();
      const appt = appointments.find((a) => a.id === id) || null;
      setAppointment(appt);

      setPatients(initPatients());
      setDoctors(initDoctors());
      setLoading(false);
    };

    fetchData();
  }, [id]);

  // 🔹 Atualiza agendamento na fake API
  const handleUpdate = (
    data: Omit<Appointment, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!appointment || !id) return;

    setSaving(true);

    try {
      const appointments = loadAppointments();
      const updatedList = appointments.map((a) =>
        a.id === id
          ? { ...a, ...data, updatedAt: new Date().toISOString() }
          : a
      );

      saveAppointments(updatedList);
      alert("Agendamento atualizado com sucesso!");
      router.push("/appointments");
    } catch (error) {
      console.error("Erro ao editar agendamento:", error);
      alert("Falha ao salvar alterações.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className={styles.message}>Carregando...</p>;
  if (!appointment)
    return <p className={styles.message}>Agendamento não encontrado.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Editar Agendamento</h1>
      <AppointmentForm
        appointment={appointment}
        patients={patients}
        doctors={doctors}
        saving={saving}
        onSubmit={handleUpdate}
        onCancel={() => router.push("/appointments")}
      />
    </div>
  );
}
