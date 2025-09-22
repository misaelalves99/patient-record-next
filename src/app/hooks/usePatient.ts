// src/hooks/usePatient.ts

"use client";

import { useContext } from 'react';
import { PatientContext } from '../contexts/PatientContext';

export const usePatient = () => useContext(PatientContext);