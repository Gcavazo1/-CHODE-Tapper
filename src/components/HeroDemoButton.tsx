'use client';

import React from 'react';
import Link from 'next/link';
import styles from './sections/HeroSection.module.scss'; // Import the styles

// No props are needed for this component anymore
const HeroDemoButton: React.FC = () => { // Removed props annotation
  return (
    <Link href="/demo" passHref legacyBehavior>
      {/* Apply the new style directly from HeroSection.module.scss */}
      <a className={styles.playDemoButton} aria-label="Play $CHODE Tapper Demo">
        PLAY THE DAMN DEMO!
      </a>
    </Link>
  );
};

export default HeroDemoButton; 