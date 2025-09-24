// src/components/patients/PatientHeader.tsx
import React from "react";
import { useRouter } from "next/navigation";
import { Patient } from "../../types/patient.types";
import styles from "../../components/patients/PatientHeader.module.css";
import { AiOutlineUser, AiOutlinePhone, AiOutlineCalendar, AiOutlineBank, AiOutlineEdit } from "react-icons/ai";

interface PatientHeaderProps {
  patient: Patient;
}

export const PatientHeader: React.FC<PatientHeaderProps> = ({ patient }) => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.profilePic}>
          <AiOutlineUser />
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.patientName}>
            {patient.firstName} {patient.lastName}
          </h1>
          <div className={styles.details}>
            <span className={styles.detailItem}>
              <AiOutlinePhone /> {patient.phone}
            </span>
            <span className={styles.detailItem}>
              <AiOutlineCalendar />{" "}
              {new Date().getFullYear() - new Date(patient.birthDate).getFullYear()} anos
            </span>
          </div>
          <div className={styles.plan}>
            <AiOutlineBank /> Plano: UNIMED
          </div>
        </div>
        <button
          className={styles.editButton}
          onClick={() => router.push(`/patients/edit?id=${patient.id}`)}
        >
          <AiOutlineEdit /> Editar
        </button>
      </div>
    </header>
  );
};
