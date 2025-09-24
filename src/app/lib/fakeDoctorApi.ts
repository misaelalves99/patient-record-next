// src/lib/fakeDoctorApi.ts

export type Doctor = { id: string; name: string };

// 🔹 Renomeado para initDoctors para padronizar com initPatients
export const initDoctors = (): Doctor[] => {
  return [
    { id: "d1", name: "Dr. João Silva" },
    { id: "d2", name: "Dra. Maria Souza" },
    { id: "d3", name: "Dr. Carlos Pereira" },
  ];
};
