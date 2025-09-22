// src/app/care-pathway/page.tsx

// src/app/care-pathway/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { CarePathway } from "../types/carePathway.types";
import { get } from "../lib/api";

export const CarePathwayPage: React.FC = () => {
  const [carePathways, setCarePathways] = useState<CarePathway[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPathway, setSelectedPathway] = useState<CarePathway | null>(null);

  useEffect(() => {
    const fetchCarePathways = async () => {
      try {
        const data = await get<CarePathway[]>("/care-pathways");
        setCarePathways(data);
      } catch (error) {
        console.error("Erro ao carregar caminhos de cuidado:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCarePathways();
  }, []);

  if (loading) return <p className={styles.message}>Carregando caminhos de cuidado...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Caminhos de Cuidado</h1>

      {carePathways.length === 0 ? (
        <p className={styles.message}>Nenhum caminho de cuidado encontrado.</p>
      ) : (
        <ul className={styles.list}>
          {carePathways.map((pathway) => (
            <li
              key={pathway.id}
              className={styles.item}
              onClick={() => setSelectedPathway(pathway)}
            >
              {pathway.name}
            </li>
          ))}
        </ul>
      )}

      {selectedPathway && (
        <div className={styles.card}>
          <h2>{selectedPathway.name}</h2>
          {selectedPathway.description && (
            <p><strong>Descrição:</strong> {selectedPathway.description}</p>
          )}
          <p><strong>Tipo:</strong> {selectedPathway.type}</p>
          <p><strong>Início:</strong> {new Date(selectedPathway.startDate).toLocaleDateString()}</p>
          {selectedPathway.endDate && (
            <p><strong>Fim:</strong> {new Date(selectedPathway.endDate).toLocaleDateString()}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CarePathwayPage;
