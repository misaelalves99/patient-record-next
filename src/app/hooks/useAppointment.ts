// src/hooks/useAppointment.ts

"use client";

import { useContext } from "react";
import { AppointmentContext } from "../contexts/AppointmentContext";

export const useAppointment = () => useContext(AppointmentContext);
