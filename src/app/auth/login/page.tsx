// src/app/auth/login/page.tsx

"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      alert('Login realizado com sucesso!');
      setEmail('');
      setPassword('');
    } catch {
      alert('Falha no login.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
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
        <button className={styles.button} type="submit">Entrar</button>
      </form>
    </div>
  );
}
