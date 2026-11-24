'use client';

import styles from './era27-promo-section.module.css';

export default function Era27PromoSection() {
  return (
    <section className={styles.promoSection} id="era27-spotlight" aria-labelledby="era27-promo-heading">
      {/* Cinematic Concert Stage Background & Ambient Lighting */}
      <div className={styles.stageBackground} aria-hidden="true" />
      <div className={styles.stageOverlay} aria-hidden="true" />

      <div className={styles.container}>
        {/* Left Column: Core Campaign Copy & CTA */}
        <div className={styles.copyCol}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span>A FEATURED EVENT BY ADVARA</span>
          </div>

          <h2 id="era27-promo-heading" className={styles.heading}>
            <span className={styles.headingEra}>ERA </span>
            <span className={styles.heading27}>27</span>
          </h2>

          <p className={styles.tagline}>
            A New Era of <strong>Madness.</strong>
          </p>

          <p className={styles.description}>
            Experience the energy, creativity, entertainment and unforgettable moments of ERA 27.
          </p>

          <div className={styles.actionsRow}>
            <a href="/era27" className={styles.ctaButton}>
              <span>EXPLORE ERA 27</span>
              <span className={styles.ctaArrow} aria-hidden="true">↗</span>
            </a>
            <a href="/era27#passes" className={styles.secondaryLink}>
              <span>View Passes &amp; Pricing</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <p className={styles.supportingText}>
            An official event by Advara Event Management.
          </p>
        </div>

        {/* Right Column: Visual Campaign Showcase Card */}
        <div className={styles.visualCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardLabel}>Flagship NYE Celebration</span>
            <span className={styles.cardBadge}>31 DEC 2026</span>
          </div>

          <div className={styles.cardMetaList}>
            <div className={styles.cardMetaItem}>
              <span className={styles.cardMetaIcon} aria-hidden="true">📅</span>
              <span>New Year’s Eve • 6:00 PM IST Onwards</span>
            </div>
            <div className={styles.cardMetaItem}>
              <span className={styles.cardMetaIcon} aria-hidden="true">📍</span>
              <span>Aziz Nagar, Moinabad, Hyderabad</span>
            </div>
            <div className={styles.cardMetaItem}>
              <span className={styles.cardMetaIcon} aria-hidden="true">🎟️</span>
              <span>1,500 Expected Guests • Early Pre-Booking (10% Off)</span>
            </div>
          </div>

          <div className={styles.pillGrid} aria-label="Event Highlights">
            <span className={styles.featurePill}>Multi-Level LED Stage</span>
            <span className={styles.featurePill}>Surprise Stage</span>
            <span className={styles.featurePill}>14+ Food Stalls</span>
            <span className={styles.featurePill}>Strictly 21+ Bar</span>
          </div>

          <a href="/era27" className={styles.cardExploreLink}>
            <span>Discover the Full Event Microsite</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

