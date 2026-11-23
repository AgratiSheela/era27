'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './era27-popup.module.css';
import { ERA27_METADATA } from '@/lib/era27-content';

const SESSION_STORAGE_KEY = 'era27_popup_dismissed_session';
const OPEN_DELAY_MS = 1800; // 1.8 seconds (within 1.5 - 2.5s PRD recommendation)

function isDismissedInSession(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return window.sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function setDismissedInSession(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
  } catch {
    // Gracefully handle storage errors (e.g. private browsing restrictions)
  }
}

export default function Era27Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // Close handler with session persistence and focus restoration
  const handleClose = useCallback(() => {
    setIsOpen(false);
    setDismissedInSession();
    if (previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
      previousActiveElementRef.current.focus();
    }
  }, []);

  // Safe client-side mount & delayed automatic open check
  useEffect(() => {
    setMounted(true);

    if (isDismissedInSession()) {
      return;
    }

    const timer = setTimeout(() => {
      if (!isDismissedInSession()) {
        previousActiveElementRef.current = document.activeElement as HTMLElement | null;
        setIsOpen(true);
      }
    }, OPEN_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // Body scroll lock while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Keyboard navigation: Escape key & focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }

      // Trap Tab key within dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Initial focus on primary CTA
    const timer = setTimeout(() => {
      const primaryCta = dialogRef.current?.querySelector<HTMLElement>('[data-autofocus="true"]');
      if (primaryCta) {
        primaryCta.focus();
      } else {
        dialogRef.current?.focus();
      }
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, handleClose]);

  // Click on outer backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!mounted || !isOpen) {
    return null;
  }

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      aria-hidden="false"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="era27-popup-title"
        aria-describedby="era27-popup-desc"
        tabIndex={-1}
        className={styles.modalCard}
      >
        {/* Accessible Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className={styles.closeButton}
          aria-label="Close ERA 27 announcement"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Left Column: Official Poster */}
        <div className={styles.posterColumn}>
          <a
            href="/era27"
            className={styles.posterLink}
            aria-label="Open ERA 27 official event page"
          >
            <img
              src="/era27-poster.jpg"
              alt="ERA 27 - A New Era of Madness Official NYE Concert Poster"
              className={styles.posterImage}
            />
            <div className={styles.posterBadge}>
              <span className={styles.posterBadgeDot} aria-hidden="true" />
              <span>Official Event Poster</span>
            </div>
          </a>
        </div>

        {/* Right Column: Event Details & Action */}
        <div className={styles.contentColumn}>
          <div>
            <div className={styles.eyebrow}>
              <span>{ERA27_METADATA.presenter}</span>
              <span className={styles.eyebrowDot}>•</span>
              <span>New Year’s Eve 2027</span>
            </div>

            <h2 id="era27-popup-title" className={styles.brandHeading}>
              <span className={styles.logoEra}>ERA </span>
              <span className={styles.logo27}>27</span>
            </h2>

            <p id="era27-popup-desc" className={styles.tagline}>
              A New Era of <strong>Madness.</strong> Welcome 2027.
            </p>

            {/* Event Key Coordinates */}
            <div className={styles.coordinatesGrid}>
              <div className={styles.coordItem}>
                <span className={styles.coordIcon} aria-hidden="true">📅</span>
                <span className={styles.coordText}>{ERA27_METADATA.dateDisplay}</span>
              </div>
              <div className={styles.coordItem}>
                <span className={styles.coordIcon} aria-hidden="true">⏰</span>
                <span className={styles.coordText}>{ERA27_METADATA.startTime} Onwards</span>
              </div>
              <div className={styles.coordItem}>
                <span className={styles.coordIcon} aria-hidden="true">📍</span>
                <span className={styles.coordText}>{ERA27_METADATA.venueName}</span>
              </div>
            </div>

            {/* Key Feature Highlights */}
            <div className={styles.highlightsList} aria-label="Event highlights">
              <span className={styles.highlightPill}>Multi-Level LED Stage</span>
              <span className={styles.highlightPill}>Live Concerts Across Languages</span>
              <span className={styles.highlightPill}>Surprise Stage</span>
              <span className={styles.highlightPill}>Food Stalls & 21+ Bar</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionRow}>
            <a
              href="/era27"
              className={styles.ctaPrimary}
              data-autofocus="true"
            >
              <span>Explore ERA 27</span>
              <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              onClick={handleClose}
              className={styles.ctaDismiss}
            >
              Continue to Advara
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

