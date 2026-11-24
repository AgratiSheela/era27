'use client';

import { useState } from 'react';
import styles from '@/app/era27/era27.module.css';

export default function Era27Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Venue', href: '#venue' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Stalls', href: '#stalls' },
    { label: 'Passes', href: '#passes' },
    { label: 'Surprise Stage', href: '#surprise' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Sponsors', href: '#sponsors' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.navContainer}>
      <div className={styles.navLogo}>
        <a href="#hero" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span className={styles.navBrandChrome}>ERA</span>
          <span className={styles.navBrandNeon}>27</span>
        </a>
        <span className={styles.navPresenter}>Pres. by Advara</span>
      </div>

      <nav className={styles.navLinks} aria-label="Main event navigation">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className={styles.navActions}>
        <a href="#passes" className={styles.navPassBtn}>
          Get Pass ↗
        </a>
        <a href="/" className={styles.backToAdvara} aria-label="Return to Advara website">
          ← Advara
        </a>
        <button
          className={styles.menuToggleBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawerOpen}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              style={{
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '1px',
                padding: '6px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              {link.label} ↗
            </a>
          ))}
          <a
            href="/"
            onClick={handleLinkClick}
            style={{
              color: 'var(--era-pink)',
              fontSize: '13px',
              fontWeight: 700,
              paddingTop: '8px',
            }}
          >
            ← Return to Advara Main Site
          </a>
        </div>
      )}
    </header>
  );
}

