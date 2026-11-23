'use client';

import styles from '@/app/era27/era27.module.css';
import { ERA27_METADATA, ERA27_CONTACTS } from '@/lib/era27-content';

export default function ContactFooter() {
  const footerNav = [
    { label: 'About', href: '#about' },
    { label: 'Venue', href: '#venue' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Stalls', href: '#stalls' },
    { label: 'Passes', href: '#passes' },
    { label: 'Surprise Stage', href: '#surprise' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Pre-Book RSVP', href: '#rsvp' },
    { label: 'Sponsors', href: '#sponsors' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <footer id="contact" className={styles.eraFooter}>
      <div className={styles.footerLogo}>
        <span className={styles.navBrandChrome}>ERA</span>
        <span className={styles.navBrandNeon}>27</span>
      </div>

      <div className={styles.footerPresenter}>
        Presented by {ERA27_METADATA.presenter}
      </div>

      {/* Official Communication Links */}
      <div className={styles.footerLinks}>
        <a href={`tel:${ERA27_CONTACTS.primaryPhone}`}>
          📞 {ERA27_CONTACTS.primaryPhone}
        </a>
        <a href={`tel:${ERA27_CONTACTS.secondaryPhone}`}>
          📞 {ERA27_CONTACTS.secondaryPhone}
        </a>
        <a href={`mailto:${ERA27_CONTACTS.email}`}>
          ✉️ {ERA27_CONTACTS.email}
        </a>
        <a
          href={ERA27_CONTACTS.instagramAdvara}
          target="_blank"
          rel="noopener noreferrer"
        >
          📸 @advara.__
        </a>
        <a
          href={ERA27_CONTACTS.instagramEra}
          target="_blank"
          rel="noopener noreferrer"
        >
          📸 @era._27
        </a>
        <a
          href={`https://wa.me/${ERA27_CONTACTS.whatsappNumber}?text=${encodeURIComponent('Hi Advara, I have an inquiry about ERA 27 New Year Eve event.')}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--era-pink)' }}
        >
          💬 WhatsApp Team ↗
        </a>
      </div>

      {/* Navigation Roll */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '18px',
          flexWrap: 'wrap',
          fontSize: '11px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--era-text-muted)',
          margin: '20px 0 30px',
        }}
      >
        {footerNav.map((item) => (
          <a key={item.href} href={item.href} style={{ color: 'var(--era-text-secondary)' }}>
            {item.label}
          </a>
        ))}
      </div>

      {/* Legal & Return Button */}
      <div className={styles.footerLegal}>
        <div style={{ marginBottom: '16px' }}>
          <a href="/" className={styles.backToAdvara}>
            ← Return to Advara Event Management
          </a>
        </div>
        <p style={{ margin: '8px 0', fontSize: '11px', color: '#858fa6' }}>
          © 2026 Advara Event Management. All rights reserved. ERA 27 is an official property of Advara.
        </p>
        <p style={{ margin: 0, fontSize: '10px', color: '#5e6880', fontStyle: 'italic' }}>
          Celebrating Life, Beautifully.
        </p>
      </div>
    </footer>
  );
}

