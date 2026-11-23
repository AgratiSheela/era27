'use client';

import styles from '@/app/era27/era27.module.css';
import { ERA27_SCHEDULE } from '@/lib/era27-content';

export default function ScheduleSection() {
  return (
    <section id="schedule" className={styles.contentSection}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>03 / The Running Order</p>
        <h2 className={styles.sectionTitle}>Timeline of the Night</h2>
        <p className={styles.sectionDesc}>
          From early registration beats to the grand midnight pyrotechnic explosion and late-night madness. Performer names and headliner reveals will accompany the official ticket launch.
        </p>
      </div>

      <div className={styles.timelineWrapper}>
        {ERA27_SCHEDULE.map((item, idx) => (
          <div key={idx} className={styles.timelineStep}>
            <div className={styles.timelineNode} />
            <div className={styles.timelineCard}>
              <span className={styles.timelineTime}>{item.time}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '36px' }}>
        <p style={{ fontSize: '12px', color: 'var(--era-text-muted)' }}>
          * Artist line-up and running order times are subject to final production confirmation.
        </p>
      </div>
    </section>
  );
}

