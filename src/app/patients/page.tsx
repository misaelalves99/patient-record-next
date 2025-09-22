// src/app/patients/page.tsx

"use client";

import React from "react";
import styles from "./page.module.css";
import { usePatient } from "../hooks/usePatient";
export const PatientsPage: React.FC = () => {
  const { patients } = usePatient();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Patients</h1>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <ul className={styles.list}>
          {patients.map((patient) => (
            <li key={patient.id} className={styles.item}>
              {patient.firstName} {patient.lastName} ({patient.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default PatientsPage;
