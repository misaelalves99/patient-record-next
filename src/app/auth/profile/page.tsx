// /electronic-patient-record-platform/src/app/auth/profile/page.tsx

"use client";

import React from 'react';
import styles from './page.module.css';
import { useAuth } from '../../hooks/useAuth';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return <p>Please log in to see your profile.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile</h1>
      <p>Email: {user.email}</p>
      <button className={styles.button} onClick={logout}>Logout</button>
    </div>
  );
}
