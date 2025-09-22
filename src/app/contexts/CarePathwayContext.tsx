// src/contexts/CarePathwayContext.tsx

"use client";

import { createContext } from "react";
import { CarePathway } from "../types/carePathway.types";

export interface CarePathwayContextType {
  carePathways: CarePathway[];
  addCarePathway: (cp: CarePathway) => void;
  updateCarePathway: (cp: CarePathway) => void;
  removeCarePathway: (id: string) => void;
}

export const CarePathwayContext = createContext<CarePathwayContextType>({
  carePathways: [],
  addCarePathway: () => {},
  updateCarePathway: () => {},
  removeCarePathway: () => {},
});
