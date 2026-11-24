'use client';

import { useState } from 'react';
import styles from '@/app/era27/era27.module.css';
import { ERA27_FAQS, FaqItem } from '@/lib/era27-content';

type FaqCategory = 'All' | 'Tickets & Passes' | 'Venue & Age' | 'Wallet & Food' | 'Surprise Stage';

export default function FaqSection() {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]); // Open first two by default
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>('All');

  const categories: FaqCategory[] = [
    'All',
    'Venue & Age',
    'Tickets & Passes',
    'Wallet & Food',
    'Surprise Stage',
  ];

  const filteredFaqs = selectedCategory === 'All'
    ? ERA27_FAQS
    : ERA27_FAQS.filter((f) => f.category === selectedCategory);

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="faq" className={styles.contentSection}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>10 / Rules &amp; Guidelines</p>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <p className={styles.sectionDesc}>
          Everything you need to know about age policies, ticket inclusions, wallet balance redemption, and entry protocols for ERA 27.
        </p>
      </div>

      {/* Category Pills */}
      <div className={styles.filterTabRow} role="tablist" aria-label="FAQ categories">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={selectedCategory === cat}
            className={`${styles.filterTabBtn} ${selectedCategory === cat ? styles.filterTabActive : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className={styles.faqWrapper}>
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div key={idx} className={styles.faqItem}>
              <button
                className={styles.faqQuestionBtn}
                onClick={() => toggleIndex(idx)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <span className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ''}`}>
                  ▼
                </span>
              </button>
              {isOpen && (
                <div className={styles.faqAnswerBox}>
                  <p style={{ margin: 0 }}>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

