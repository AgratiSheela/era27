'use client';

import styles from '@/app/era27/era27.module.css';
import { ERA27_METADATA } from '@/lib/era27-content';

export default function VenueSection() {
  const logistics = [
    {
      icon: '🚗',
      title: 'Designated Event Parking',
      description: 'Spacious on-site parking for cars and two-wheelers with security marshals and traffic management.',
    },
    {
      icon: '🛡️',
      title: 'Guest Safety & Security',
      description: 'Professional bouncers, bag checks, metal detector gates, and continuous event surveillance.',
    },
    {
      icon: '🏥',
      title: 'First Aid & Medical Station',
      description: 'On-site medical emergency tent with certified paramedics and first-aid response units.',
    },
    {
      icon: '🔞',
      title: 'Bar Counter 21+ Verification',
      description: 'Alcohol counter strictly restricted to guests 21+. Government-issued physical ID verification mandatory.',
    },
  ];

  return (
    <section id="venue" className={styles.contentSection}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>02 / Location &amp; Venue</p>
        <h2 className={styles.sectionTitle}>Aziz Nagar, Moinabad, Hyderabad</h2>
        <p className={styles.sectionDesc}>
          Set in an open-air resort venue in the Moinabad celebration corridor, offering lush space, concert acoustics, and easy access from Hyderabad city.
        </p>
      </div>

      <div className={styles.venueGrid}>
        <div className={styles.venueCard}>
          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            <span className={styles.venueBadge}>
              📍 Exact Landmark &amp; Map Pin Announcing Soon
            </span>
          </div>
          <h3 style={{ fontSize: '24px', color: '#ffffff', margin: '0 0 10px', textAlign: 'center' }}>
            Venue Coordination &amp; Access
          </h3>
          <p style={{ textAlign: 'center' }}>
            <b>Date:</b> {ERA27_METADATA.dateDisplay}<br />
            <b>Gates Open:</b> {ERA27_METADATA.doorsOpen}<br />
            <b>Main Concert:</b> 6:00 PM Onwards into 2027
          </p>

          {/* Stylized Interactive Map Placeholder */}
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapGridLines} />
            <div className={styles.mapPinIcon}>📍</div>
            <div style={{ zIndex: 1, textAlign: 'center' }}>
              <strong style={{ color: '#ffffff', display: 'block', fontSize: '15px' }}>
                Aziz Nagar, Moinabad
              </strong>
              <span style={{ color: 'var(--era-text-muted)', fontSize: '12px' }}>
                Exact Google Maps Pin Releasing with Ticket Launch
              </span>
            </div>
            <a
              href="https://maps.google.com/?q=Aziz+Nagar,+Moinabad,+Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
              style={{
                zIndex: 1,
                fontSize: '11px',
                padding: '8px 18px',
                borderRadius: '20px',
                marginTop: '6px',
              }}
            >
              Explore Area on Google Maps ↗
            </a>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--era-text-muted)', margin: 0, textAlign: 'center' }}>
            * Shuttle assistance and cab drop coordinates will be provided to all registered ticket holders.
          </p>
        </div>

        <div className={styles.logisticsList}>
          {logistics.map((item, idx) => (
            <div key={idx} className={styles.logisticsItem}>
              <div className={styles.logisticsIcon}>{item.icon}</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

