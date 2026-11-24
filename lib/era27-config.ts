/**
 * ERA 27 — Two-Stage Booking Launch Configuration
 * 
 * Central controller for the two-stage booking launch system:
 * - 'PREBOOKING' (Active): Early-access enquiry campaign with 10% discount, no payment.
 * - 'OFFICIAL_BOOKING' (Future): Live ticketing with checkout / payment gateway integration.
 * 
 * Switching `mode` cleanly updates CTAs, form rendering, and confirmation semantics
 * across the entire website without rebuilding components.
 */

import { ERA27_GOOGLE_FORM_URL, ERA27_OFFER_CONFIG, isPreBookingOfferActive } from './era27-pricing';

export type Era27BookingMode = 'PREBOOKING' | 'OFFICIAL_BOOKING';

export interface Era27BookingConfig {
  /** Active launch phase: 'PREBOOKING' or 'OFFICIAL_BOOKING' */
  mode: Era27BookingMode;
  /** Early bird pre-booking discount percentage */
  discountPercentage: number;
  /** Expected timeline for official ticket rollout */
  officialLaunchLabel: string;
  officialLaunchDateIso: string;
  /** Total venue capacity limit */
  venueCapacity: number;
  /** Official Google Form URL for pass pre-booking */
  googleFormUrl: string;
  /** Explanatory note displayed on pre-booking forms and cards */
  preBookingNotice: string;
  /** Explanatory note displayed when official booking is active */
  officialBookingNotice: string;
}

export const ERA27_BOOKING_CONFIG: Era27BookingConfig = {
  // Current active mode: PREBOOKING
  mode: 'PREBOOKING',
  discountPercentage: 10,
  officialLaunchLabel: 'Opening in approx. 1 week',
  officialLaunchDateIso: '2026-12-01T18:00:00+05:30',
  venueCapacity: 1500,
  googleFormUrl: ERA27_GOOGLE_FORM_URL,
  preBookingNotice:
    'You are registering early pre-booking interest to lock in your exclusive 10% discount. No online payment is required at this stage. Official pass collection and ticket distribution will open approximately one week later.',
  officialBookingNotice:
    'Official ticket booking is live. Select your pass tier and proceed to secure checkout.',
};

/**
 * Returns contextual CTAs, labels and routing based on the active booking mode.
 */
export function getBookingModeContent(mode: Era27BookingMode = ERA27_BOOKING_CONFIG.mode) {
  const isPreBooking = mode === 'PREBOOKING';

  return {
    mode,
    isPreBooking,
    discountPercentage: ERA27_BOOKING_CONFIG.discountPercentage,
    venueCapacity: ERA27_BOOKING_CONFIG.venueCapacity,
    officialLaunchLabel: ERA27_BOOKING_CONFIG.officialLaunchLabel,

    // Navigation & Global CTAs
    navCtaText: 'Get Pass ↗',
    navCtaHref: '#passes',
    navCtaTarget: '_self',
    navMenuLabel: 'Passes',

    // Hero Section CTAs
    heroPrimaryCtaText: isPreBooking ? 'Pre-Book Interest (10% Off) ↗' : 'Book Official Passes ↗',
    heroPrimaryCtaHref: isPreBooking ? ERA27_BOOKING_CONFIG.googleFormUrl : '#passes',
    heroPrimaryCtaTarget: isPreBooking ? '_blank' : '_self',
    heroSecondaryCtaText: isPreBooking ? 'Explore Passes & Pricing ↓' : 'View Pass Tiers ↓',
    heroSecondaryCtaHref: '#passes',

    // Passes Section
    passSectionEyebrow: isPreBooking ? '06 / Early Access & Pricing' : '06 / Tickets & Pricing',
    passSectionTitle: isPreBooking ? 'Choose Your Pass Tier (10% Pre-Booking Off)' : 'Choose Your Pass Tier',
    passSectionDesc: isPreBooking
      ? 'Every pass includes full concert entry on 31 December 2026. Pre-book via our official registration form to lock in your exclusive 10% discount.'
      : 'Every pass includes full concert entry on 31 December 2026. Select your tier and proceed to checkout.',
    passCardCtaText: (passName: string) =>
      isPreBooking ? `Pre-Book ${passName} Pass ↗` : `Book ${passName} Pass ↗`,
    passCardCtaHref: isPreBooking ? ERA27_BOOKING_CONFIG.googleFormUrl : '#passes',
    passCardCtaTarget: '_self',

    // RSVP / Booking Section
    rsvpSectionEyebrow: isPreBooking ? '09 / Priority Early Access' : '09 / Official Ticket Checkout',
    rsvpSectionTitle: isPreBooking ? 'Pre-Book Interest (10% Off)' : 'Official Ticket Booking',
    rsvpSectionDesc: isPreBooking
      ? 'Register your early-bird interest for ERA 27. Claim your 10% coupon discount and secure your priority entry before the 1,500 venue capacity is reached.'
      : 'Select your pass tier, specify guest quantities, and proceed to official ticket confirmation.',
    formSubmitText: isPreBooking
      ? 'Register Pre-Booking Interest (10% Off) ↗'
      : 'Proceed to Secure Checkout ↗',
    confirmationBadge: isPreBooking
      ? '✓ Pre-Booking Interest Registered'
      : '✓ Official Ticket Reservation Confirmed',
    confirmationHeading: isPreBooking
      ? 'You Are on the Priority List!'
      : 'Your Booking Is Reserved!',
  };
}

