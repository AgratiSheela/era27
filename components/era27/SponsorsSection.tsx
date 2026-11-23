'use client';

import styles from '@/app/era27/era27.module.css';
import { ERA27_SPONSORS, ERA27_CONTACTS } from '@/lib/era27-content';

export default function SponsorsSection() {
  return (
    <section id="sponsors" className={styles.contentSection}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>10 / Partners &amp; Investors</p>
        <h2 className={styles.sectionTitle}>Sponsorship &amp; Investment Packages</h2>
        <p className={styles.sectionDesc}>
          Partner with Advara for ERA 27. Gain high-impact visibility, brand activations, and executive hospitality before 1,500 celebrating guests.
        </p>
      </div>

      <div className={styles.sponsorsGrid}>
        {ERA27_SPONSORS.map((pkg, idx) => (
          <article key={idx} className={styles.sponsorCard}>
            <span className={styles.sponsorTierBadge}>PACKAGE {idx + 1}</span>
            <h3>{pkg.tier}</h3>
            <div className={styles.sponsorPrice}>{pkg.investmentDisplay}</div>

            <ul className={styles.sponsorDeliverables}>
              {pkg.deliverables.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <a
              href={`mailto:${ERA27_CONTACTS.email}?subject=${encodeURIComponent(
                `Sponsorship Inquiry: ${pkg.tier} for ERA 27`
              )}&body=${encodeURIComponent(
                `Hi Advara Event Management,\n\nWe are interested in exploring the ${pkg.tier} package for ERA 27. Please share the complete sponsorship deck and contract deliverables.\n\nBrand Name:\nContact Person:\nPhone:`
              )}`}
              className={styles.btnSecondary}
              style={{ fontSize: '12px', padding: '12px 18px', textAlign: 'center' }}
            >
              Inquire for {pkg.tier} ↗
            </a>
          </article>
        ))}
      </div>

      {/* Investor Callout */}
      <div className={styles.investorCalloutCard}>
        <h3 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '8px' }}>
          💼 Looking to Invest in ERA 27?
        </h3>
        <p style={{ margin: '0 auto 18px', maxWidth: '650px', fontSize: '13px', color: 'var(--era-text-secondary)' }}>
          Detailed production budget, cash-flow projections, and investor return plans are shared upon confidential request. Advara’s delivery track record spans large-scale weddings, corporate summits, and music festivals.
        </p>
        <a
          href={`mailto:${ERA27_CONTACTS.email}?subject=${encodeURIComponent('Investor Inquiry - ERA 27 Hyderabad')}`}
          className={styles.btnPrimary}
          style={{ fontSize: '12px', padding: '12px 28px' }}
        >
          Request Investor Deck ↗
        </a>
      </div>
    </section>
  );
}

