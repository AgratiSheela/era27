'use client';

import styles from '@/app/era27/era27.module.css';
import { ERA27_EXPERIENCES } from '@/lib/era27-content';

export default function ExperiencesSection() {
  return (
    <section id="experiences" className={styles.contentSection}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>04 / What to Expect</p>
        <h2 className={styles.sectionTitle}>Four Iconic Experience Pillars</h2>
        <p className={styles.sectionDesc}>
          Every corner of ERA 27 has been curated to create high-octane celebration moments, from concert-grade mainstage drops to intimate fireworks surprises.
        </p>
      </div>

      <div className={styles.experiencesGrid}>
        {ERA27_EXPERIENCES.map((exp) => (
          <article key={exp.id} className={styles.experienceCard}>
            {exp.badge && <span className={styles.experienceBadge}>{exp.badge}</span>}
            <div className={styles.experienceNumber}>PILLAR {exp.number} — {exp.tag}</div>
            <h3>{exp.title}</h3>
            <div className={styles.experienceSubtitle}>{exp.subtitle}</div>
            <p>{exp.description}</p>
            <ul className={styles.experienceHighlights}>
              {exp.highlights.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

