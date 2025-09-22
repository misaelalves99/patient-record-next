// src/hooks/useCarePathway.ts

import { useContext } from 'react';
import { CarePathwayContext } from '../contexts/CarePathwayContext';

export const useCarePathway = () => useContext(CarePathwayContext);
