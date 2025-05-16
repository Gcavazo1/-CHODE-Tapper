"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './ManifestoViewer.module.scss';

interface ManifestoViewerProps {
  isOpen: boolean;
  onClose: () => void;
  manifestoText: string;
}

const ManifestoViewer: React.FC<ManifestoViewerProps> = ({ isOpen, onClose, manifestoText }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <ReactMarkdown>{manifestoText}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ManifestoViewer; 