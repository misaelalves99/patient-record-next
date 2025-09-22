// src/app/patients/new/page.tsx

import React, { useState } from "react";
import styles from "./page.module.css";
import { usePatient } from "../../hooks/usePatient";
import { Patient } from "../../types/patient.types";
import { v4 as uuidv4 } from "uuid";

export const NewPatientPage: React.FC = () => {
  const { addPatient } = usePatient();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient: Patient = {
      id: uuidv4(),
      firstName,
      lastName,
      email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addPatient(newPatient);
    setFirstName("");
    setLastName("");
    setEmail("");
    alert("Patient created!");
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>New Patient</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          First Name
          <input
            className={styles.input}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Last Name
          <input
            className={styles.input}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit" className={styles.button}>
          Create Patient
        </button>
      </form>
    </div>
  );
};
export default NewPatientPage;
