import React from 'react';
import Image from 'next/image'; // Import Next.js Image component
import styles from './EconomySection.module.scss';

// Placeholder for icons/images - we'll need to source or create these later!
const ImagePlaceholder = ({ name, type }: { name: string, type: string }) => (
  <div className={`${styles.imagePlaceholder} ${type === 'tier' ? styles.tierPlaceholder : styles.itemPlaceholder}`}>
    <span className={styles.placeholderName}>{name}</span>
    <span className={styles.comingSoonText}>Coming Soon</span>
  </div>
);

const EconomySection: React.FC = () => {
  return (
    <section className={styles.economySection}>
      <div className={styles.content}>
        <h2 className={styles.mainHeadline}>
          SPEND $GIRTH. MAKE MORE $GIRTH. LOOK DAMN GOOD DOING IT.
        </h2>
        <p className={styles.introCopy}>
          Your journey of Girth isn&apos;t just about tapping. It&apos;s about strategic investment in the Girth Bazaar, where $GIRTH transcends mere currency and becomes a tool of self-improvement and stylistic expression!
        </p>

        <div className={styles.category}>
          <h3 className={styles.categoryHeadline}>ASCEND THY MEMBER</h3>
          <p className={styles.categoryDescription}>Evolve your $CHODE Icon through glorious visual and mechanical tiers. A mightier $CHODE yields mightier $GIRTH!</p>
          <div className={`${styles.itemGrid} ${styles.tierGrid}`}>
            <div className={`${styles.imagePlaceholder} ${styles.tierPlaceholder}`}>
              <Image
                src="/models/humble_sprout02.jpg"
                alt="Tier 1: Humble Sprout"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={`${styles.imagePlaceholder} ${styles.tierPlaceholder}`}>
              <Image
                src="/models/veinous_veridian.jpg"
                alt="Tier 2: Veinous Veridian"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={`${styles.imagePlaceholder} ${styles.tierPlaceholder}`}>
              <Image
                src="/models/cracked_core.jpg"
                alt="Tier 3: Cracked Core"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={`${styles.imagePlaceholder} ${styles.tierPlaceholder}`}>
              <Image
                src="/models/radiant_eminence03.jpg"
                alt="Tier 4: Radiant Eminence"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={`${styles.imagePlaceholder} ${styles.tierPlaceholder}`}>
              <Image
                src="/models/cosmic_chode_prime.jpg"
                alt="Tier 5: Cosmic Chode Prime"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <p className={styles.disclaimerText}>
            (Prompt-generated conceptual art. Visual representations of the glorious evolution of thy member, not final in-game assets.)
          </p>
        </div>

        <div className={styles.category}>
          <h3 className={styles.categoryHeadline}>FINGER WORKOUTS</h3>
          <p className={styles.categoryDescription}>Permanently enhance your tapping power and Degen Power-Up efficiency. More Slaps, More Girth!</p>
          <div className={`${styles.itemGrid} ${styles.enhancementGrid}`}>
            <div className={styles.enhancementItem}>
              <Image src="/svg_icons/iron_grip.svg" alt="Iron Grip Fundamentals Icon" width={100} height={100} className={styles.enhancementIcon} />
              <span className={styles.enhancementName}>Iron Grip</span>
            </div>
            <div className={styles.enhancementItem}>
              <Image src="/svg_icons/chodebot_efficiency_matrix.svg" alt="ChodeBot Efficiency Matrix Icon" width={100} height={100} className={styles.enhancementIcon} />
              <span className={styles.enhancementName}>ChodeBot Matrix</span>
            </div>
            <div className={styles.enhancementItem}>
              <Image src="/svg_icons/girthquake_magnitude.svg" alt="Girthquake Magnitude Icon" width={100} height={100} className={styles.enhancementIcon} />
              <span className={styles.enhancementName}>Girthquake Mag.</span>
            </div>
            <div className={styles.enhancementItem}>
              <Image src="/svg_icons/oozedrip_concentration.svg" alt="OozeDrip Concentration Icon" width={100} height={100} className={styles.enhancementIcon} />
              <span className={styles.enhancementName}>OozeDrip Conc.</span>
            </div>
          </div>
        </div>

        <div className={styles.category}>
          <h3 className={styles.categoryHeadline}>CHODE COUTURE</h3>
          <p className={styles.categoryDescription}>Customize your degen dungeon with insane Cosmetic Themes! Let your Girth flag fly!</p>
          <div className={`${styles.itemGrid} ${styles.themeGrid}`}>
            <ImagePlaceholder name="Cyberpink Slime" type="theme" />
            <ImagePlaceholder name="VoidGreen Matrix" type="theme" />
            <ImagePlaceholder name="SynthGold Palace" type="theme" />
          </div>
        </div>

        <div className={styles.category}>
          <h3 className={styles.categoryHeadline}>EXOTIC SPECIMENS</h3>
          <p className={styles.categoryDescription}>Collect rare, legendary $CHODE Skins for the ultimate flex! These are the crown jewels of Girth.</p>
          <div className={`${styles.itemGrid} ${styles.skinGrid}`}>
            <ImagePlaceholder name="Diamond Chode" type="skin" />
            <ImagePlaceholder name="Nyan Chode" type="skin" />
            <ImagePlaceholder name="Eldritch Chode" type="skin" />
            <ImagePlaceholder name="Banana Chode" type="skin" />
          </div>
        </div>

        <div className={styles.subCta}>
          <p>The path to Girth Godhood is paved with strategic spending.</p>
          {/* Link back to Hero CTA or repeat buttons if desired */}
        </div>

      </div>
    </section>
  );
};

export default EconomySection; 