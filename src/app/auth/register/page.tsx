// /electronic-patient-record-platform/src/app/auth/register/page.tsx

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
      alert('User registered successfully!');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setRole('patient');
    } catch (error) {
      alert('Registration failed.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
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
        <label className={styles.label}>
          Password
          <input
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Role
          <select
            className={styles.input}
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
          >
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="patient">Patient</option>
          </select>
        </label>
        <button className={styles.button} type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
