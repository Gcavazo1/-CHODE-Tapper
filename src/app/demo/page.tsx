"use client";

import React from 'react';
import styles from './DemoPage.module.scss'; // We'll create this for styling
import EarlyAdopterForm from '@/components/EarlyAdopterForm';

const DemoPage: React.FC = () => {
  // Using the path you specified in your page.tsx file
  const gameSrc = "/game_demo/demo_build.html";

  return (
    <div className={styles.demoPageContainer}>
      <header className={styles.header}>
        <h1>$CHODE Tapper - Genesis Tap Demo</h1>
        <p>Behold! The first playable glimpse into the Girthyverse!</p>
      </header>
      
      <div className={styles.gameDemoWrapper}>
        <iframe
          src={gameSrc}
          className={styles.gameIframe}
          title="$CHODE Tapper Demo"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
        ></iframe>
      </div>

      <section className={styles.instructions}>
        <h2>How to Play:</h2>
        <p>Click the $CHODE with righteous fury to generate $GIRTH! Complete achievements and unlock upgrades as you ascend through the Girthyverse!</p>
        <p className={styles.tipText}>Tip: For the full experience, interact with the various UI elements around the central $CHODE.</p>
      </section>
      
      <EarlyAdopterForm />
      
      <div className={styles.footerNote}>
        <p>© {new Date().getFullYear()} GigaChode. The Genesis Tap Demo is just the beginning. Register above to be notified of updates, airdrops, and the full game release!</p>
      </div>
    </div>
  );
};

export default DemoPage; 