// src/components/patients/ObservationsSection.tsx
import React from "react";
import styles from "../../components/patients/ObservationsSection.module.css";
import { AiOutlineEdit } from "react-icons/ai";

export const ObservationsSection: React.FC = () => (
  <section className={styles.observationsSection}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>Observações</h2>
      <button className={styles.editLink}>
        <AiOutlineEdit />
      </button>
    </div>
    <p className={styles.observationText}>
      Paciente mais sensível à dor. Agendar procedimentos com tempo extra.
    </p>

    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>Observações Privadas</h2>
      <button className={styles.editLink}>
        <AiOutlineEdit />
      </button>
    </div>
    <p className={styles.observationText}>
      Paciente diabético. Necessário monitoramento da glicemia antes de procedimentos.
    </p>
  </section>
);
