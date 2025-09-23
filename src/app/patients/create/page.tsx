// src/app/patients/create/page.tsx

"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { Patient } from "../../types/patient.types";
import { v4 as uuidv4 } from "uuid";
import { post } from "../../lib/api";

export const CreatePatientPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState(""); // campo adicionado
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newPatient: Patient = {
      id: uuidv4(),
      firstName,
      lastName,
      cpf,
      birthDate,
      gender,
      phone,
      email,
      address,
      city, // incluído
      state,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await post<Patient>("/patients", newPatient);
      alert("Paciente criado com sucesso!");
      // reset do formulário
      setFirstName("");
      setLastName("");
      setCpf("");
      setBirthDate("");
      setGender("male");
      setPhone("");
      setEmail("");
      setAddress("");
      setCity(""); // reset
      setState("");
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
          CPF
          <input
            className={styles.input}
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Data de Nascimento
          <input
            className={styles.input}
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Sexo
          <select
            className={styles.input}
            value={gender}
            onChange={(e) =>
              setGender(e.target.value as "male" | "female" | "other")
            }
            required
          >
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Outro</option>
          </select>
        </label>

        <label className={styles.label}>
          Telefone
          <input
            className={styles.input}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

        <label className={styles.label}>
          Endereço
          <input
            className={styles.input}
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Cidade
          <input
            className={styles.input}
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Estado (UF)
          <input
            className={styles.input}
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Criando..." : "Criar Paciente"}
        </button>
      </form>

      {loading && <p className={styles.message}>Processando...</p>}
    </div>
  );
};

export default CreatePatientPage;
