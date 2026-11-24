'use client';

import { useEffect, useState } from 'react';
import styles from '@/app/era27/era27.module.css';
import { ERA27_METADATA, getBookingModeContent } from '@/lib/era27-content';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);
    const target = new Date(ERA27_METADATA.targetCountdownIso).getTime();

    function update() {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const bookingContent = getBookingModeContent();

  return (
    <section id="hero" className={styles.heroSection}>
      <div className={styles.eyebrowStrip}>
        {ERA27_METADATA.presenter} Presents
      </div>

      <div className={styles.heroTitleContainer}>
        <span className={styles.logoEra}>ERA</span>
        <span className={styles.logo27}>27</span>
      </div>

      <h1 className={styles.heroTagline}>
        A New Era of <strong>Madness.</strong> Welcome 2027.
      </h1>

      {/* Event Coordinates Pill */}
      <div className={styles.eventPill}>
        <div className={styles.pillItem}>
          <span>📅 {ERA27_METADATA.dateDisplay}</span>
        </div>
        <div className={styles.pillDot} />
        <div className={styles.pillItem}>
          <span>⏰ {ERA27_METADATA.startTime}</span>
        </div>
        <div className={styles.pillDot} />
        <div className={styles.pillItem}>
          <span>📍 {ERA27_METADATA.venueName}</span>
        </div>
      </div>

      {/* Live NYE Countdown */}
      <div className={styles.countdownGrid} aria-label="Live countdown to New Year 2027">
        <div className={styles.countdownBox}>
          <div className={styles.countdownNum}>
            {mounted ? timeLeft.days.toString().padStart(2, '0') : '--'}
          </div>
          <div className={styles.countdownLabel}>Days</div>
        </div>
        <div className={styles.countdownBox}>
          <div className={styles.countdownNum}>
            {mounted ? timeLeft.hours.toString().padStart(2, '0') : '--'}
          </div>
          <div className={styles.countdownLabel}>Hours</div>
        </div>
        <div className={styles.countdownBox}>
          <div className={styles.countdownNum}>
            {mounted ? timeLeft.minutes.toString().padStart(2, '0') : '--'}
          </div>
          <div className={styles.countdownLabel}>Minutes</div>
        </div>
        <div className={styles.countdownBox}>
          <div className={styles.countdownNum}>
            {mounted ? timeLeft.seconds.toString().padStart(2, '0') : '--'}
          </div>
          <div className={styles.countdownLabel}>Seconds</div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className={styles.btnRow}>
        <a
          href={bookingContent.heroPrimaryCtaHref}
          target={bookingContent.heroPrimaryCtaTarget}
          rel={bookingContent.heroPrimaryCtaTarget === '_blank' ? 'noopener noreferrer' : undefined}
          className={styles.btnPrimary}
        >
          {bookingContent.heroPrimaryCtaText}
        </a>
        <a href={bookingContent.heroSecondaryCtaHref} className={styles.btnSecondary}>
          {bookingContent.heroSecondaryCtaText}
        </a>
      </div>

      {/* Sub-line Branding Ribbon */}
      <div
        style={{
          marginTop: '36px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 20px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '12px',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: '#c9cedd',
        }}
      >
        <span>One Stage</span>
        <span style={{ color: 'var(--era-pink)' }}>•</span>
        <span>Every Language</span>
        <span style={{ color: 'var(--era-blue)' }}>•</span>
        <span>Every Vibe</span>
      </div>
    </section>
  );
}

