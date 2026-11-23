'use client';

import { useState } from 'react';
import styles from '@/app/era27/era27.module.css';
import { ERA27_GALLERY } from '@/lib/era27-content';

export default function GallerySection() {
  const [teaserModalOpen, setTeaserModalOpen] = useState(false);

  return (
    <section id="gallery" className={styles.contentSection}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>08 / Visual Atmosphere</p>
        <h2 className={styles.sectionTitle}>Stage Concepts &amp; Teasers</h2>
        <p className={styles.sectionDesc}>
          Get a glimpse of the concert visual production: multi-tier LED artwork, truss lighting grids, high-power beam arrays, and crowd celebration moments.
        </p>
      </div>

      <div className={styles.galleryGrid}>
        {ERA27_GALLERY.map((item) => (
          <article
            key={item.id}
            className={styles.galleryCard}
            style={{
              background: item.gradient,
              borderColor: `${item.accentColor}44`,
            }}
          >
            <span
              className={styles.galleryCardCategory}
              style={{ color: item.accentColor }}
            >
              {item.category}
            </span>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </article>
        ))}
      </div>

      {/* Interactive Video Teaser Box */}
      <div className={styles.videoTeaserBox}>
        <button
          className={styles.playIconBtn}
          onClick={() => setTeaserModalOpen(true)}
          aria-label="Play event teaser trailer"
        >
          ▶
        </button>
        <h3 style={{ fontSize: '24px', color: '#ffffff', margin: '0 0 8px' }}>
          Watch the ERA 27 Teaser Reel
        </h3>
        <p style={{ margin: 0, color: 'var(--era-text-secondary)', fontSize: '13px' }}>
          Click to preview the production atmosphere and countdown sound design.
        </p>
      </div>

      {/* Teaser Preview Dialog */}
      {teaserModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="ERA 27 Teaser Preview"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(6, 7, 19, 0.92)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setTeaserModalOpen(false)}
        >
          <div
            style={{
              background: '#0d1028',
              border: '1px solid var(--era-border-glow)',
              borderRadius: '20px',
              padding: '40px',
              maxWidth: '560px',
              width: '100%',
              textAlign: 'center',
              position: 'relative',
              boxShadow: '0 0 50px rgba(47, 107, 255, 0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setTeaserModalOpen(false)}
              aria-label="Close teaser modal"
              style={{
                position: 'absolute',
                top: '16px',
                right: '18px',
                background: 'transparent',
                color: '#ffffff',
                fontSize: '24px',
              }}
            >
              ✕
            </button>
            <div style={{ fontSize: '42px', marginBottom: '12px' }}>🎬</div>
            <h3 style={{ fontSize: '22px', color: '#ffffff', marginBottom: '8px' }}>
              Official Teaser Reel Releasing Soon
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--era-text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              The high-resolution 4K production teaser and artist trailer will premiere alongside the official ticket launch. Follow our official channels for the instant drop!
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="https://instagram.com/era._27"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
                style={{ fontSize: '12px', padding: '10px 22px' }}
              >
                Follow @era._27 on Instagram ↗
              </a>
              <button
                onClick={() => setTeaserModalOpen(false)}
                className={styles.btnSecondary}
                style={{ fontSize: '12px', padding: '10px 22px' }}
              >
                Back to Site
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

