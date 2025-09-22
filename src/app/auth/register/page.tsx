// src/app/auth/register/page.tsx

"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import { useAuth } from '../../hooks/useAuth';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'doctor' | 'nurse' | 'patient'>('patient');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ firstName, lastName, email, password, role });
      alert('Usuário registrado com sucesso!');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setRole('patient');
    } catch (error) {
      alert('Falha no registro.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registrar Usuário</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Nome
          <input
            className={styles.input}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Digite seu nome"
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
            placeholder="Digite seu sobrenome"
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
            placeholder="Digite seu email"
            required
          />
        </label>
        <label className={styles.label}>
          Senha
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </label>
        <label className={styles.label}>
          Função
          <select
            className={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
          >
            <option value="admin">Administrador</option>
            <option value="doctor">Médico</option>
            <option value="nurse">Enfermeiro(a)</option>
            <option value="patient">Paciente</option>
          </select>
        </label>
        <button className={styles.button} type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterPage;
