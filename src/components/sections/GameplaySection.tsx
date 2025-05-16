import React from 'react';
import styles from './GameplaySection.module.scss';

const GameplaySection: React.FC = () => {
  return (
    <section id="gameplay" className={styles.gameplaySection}>
      <div className="container">
        <h2>Master the Sacred Tap. Unleash the Girth.</h2>
        <p className={styles.subtitle}>It all starts with the tap. Each one generates $GIRTH. But true power lies in mastering the rhythm:</p>

        <div className={styles.gameplayMechanics}>
          <div className={styles.mechanic}>
            <h3>THE SACRED TAP</h3>
            <p>Your primal connection. Slap the $CHODE, generate $GIRTH.</p>
            {/* TODO: Add visual: Show "+$GIRTH!" numbers */}
          </div>
          <div className={styles.mechanic}>
            <h3>CHODE CHARGE & MEGA SLAP</h3>
            <p>Build energy, then unleash a devastating critical hit!</p>
            {/* TODO: Add visual: Show meter filling, explosion */}
          </div>
          <div className={styles.mechanic}>
            <h3>EJACU-GIRTH MODE</h3>
            <p>Reach peak performance. A cascade of cosmic Girth where legends are made.</p>
            {/* TODO: Add visual: Hint at ultimate state */}
          </div>
        </div>

        <h3>Boost Your Ascension.</h3>
        <p className={styles.subtitle}>Wield the Degen Power-Ups purchased with your $GIRTH:</p>
        
        <div className={styles.powerUpsGrid}>
          <div className={styles.powerUp}>
            <img src="/svg_icons/chodebot.svg" alt="ChodeBot" className={styles.powerUpIcon} />
            <h4>CHODEBOT</h4>
            <p>Your tireless auto-tapping minion.</p>
          </div>
          <div className={styles.powerUp}>
            <img src="/svg_icons/girthquakes.svg" alt="Girthquake" className={styles.powerUpIcon} />
            <h4>GIRTHQUAKE</h4>
            <p>Multiply your gains with a seismic shockwave.</p>
          </div>
          <div className={styles.powerUp}>
            <img src="/svg_icons/oozedrip.svg" alt="OozeDrip" className={styles.powerUpIcon} />
            <h4>OOZEDRIP</h4>
            <p>Passive $GIRTH income, even when you&apos;re AFK.</p>
          </div>
          <div className={styles.powerUp}>
            <img src="/svg_icons/combo_rush.svg" alt="Combo Rush" className={styles.powerUpIcon} />
            <h4>COMBO RUSH</h4>
            <p>Maintain the rhythm for explosive tap multipliers.</p>
          </div>
        </div>
        <p className={styles.hint}>*(Hint at Fusion Boosts): Discover arcane combinations for ultimate power!*</p>
      </div>
    </section>
  );
};

export default GameplaySection; 