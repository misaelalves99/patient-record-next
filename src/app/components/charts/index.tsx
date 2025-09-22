// src/components/charts/index.tsx

import React from "react";
import styles from "./charts.module.css";

interface ChartProps {
  title: string;
  children: React.ReactNode;
}
export const ChartContainer: React.FC<ChartProps> = ({ title, children }) => (
  <div className={styles.chart}>
    <h3 className={styles.title}>{title}</h3>
    <div className={styles.content}>{children}</div>
  </div>
);
