// /electronic-patient-record-platform/src/app/page.tsx

import React from 'react';
import { AppLayout } from './layout';
import styles from './page.module.css';

export const HomePage: React.FC = () => {
  return (
    <AppLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Electronic Patient Record Platform</h1>
        <p className={styles.description}>Manage patients, appointments, and care pathways efficiently.</p>
      </div>
    </AppLayout>
  );
};

export default HomePage;
