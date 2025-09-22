// src/app/care-pathway/page.tsx

"use client";

import React from 'react';
import styles from './page.module.css';
import { useCarePathway } from '../hooks/useCarePathway';
import { CarePathway } from '../types/carePathway.types';

export const CarePathwayPage: React.FC = () => {
  const { carePathways } = useCarePathway();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Care Pathways</h1>
      {carePathways.length === 0 ? (
        <p>No care pathways found.</p>
      ) : (
        <ul className={styles.list}>
          {carePathways.map((pathway: CarePathway) => (
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
