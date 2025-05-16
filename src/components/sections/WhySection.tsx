import React from 'react';
import styles from './WhySection.module.scss';

const WhySection: React.FC = () => {
  return (
    <section className={styles.whySection}>
      <div className={styles.content}>
        <h2 className={styles.headline}>THE MEME-SHAPED HOLE IN YOUR PORTFOLIO (AND SOUL).</h2>
        <p className={styles.copy}>
          Let's be real. The crypto-verse is too damn serious. We came for the parabolic gains and stayed for the... waiting? 
          $CHODE Tapper is the antidote.
        </p>
        <ul className={styles.featuresList}>
          <li>
            <strong className={styles.featureStrong}>UNAPOLOGETICALLY DEGEN:</strong> Embracing the chaos, the humor, the absurdity of meme culture.
          </li>
          <li>
            <strong className={styles.featureStrong}>ADDICTIVELY SIMPLE:</strong> A core loop so satisfying, it becomes a ritual.
          </li>
          <li>
            <strong className={styles.featureStrong}>VISUALLY STIMULATING:</strong> Cyberpunk Dumpster Fire Chic – neon, glitches, escalating rewards.
          </li>
          <li>
            <strong className={styles.featureStrong}>WEB3 ENHANCED (OPTIONAL):</strong> Blockchain adds true ownership & bragging rights, but isn't required to have fun.
          </li>
        </ul>
        <div className={styles.subCta}>
          <p>Ready for something real? Something ridiculous?</p>
          {/* TODO: Consider CTA buttons or link back to Hero CTA */}
          {/* <button className={`${styles.button} ${styles.buttonPrimary}`}>JOIN THE WAITS LIST</button> */}
        </div>
      </div>
    </section>
  );
};

export default WhySection; 