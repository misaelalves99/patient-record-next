// src/app/appointments/[id]/page.tsx

import React from 'react';
import { useRouter } from 'next/router';
import styles from './page.module.css';
import { useAppointment } from '../../hooks/useAppointment';
import { usePatient } from '../../hooks/usePatient';

export const AppointmentDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { appointments } = useAppointment();
  const { patients } = usePatient();

  const appointment = appointments.find((a) => a.id === id);

  const getPatientName = (id: string) => {
    const patient = patients.find((p) => p.id === id);
    return patient ? `${patient.firstName} ${patient.lastName}` : "Unknown";
  };

  if (!appointment) return <p>Appointment not found.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Appointment Details</h1>
      <p>Patient: {getPatientName(appointment.patientId)}</p>
      <p>Date: {new Date(appointment.date).toLocaleString()}</p>
      {appointment.notes && <p>Notes: {appointment.notes}</p>}
    </div>
  );
};

export default AppointmentDetailsPage;
