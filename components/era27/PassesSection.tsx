'use client';

import { useState, useEffect } from 'react';
import styles from '@/app/era27/era27.module.css';
import ticketStyles from './passes-section.module.css';
import {
  ERA27_WALLET_STEPS,
} from '@/lib/era27-content';
import {
  ERA27_GOOGLE_FORM_URL,
  ERA27_OFFER_CONFIG,
  ERA27_SINGLE_PASSES,
  ERA27_GROUP_PASSES,
  isPreBookingOfferActive,
  getOfferExpiryFormattedIST,
} from '@/lib/era27-pricing';

interface PassesSectionProps {
  onSelectPass?: (passName: string) => void;
  simulateExpired?: boolean;
}

export default function PassesSection({ onSelectPass, simulateExpired }: PassesSectionProps) {
  const [activeTab, setActiveTab] = useState<'single' | 'group'>('single');

  // Time-based 7-day offer state (Asia/Kolkata timezone)
  const [offerActive, setOfferActive] = useState<boolean>(() => {
    if (simulateExpired) return false;
    return isPreBookingOfferActive();
  });

  useEffect(() => {
    // Check for optional test query string (?offer_expired=true)
    if (typeof window !== 'undefined' && window.location.search.includes('offer_expired=true')) {
      setOfferActive(false);
      return;
    }

    if (simulateExpired) {
      setOfferActive(false);
      return;
    }

    // Evaluate live status against fixed start & expiry timestamps
    setOfferActive(isPreBookingOfferActive());

    // Schedule automatic simultaneous switch when 7-day timer hits exactly
    const expiryMs = new Date(ERA27_OFFER_CONFIG.expiryDateIso).getTime();
    const timeUntilExpiry = expiryMs - Date.now();

    if (timeUntilExpiry > 0) {
      const timer = setTimeout(() => {
        setOfferActive(isPreBookingOfferActive());
      }, timeUntilExpiry);
      return () => clearTimeout(timer);
    }
  }, [simulateExpired]);

  const themeClassMap = {
    silver: ticketStyles.themeSilver,
    gold: ticketStyles.themeGold,
    lavender: ticketStyles.themeLavender,
    coral: ticketStyles.themeCoral,
  };

  const handlePreBook = (passName: string) => {
    if (onSelectPass) {
      onSelectPass(passName);
    }
  };

  // Unified header content based on active offer state (identical for both single and group tabs)
  const headerEyebrow = offerActive
    ? '06 / EARLY ACCESS & PRICING'
    : '06 / TICKETS & PRICING';

  const headerTitle = offerActive
    ? 'Choose Your Pass Tier (10% Pre-Booking Off)'
    : 'Choose Your Pass Tier';

  const headerDesc = offerActive
    ? 'Every pass includes full concert entry on 31 December 2026. Pre-book via our official registration form to lock in your exclusive 10% discount.'
    : 'Every pass includes full concert entry on 31 December 2026. Select your tier to register for passes.';

  return (
    <section id="passes" className={styles.contentSection}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>{headerEyebrow}</p>
        <h2 className={styles.sectionTitle}>{headerTitle}</h2>
        <p className={styles.sectionDesc}>{headerDesc}</p>

        {/* 7-day offer deadline notice (Asia/Kolkata timezone) */}
        {offerActive && (
          <div className={ticketStyles.offerExpiryNotice}>
            <span>⚡ 10% PRE-BOOKING OFFER ACTIVE</span>
            <span>• Offer ends {getOfferExpiryFormattedIST()} (IST)</span>
          </div>
        )}
      </div>

      {/* Switcher Option for Single or Group */}
      <div className={ticketStyles.switcherWrapper}>
        <div className={ticketStyles.passSwitcher} role="tablist" aria-label="Pass type selector">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'single'}
            className={`${ticketStyles.switcherBtn} ${activeTab === 'single' ? ticketStyles.switcherBtnActive : ''}`}
            onClick={() => setActiveTab('single')}
          >
            Single Passes (1 Guest)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'group'}
            className={`${ticketStyles.switcherBtn} ${activeTab === 'group' ? ticketStyles.switcherBtnActive : ''}`}
            onClick={() => setActiveTab('group')}
          >
            Group Passes (2–10 Guests)
          </button>
        </div>
      </div>

      {/* Vertical Ticket Cards Container */}
      <div className={ticketStyles.passesContainer}>
        {activeTab === 'single' ? (
          /* Single Passes Grid (4 cards in 1 row desktop, 2 col tablet, 1 col mobile) */
          <div className={ticketStyles.ticketGrid}>
            {ERA27_SINGLE_PASSES.map((ticket) => (
              <article
                key={ticket.id}
                className={`${ticketStyles.ticketCard} ${themeClassMap[ticket.theme]}`}
              >
                {/* Coloured Top Header Displaying Pass Name */}
                <div className={ticketStyles.cardHeader}>
                  <h3 className={ticketStyles.passTitle}>{ticket.name}</h3>
                </div>

                {/* Ticket Card Body */}
                <div className={ticketStyles.cardBody}>
                  {/* Pricing Block with Strikethrough & Pre-Booking Discount */}
                  <div className={ticketStyles.priceSection}>
                    {offerActive ? (
                      <>
                        <div className={ticketStyles.originalPrice}>
                          {ticket.originalPriceDisplay}
                        </div>
                        <div className={ticketStyles.priceValue}>
                          {ticket.preBookingPriceDisplay}
                        </div>
                        <div className={ticketStyles.priceLabel}>
                          {ticket.priceLabelText}
                        </div>
                        <div className={ticketStyles.offerBadge}>
                          {ticket.discountPillText}
                        </div>
                      </>
                    ) : (
                      <div className={ticketStyles.priceValue}>
                        {ticket.originalPriceDisplay}
                      </div>
                    )}
                  </div>

                  {/* Divider Below Price */}
                  <div className={ticketStyles.divider} />

                  {/* Bullet Points of Benefits */}
                  <ul className={ticketStyles.perksList}>
                    {ticket.benefits.map((benefit, i) => (
                      <li key={i} className={ticketStyles.perkItem}>
                        <span className={ticketStyles.bulletDot} aria-hidden="true" />
                        <span className={ticketStyles.perkText}>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pre-Booking Button Redirecting directly to Google Form in the SAME tab */}
                  <a
                    href={ERA27_GOOGLE_FORM_URL}
                    target="_self"
                    className={ticketStyles.cardButton}
                    onClick={() => handlePreBook(ticket.name)}
                  >
                    Pre-Book {ticket.name.replace(' Pass', '')} Pass ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Group Passes Grid */
          <div className={ticketStyles.ticketGrid}>
            {ERA27_GROUP_PASSES.map((ticket) => (
              <article
                key={ticket.id}
                className={`${ticketStyles.ticketCard} ${themeClassMap[ticket.theme]}`}
              >
                {/* Distinct Coloured Top Header */}
                <div className={ticketStyles.cardHeader}>
                  <h3 className={ticketStyles.passTitle}>{ticket.name}</h3>
                </div>

                {/* Ticket Card Body */}
                <div className={ticketStyles.cardBody}>
                  {/* Large Prominent Ticket Price */}
                  <div className={ticketStyles.priceSection}>
                    <div className={ticketStyles.priceValue}>
                      {ticket.priceDisplay}
                    </div>
                  </div>

                  {/* Divider Below Price */}
                  <div className={ticketStyles.divider} />

                  {/* Short Bullet Points of Benefits */}
                  <ul className={ticketStyles.perksList}>
                    {ticket.benefits.map((benefit, i) => (
                      <li key={i} className={ticketStyles.perkItem}>
                        <span className={ticketStyles.bulletDot} aria-hidden="true" />
                        <span className={ticketStyles.perkText}>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action CTA Button Connected to Google Form in the SAME tab */}
                  <a
                    href={ERA27_GOOGLE_FORM_URL}
                    target="_self"
                    className={ticketStyles.cardButton}
                    onClick={() => handlePreBook(ticket.name)}
                  >
                    Pre-Book {ticket.name.replace(' Pass', '')} Pass ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Footnote matching PDF */}
        <p className={ticketStyles.footnoteText}>
          Wallet money is your redeem amount, given through the Advara website. Details will be announced soon.
        </p>
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
