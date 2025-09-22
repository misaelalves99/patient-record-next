// src/app/appointments/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Appointment } from "../types/appointment.types";
import { Patient } from "../types/patient.types";
import { get } from "../lib/api";

export const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appts = await get<Appointment[]>("/appointments");
        const pats = await get<Patient[]>("/patients");
        setAppointments(appts);
        setPatients(pats);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getPatientName = (id: string) => {
    const patient = patients.find((p) => p.id === id);
    return patient ? `${patient.firstName} ${patient.lastName}` : "Desconhecido";
  };

  if (loading) return <p>Carregando agendamentos...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Agendamentos</h1>
      {appointments.length === 0 ? (
        <p>Nenhum agendamento encontrado.</p>
      ) : (
        <ul className={styles.list}>
          {appointments.map((appt) => (
            <li key={appt.id} className={styles.item}>
              {getPatientName(appt.patientId)} - {new Date(appt.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentsPage;
