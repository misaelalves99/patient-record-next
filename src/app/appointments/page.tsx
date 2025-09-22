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
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

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

  if (loading) return <p className={styles.message}>Carregando agendamentos...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Agendamentos</h1>

      {appointments.length === 0 ? (
        <p className={styles.message}>Nenhum agendamento encontrado.</p>
      ) : (
        <ul className={styles.list}>
          {appointments.map((appt) => (
            <li
              key={appt.id}
              className={styles.item}
              onClick={() => setSelectedAppointment(appt)}
            >
              <span className={styles.patient}>{getPatientName(appt.patientId)}</span>
              <span className={styles.date}>{new Date(appt.date).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}

      {selectedAppointment && (
        <div className={styles.card}>
          <h2>Detalhes do Agendamento</h2>
          <p><strong>Paciente:</strong> {getPatientName(selectedAppointment.patientId)}</p>
          <p><strong>Data:</strong> {new Date(selectedAppointment.date).toLocaleString()}</p>
          {selectedAppointment.notes && <p><strong>Anotações:</strong> {selectedAppointment.notes}</p>}
          <p><strong>Status:</strong> {selectedAppointment.status}</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
