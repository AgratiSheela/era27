'use client';

import styles from '@/app/era27/era27.module.css';
import { ERA27_SURPRISE_STAGE, ERA27_CONTACTS } from '@/lib/era27-content';

export default function SurpriseStageSection() {
  return (
    <section id="surprise" className={styles.contentSection}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>07 / Special Feature Stage</p>
        <h2 className={styles.sectionTitle}>{ERA27_SURPRISE_STAGE.title}</h2>
        <p className={styles.sectionDesc}>
          {ERA27_SURPRISE_STAGE.subtitle}
        </p>
      </div>

      <div className={styles.surpriseHeroCard}>
        <div className={styles.surpriseHeader}>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <span className={styles.surpriseSlotBadge}>
              🎆 Strictly 20 Slots Total (5 Reserved for Elite)
            </span>
            <h3 style={{ fontSize: '28px', color: '#ffffff', margin: '0 0 10px', textAlign: 'center' }}>
              Make It Unforgettable on Stage
            </h3>
            <p style={{ margin: '0 auto', color: 'var(--era-text-secondary)', maxWidth: '680px', textAlign: 'center' }}>
              Whether it’s a romantic proposal, an anniversary milestone, a birthday tribute, or an unforgettable friendship surprise — take over the dedicated stage with fireworks and crowd cheers.
            </p>
          </div>
          <div className={styles.surprisePriceTag} style={{ textAlign: 'center', width: '100%' }}>
            <div className={styles.surprisePriceValue}>
              ₹{ERA27_SURPRISE_STAGE.pricePerSlot.toLocaleString('en-IN')}
            </div>
            <div className={styles.surprisePriceLabel}>
              per dedicated stage slot
            </div>
          </div>
        </div>

        <div className={styles.surpriseFeaturesGrid}>
          {ERA27_SURPRISE_STAGE.features.map((feature, idx) => (
            <div key={idx} className={styles.surpriseFeatureItem}>
              <p>✨ {feature}</p>
            </div>
          ))}
        </div>

        <div className={styles.surpriseActionRow}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#ffffff', textAlign: 'center', width: '100%' }}>
            Book Your Surprise Slot Directly:
          </span>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            <a
              href={`tel:${ERA27_CONTACTS.primaryPhone}`}
              className={styles.btnPrimary}
              style={{ fontSize: '12px', padding: '12px 24px' }}
            >
              Call {ERA27_CONTACTS.primaryPhone} ↗
            </a>
            <a
              href={`https://wa.me/${ERA27_CONTACTS.whatsappNumber}?text=${encodeURIComponent('Hi Advara, I want to book a Surprise Your Loved Ones stage slot for ERA 27 (₹9,999).')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
              style={{ fontSize: '12px', padding: '12px 24px' }}
            >
              WhatsApp Surprise Team ↗
            </a>
            <a
              href={ERA27_CONTACTS.instagramEra}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
              style={{ fontSize: '12px', padding: '12px 20px' }}
            >
              DM @era._27 ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

