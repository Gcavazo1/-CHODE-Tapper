import React from 'react';
import styles from './CommunitySection.module.scss';

const CommunitySection: React.FC = () => {
  return (
    <section id="community" className={styles.communitySection}>
      <div className="container">
        <h2>Embrace the Absurd. Join the Chodeverse.</h2>
        <p className={styles.subtitle}>
          We&apos;re building something different. A community fueled by memes, absurdity, and the relentless pursuit of Girth.
        </p>

        <div className={styles.communityPillars}>
          <div className={styles.pillar}>
            <h4>TRUE DEGEN OWNERSHIP</h4>
            <p>Opt-in Web3 features like On-Chain Chode Badge NFTs and the Proof-of-Girth Leaderboard give you verifiable status and true ownership of your achievements.</p>
          </div>
          <div className={styles.pillar}>
            <h4>THE COMMUNITY IS THE CO-CHODE</h4>
            <p>Join fellow degens on the leaderboard, share your memes, and help shape the future of the game.</p>
          </div>
        </div>

        <div className={styles.ctaButtons}>
          <a href="https://x.com/GigaCode_Dev" target="_blank" rel="noopener noreferrer" className={`btn ${styles.btnIcon}`}> 
            <img src="/svg_icons/twitter_X.svg" alt="Follow on X/Twitter" className={styles.socialIcon} />
            Follow on X/Twitter
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className={`btn ${styles.btnIcon}`}>
            <img src="/svg_icons/messenger.svg" alt="Join the Discord" className={styles.socialIcon} /> 
            Join the Discord
          </a>
          <a href="https://www.instagram.com/gigacode_dev/" target="_blank" rel="noopener noreferrer" className={`btn ${styles.btnIcon}`}>
            <img src="/svg_icons/instagram.svg" alt="Follow on Instagram" className={styles.socialIcon} /> 
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection; 