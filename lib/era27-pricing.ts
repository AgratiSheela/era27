/**
 * ERA 27 — Centralized Ticket Pricing & 7-Day Pre-Booking Offer Controller
 * Single source of truth for pass pricing, discounts, time-based expiration,
 * and direct Google Forms integration.
 */

export const ERA27_GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfJIypGmpmZG0aZWty5you0TNdthys3VH4cjX1Cx-Swf7KF4g/viewform';

/**
 * 7-Day Pre-Booking Offer Timestamps (Asia/Kolkata timezone)
 * Start: November 24, 2026, 23:30:00 IST
 * Expiry: December 01, 2026, 23:30:00 IST (exactly 7 days)
 */
export const ERA27_OFFER_CONFIG = {
  timezone: 'Asia/Kolkata',
  durationDays: 7,
  startDateIso: '2026-11-24T23:30:00+05:30',
  expiryDateIso: '2026-12-01T23:30:00+05:30',
  googleFormUrl: ERA27_GOOGLE_FORM_URL,
} as const;

export interface SinglePassDefinition {
  id: string;
  name: string;
  theme: 'silver' | 'gold' | 'lavender' | 'coral';
  originalPrice: number;
  originalPriceDisplay: string;
  preBookingPrice: number;
  preBookingPriceDisplay: string;
  badgeText: string;
  priceLabelText: string;
  discountPillText: string;
  benefits: string[];
}

export interface GroupPassDefinition {
  id: string;
  name: string;
  theme: 'silver' | 'gold' | 'lavender' | 'coral';
  priceDisplay: string;
  benefits: string[];
}

export const ERA27_SINGLE_PASSES: SinglePassDefinition[] = [
  {
    id: 'pass-silver',
    name: 'Silver Pass',
    theme: 'silver',
    originalPrice: 999,
    originalPriceDisplay: '₹999',
    preBookingPrice: 899,
    preBookingPriceDisplay: '₹899',
    badgeText: '10% PRE-BOOKING OFFER',
    priceLabelText: 'PRE-BOOKING PRICE',
    discountPillText: '10% OFF',
    benefits: [
      'Entry for 1 guest.',
      '10% off at stalls.',
    ],
  },
  {
    id: 'pass-gold',
    name: 'Gold Pass',
    theme: 'gold',
    originalPrice: 1299,
    originalPriceDisplay: '₹1,299',
    preBookingPrice: 1169.10,
    preBookingPriceDisplay: '₹1,169.10',
    badgeText: '10% PRE-BOOKING OFFER',
    priceLabelText: 'PRE-BOOKING PRICE',
    discountPillText: '10% OFF',
    benefits: [
      'Entry for 1 guest.',
      '₹300 wallet money (redeem).',
    ],
  },
  {
    id: 'pass-platinum',
    name: 'Platinum Pass',
    theme: 'lavender',
    originalPrice: 1499,
    originalPriceDisplay: '₹1,499',
    preBookingPrice: 1349.10,
    preBookingPriceDisplay: '₹1,349.10',
    badgeText: '10% PRE-BOOKING OFFER',
    priceLabelText: 'PRE-BOOKING PRICE',
    discountPillText: '10% OFF',
    benefits: [
      'Entry for 1 guest.',
      '₹500 wallet money (redeem).',
    ],
  },
  {
    id: 'pass-elite',
    name: 'Elite Pass (VIP)',
    theme: 'coral',
    originalPrice: 3499,
    originalPriceDisplay: '₹3,499',
    preBookingPrice: 3149.10,
    preBookingPriceDisplay: '₹3,149.10',
    badgeText: '10% PRE-BOOKING OFFER',
    priceLabelText: 'PRE-BOOKING PRICE',
    discountPillText: '10% OFF',
    benefits: [
      'VIP experience, arranged only for Elite Pass holders.',
      '₹1,500 wallet money (redeem).',
    ],
  },
];

export const ERA27_GROUP_PASSES: GroupPassDefinition[] = [
  {
    id: 'pass-duo',
    name: 'Duo Pass',
    theme: 'lavender',
    priceDisplay: '₹2,800',
    benefits: [
      'Entry for 2 guests',
      '₹799 wallet money (redeem)',
    ],
  },
  {
    id: 'pass-trio',
    name: 'Trio Pass',
    theme: 'gold',
    priceDisplay: '₹4,200',
    benefits: [
      'Entry for 3 guests',
      '₹1,500 wallet money (redeem)',
    ],
  },
  {
    id: 'pass-squad',
    name: 'Squad Pass',
    theme: 'silver',
    priceDisplay: '₹6,999',
    benefits: [
      'Entry for 5 guests',
      '₹2,500 wallet money (redeem)',
    ],
  },
  {
    id: 'pass-mega-squad',
    name: 'Mega Squad Pass',
    theme: 'coral',
    priceDisplay: '₹13,999',
    benefits: [
      'Entry for 10 guests',
      '₹5,000 wallet money (redeem)',
    ],
  },
];

/**
 * Checks whether the 10% pre-booking offer is currently active.
 *
 * Requirements:
 * - Offer start: fixed ISO timestamp
 * - Offer expiry: exactly 7 days after start
 * - Simultaneous switch for all four single passes
 * - Refreshing/revisiting does NOT reset the offer.
 * - Optional override timestamp parameter for testing/simulation.
 */
export function isPreBookingOfferActive(customTimestampMs?: number): boolean {
  const now = typeof customTimestampMs === 'number' ? customTimestampMs : Date.now();
  const startMs = new Date(ERA27_OFFER_CONFIG.startDateIso).getTime();
  const expiryMs = new Date(ERA27_OFFER_CONFIG.expiryDateIso).getTime();

  return now >= startMs && now < expiryMs;
}

/**
 * Returns formatted offer deadline string in IST for display/metadata.
 */
export function getOfferExpiryFormattedIST(): string {
  const expiry = new Date(ERA27_OFFER_CONFIG.expiryDateIso);
  return expiry.toLocaleString('en-IN', {
    timeZone: ERA27_OFFER_CONFIG.timezone,
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

