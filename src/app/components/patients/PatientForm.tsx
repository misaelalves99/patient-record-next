// src/components/patients/PatientForm.tsx

import React from "react";
import styles from "../../components/patients/PatientForm.module.css";
import { Patient } from "../../types/patient.types";

type PatientFormProps = {
  patient?: Patient;
  loading?: boolean;
  saving?: boolean;
  onSubmit: (data: Omit<Patient, "id" | "createdAt" | "updatedAt">) => void;
};

export const PatientForm: React.FC<PatientFormProps> = ({
  patient,
  loading = false,
  saving = false,
  onSubmit,
}) => {
  const [firstName, setFirstName] = React.useState(patient?.firstName || "");
  const [lastName, setLastName] = React.useState(patient?.lastName || "");
  const [cpf, setCpf] = React.useState(patient?.cpf || "");
  const [birthDate, setBirthDate] = React.useState(patient?.birthDate || "");
  const [gender, setGender] = React.useState<"male" | "female" | "other">(patient?.gender || "male");
  const [phone, setPhone] = React.useState(patient?.phone || "");
  const [email, setEmail] = React.useState(patient?.email || "");
  const [address, setAddress] = React.useState(patient?.address || "");
  const [city, setCity] = React.useState(patient?.city || "");
  const [state, setState] = React.useState(patient?.state || "");

  // Submissão do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      firstName,
      lastName,
      cpf,
      birthDate,
      gender,
      phone,
      email,
      address,
      city,
      state,
    });
  };

  if (loading) return <p className={styles.message}>Carregando paciente...</p>;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Nome
        <input
          type="text"
          className={styles.input}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>

      <label className={styles.label}>
        Sobrenome
        <input
          type="text"
          className={styles.input}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>

      <label className={styles.label}>
        CPF
        <input
          type="text"
          className={styles.input}
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
      </label>

      <label className={styles.label}>
        Data de Nascimento
        <input
          type="date"
          className={styles.input}
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
          onChange={(e) => setGender(e.target.value as "male" | "female" | "other")}
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
          type="tel"
          className={styles.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </label>

      <label className={styles.label}>
        Email
        <input
          type="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className={styles.label}>
        Endereço
        <input
          type="text"
          className={styles.input}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>

      <label className={styles.label}>
        Cidade
        <input
          type="text"
          className={styles.input}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>

      <label className={styles.label}>
        Estado (UF)
        <input
          type="text"
          className={styles.input}
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>

      <button type="submit" className={styles.button} disabled={saving}>
        {saving ? "Processando..." : "Salvar"}
      </button>
    </form>
  );
};
