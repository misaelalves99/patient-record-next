// src/app/appointments/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Appointment } from "../types/appointment.types";
import { Patient } from "../types/patient.types";
import { initAppointments } from "../lib/fakeAppointmentApi";
import { initPatients } from "../lib/fakePatientApi";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const AppointmentsPage: React.FC = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = () => {
    setAppointments(initAppointments());
    setPatients(initPatients());
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const getPatientName = (id: string) => {
    const patient = patients.find((p) => p.id === id);
    return patient ? `${patient.firstName} ${patient.lastName}` : "Desconhecido";
  };

  const handleDelete = (id: string) => {
    router.push(`/appointments/delete?id=${id}`);
  };

  if (loading) return <p className={styles.message}>Carregando agendamentos...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Agendamentos</h1>

      <button
        className={styles.createButton}
        onClick={() => router.push("/appointments/create")}
      >
        Novo Agendamento
      </button>

      {appointments.length === 0 ? (
        <p className={styles.message}>Nenhum agendamento encontrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Paciente</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.id}</td>
                <td>{getPatientName(appt.patientId)}</td>
                <td>{new Date(appt.date).toLocaleString()}</td>
                <td className={styles.actions}>
                  <AiOutlineEye
                    className={`${styles.iconButton} ${styles.detail}`}
                    title="Detalhes"
                    onClick={() => router.push(`/appointments/${appt.id}`)}
                  />
                  <AiOutlineEdit
                    className={`${styles.iconButton} ${styles.edit}`}
                    title="Editar"
                    onClick={() => router.push(`/appointments/edit?id=${appt.id}`)}
                  />
                  <AiOutlineDelete
                    className={`${styles.iconButton} ${styles.delete}`}
                    title="Excluir"
                    onClick={() => handleDelete(appt.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentsPage;
