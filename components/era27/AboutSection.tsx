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
          ERA 27 is Advara Event Management’s flagship New Year celebration in Aziz Nagar, Moinabad — an immersive, concert-scale experience built to make welcoming 2027 unforgettable.
        </p>
      </div>

      <div className={styles.aboutGrid}>
        <article className={styles.aboutStoryCard}>
          <h3 style={{ fontSize: '24px', color: '#ffffff', marginBottom: '16px' }}>
            One Stage. Every Language. Every Vibe.
          </h3>
          <p>
            A massive multi-tier LED stage, immersive visuals, powerful sound and spectacular fireworks set the stage for an electrifying night of music, energy and celebration.
          </p>
          <p>
            From the open dance floor and Surprise Stage to 14+ food stalls, a 21+ bar and spectacular fireworks, ERA 27 brings music, food and unforgettable moments together for one epic night.
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

