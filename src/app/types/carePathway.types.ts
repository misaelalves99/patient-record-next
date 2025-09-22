// /electronic-patient-record-platform/src/types/carePathway.types.ts

export interface CarePathway {
  id: string;
  name: string;
  type: string;
  description?: string;
  startDate: string;
  endDate?: string;
  patientId: string;
  createdAt: string;
  updatedAt: string;
}
