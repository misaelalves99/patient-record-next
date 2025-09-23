// src/app/appointments/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Appointment } from "../types/appointment.types";
import { Patient } from "../types/patient.types";
import { get } from "../lib/api";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const AppointmentsPage: React.FC = () => {
  const router = useRouter();
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
                    onClick={() => router.push(`/appointments/delete?id=${appt.id}`)}
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
