// src/components/patients/AppointmentsSection.tsx
import React from "react";
import styles from "../../components/patients/AppointmentsSection.module.css";
import { AiOutlineArrowRight, AiOutlineClockCircle, AiOutlineSolution } from "react-icons/ai";

export const AppointmentsSection: React.FC = () => (
  <section className={styles.appointmentsSection}>
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>Próximos Agendamentos</h2>
      <button className={styles.actionLink}>
        Ver Calendário <AiOutlineArrowRight />
      </button>
    </div>
    <div className={styles.appointmentsList}>
      <div className={styles.appointmentItem}>
        <AiOutlineClockCircle className={styles.appointmentIcon} />
        <div className={styles.appointmentDetails}>
          <span className={styles.appointmentType}>Consulta</span> com Dra. Marina Dias
          <span className={styles.appointmentDate}>19/11/2025 às 15:00</span>
        </div>
      </div>
      <div className={styles.appointmentItem}>
        <AiOutlineSolution className={styles.appointmentIcon} />
        <div className={styles.appointmentDetails}>
          <span className={styles.appointmentType}>Procedimento</span> com Dr. João Carlos
          <span className={styles.appointmentDate}>19/11/2025 às 16:00</span>
        </div>
      </div>
    </div>
  </section>
);
