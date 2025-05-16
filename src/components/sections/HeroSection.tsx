'use client'; // Directive to mark this as a Client Component

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.scss';
import gsap from 'gsap';
// import IconPlaceholder from '@/components/IconPlaceholder/IconPlaceholder'; // Assuming no icons needed directly in Hero for now

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate Main Headline elements - reduced duration and stagger
    tl.fromTo(
      [`.${styles.massiveGirth}`, `.${styles.imminent}`],
      { opacity: 0, y: 50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, delay: 0.1 } // Reduced duration, stagger, and delay
    )
    // Animate Game Title - faster animation with less delay
    .fromTo(
      [`.${styles.chodeTapper}`, `.${styles.girthToEarn}`],
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.1 }, // Reduced duration and stagger
      "-=0.3" // Less overlap with previous animation
    )
    // Animate Subtitle entrance more quickly
    .fromTo(
      `.${styles.subtitle}`,
      { opacity: 0, y: 30, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.5, // Reduced duration
        ease: 'elastic.out(1, 0.75)',
        onComplete: () => {
          // Add a repeating pulse animation to subtitle AFTER it appears
          gsap.to(`.${styles.subtitle}`, {
            scale: 1.05, // Scale up slightly
            repeat: -1, // Repeat indefinitely
            yoyo: true, // Animate back and forth
            duration: 0.8, // Duration of one pulse (up and down)
            ease: 'sine.inOut', // Smooth easing for the pulse
          });
        }
      },
      "-=0.2" // Reduced overlap
    );

    // Animate Opening Hook and Core Concept after subtitle completes - faster
    tl.fromTo(
      [`.${styles.openingHook}`, `.${styles.coreConcept}`],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.15 }, // Reduced duration and stagger
      "-=0.2" // Less delay after subtitle
    )
    // Only animate the CTA section after all text content has appeared
    .fromTo(
      `.${styles.ctaContainer}`,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5 }, // Slightly reduced duration
      "-=0.1" // Make CTA appear sooner
    )
    .fromTo(
      `.${styles.smallText}`,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }, // Reduced duration
      "-=0.2" // After .ctaButtons container
    );

  }, []);

  const handleWaitlistSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    if (!email) {
      setMessage('Please enter your email address.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Successfully joined! Girthy updates incoming!');
        setEmail(''); // Clear email field on success
      } else {
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('Failed to submit. Please check your connection and try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <section 
      id="hero" 
      className={styles.heroSection}
      style={{ backgroundImage: `url('/images/hero40.jpg')` }} // Setting the hero image as a background
      ref={heroRef}
    >
      <div className={styles.overlay}></div> {/* Optional overlay for text contrast */}
      <div className={`container ${styles.heroContent}`}> 
        <h1 className={styles.mainHeadline}>
          <span className={styles.massiveGirth}>MASSIVE GIRTH</span> <span className={styles.imminent}>IMMINENT.</span>
        </h1>
        <h2 className={styles.gameTitle}>
          <span className={styles.chodeTapper}>$CHODE TAPPER:</span> <span className={styles.girthToEarn}>Girth to Earn</span>
        </h2>
        
        <p className={styles.subtitle}>
          Tap. Accumulate. Ascend.
        </p>
        {/* OR Alternative Subtitle/Tagline based on landing-page-concept.md
        <p className={styles.subtitle}>
          Girth. To. Earn.
        </p> 
        */}

        <p className={styles.openingHook}>
          Hark, ye denizens of the digital depths! Prepare your sacred digits for the only game that matters. 
          Forget whitepapers drier than a forgotten smart contract – this is about RAW, UNCUT GIRTH.
        </p>
        <p className={styles.coreConcept}>
          CHODE Tapper: Girth to Earn is the hyper-casual, meme-driven idle tapper where you 
          <strong> TAP THE ALMIGHTY $CHODE ICON</strong> to generate $GIRTH, the universal currency of ascension. 
          Upgrade your Chode, unlock insane degen-boosts, and etch your legend onto the blockchain.
        </p>

        <div className={styles.ctaContainer}>
          <form onSubmit={handleWaitlistSubmit} className={styles.emailFormContainer}>
            <input 
              type="email" 
              placeholder="Enter Your Email for Girthy Updates" 
              className={styles.emailInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <button type="submit" className={`btn ${styles.btnPrimary} ${styles.btnWaitsList}`} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'JOIN THE GIRTH WAITS LIST'}
            </button>
          </form>
          {message && <p className={styles.submissionMessage}>{message}</p>}
          <a href="https://x.com/GigaCode_Dev" target="_blank" rel="noopener noreferrer" className={`btn ${styles.btnSecondary} ${styles.btnFollow}`}>
            <Image src="/svg_icons/twitter_X.svg" alt="Twitter X" className={styles.followIcon} width={24} height={24} /> 
            FOLLOW THE GIGACHODE (X/Twitter)
          </a>
          <p className={styles.smallText}>The prophecy is unfolding. Don&apos;t get left behind.</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 