// src/app/appointments/create/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppointmentForm } from "../../components/appointments/AppointmentForm";
import { Patient } from "../../types/patient.types";
import { Appointment } from "../../types/appointment.types";
import { initPatients } from "../../lib/fakePatientApi";
import { initDoctors } from "../../lib/fakeDoctorApi";
import { addAppointment } from "../../lib/fakeAppointmentApi";
import styles from "./page.module.css";

export default function AppointmentCreatePage() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setPatients(initPatients());
    setDoctors(initDoctors());
    setLoading(false);
  }, []);

  const handleCreate = (data: Omit<Appointment, "id" | "createdAt" | "updatedAt">) => {
    setSaving(true);
    addAppointment(data); // Salva na fake API
    alert("Agendamento criado com sucesso!");
    router.push("/appointments");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cadastrar Agendamento</h1>
      <AppointmentForm
        patients={patients}
        doctors={doctors}
        loading={loading}
        saving={saving}
        onSubmit={handleCreate}
        onCancel={() => router.push("/appointments")}
      />
    </div>
  );
}
