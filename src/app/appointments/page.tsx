// /electronic-patient-record-platform/src/app/appointments/page.tsx

import React from 'react';
import styles from './page.module.css';
import { useAppointment } from '../../hooks/useAppointment';

export const AppointmentsPage: React.FC = () => {
  const { appointments } = useAppointment();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments scheduled.</p>
      ) : (
        <ul className={styles.list}>
          {appointments.map((appt) => (
            <li key={appt.id} className={styles.item}>
              {appt.patientName} - {new Date(appt.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentsPage;
