// /electronic-patient-record-platform/src/app/care-pathway/page.tsx

import React from 'react';
import styles from './page.module.css';
import { useCarePathway } from '../hooks/useCarePathway';

export const CarePathwayPage: React.FC = () => {
  const { pathways } = useCarePathway();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Care Pathways</h1>
      {pathways.length === 0 ? (
        <p>No care pathways found.</p>
      ) : (
        <ul className={styles.list}>
          {pathways.map((pathway) => (
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
