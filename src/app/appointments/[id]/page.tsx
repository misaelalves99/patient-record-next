// /electronic-patient-record-platform/src/app/appointments/[id]/page.tsx

import React from 'react';
import { useRouter } from 'next/router';
import styles from './page.module.css';
import { useAppointment } from '../../../hooks/useAppointment';

export const AppointmentDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { appointments } = useAppointment();

  const appointment = appointments.find((a) => a.id === id);

  if (!appointment) return <p>Appointment not found.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Appointment Details</h1>
      <p>Patient: {appointment.patientName}</p>
      <p>Date: {new Date(appointment.date).toLocaleString()}</p>
      {appointment.notes && <p>Notes: {appointment.notes}</p>}
    </div>
  );
};

export default AppointmentDetailsPage;
