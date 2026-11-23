import type { Metadata } from 'next';
import styles from './era27.module.css';

export const metadata: Metadata = {
  title: 'ERA 27 — A New Era of Madness | NYE 2027',
  description: 'Join 1,500 guests on 31 December 2026, 6 PM at Aziz Nagar, Moinabad, Hyderabad. Multi-level LED stage, concert-grade sound, Surprise Stage, stalls & 21+ bar. One stage. Every language. Every vibe.',
  openGraph: {
    title: 'ERA 27 — A New Era of Madness | Welcome 2027',
    description: 'Hyderabad’s premier New Year’s Eve concert experience presented by Advara Event Management.',
    url: 'https://advara.in/era27',
    siteName: 'ERA 27 by Advara',
    images: [
      {
        url: '/era27-poster.png',
        width: 1024,
        height: 1536,
        alt: 'ERA 27 - A New Era of Madness Official Poster',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ERA 27 — A New Era of Madness | Welcome 2027',
    description: 'Hyderabad’s premier New Year’s Eve concert experience presented by Advara Event Management.',
    images: ['/era27-poster.png'],
  },
};

export default function Era27Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.era27Root}>{children}</div>;
}

