// /electronic-patient-record-platform/src/hooks/usePatient.ts
import { useContext } from 'react';
import { PatientContext } from '../contexts/PatientContext';
export const usePatient = () => useContext(PatientContext);