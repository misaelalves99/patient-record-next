// src/app/care-pathway/[id]/page.tsx

import React from 'react';
import { useRouter } from 'next/router';
import styles from './page.module.css';
import { useCarePathway } from '../../hooks/useCarePathway';
import { CarePathway } from '../../types/carePathway.types';

export const CarePathwayDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { carePathways } = useCarePathway();

  const pathway: CarePathway | undefined = carePathways.find(
    (p: CarePathway) => p.id === id
  );

  if (!pathway) return <p>Care pathway not found.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{pathway.name}</h1>
      {pathway.description && <p>{pathway.description}</p>}
    </div>
  );
};

export default CarePathwayDetailsPage;
