// /electronic-patient-record-platform/src/contexts/AuthContext.tsx
import { createContext } from 'react';
import { User } from '../types/auth.types';
export interface AuthContextType { user: User | null; token: string | null; login: (token: string, user: User) => void; logout: () => void; }
export const AuthContext = createContext<AuthContextType>({ user: null, token: null, login: () => {}, logout: () => {}, });