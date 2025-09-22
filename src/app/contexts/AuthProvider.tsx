// /electronic-patient-record-platform/src/contexts/AuthProvider.tsx
import React, { useState, ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { User } from '../types/auth.types';
interface AuthProviderProps { children: ReactNode; }
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => { const [user, setUser] = useState<User | null>(null); const [token, setToken] = useState<string | null>(null);
const login = (token: string, user: User) => { setToken(token); setUser(user); localStorage.setItem('auth_token', token); localStorage.setItem('auth_user', JSON.stringify(user)); };
const logout = () => { setToken(null); setUser(null); localStorage.removeItem('auth_token'); localStorage.removeItem('auth_user'); };
return (<AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>); };