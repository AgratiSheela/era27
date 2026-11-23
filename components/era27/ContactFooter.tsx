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
        <span className={styles.footerBrandChrome}>ERA</span>
        <span className={styles.footerBrandNeon}>27</span>
      </div>

      <div className={styles.footerPresenter}>
        Presented by {ERA27_METADATA.presenter}
      </div>

      {/* Official Communication Links */}
      <div className={styles.footerLinks}>
        <a href={`tel:${ERA27_CONTACTS.primaryPhone}`} className={styles.footerContactPill}>
          <span className={styles.contactIcon}>📞</span>
          <span className={styles.contactText}>{ERA27_CONTACTS.primaryPhone}</span>
        </a>
        <a href={`tel:${ERA27_CONTACTS.secondaryPhone}`} className={styles.footerContactPill}>
          <span className={styles.contactIcon}>📞</span>
          <span className={styles.contactText}>{ERA27_CONTACTS.secondaryPhone}</span>
        </a>
        <a href={`mailto:${ERA27_CONTACTS.email}`} className={styles.footerContactPill}>
          <span className={styles.contactIcon}>✉️</span>
          <span className={styles.contactText}>{ERA27_CONTACTS.email}</span>
        </a>
        <a
          href={ERA27_CONTACTS.instagramAdvara}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerContactPill}
        >
          <span className={styles.contactIcon}>📸</span>
          <span className={styles.contactText}>@advara.__</span>
        </a>
        <a
          href={ERA27_CONTACTS.instagramEra}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerContactPill}
        >
          <span className={styles.contactIcon}>📸</span>
          <span className={styles.contactText}>@era._27</span>
        </a>
        <a
          href={`https://wa.me/${ERA27_CONTACTS.whatsappNumber}?text=${encodeURIComponent('Hi Advara, I have an inquiry about ERA 27 New Year Eve event.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerWhatsAppPill}
        >
          <span className={styles.contactIcon}>💬</span>
          <span className={styles.contactTextHighlight}>WhatsApp Team ↗</span>
        </a>
      </div>

      {/* Navigation Roll */}
      <nav aria-label="Footer Navigation" className={styles.footerNavRoll}>
        {footerNav.map((item) => (
          <a key={item.href} href={item.href} className={styles.footerNavLink}>
            {item.label}
          </a>
        ))}
      </nav>

      {/* Legal & Return Button */}
      <div className={styles.footerLegal}>
        <div style={{ marginBottom: '18px' }}>
          <a href="/" className={styles.footerReturnBtn}>
            ← Return to Advara Event Management
          </a>
        </div>
        <p className={styles.footerCopyright}>
          © 2026 Advara Event Management. All rights reserved. ERA 27 is an official property of Advara.
        </p>
        <p className={styles.footerTagline}>
          Celebrating Life, Beautifully.
        </p>
      </div>
    </footer>
  );
}

