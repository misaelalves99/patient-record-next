// src/components/layout/Navbar.tsx

import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Prontuário Eletrônico</div>
      <ul className={styles.navList}>
        <li><Link href="/">Início</Link></li>
        <li><Link href="/patients">Pacientes</Link></li>
        <li><Link href="/appointments">Agendamentos</Link></li>
        <li><Link href="/care-pathway">Caminhos de Cuidado</Link></li>
        <li><Link href="/auth/login">Entrar</Link></li>
        <li><Link href="/auth/register">Registrar</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
