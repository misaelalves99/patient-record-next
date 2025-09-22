// src/contexts/CarePathwayProvider.tsx

"use client";

import React, { useState, ReactNode } from "react";
import { CarePathwayContext } from "./CarePathwayContext";
import { CarePathway } from "../types/carePathway.types";

interface CarePathwayProviderProps {
  children: ReactNode;
}

export const CarePathwayProvider: React.FC<CarePathwayProviderProps> = ({ children }) => {
  const [carePathways, setCarePathways] = useState<CarePathway[]>([]);

  const addCarePathway = (cp: CarePathway) =>
    setCarePathways((prev) => [...prev, cp]);

  const updateCarePathway = (updated: CarePathway) =>
    setCarePathways((prev) =>
      prev.map((cp) => (cp.id === updated.id ? updated : cp))
    );

  const removeCarePathway = (id: string) =>
    setCarePathways((prev) => prev.filter((cp) => cp.id !== id));

  return (
    <CarePathwayContext.Provider
      value={{
        carePathways,
        addCarePathway,
        updateCarePathway,
        removeCarePathway,
      }}
    >
      {children}
    </CarePathwayContext.Provider>
  );
};
