// src/components/layout/Footer.tsx

import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      © {new Date().getFullYear()} Electronic Patient Record Platform
    </footer>
  );
};

export default Footer;
