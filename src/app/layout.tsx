// /electronic-patient-record-platform/src/app/layout.tsx

import React, { ReactNode } from 'react';
import './globals.css';
import './variables.css';
import styles from './layout.module.css';
import { Header, Footer, Main } from '../app/components/layout';

interface LayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header title="Electronic Patient Record Platform" />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default AppLayout;
