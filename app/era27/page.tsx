'use client';

import styles from './era27.module.css';

// Phase 2 Modular Microsite Components
import Era27Navbar from '@/components/era27/Era27Navbar';
import HeroSection from '@/components/era27/HeroSection';
import TaglineMarquee from '@/components/era27/TaglineMarquee';
import AboutSection from '@/components/era27/AboutSection';
import VenueSection from '@/components/era27/VenueSection';
import ScheduleSection from '@/components/era27/ScheduleSection';
import ExperiencesSection from '@/components/era27/ExperiencesSection';
import MenuSection from '@/components/era27/MenuSection';
import PassesSection from '@/components/era27/PassesSection';
import SurpriseStageSection from '@/components/era27/SurpriseStageSection';
import GallerySection from '@/components/era27/GallerySection';
import SponsorsSection from '@/components/era27/SponsorsSection';
import FaqSection from '@/components/era27/FaqSection';
import ContactFooter from '@/components/era27/ContactFooter';

export default function Era27Page() {
  return (
    <>
      {/* Cinematic Poster Watermark & Ambient Atmospheric Layers */}
      <div className={styles.posterBackgroundWatermark} aria-hidden="true" />
      <div className={styles.posterDarkOverlay} aria-hidden="true" />
      <div className={styles.glowHeroBlue} aria-hidden="true" />
      <div className={styles.glowHeroMagenta} aria-hidden="true" />

      {/* Ambient Lighting Atmospheric Backgrounds */}
      <div className={styles.glowAmbientOne} aria-hidden="true" />
      <div className={styles.glowAmbientTwo} aria-hidden="true" />
      <div className={styles.glowAmbientThree} aria-hidden="true" />

      {/* 1. Header Navigation */}
      <Era27Navbar />

      <main>
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Tagline Marquee Strip */}
        <TaglineMarquee />

        {/* 4. About the Event */}
        <AboutSection />

        {/* 5. Date & Venue Details */}
        <VenueSection />

        {/* 6. Event Schedule / Timeline */}
        <ScheduleSection />

        {/* 7. Four Experience Pillars */}
        <ExperiencesSection />

        {/* 8. Stalls & Menu Offerings */}
        <MenuSection />

        {/* 9. Tickets, Passes & Wallet Model */}
        <PassesSection />

        {/* 10. Surprise Your Loved Ones Stage */}
        <SurpriseStageSection />

        {/* 11. Gallery & Visual Teasers */}
        <GallerySection />

        {/* 12. Sponsorship & Investor Packages */}
        <SponsorsSection />

        {/* 13. Interactive FAQ Accordion */}
        <FaqSection />
      </main>

      {/* 14. Standalone Footer & Contacts */}
      <ContactFooter />
    </>
  );
}
