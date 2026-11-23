'use client';

import styles from '@/app/era27/era27.module.css';
import { ERA27_METADATA } from '@/lib/era27-content';

export default function AboutSection() {
  const statMetrics = [
    { number: '1,500', label: 'Expected Guests' },
    { number: '1 STAGE', label: 'Multi-Level LED Arena' },
    { number: '20 SLOTS', label: 'Surprise Stage Moments' },
    { number: '10% OFF', label: 'Early Pre-Booking' },
  ];

  return (
    <section id="about" className={styles.contentSection}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>01 / The Concept &amp; Vision</p>
        <h2 className={styles.sectionTitle}>A New Era of Madness. Welcome 2027.</h2>
        <p className={styles.sectionDesc}>
          ERA 27 is Advara Event Management’s New Year’s Eve flagship: a large-scale concert-grade production built to welcome 2027 in unforgettable style at Aziz Nagar, Moinabad, Hyderabad.
        </p>
      </div>

      <div className={styles.aboutGrid}>
        <article className={styles.aboutStoryCard}>
          <h3 style={{ fontSize: '24px', color: '#ffffff', marginBottom: '16px' }}>
            One Stage. Every Language. Every Vibe.
          </h3>
          <p>
            Unlike typical nightlife countdowns, ERA 27 is designed from the ground up as an immersive audio-visual concert. Featuring a colossal multi-tier LED stage with vivid digital floral artwork, synchronized laser beams, and cutting-edge line array sound, the music brings together anthems across languages so every guest feels the energy.
          </p>
          <p>
            Whether you are dancing with your squad on the open floor, surprising someone special on the dedicated Surprise Stage, enjoying street food and artisan cheesecakes, or raising a celebratory toast at the 21+ bar counter, ERA 27 sets the standard for how Hyderabad celebrates New Year’s Eve.
          </p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(255, 46, 147, 0.15)',
                color: 'var(--era-pink)',
                border: '1px solid rgba(255, 46, 147, 0.3)',
              }}
            >
              Multi-Lingual Concert
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(47, 107, 255, 0.15)',
                color: '#8cb5ff',
                border: '1px solid rgba(47, 107, 255, 0.3)',
              }}
            >
              Surprise Stage Feature
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(255, 122, 26, 0.15)',
                color: '#ff9d54',
                border: '1px solid rgba(255, 122, 26, 0.3)',
              }}
            >
              14+ Stalls &amp; 21+ Bar
            </span>
          </div>
        </article>

        <div className={styles.aboutStatsGrid}>
          {statMetrics.map((stat, idx) => (
            <div key={idx} className={styles.statCard}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

