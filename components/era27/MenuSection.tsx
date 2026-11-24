'use client';

import React, { useState } from 'react';
import menuStyles from './menu-section.module.css';
import { ERA27_STALLS, StallItem } from '@/lib/era27-content';

type StallCategoryFilter = 'All' | 'Food' | 'Desserts' | 'Drinks' | 'Fun Zone';

const CATEGORIES_ORDER: ('Food' | 'Desserts' | 'Drinks' | 'Fun Zone')[] = [
  'Food',
  'Desserts',
  'Drinks',
  'Fun Zone',
];

const CATEGORY_META: Record<'Food' | 'Desserts' | 'Drinks' | 'Fun Zone', {
  headerClass: string;
  dividerClass: string;
  cardClass: string;
  filterClass: string;
  color: string;
}> = {
  'Food': {
    headerClass: menuStyles.headerFood,
    dividerClass: menuStyles.dividerFood,
    cardClass: menuStyles.cardFood,
    filterClass: menuStyles.filterBtnFood,
    color: '#FF398F',
  },
  'Desserts': {
    headerClass: menuStyles.headerDesserts,
    dividerClass: menuStyles.dividerDesserts,
    cardClass: menuStyles.cardDesserts,
    filterClass: menuStyles.filterBtnDesserts,
    color: '#B58AFF',
  },
  'Drinks': {
    headerClass: menuStyles.headerDrinks,
    dividerClass: menuStyles.dividerDrinks,
    cardClass: menuStyles.cardDrinks,
    filterClass: menuStyles.filterBtnDrinks,
    color: '#38DCCB',
  },
  'Fun Zone': {
    headerClass: menuStyles.headerFunzone,
    dividerClass: menuStyles.dividerFunzone,
    cardClass: menuStyles.cardFunzone,
    filterClass: menuStyles.filterBtnFunzone,
    color: '#FFC36B',
  },
};

interface StallCardProps {
  stall: StallItem;
  category: 'Food' | 'Desserts' | 'Drinks' | 'Fun Zone';
  index: number;
}

function StallCardItem({ stall, category, index }: StallCardProps) {
  const cardStyleClass = CATEGORY_META[category]?.cardClass || menuStyles.cardFood;

  return (
    <article
      className={`${menuStyles.stallCard} ${cardStyleClass}`}
      style={{ '--card-index': index } as React.CSSProperties}
    >
      <span className={menuStyles.stallName}>{stall.name}</span>
      {stall.ageRestricted && (
        <span className={menuStyles.ageBadge}>21+</span>
      )}
    </article>
  );
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<StallCategoryFilter>('All');

  const filterTabs: {
    label: StallCategoryFilter;
    count: number;
    color?: string;
    filterClass?: string;
  }[] = [
    { label: 'All', count: ERA27_STALLS.length, color: 'linear-gradient(135deg, #FF398F, #38DCCB)' },
    { label: 'Food', count: ERA27_STALLS.filter(s => s.category === 'Food').length, color: '#FF398F', filterClass: menuStyles.filterBtnFood },
    { label: 'Desserts', count: ERA27_STALLS.filter(s => s.category === 'Desserts').length, color: '#B58AFF', filterClass: menuStyles.filterBtnDesserts },
    { label: 'Drinks', count: ERA27_STALLS.filter(s => s.category === 'Drinks').length, color: '#38DCCB', filterClass: menuStyles.filterBtnDrinks },
    { label: 'Fun Zone', count: ERA27_STALLS.filter(s => s.category === 'Fun Zone').length, color: '#FFC36B', filterClass: menuStyles.filterBtnFunzone },
  ];

  const categoriesToDisplay = activeCategory === 'All'
    ? CATEGORIES_ORDER
    : CATEGORIES_ORDER.filter(c => c === activeCategory);

  return (
    <section id="stalls" className={menuStyles.menuSection}>
      {/* Compact Section Header */}
      <div className={menuStyles.sectionHeader}>
        <span className={menuStyles.eyebrow}>05 / Food, Drinks &amp; Fun</span>
        <h2 className={menuStyles.title}>Curated Festival Stalls &amp; Menu</h2>
        <p className={menuStyles.description}>
          All 13 festival stalls accept pass wallet money. Pre-book in advance or order on-site.
        </p>
      </div>

      {/* Compact Category Filter Tabs */}
      <div className={menuStyles.filterStickyContainer}>
        <div className={menuStyles.filterScrollTrack} role="tablist" aria-label="Stall categories">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.label;
            const activeSpecificClass = isActive && tab.filterClass ? tab.filterClass : '';

            return (
              <button
                key={tab.label}
                role="tab"
                aria-selected={isActive}
                className={`${menuStyles.filterBtn} ${isActive ? menuStyles.filterBtnActive : ''} ${activeSpecificClass}`}
                onClick={() => setActiveCategory(tab.label)}
              >
                <span
                  className={menuStyles.filterDot}
                  style={{
                    background: tab.color,
                    boxShadow: isActive ? `0 0 6px ${tab.color.startsWith('#') ? tab.color : '#FF398F'}` : 'none',
                  }}
                  aria-hidden="true"
                />
                <span>{tab.label}</span>
                <span className={menuStyles.filterCount}>{tab.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Balanced Dark Backdrop Wrapper to Pop Stalls Over Festival Background */}
      <div className={menuStyles.directoryBackdrop}>
        <div className={menuStyles.directoryContainer} key={activeCategory}>
          {categoriesToDisplay.map((category) => {
            const categoryStalls = ERA27_STALLS.filter((s) => s.category === category);
            if (categoryStalls.length === 0) return null;

            const meta = CATEGORY_META[category];

            return (
              <div key={category} className={menuStyles.categoryGroup}>
                {activeCategory === 'All' && (
                  <>
                    <div className={`${menuStyles.categoryHeader} ${meta.headerClass}`}>
                      <h3 className={menuStyles.categoryTitle}>
                        <span
                          style={{
                            width: '4px',
                            height: '10px',
                            borderRadius: '2px',
                            background: meta.color,
                            display: 'inline-block',
                          }}
                          aria-hidden="true"
                        />
                        <span>{category}</span>
                      </h3>
                      <span className={menuStyles.categoryCountBadge}>
                        {categoryStalls.length}
                      </span>
                    </div>
                    <div className={`${menuStyles.categoryDivider} ${meta.dividerClass}`} aria-hidden="true" />
                  </>
                )}

                <div className={menuStyles.stallsGrid}>
                  {categoryStalls.map((stall, idx) => (
                    <StallCardItem key={stall.name} stall={stall} category={category} index={idx} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slim Wallet Benefit Note */}
      <div className={menuStyles.infoCallout}>
        <div className={menuStyles.infoCalloutBox}>
          <span>💡</span>
          <span>
            <strong style={{ color: '#ffffff' }}>Pass Wallet Money:</strong> Redeemable at all food and dessert counters.
          </span>
        </div>
      </div>
    </section>
  );
}
