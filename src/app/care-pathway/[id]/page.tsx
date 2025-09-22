// src/app/care-pathway/[id]/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./page.module.css";
import { CarePathway } from "../../types/carePathway.types";
import { get } from "../../lib/api";

export const CarePathwayDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pathway, setPathway] = useState<CarePathway | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPathway = async () => {
      try {
        const data = await get<CarePathway[]>("/care-pathways");
        const found = data.find((p) => p.id === id);
        setPathway(found || null);
      } catch (error) {
        console.error("Erro ao carregar caminho de cuidado:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPathway();
  }, [id]);

  if (loading) return <p>Carregando caminho de cuidado...</p>;
  if (!pathway) return <p>Caminho de cuidado não encontrado.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{pathway.name}</h1>
      {pathway.description && <p>{pathway.description}</p>}
      <p>Tipo: {pathway.type}</p>
      <p>Início: {new Date(pathway.startDate).toLocaleDateString()}</p>
      {pathway.endDate && <p>Fim: {new Date(pathway.endDate).toLocaleDateString()}</p>}
    </div>
  );
};

export default CarePathwayDetailsPage;
