"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import styles from './WebInterfaceViewer.module.scss';

interface WebInterfaceViewerProps {
  isOpen: boolean;
  onClose: () => void;
  interfaceText: string;
}

const WebInterfaceViewer: React.FC<WebInterfaceViewerProps> = ({ isOpen, onClose, interfaceText }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
          
          <h1 className={styles.conceptTitle}>$CHODE TAPPER: WEB INTERFACE CONCEPT</h1>
          
          <div className={styles.imageContainer}>
            <Image 
              src="/images/web_interface.png" 
              alt="$CHODE Tapper Web Interface Concept"
              width={800}
              height={455}
              className={styles.conceptImage}
            />
          </div>
          
          <div className={styles.markdown}>
            <ReactMarkdown>{interfaceText}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebInterfaceViewer; 