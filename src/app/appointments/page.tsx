// src/app/appointments/page.tsx

"use client";

import React from 'react';
import styles from './page.module.css';
import { useAppointment } from '../hooks/useAppointment';
import { usePatient } from '../hooks/usePatient';

export const AppointmentsPage: React.FC = () => {
  const { appointments } = useAppointment();
  const { patients } = usePatient();

  const getPatientName = (id: string) => {
    const patient = patients.find((p) => p.id === id);
    return patient ? `${patient.firstName} ${patient.lastName}` : "Unknown";
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments scheduled.</p>
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
