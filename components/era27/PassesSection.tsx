'use client';

import { useState } from 'react';
import styles from '@/app/era27/era27.module.css';
import {
  ERA27_SINGLE_PASSES,
  ERA27_GROUP_PASSES,
  ERA27_WALLET_STEPS,
  PassTier,
} from '@/lib/era27-content';

interface PassesSectionProps {
  onSelectPass?: (passName: string) => void;
}

export default function PassesSection({ onSelectPass }: PassesSectionProps) {
  const [activeTab, setActiveTab] = useState<'single' | 'group'>('single');

  const passesToDisplay: PassTier[] = activeTab === 'single'
    ? ERA27_SINGLE_PASSES
    : ERA27_GROUP_PASSES;

  const handlePreBook = (pass: PassTier) => {
    if (onSelectPass) {
      onSelectPass(pass.name);
    }
    const rsvpElement = document.getElementById('rsvp');
    if (rsvpElement) {
      rsvpElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="passes" className={styles.contentSection}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>06 / Tickets &amp; Pricing</p>
        <h2 className={styles.sectionTitle}>Choose Your Pass Tier</h2>
        <p className={styles.sectionDesc}>
          Every pass includes full concert entry on 31 December 2026. Pre-booking opens with an exclusive 10% discount before the official ticket launch.
        </p>
      </div>

      {/* Switcher Pill */}
      <div style={{ textAlign: 'center' }}>
        <div className={styles.passSwitcher} role="tablist" aria-label="Pass type selector">
          <button
            role="tab"
            aria-selected={activeTab === 'single'}
            className={`${styles.switcherBtn} ${activeTab === 'single' ? styles.switcherBtnActive : ''}`}
            onClick={() => setActiveTab('single')}
          >
            Single Passes (1 Guest)
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'group'}
            className={`${styles.switcherBtn} ${activeTab === 'group' ? styles.switcherBtnActive : ''}`}
            onClick={() => setActiveTab('group')}
          >
            Group Passes (2–10 Guests)
          </button>
        </div>
      </div>

      {/* Passes Grid */}
      <div className={styles.passGrid}>
        {passesToDisplay.map((pass) => (
          <article
            key={pass.id}
            className={`${styles.passCard} ${
              pass.stylingTier === 'silver'
                ? styles.passSilver
                : pass.stylingTier === 'gold'
                ? styles.passGold
                : pass.stylingTier === 'platinum'
                ? styles.passPlatinum
                : pass.stylingTier === 'elite'
                ? styles.passElite
                : styles.passSilver
            }`}
          >
            {pass.isVip && <span className={styles.passBadge}>VIP TIER</span>}
            {pass.guests > 1 && (
              <span className={styles.passBadge}>{pass.guests} GUESTS</span>
            )}

            <h3 className={styles.passName}>{pass.name}</h3>

            <div className={styles.passPrice}>
              ₹{pass.basePrice.toLocaleString('en-IN')}
            </div>

            <div className={styles.passCouponPrice}>
              <span>With 10% Coupon:</span>
              <strong>{pass.couponPriceDisplay}</strong>
            </div>

            {pass.walletMoney > 0 ? (
              <span className={styles.passWalletBadge}>
                ₹{pass.walletMoney.toLocaleString('en-IN')} Wallet Money Included
              </span>
            ) : (
              <span className={styles.passWalletBadge}>
                10% Off at Stalls (No Wallet Money)
              </span>
            )}

            <ul className={styles.passPerks}>
              {pass.perks.map((perk, i) => (
                <li key={i}>{perk}</li>
              ))}
            </ul>

            <button
              className={styles.passCardAction}
              onClick={() => handlePreBook(pass)}
            >
              Pre-Book {pass.name} Pass ↗
            </button>

            {pass.discrepancyNote && (
              <div className={styles.discrepancyFlag}>
                ⚠️ Note: {pass.discrepancyNote}
              </div>
            )}
          </article>
        ))}
      </div>

      {/* How the Wallet Works */}
      <div className={styles.walletStepsGrid}>
        <div style={{ gridColumn: '1 / -1', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--era-pink)', fontWeight: 700 }}>
            Smart Spend Experience
          </span>
          <h3 style={{ fontSize: '22px', color: '#ffffff', margin: '6px 0 0' }}>
            How the Pass Wallet Works
          </h3>
        </div>
        {ERA27_WALLET_STEPS.map((step) => (
          <div key={step.step} className={styles.walletStepCard}>
            <div className={styles.walletStepNum}>{step.step}</div>
            <div>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

