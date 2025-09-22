// src/app/layout.tsx

import React, { ReactNode } from "react";
import "./globals.css";
import "./variables.css";
import styles from "./layout.module.css";
import Navbar from "../app/components/layout/Navbar";
import Footer from "../app/components/layout/Footer";

interface LayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
