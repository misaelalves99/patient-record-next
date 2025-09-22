// /electronic-patient-record-platform/src/components/forms/index.tsx
import React from 'react';
import styles from './forms.module.css';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { label: string; }
export const Input: React.FC<InputProps> = ({ label, ...props }) => <label className={styles.label}>{label}<input className={styles.input} {...props} /></label>;
export const FormContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => <form className={styles.form}>{children}</form>;