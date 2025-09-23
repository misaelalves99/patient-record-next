// src/app/patients/report/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Patient } from "../../types/patient.types";
import { get } from "../../lib/api";
import styles from "./page.module.css";
import {
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineCalendar,
  AiOutlineBank,
  AiOutlineSolution,
  AiOutlineFileText,
  AiOutlineClockCircle,
  AiOutlineBook,
  AiOutlineEdit,
  AiOutlineArrowRight,
  AiOutlinePlus,
} from "react-icons/ai";

// Componente para o card de informações do paciente
const InfoCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number | undefined;
}> = ({ icon, label, value }) => (
  <div className={styles.infoCard}>
    <div className={styles.infoIcon}>{icon}</div>
    <div className={styles.infoContent}>
      <span className={styles.infoLabel}>{label}</span>
      <h3 className={styles.infoValue}>{value || "N/A"}</h3>
    </div>
  </div>
);

// Componente para o card de área administrativa
const AdminCard: React.FC<{
  icon: React.ReactNode;
  number: number;
  label: string;
  actionLabel: string;
  onClick: () => void;
}> = ({ icon, number, label, actionLabel, onClick }) => (
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

const PatientReportPage: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("ID do paciente não fornecido.");
      setLoading(false);
      return;
    }

    const fetchPatientData = async () => {
      try {
        const patientData = await get<Patient>(`/patients/${id}`);
        setPatient(patientData);
      } catch (err) {
        console.error("Erro ao buscar dados do paciente:", err);
        setError("Não foi possível carregar os dados do paciente.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id]);

  if (loading) {
    return <div className={styles.message}>Carregando relatório...</div>;
  }

  if (error) {
    return <div className={styles.message}>{error}</div>;
  }

  if (!patient) {
    return <div className={styles.message}>Paciente não encontrado.</div>;
  }

  // Dados de mock para simular a área administrativa
  const mockAdminData = {
    consultas: 31,
    exames: 2,
    vacinas: 0,
    cirurgias: 2,
    procedimentos: 47,
    cancelados: 0,
  };

  return (
    <div className={styles.container}>
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
                <AiOutlineCalendar /> {new Date().getFullYear() - new Date(patient.birthDate).getFullYear()} anos
              </span>
            </div>
            <div className={styles.plan}>
              <AiOutlineBank /> Plano: UNIMED
            </div>
          </div>
          <button className={styles.editButton}>
            <AiOutlineEdit /> Editar
          </button>
        </div>
      </header>

      <div className={styles.contentGrid}>
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

        <section className={styles.observationsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Observações</h2>
            <button className={styles.editLink}>
              <AiOutlineEdit />
            </button>
          </div>
          <p className={styles.observationText}>
            Paciente mais sensível a dor. Agendar procedimentos com tempo extra.
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

        <section className={styles.adminAreaSection}>
          <h2 className={styles.sectionTitle}>Área Administrativa</h2>
          <div className={styles.adminCardsGrid}>
            <AdminCard
              icon={<AiOutlineUser />}
              number={mockAdminData.consultas}
              label="Consultas"
              actionLabel="Nova consulta"
              onClick={() => {}}
            />
            <AdminCard
              icon={<AiOutlineFileText />}
              number={mockAdminData.exames}
              label="Exames"
              actionLabel="Novo exame"
              onClick={() => {}}
            />
            <AdminCard
              icon={<AiOutlineSolution />}
              number={mockAdminData.vacinas}
              label="Vacinas"
              actionLabel="Nova vacinação"
              onClick={() => {}}
            />
            <AdminCard
              icon={<AiOutlineBook />}
              number={mockAdminData.cirurgias}
              label="Cirurgias"
              actionLabel="Nova cirurgia"
              onClick={() => {}}
            />
            <AdminCard
              icon={<AiOutlineUser />}
              number={mockAdminData.procedimentos}
              label="Procedimentos"
              actionLabel="Novo procedimento"
              onClick={() => {}}
            />
            <AdminCard
              icon={<AiOutlinePhone />}
              number={mockAdminData.cancelados}
              label="Cancelados"
              actionLabel="Ver mais"
              onClick={() => {}}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PatientReportPage;
