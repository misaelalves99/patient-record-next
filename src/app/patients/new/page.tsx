// src/app/patients/new/page.tsx

"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { Patient } from "../../types/patient.types";
import { v4 as uuidv4 } from "uuid";
import { post } from "../../lib/api";

export const NewPatientPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newPatient: Patient = {
      id: uuidv4(),
      firstName,
      lastName,
      email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await post<Patient>("/patients", newPatient);
      alert("Paciente criado com sucesso!");
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (error) {
      console.error("Erro ao criar paciente:", error);
      alert("Falha ao criar paciente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Novo Paciente</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Nome
          <input
            className={styles.input}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Sobrenome
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
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Criando..." : "Criar Paciente"}
        </button>
      </form>
    </div>
  );
};

export default NewPatientPage;
