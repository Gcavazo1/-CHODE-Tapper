"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './ManifestoAudioPlayer.module.scss';

interface ManifestoAudioPlayerProps {
  className?: string;
}

const VOICE_OPTIONS = [
  { id: 'en-US-Wavenet-D', name: 'Male (Deep, Authoritative - WaveNet)' },
  { id: 'en-US-Neural2-J', name: 'Male (Clear, Commanding - Neural2)' },
  { id: 'en-US-Wavenet-C', name: 'Female (Warm, Professional - WaveNet)' },
  { id: 'en-US-Neural2-F', name: 'Female (Articulate, Gravitas - Neural2)' },
];

const ManifestoAudioPlayer: React.FC<ManifestoAudioPlayerProps> = ({ className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string>(VOICE_OPTIONS[0].id);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null); 
  const isMountedRef = useRef(false); // To track mount status for async operations

  useEffect(() => {
    isMountedRef.current = true;
    const currentAudioRef = audioRef.current; 
    return () => {
      isMountedRef.current = false;
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }
      if (currentAudioRef) {
        currentAudioRef.pause();
        currentAudioRef.src = '';
      }
    };
  }, []);

  const cleanupAudioResources = () => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        // Remove event listeners to prevent them firing on stale instances
        audioRef.current.onloadedmetadata = null;
        audioRef.current.onerror = null;
        audioRef.current.onended = null;
    }
    if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
    }
  };

  const handlePlay = async () => {
    if (!isMountedRef.current) return;
    setError(null); 

    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    // If audio is already loaded (valid src and blob URL exists) and playable
    if (audioRef.current && audioRef.current.src && audioUrlRef.current && audioRef.current.readyState >= 2 /* HAVE_CURRENT_DATA */) {
        try {
            console.log('Attempting to play existing loaded audio...');
            await audioRef.current.play();
            if (isMountedRef.current) setIsPlaying(true);
        } catch (playError) {
            console.error('Error re-playing audio:', playError);
            if (isMountedRef.current) {
                const errorMessage = playError instanceof Error 
                    ? playError.message 
                    : 'An unknown error occurred while playing audio';
                setError(`Failed to re-play audio: ${errorMessage}`);
            }
            cleanupAudioResources(); // Clean up if replay fails
        }
        return;
    }

    // If we reach here, we need to fetch new audio
    console.log('Need to fetch new audio or current audio is not ready.');
    cleanupAudioResources(); // Clean up any previous audio resources before fetching new
    if (isMountedRef.current) setIsLoading(true);

    try {
      console.log(`Fetching audio from API with voice: ${selectedVoice}...`);
      const response = await fetch(`/api/narrate-manifesto?voiceName=${encodeURIComponent(selectedVoice)}`);
      
      if (!isMountedRef.current) return; // Check after await
      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = 'Failed to fetch audio';
        try {
          const errorData = await response.json();
          console.error('API Error Details:', errorData);
          errorMessage = errorData.message || errorMessage;
          if (errorData.error) {
            errorMessage += ': ' + errorData.error;
          }
        } catch (jsonError) {
          console.error('Could not parse error response as JSON:', jsonError);
          errorMessage = `HTTP Error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      const audioBlob = await response.blob();
      if (!isMountedRef.current) return; // Check after await
      console.log('Received audio blob:', audioBlob.size, 'bytes, type:', audioBlob.type);
      const newAudioUrl = URL.createObjectURL(audioBlob);
      audioUrlRef.current = newAudioUrl; 

      if (audioRef.current) {
        audioRef.current.src = newAudioUrl;
        audioRef.current.onloadedmetadata = () => {
            if (!isMountedRef.current) return;
            console.log('Audio metadata loaded');
        };
        audioRef.current.onerror = (e) => {
          if (!isMountedRef.current) return;
          console.error('Audio playback error event:', e);
          let message = 'Unknown audio playback error';
          if (audioRef.current?.error) {
            switch (audioRef.current.error.code) {
              case MediaError.MEDIA_ERR_ABORTED:
                message = 'Audio playback aborted by user.'; break;
              case MediaError.MEDIA_ERR_NETWORK:
                message = 'A network error occurred while fetching the audio.'; break;
              case MediaError.MEDIA_ERR_DECODE:
                message = 'The audio could not be decoded.'; break;
              case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                message = 'The audio format is not supported or the source is invalid.'; break;
              default:
                message = `Audio playback error: ${audioRef.current.error.message || 'code ' + audioRef.current.error.code}`;
            }
          }
          setError(message);
          setIsPlaying(false);
          setIsLoading(false);
          cleanupAudioResources(); // Critical: clean up on error to prevent loops
        };
        
        audioRef.current.onended = () => {
          if (!isMountedRef.current) return;
          console.log('Audio playback ended');
          setIsPlaying(false);
          // Optional: cleanupAudioResources() here if you don't want to allow replaying the same loaded audio
        };
        
        try {
            console.log('Audio source set, attempting to play...');
            await audioRef.current.play();
            if (isMountedRef.current) {
                console.log('Audio playback started successfully after load');
                setIsPlaying(true);
            }
        } catch (playError) {
            if (!isMountedRef.current) return;
            console.error('Failed to play audio immediately after load:', playError);
            const errorMessage = playError instanceof Error
                ? playError.message
                : 'An unknown error occurred while playing audio';
            setError(`Failed to play audio: ${errorMessage}`);
            setIsPlaying(false);
            cleanupAudioResources();
        }
      } else {
         if (isMountedRef.current) setError('Audio element reference is lost.');
      }
    } catch (error) {
      if (!isMountedRef.current) return;
      console.error('Error in handlePlay (fetch or setup): ', error);
      setError(error instanceof Error ? error.message : 'Failed to play audio during setup process');
      cleanupAudioResources();
    } finally {
      if (isMountedRef.current) setIsLoading(false);
    }
  };

  const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!isMountedRef.current) return;
    setSelectedVoice(event.target.value);
    setIsPlaying(false); 
    setError(null); 
    cleanupAudioResources(); // Centralized cleanup
  };

  return (
    <div className={`${styles.audioPlayerContainer} ${className || ''}`}>
      <div className={styles.controlsContainer}>
        <button
          onClick={handlePlay}
          disabled={isLoading}
          className={`${styles.playButton} ${isLoading ? styles.loading : ''} ${isPlaying ? styles.playing : ''}`}
          aria-label={isPlaying ? 'Pause Summary' : 'Listen to Summary'}
        >
          {isLoading ? (
            <span className={styles.loadingText}>Loading...</span>
          ) : isPlaying ? (
            <span className={styles.pauseIcon}></span>
          ) : (
            <span className={styles.playIcon}></span>
          )}
          <span className={styles.buttonText}>
            {isLoading ? 'Loading...' : isPlaying ? 'Pause Summary' : 'Listen to Summary'}
          </span>
        </button>
        <div className={styles.voiceSelectorContainer}>
          <label htmlFor="voice-select" className={styles.voiceSelectorLabel}>Select Voice:</label>
          <select 
            id="voice-select" 
            value={selectedVoice} 
            onChange={handleVoiceChange}
            className={styles.voiceSelector}
            disabled={isLoading || isPlaying} 
          >
            {VOICE_OPTIONS.map(voice => (
              <option key={voice.id} value={voice.id}>
                {voice.name}
              </option>
            ))} 
          </select>
        </div>
      </div>
      
      {error && (
        <div className={styles.errorMessage}>
          <p>Error: {error}</p>
          <p className={styles.troubleshooting}>
            Troubleshooting: Make sure your Google Cloud credentials are correct, the Text-to-Speech API is enabled, and the selected voice is available.
          </p>
        </div>
      )}
      
      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  );
};

export default ManifestoAudioPlayer; 