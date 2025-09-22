// src/hooks/useCarePathway.ts

"use client";

import { useContext } from 'react';
import { CarePathwayContext } from '../contexts/CarePathwayContext';

export const useCarePathway = () => useContext(CarePathwayContext);
