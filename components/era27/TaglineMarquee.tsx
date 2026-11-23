'use client';

import styles from '@/app/era27/era27.module.css';

export default function TaglineMarquee() {
  const marqueeItems = [
    'ONE STAGE. EVERY LANGUAGE. EVERY VIBE.',
    'DANCE • CELEBRATE • GO MAD',
    'A NEW ERA OF MADNESS',
    'WELCOME 2027',
    '1,500 GUESTS • CONCERT PRODUCTION',
    'AZIZ NAGAR, MOINABAD • 31.12.2026',
  ];

  return (
    <section className={styles.marqueeWrapper} aria-label="Event highlights marquee">
      <div className={styles.marqueeTrack}>
        {/* Track duplicated for seamless infinite scroll */}
        {[...marqueeItems, ...marqueeItems].map((text, idx) => (
          <span key={idx} className={styles.marqueeItem}>
            <span>{text}</span>
            <span className={styles.marqueeStar}>✳</span>
          </span>
        ))}
      </div>
    </section>
  );
}

