// src/app/care-pathway/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { CarePathway } from "../types/carePathway.types";
import { get } from "../lib/api";

export const CarePathwayPage: React.FC = () => {
  const [carePathways, setCarePathways] = useState<CarePathway[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarePathways = async () => {
      try {
        const data = await get<CarePathway[]>("/care-pathways");
        setCarePathways(data);
      } catch (error) {
        console.error("Erro ao carregar care pathways:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCarePathways();
  }, []);

  if (loading) return <p>Carregando caminhos de cuidado...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Caminhos de Cuidado</h1>
      {carePathways.length === 0 ? (
        <p>Nenhum caminho de cuidado encontrado.</p>
      ) : (
        <ul className={styles.list}>
          {carePathways.map((pathway) => (
            <li key={pathway.id} className={styles.item}>
              {pathway.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CarePathwayPage;
