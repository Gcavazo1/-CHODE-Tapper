"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import styles from './ManifestoViewer.module.scss';

interface ManifestoViewerProps {
  isOpen: boolean;
  onClose: () => void;
  manifestoText: string;
}

interface VolumeNavItem {
  id: string;
  title: string;
  index: number;
}

// We're not defining our own type anymore, we'll use the proper casting

const ManifestoViewer: React.FC<ManifestoViewerProps> = ({ isOpen, onClose, manifestoText }) => {
  const [volumeNavItems, setVolumeNavItems] = useState<VolumeNavItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeVolume, setActiveVolume] = useState<string>("");
  const [headingsWithIds, setHeadingsWithIds] = useState<Map<string, string>>(new Map());

  // Process the manifestoText to extract and generate volume navigation items
  useEffect(() => {
    if (!manifestoText) return;
    
    // Extract volume titles for navigation
    const volumeRegex = /^##\s+(VOLUME\s+[IVX]+:.+)$/gm;
    const volumes: VolumeNavItem[] = [];
    let match;
    
    // Tracking counters for each volume to ensure unique IDs
    const volumeCounters: Record<string, number> = {};
    // Map to store heading -> ID mappings
    const headingIdMap = new Map<string, string>();
    
    while ((match = volumeRegex.exec(manifestoText)) !== null) {
      const title = match[1];
      const volumeBase = title.split(':')[0].trim(); // e.g., "VOLUME I", "VOLUME II"
      
      // Track how many times we've seen this volume
      volumeCounters[volumeBase] = (volumeCounters[volumeBase] || 0) + 1;
      const count = volumeCounters[volumeBase];
      
      // Create a unique ID based on volume name and count
      const id = `volume-${volumeBase.replace(/\s+/g, '-').toLowerCase()}${count > 1 ? `-${count}` : ''}`;
      
      volumes.push({ 
        id, 
        title, 
        index: volumes.length // Store the index for stable sorting
      });
      
      // Store the heading -> ID mapping
      headingIdMap.set(`## ${title}`, id);
    }
    
    setVolumeNavItems(volumes);
    setHeadingsWithIds(headingIdMap);
  }, [manifestoText]);

  // Scroll to volume section when clicked
  const scrollToVolume = (volumeId: string) => {
    if (!contentRef.current) return;
    
    const volumeElement = document.getElementById(volumeId);
    if (volumeElement) {
      contentRef.current.scrollTo({
        top: volumeElement.offsetTop - 30, // Offset for better visibility
        behavior: 'smooth'
      });
      setActiveVolume(volumeId);
    }
  };

  // Update active volume based on scroll position - wrapped in useCallback
  const handleScroll = useCallback(() => {
    if (!contentRef.current || volumeNavItems.length === 0) return;
    
    const scrollPosition = contentRef.current.scrollTop;
    
    // Find which volume section is currently most visible
    for (let i = volumeNavItems.length - 1; i >= 0; i--) {
      const volumeElement = document.getElementById(volumeNavItems[i].id);
      if (volumeElement && volumeElement.offsetTop <= scrollPosition + 100) {
        setActiveVolume(volumeNavItems[i].id);
        break;
      }
    }
  }, [volumeNavItems]);

  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll);
      return () => content.removeEventListener('scroll', handleScroll);
    }
  }, [volumeNavItems, handleScroll]);

  // Custom components for ReactMarkdown to add IDs to headings
  const markdownComponents: Components = {
    h2: ({ node, children, ...props }) => {
      // Type assertion for accessing node properties safely
      const nodeWithChildren = node as { children?: Array<{ value?: string }> };
      
      // Get the raw text content
      if (nodeWithChildren?.children && nodeWithChildren.children[0]?.value) {
        const rawTextContent = nodeWithChildren.children[0].value;
        
        if (headingsWithIds.has(`## ${rawTextContent}`)) {
          const id = headingsWithIds.get(`## ${rawTextContent}`);
          return <h2 id={id} {...props}>{children}</h2>;
        }
      }
      return <h2 {...props}>{children}</h2>;
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.volumeNavigation}>
          <h3 className={styles.navTitle}>The Sacred Scrolls</h3>
          <ul className={styles.volumeList}>
            {volumeNavItems.map((volume) => (
              <li key={volume.id}>
                <button 
                  className={`${styles.volumeNavButton} ${activeVolume === volume.id ? styles.activeVolume : ''}`}
                  onClick={() => scrollToVolume(volume.id)}
                >
                  {volume.title.split(':')[0]}
                  <span className={styles.volumeSubtitle}>
                    {volume.title.includes(':') ? volume.title.split(':')[1] : ''}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.modalContent} ref={contentRef}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
          <div className={styles.markdown}>
            <ReactMarkdown components={markdownComponents}>{manifestoText}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManifestoViewer; 