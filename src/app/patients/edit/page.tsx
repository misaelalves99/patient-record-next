// src/app/patients/edit/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Patient } from "../../types/patient.types";
import { get, put } from "../../lib/api";

export const EditPatientPage: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Campos do formulário
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchPatient = async () => {
      try {
        const data = await get<Patient[]>("/patients");
        const found = data.find((p) => p.id === id);
        if (found) {
          setPatient(found);
          setFirstName(found.firstName);
          setLastName(found.lastName);
          setCpf(found.cpf);
          setBirthDate(found.birthDate);
          setGender(found.gender);
          setPhone(found.phone || "");
          setEmail(found.email);
          setAddress(found.address);
          setCity(found.city || "");
          setState(found.state);
        }
      } catch (error) {
        console.error("Erro ao carregar paciente:", error);
        alert("Falha ao carregar paciente.");
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;
    setSaving(true);

    try {
      const updatedPatient: Patient = {
        ...patient,
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
        updatedAt: new Date().toISOString(),
      };

      await put(`/patients/${patient.id}`, updatedPatient);
      alert("Paciente atualizado com sucesso!");
      router.push("/patients");
    } catch (error) {
      console.error("Erro ao atualizar paciente:", error);
      alert("Falha ao atualizar paciente.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className={styles.message}>Carregando paciente...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Editar Paciente</h1>
      <form onSubmit={handleSave} className={styles.form}>
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

        <button type="submit" className={styles.button} disabled={saving}>
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
};

export default EditPatientPage;
