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

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Patient Record</title>
      </head>
      <body className={styles.container}>
        <Navbar />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
