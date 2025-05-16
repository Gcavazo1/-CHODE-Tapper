"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './FloatingMusicButton.module.scss';
// import { ChodePlayIcon, ChodePauseIcon } from '../icons'; // Placeholder for potential custom icons

const FloatingMusicButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          // Autoplay was prevented, handle gracefully or log
          console.error("Audio play failed:", error);
          // Optionally, set isPlaying to false if play() fails and wasn't already playing
          // This can happen if the user hasn't interacted with the page yet.
          // Browsers often require a user gesture to start audio.
          setIsPlaying(false); 
          return;
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Optional: If you want the music to loop
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/audio/girth_anthem.mp3" preload="metadata" />
      <button
        className={`${styles.floatingButton} ${isPlaying ? styles.playing : styles.paused}`}
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pause Girth Anthem" : "Play Girth Anthem"}
      >
        <div className={styles.iconContainer}>
          {/* Replace with actual SVG icons or a more chode-themed visual */}
          {isPlaying ? (
            <span className={styles.pauseIcon}>❚❚</span> // Simple Pause Icon
          ) : (
            <span className={styles.playIcon}>►</span> // Simple Play Icon
          )}
        </div>
        <span className={styles.buttonText}>
          {isPlaying ? "SILENCE THE SLAP" : "FEEL THE GIRTH"}
        </span>
      </button>
    </>
  );
};

export default FloatingMusicButton; 