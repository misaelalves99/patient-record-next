// /electronic-patient-record-platform/src/components/ui/index.tsx
import React from 'react';
import styles from './ui.module.css';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { label: string; }
export const Button: React.FC<ButtonProps> = ({ label, ...props }) => <button className={styles.button} {...props}>{label}</button>;
export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className={styles.card}>{children}</div>;