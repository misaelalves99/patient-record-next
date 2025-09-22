// src/app/patients/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Patient } from "../types/patient.types";
import { get, post } from "../lib/api";
import { v4 as uuidv4 } from "uuid";

export const PatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  // Buscar pacientes
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await get<Patient[]>("/patients");
        setPatients(data);
      } catch (error) {
        console.error("Erro ao carregar pacientes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const handleNewPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
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
      setPatients((prev) => [...prev, newPatient]);
      setFirstName("");
      setLastName("");
      setEmail("");
      setShowNewForm(false);
    } catch (error) {
      console.error("Erro ao criar paciente:", error);
      alert("Falha ao criar paciente.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className={styles.message}>Carregando pacientes...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pacientes</h1>

      <button className={styles.button} onClick={() => setShowNewForm(!showNewForm)}>
        {showNewForm ? "Cancelar" : "Novo Paciente"}
      </button>

      {showNewForm && (
        <form onSubmit={handleNewPatient} className={styles.form}>
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
          <button type="submit" className={styles.button} disabled={saving}>
            {saving ? "Criando..." : "Criar Paciente"}
          </button>
        </form>
      )}

      {patients.length === 0 ? (
        <p className={styles.message}>Nenhum paciente encontrado.</p>
      ) : (
        <ul className={styles.list}>
          {patients.map((p) => (
            <li
              key={p.id}
              className={styles.item}
              onClick={() => setSelectedPatient(p)}
            >
              {p.firstName} {p.lastName} ({p.email})
            </li>
          ))}
        </ul>
      )}

      {selectedPatient && (
        <div className={styles.card}>
          <h2>{selectedPatient.firstName} {selectedPatient.lastName}</h2>
          <p><strong>Email:</strong> {selectedPatient.email}</p>
          {selectedPatient.phone && <p><strong>Telefone:</strong> {selectedPatient.phone}</p>}
          {selectedPatient.dateOfBirth && <p><strong>Data de nascimento:</strong> {selectedPatient.dateOfBirth}</p>}
          {selectedPatient.gender && <p><strong>Gênero:</strong> {selectedPatient.gender}</p>}
        </div>
      )}
    </div>
  );
};

export default PatientsPage;
