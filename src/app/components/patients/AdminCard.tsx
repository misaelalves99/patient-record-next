// src/components/patients/AdminCard.tsx
import React from "react";
import styles from "../../components/patients/AdminCard.module.css";
import { AiOutlinePlus } from "react-icons/ai";

interface AdminCardProps {
  icon: React.ReactNode;
  number: number;
  label: string;
  actionLabel: string;
  onClick: () => void;
}

export const AdminCard: React.FC<AdminCardProps> = ({
  icon,
  number,
  label,
  actionLabel,
  onClick,
}) => (
  <div className={styles.adminCard}>
    <div className={styles.adminHeader}>
      <span className={styles.adminIcon}>{icon}</span>
      <span className={styles.adminNumber}>{number}</span>
    </div>
    <span className={styles.adminLabel}>{label}</span>
    <button className={styles.adminButton} onClick={onClick}>
      <AiOutlinePlus /> {actionLabel}
    </button>
  </div>
);
