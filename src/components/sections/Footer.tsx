"use client";

import React, { useState } from 'react';
import styles from './Footer.module.scss';
import ManifestoViewer from '../ManifestoViewer/ManifestoViewer';
import { manifestoContent } from '../ManifestoContent';

// Placeholder for actual icons
// const IconPlaceholder = ({ name }: { name: string }) => (
//   <span className={styles.iconPlaceholder}>{name.charAt(0)}</span>
// );

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);

  const openManifesto = () => setIsManifestoOpen(true);
  const closeManifesto = () => setIsManifestoOpen(false);

  return (
    <>
      <footer className={styles.footer}>
        <div className={`container ${styles.footerContainer}`}>
          <div className={styles.footerLinks}>
            {/* <a href="#" className={styles.litepaper}>Sacred Scrolls (Litepaper)</a> */}
            <button onClick={openManifesto} className={styles.litepaperButton}>
              Sacred Scrolls (Litepaper)
            </button>
          </div>
          <div className={styles.copyright}>
            <p>&copy; {currentYear} GigaChode. All Rights Reserved. Thou Art Girthy.</p>
            <p className={styles.degenCreed}>Powered by Memes, Fueled by Degens, Forged in the Chaos.</p>
          </div>
        </div>
      </footer>
      <ManifestoViewer 
        isOpen={isManifestoOpen} 
        onClose={closeManifesto} 
        manifestoText={manifestoContent} 
      />
    </>
  );
};

export default Footer; 