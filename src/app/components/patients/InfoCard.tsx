// src/components/patients/InfoCard.tsx
import React from "react";
import styles from "../../components/patients/InfoCard.module.css";

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number | undefined;
}

export const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value }) => (
  <div className={styles.infoCard}>
    <div className={styles.infoIcon}>{icon}</div>
    <div className={styles.infoContent}>
      <span className={styles.infoLabel}>{label}</span>
      <h3 className={styles.infoValue}>{value || "N/A"}</h3>
    </div>
  </div>
);
