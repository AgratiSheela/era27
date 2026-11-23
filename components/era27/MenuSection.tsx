'use client';

import { useState } from 'react';
import styles from '@/app/era27/era27.module.css';
import { ERA27_STALLS } from '@/lib/era27-content';

type StallCategory = 'All' | 'Food' | 'Desserts' | 'Drinks' | 'Fun Zone';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<StallCategory>('All');

  const categories: StallCategory[] = ['All', 'Food', 'Desserts', 'Drinks', 'Fun Zone'];

  const filteredStalls = activeCategory === 'All'
    ? ERA27_STALLS
    : ERA27_STALLS.filter((stall) => stall.category === activeCategory);

  return (
    <section id="stalls" className={styles.contentSection}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>05 / Food, Drinks &amp; Fun</p>
        <h2 className={styles.sectionTitle}>Curated Festival Stalls &amp; Menu</h2>
        <p className={styles.sectionDesc}>
          From savory street snacks and aromatic biriyani to luxury cheesecakes and a 21+ cocktail bar. Pass wallet money is redeemable across all food and dessert stalls.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className={styles.filterTabRow} role="tablist" aria-label="Stall categories">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            className={`${styles.filterTabBtn} ${activeCategory === cat ? styles.filterTabActive : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat} {cat === 'All' ? `(${ERA27_STALLS.length})` : ''}
          </button>
        ))}
      </div>

      {/* Stalls Grid */}
      <div className={styles.stallGrid}>
        {filteredStalls.map((stall, idx) => (
          <article key={idx} className={styles.stallCard}>
            <span className={styles.stallCategoryBadge}>{stall.category}</span>
            <h4>{stall.name}</h4>
            <p>{stall.description}</p>
            {stall.ageRestricted && (
              <span className={styles.ageRestrictedBadge}>
                🔞 21+ Physical ID Required
              </span>
            )}
          </article>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '36px' }}>
        <div
          style={{
            display: 'inline-block',
            background: 'rgba(47, 107, 255, 0.1)',
            border: '1px solid rgba(47, 107, 255, 0.3)',
            borderRadius: '12px',
            padding: '14px 24px',
            fontSize: '13px',
            color: '#a4c2ff',
          }}
        >
          💡 <b>Tip:</b> Gold, Platinum, Elite &amp; all Group passes include bundled wallet money. You can pre-book stall orders in advance so your food is ready when you arrive.
        </div>
      </div>
    </section>
  );
}

