// /electronic-patient-record-platform/src/hooks/useAppointment.ts

import { useContext } from "react";
import { AppointmentContext } from "../contexts/AppointmentContext";

export const useAppointment = () => useContext(AppointmentContext);
