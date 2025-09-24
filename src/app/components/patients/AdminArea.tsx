// src/components/patients/AdminArea.tsx
import React from "react";
import styles from "../../components/patients/AdminArea.module.css";
import { AiOutlineUser, AiOutlineFileText, AiOutlineSolution, AiOutlineBook, AiOutlinePhone } from "react-icons/ai";
import { AdminCard } from "./AdminCard";

interface AdminAreaProps {
  data: {
    consultas: number;
    exames: number;
    vacinas: number;
    cirurgias: number;
    procedimentos: number;
    cancelados: number;
  };
}

export const AdminArea: React.FC<AdminAreaProps> = ({ data }) => (
  <section className={styles.adminAreaSection}>
    <h2 className={styles.sectionTitle}>Área Administrativa</h2>
    <div className={styles.adminCardsGrid}>
      <AdminCard icon={<AiOutlineUser />} number={data.consultas} label="Consultas" actionLabel="Nova consulta" onClick={() => {}} />
      <AdminCard icon={<AiOutlineFileText />} number={data.exames} label="Exames" actionLabel="Novo exame" onClick={() => {}} />
      <AdminCard icon={<AiOutlineSolution />} number={data.vacinas} label="Vacinas" actionLabel="Nova vacinação" onClick={() => {}} />
      <AdminCard icon={<AiOutlineBook />} number={data.cirurgias} label="Cirurgias" actionLabel="Nova cirurgia" onClick={() => {}} />
      <AdminCard icon={<AiOutlineUser />} number={data.procedimentos} label="Procedimentos" actionLabel="Novo procedimento" onClick={() => {}} />
      <AdminCard icon={<AiOutlinePhone />} number={data.cancelados} label="Cancelados" actionLabel="Ver mais" onClick={() => {}} />
    </div>
  </section>
);
