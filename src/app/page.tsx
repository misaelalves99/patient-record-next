// src/app/page.tsx

import React from "react";
import styles from "./page.module.css";

export const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Bem-vindo à Plataforma de Prontuário Eletrônico do Paciente
      </h1>
      <p className={styles.description}>
        Gerencie pacientes, consultas e planos de cuidado de forma eficiente e
        segura em um único lugar.
      </p>
      <div className={styles.ctaSection}>
        <a href="/patients" className={styles.ctaButton}>
          Ver Pacientes
        </a>
        <a href="/appointments" className={styles.ctaButtonSecondary}>
          Agendar Consulta
        </a>
      </div>
    </div>
  );
};

export default HomePage;
