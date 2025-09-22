// src/app/patients/[id]/page.tsx

"use client";

import React from "react";
import { useRouter } from "next/router";
import styles from "./page.module.css";
import { usePatient } from "../../hooks/usePatient";

export const PatientDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { patients } = usePatient();
  const patient = patients.find((p) => p.id === id);
  if (!patient) return <p>Patient not found.</p>;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {patient.firstName} {patient.lastName}
      </h1>
      <p>Email: {patient.email}</p>
      {patient.phone && <p>Phone: {patient.phone}</p>}
      {patient.dateOfBirth && <p>Date of Birth: {patient.dateOfBirth}</p>}
      {patient.gender && <p>Gender: {patient.gender}</p>}
    </div>
  );
};
export default PatientDetailsPage;
