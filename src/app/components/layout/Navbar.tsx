// src/components/layout/Navbar.tsx

import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Electronic Patient Record</div>
      <ul className={styles.navList}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/patients">Patients</Link></li>
        <li><Link href="/appointments">Appointments</Link></li>
        <li><Link href="/care-pathway">Care Pathways</Link></li>
        <li><Link href="/auth/login">Login</Link></li>
        <li><Link href="/auth/register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
