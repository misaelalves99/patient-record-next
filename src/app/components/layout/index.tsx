// /electronic-patient-record-platform/src/components/layout/index.tsx

import React from "react";
import styles from "./layout.module.css";

export const Header: React.FC<{ title: string }> = ({ title }) => (
  <header className={styles.header}>{title}</header>
);
export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    © 2025 Electronic Patient Record Platform
  </footer>
);
export const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className={styles.main}>{children}</main>
);
