'use client';

import React, { useState } from 'react';
import styles from './EarlyAdopterForm.module.scss';
import { supabase } from '@/lib/supabaseClient';

const EarlyAdopterForm: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [showSharePrompt, setShowSharePrompt] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  // Solana wallet address regex - Base58, 32-44 chars
  const solanaWalletRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    // Client-side validation
    if (!walletAddress || !username) {
      setMessage('Error: All fields are required.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    // Validate Solana wallet address format
    if (!solanaWalletRegex.test(walletAddress)) {
      setMessage('Error: Invalid Solana wallet address format.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    // Validate username length
    if (username.length < 3 || username.length > 20) {
      setMessage('Error: Username must be between 3 and 20 characters.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      // Insert data into Supabase
      const { error } = await supabase
        .from('early_adopters')
        .insert([{ wallet_address: walletAddress, username: username }])
        .select();

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          setMessage('Error: This wallet address or username is already registered.');
          setMessageType('error');
          setShowSharePrompt(false); // Ensure share prompt is hidden on error
        } else {
          throw error;
        }
      } else {
        setMessage('Girthy Legionnaire registered! Prepare for glory!');
        setMessageType('success');
        setWalletAddress(''); // Clear form
        setUsername('');
        setShowSharePrompt(true); // Show share prompt on success
        setShareMessage(''); // Clear previous share messages
      }
    } catch (error: unknown) {
      setMessage(`Error saving data. Please try again. ${error instanceof Error ? error.message : ''}`);
      setMessageType('error');
      setShowSharePrompt(false); // Ensure share prompt is hidden on error
      console.error('Supabase insert error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "$CHODE Tapper - I've Joined the Girthy Legion!",
      text: "My Girth has been acknowledged by the $CHODE Tapper council! I'm on the path to legendary status on Solana. You can be too! Join the Girthy Legion & prepare for GLORY: https://chode-tapper.vercel.app/ #ChodeTapper #GirthToEarn #GrimeGuard",
      url: 'https://chode-tapper.vercel.app/'
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareMessage('Your signal boost has been detected by the Girth Network! Such dedication does not go unnoticed...');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err: unknown) {
        // Handle errors, e.g., if the user cancels the share dialog
        // Don't show an error message if user cancels, only for actual errors.
        // We can log it if needed: console.error('Share failed:', err);
        // Set a more neutral or no message if user cancels:
        // setShareMessage('Share cancelled or failed.');
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      // You could copy to clipboard or show direct share links
      setShareMessage('Web Share not supported. Try copying the link! URL: https://chode-tapper.vercel.app/');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Join the Girthy Legion!</h2>
      <p className={styles.formSubtitle}>Register for Future Airdrops & On-Chain Rewards</p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="walletAddress" className={styles.inputLabel}>Solana Wallet Address</label>
          <input
            type="text"
            id="walletAddress"
            name="walletAddress"
            placeholder="Enter your Solana wallet address..."
            required
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className={styles.input}
            disabled={loading}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.inputLabel}>Chode Champion Name</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Choose your Chode Champion name..."
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          className={styles.submitButton} 
          disabled={loading}
        >
          {loading ? 'UNLEASHING...' : 'UNLEASH YOUR GIRTH!'}
        </button>
      </form>
      
      {message && (
        <div className={`${styles.message} ${messageType === 'success' ? styles.successMessage : styles.errorMessage}`}>
          {message}
        </div>
      )}

      {showSharePrompt && messageType === 'success' && (
        <div className={styles.sharePromptContainer}>
          <h3 className={styles.shareTitle}>Your Girth is Acknowledged, Legionnaire!</h3>
          <p className={styles.shareText}>
            The Chode Council has recorded your pledge. Now, spread the word and summon more champions to our cause!
            The more enlightened souls who join, the greater the future rewards may be...
          </p>
          <button onClick={handleShare} className={styles.shareButton}>
            Proclaim Your Allegiance!
          </button>
          {shareMessage && (
            <p className={styles.shareConfirmationMessage}>{shareMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EarlyAdopterForm; 