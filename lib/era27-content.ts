/**
 * ERA 27 - Official Event & Content Configuration
 * Single Source of Truth for ERA 27 digital deliverables.
 * Derived directly from docs/ERA27_PRD.md.
 * 
 * IMPORTANT: Unresolved client discrepancies and unconfirmed values are strictly
 * flagged with `pendingConfirmation: true` and documented with `discrepancyNote`
 * per client instructions.
 */

export interface EventMetadata {
  name: string;
  tagline: string;
  subline: string;
  presenter: string;
  dateIso: string;
  dateDisplay: string;
  doorsOpen: string;
  startTime: string;
  venueName: string;
  venueStatus: 'confirmed' | 'pending_confirmation';
  venueNote: string;
  expectedAttendance: number;
  agePolicyGeneral: string;
  agePolicyBar: string;
  preBookingDiscountPercent: number;
  targetCountdownIso: string; // ISO string for live countdown
}

export interface DiscrepancyItem {
  id: string;
  field: string;
  sourceValueA: string;
  sourceValueB: string;
  currentDisplayValue: string;
  status: 'pending_client_confirmation';
  note: string;
}

export interface PassTier {
  id: string;
  category: 'single' | 'group';
  name: string;
  guests: number;
  basePrice: number;
  walletMoney: number;
  couponPrice: number | null; // null if unconfirmed/not specified
  couponPriceDisplay: string;
  perks: string[];
  stylingTier: 'silver' | 'gold' | 'platinum' | 'elite' | 'group';
  isVip?: boolean;
  pendingConfirmation?: boolean;
  discrepancyNote?: string;
}

export interface SurpriseStageConfig {
  title: string;
  subtitle: string;
  pricePerSlot: number;
  totalSlots: number;
  reservedForElite: number;
  availableGeneralSlots: number;
  bookingChannels: {
    phones: string[];
    instagramDms: string[];
  };
  features: string[];
}

export interface StallItem {
  category: 'Food' | 'Desserts' | 'Drinks' | 'Fun Zone';
  name: string;
  description?: string;
  ageRestricted?: boolean;
}

export interface SponsorPackage {
  tier: string;
  investment: number;
  investmentDisplay: string;
  deliverables: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Tickets & Passes' | 'Venue & Age' | 'Wallet & Food' | 'Surprise Stage';
  pendingConfirmation?: boolean;
}

export interface ContactInfo {
  primaryPhone: string;
  secondaryPhone: string;
  secondaryPhoneDiscrepancy?: DiscrepancyItem;
  email: string;
  instagramAdvara: string;
  instagramEra: string;
  instagramDiscrepancy?: DiscrepancyItem;
  whatsappNumber: string;
}

// --------------------------------------------------------------------------
// Core Event Configuration
// --------------------------------------------------------------------------

export const ERA27_METADATA: EventMetadata = {
  name: 'ERA 27',
  tagline: 'A New Era of Madness',
  subline: 'Welcome 2027',
  presenter: 'Advara Event Management',
  dateIso: '2026-12-31',
  dateDisplay: '31 December 2026 (31.12.2026)',
  doorsOpen: '5:30 PM (Pending confirmation)',
  startTime: '6:00 PM IST',
  venueName: 'Aziz Nagar, Moinabad, Hyderabad',
  venueStatus: 'pending_confirmation',
  venueNote: 'Exact venue location & map pin to be announced soon.',
  expectedAttendance: 1500,
  agePolicyGeneral: 'General entry open to all ages with valid pass.',
  agePolicyBar: 'Bar counter strictly 21+ with mandatory physical government ID verification.',
  preBookingDiscountPercent: 10,
  targetCountdownIso: '2026-12-31T18:00:00+05:30',
};

// --------------------------------------------------------------------------
// Unresolved PRD Discrepancies (Explicitly Tracked, No Assumptions)
// --------------------------------------------------------------------------

export const ERA27_DISCREPANCIES: DiscrepancyItem[] = [
  {
    id: 'phone-secondary',
    field: 'Secondary Contact Number',
    sourceValueA: '6300320768 (PRD Sections 2, 6.2, 17)',
    sourceValueB: '6300320760 (Client Presentation)',
    currentDisplayValue: '6300320768',
    status: 'pending_client_confirmation',
    note: 'Displaying 6300320768 as primary documented number pending client confirmation.',
  },
  {
    id: 'instagram-handle',
    field: 'Official Instagram Handles',
    sourceValueA: '@advara.__ and @era._27 (PRD Sections 2, 6.2, 17)',
    sourceValueB: '@advara (Client Presentation)',
    currentDisplayValue: '@advara.__ & @era._27',
    status: 'pending_client_confirmation',
    note: 'Both handles supported and linked.',
  },
  {
    id: 'venue-pin',
    field: 'Venue Specific Landmark',
    sourceValueA: 'Aziz Nagar, Moinabad, Hyderabad (PRD Sections 1, 2)',
    sourceValueB: 'To be announced (Client Presentation)',
    currentDisplayValue: 'Aziz Nagar, Moinabad, Hyderabad (Exact location soon)',
    status: 'pending_client_confirmation',
    note: 'Displaying general area with exact pin teaser.',
  },
  {
    id: 'duo-coupon-math',
    field: 'Duo Pass Pre-booking Price',
    sourceValueA: '₹2,500 (~10.7% off / ₹300 off, PRD Table 7.2)',
    sourceValueB: '₹2,520 (strict 10% off on ₹2,800)',
    currentDisplayValue: '₹2,500',
    status: 'pending_client_confirmation',
    note: 'Preserving client presentation value ₹2,500 pending confirmation.',
  },
  {
    id: 'decimal-coupon-prices',
    field: 'Gold & Platinum Coupon Price Decimals',
    sourceValueA: '₹1,169.10 & ₹1,349.10 (Exact 10% calculation in PRD Table 7.1)',
    sourceValueB: 'Rounded values ₹1,169 & ₹1,349',
    currentDisplayValue: '₹1,169.10 and ₹1,349.10',
    status: 'pending_client_confirmation',
    note: 'Preserving original PRD decimal values pending rounding decision.',
  },
  {
    id: 'elite-coupon-eligibility',
    field: 'Elite (VIP) Pass 10% Pre-booking Discount',
    sourceValueA: 'Not specified (PRD Table 7.1)',
    sourceValueB: '₹3,149.10 (If 10% discount applies)',
    currentDisplayValue: 'Base: ₹3,499 (Discount pending confirmation)',
    status: 'pending_client_confirmation',
    note: 'Preserving "Not specified" status from PRD Table 7.1.',
  },
];

// --------------------------------------------------------------------------
// Contact & Social Coordinates
// --------------------------------------------------------------------------

export const ERA27_CONTACTS: ContactInfo = {
  primaryPhone: '7093962355',
  secondaryPhone: '6300320768',
  secondaryPhoneDiscrepancy: ERA27_DISCREPANCIES.find(d => d.id === 'phone-secondary'),
  email: 'Advaraeventmanagement@gmail.com',
  instagramAdvara: 'https://instagram.com/advara.__',
  instagramEra: 'https://instagram.com/era._27',
  whatsappNumber: '917093962355',
};

// --------------------------------------------------------------------------
// Single Passes (1 Guest) - Exact PRD Table 7.1 Values
// --------------------------------------------------------------------------

export const ERA27_SINGLE_PASSES: PassTier[] = [
  {
    id: 'pass-silver',
    category: 'single',
    name: 'Silver',
    guests: 1,
    basePrice: 999,
    walletMoney: 0,
    couponPrice: 899,
    couponPriceDisplay: '₹899',
    perks: [
      'Entry for 1 guest to ERA 27 main concert grounds',
      'Access to multi-level LED concert stage & dance zone',
      '10% off at all food & dessert stalls',
      'No wallet money included',
    ],
    stylingTier: 'silver',
    isVip: false,
  },
  {
    id: 'pass-gold',
    category: 'single',
    name: 'Gold',
    guests: 1,
    basePrice: 1299,
    walletMoney: 300,
    couponPrice: 1169.1,
    couponPriceDisplay: '₹1,169.10',
    perks: [
      'Entry for 1 guest to ERA 27 main concert grounds',
      'Access to multi-level LED concert stage & dance zone',
      '₹300 redeemable wallet money on Advara site',
      'Usable for food stall advance bookings & on-site spend',
    ],
    stylingTier: 'gold',
    isVip: false,
    discrepancyNote: 'Coupon price reflects exact PRD Table 7.1 figure (₹1,169.10).',
  },
  {
    id: 'pass-platinum',
    category: 'single',
    name: 'Platinum',
    guests: 1,
    basePrice: 1499,
    walletMoney: 500,
    couponPrice: 1349.1,
    couponPriceDisplay: '₹1,349.10',
    perks: [
      'Entry for 1 guest with priority crowd zone access',
      'Access to multi-level LED concert stage & dance zone',
      '₹500 redeemable wallet money on Advara site',
      'Priority access to food & fun activity stalls',
    ],
    stylingTier: 'platinum',
    isVip: false,
    discrepancyNote: 'Coupon price reflects exact PRD Table 7.1 figure (₹1,349.10).',
  },
  {
    id: 'pass-elite',
    category: 'single',
    name: 'Elite (VIP)',
    guests: 1,
    basePrice: 3499,
    walletMoney: 1500,
    couponPrice: null, // "Not specified" in PRD Table 7.1
    couponPriceDisplay: 'Not specified (Pending confirmation)',
    perks: [
      'Exclusive VIP concert experience & lounge access',
      '₹1,500 redeemable wallet money on Advara site',
      '5 reserved Surprise Stage slots reserved exclusively for Elite holders',
      'Express entry lane & dedicated VIP concierge',
    ],
    stylingTier: 'elite',
    isVip: true,
    pendingConfirmation: true,
    discrepancyNote: 'Pre-booking coupon eligibility is marked "Not specified" in PRD Table 7.1.',
  },
];

// --------------------------------------------------------------------------
// Group Passes (One Booking Covers Group) - Exact PRD Table 7.2 Values
// --------------------------------------------------------------------------

export const ERA27_GROUP_PASSES: PassTier[] = [
  {
    id: 'pass-duo',
    category: 'group',
    name: 'Duo',
    guests: 2,
    basePrice: 2800,
    walletMoney: 799,
    couponPrice: 2500,
    couponPriceDisplay: '₹2,500',
    perks: [
      'Covers 2 guests for full concert entry',
      '₹799 combined redeemable wallet money',
      'Access to open dance floor & photo booth zones',
      'Advance stall pre-booking capability',
    ],
    stylingTier: 'group',
    isVip: false,
    pendingConfirmation: true,
    discrepancyNote: 'Coupon price ₹2,500 is ~10.7% off per client presentation (strict 10% is ₹2,520).',
  },
  {
    id: 'pass-trio',
    category: 'group',
    name: 'Trio',
    guests: 3,
    basePrice: 4200,
    walletMoney: 1500,
    couponPrice: 3780,
    couponPriceDisplay: '₹3,780',
    perks: [
      'Covers 3 guests for full concert entry',
      '₹1,500 combined redeemable wallet money',
      'Full stage & fun zone access',
      '10% pre-booking discount applied',
    ],
    stylingTier: 'group',
    isVip: false,
  },
  {
    id: 'pass-squad',
    category: 'group',
    name: 'Squad',
    guests: 5,
    basePrice: 6999,
    walletMoney: 2500,
    couponPrice: 6300,
    couponPriceDisplay: '₹6,300',
    perks: [
      'Covers 5 guests for full concert entry',
      '₹2,500 combined redeemable wallet money',
      'Perfect for friend groups & celebratory squads',
      '10% pre-booking discount applied',
    ],
    stylingTier: 'group',
    isVip: false,
  },
  {
    id: 'pass-mega-squad',
    category: 'group',
    name: 'Mega Squad',
    guests: 10,
    basePrice: 13999,
    walletMoney: 5000,
    couponPrice: 12600,
    couponPriceDisplay: '₹12,600',
    perks: [
      'Covers 10 guests for full concert entry',
      '₹5,000 combined redeemable wallet money',
      'Ultimate group package for grand celebrations',
      '10% pre-booking discount applied',
    ],
    stylingTier: 'group',
    isVip: false,
  },
];

// --------------------------------------------------------------------------
// Surprise Your Loved Ones Stage - PRD Section 6.2
// --------------------------------------------------------------------------

export const ERA27_SURPRISE_STAGE: SurpriseStageConfig = {
  title: 'Surprise Your Loved Ones Stage',
  subtitle: 'A dedicated public celebration stage with fireworks, custom music & full crowd attention.',
  pricePerSlot: 9999,
  totalSlots: 20,
  reservedForElite: 5,
  availableGeneralSlots: 15,
  bookingChannels: {
    phones: ['7093962355', '6300320768'],
    instagramDms: ['@advara.__', '@era._27'],
  },
  features: [
    'Dedicated stage moment with professional lighting and fireworks launch',
    'Personal song choice and customized audio-visual backdrop presentation',
    'Full crowd spotlight and official photography/videography capture',
    'Strictly limited to 20 exclusive slots for the entire night (5 reserved for Elite VIP holders)',
  ],
};

// --------------------------------------------------------------------------
// Wallet Model - PRD Section 7.3
// --------------------------------------------------------------------------

export const ERA27_WALLET_STEPS = [
  {
    step: '01',
    title: 'Buy Your Pass',
    description: 'Select your preferred single or group pass tier during pre-booking.',
  },
  {
    step: '02',
    title: 'Get Wallet Money',
    description: 'Your pass wallet credit is deposited through the Advara website.',
  },
  {
    step: '03',
    title: 'Pre-book Food Stalls',
    description: 'Use wallet balance to reserve your favorite food and dessert items before the crowd arrives.',
  },
];

// --------------------------------------------------------------------------
// Stalls & Offerings - PRD Section 6.3
// --------------------------------------------------------------------------

export const ERA27_STALLS: StallItem[] = [
  { category: 'Food', name: 'Pani Puri', description: 'Crispy street-style puri with spicy mint water and tangy fillings.' },
  { category: 'Food', name: 'Momos', description: 'Steamed & fried momos with authentic chili dip.' },
  { category: 'Food', name: 'Starters / Roti Curry', description: 'Fresh tawa rotis with rich cottage cheese and spiced curries.' },
  { category: 'Food', name: 'Pulao / Biriyani', description: 'Fragrant Hyderabad-style celebratory rice bowls.' },
  { category: 'Desserts', name: 'Fresh Waffles', description: 'Warm Belgian waffles with chocolate drizzle & toppings.' },
  { category: 'Desserts', name: 'Artisan Ice Cream', description: 'Creamy scoops across classic and seasonal festival flavors.' },
  { category: 'Desserts', name: 'Biscoff Cheesecake', description: 'Smooth baked cheesecake with caramelized lotus spread.' },
  { category: 'Desserts', name: 'Belgian Chocolate Cheesecake', description: 'Decadent dark cocoa layered luxury cake.' },
  { category: 'Drinks', name: 'Juices & Mocktails', description: 'Refreshing fruity coolers, citrus blends, and energetic sips.' },
  { category: 'Drinks', name: 'Purified Water Stations', description: 'Bottled water and hydration counters.' },
  { category: 'Drinks', name: 'Bar Counter (21+ Only)', description: 'Curated cocktails and festive shots. Strictly 21+ with physical ID verification.', ageRestricted: true },
  { category: 'Fun Zone', name: 'Photo Booth', description: 'Themed neon photo ops with instant prints and digital sharing.' },
  { category: 'Fun Zone', name: '3D Printing Zone', description: 'Live mini souvenirs and commemorative keepsakes.' },
  { category: 'Fun Zone', name: '360° Round Video Taker', description: 'Slow-motion spinning platform capturing your festive glam.' },
];

// --------------------------------------------------------------------------
// Schedule Timeline Placeholder - PRD Section 6.4 & 10.2
// --------------------------------------------------------------------------

export const ERA27_SCHEDULE = [
  { time: '05:30 PM', title: 'Gates Open & Red Carpet Welcome', description: 'Registration, security check, and photo booth activations.' },
  { time: '06:30 PM', title: 'Opening Beats & Multi-genre Warm-up', description: 'DJ set kicking off the evening with ambient and energetic grooves.' },
  { time: '07:30 PM', title: 'Live Regional & Pan-India Performances', description: 'Live band sets spanning multiple Indian languages and anthems.' },
  { time: '09:00 PM', title: 'Surprise Your Loved Ones — Segment 1', description: 'First batch of spotlight surprises with custom fireworks.' },
  { time: '10:00 PM', title: 'High-Octane DJ Stage Explosion', description: 'EDM, commercial, and Bollywood dance madness on the multi-level LED stage.' },
  { time: '11:15 PM', title: 'Surprise Your Loved Ones — Segment 2', description: 'Romantic and milestone anniversary tributes on the dedicated stage.' },
  { time: '11:50 PM', title: 'The Grand Countdown to 2027', description: 'Synchronized visual explosion, laser beam sweeps, and midnight pyrotechnics.' },
  { time: '12:05 AM', title: 'Welcome 2027 After-Party Madness', description: 'Dance until late with unforgettable festival vibes.' },
];

// --------------------------------------------------------------------------
// Sponsorship Packages - PRD Section 8.2
// --------------------------------------------------------------------------

export const ERA27_SPONSORS: SponsorPackage[] = [
  {
    tier: 'Title Partner',
    investment: 300000,
    investmentDisplay: '₹3,00,000',
    deliverables: [
      'Event officially co-named with partner brand ("ERA 27 presented by...")',
      'Main stage LED centerpiece & screen visual branding',
      'Prime logo placement across all passes, posters, digital campaigns & social media',
      'VIP guest passes & executive hospitality enclosure',
    ],
  },
  {
    tier: 'Zone Partner',
    investment: 100000,
    investmentDisplay: '₹1,00,000',
    deliverables: [
      'Exclusive ownership of a dedicated zone (Surprise Stage, Bar, Stalls, or Photo Booth)',
      'High-impact experiential branding & standee setups inside the designated zone',
      'Logo on posters, digital collateral & official event website',
      'Passes package for brand team and clients',
    ],
  },
  {
    tier: 'In-kind Partner',
    investment: 25000,
    investmentDisplay: '₹25,000+',
    deliverables: [
      'Beverages, gifts, sound/production equipment, media, or logistics services',
      'Logo inclusion on digital sponsor roll and official partner strip',
      'Emcee brand mentions during peak crowd intervals',
    ],
  },
];

// --------------------------------------------------------------------------
// Frequently Asked Questions - PRD Section 10.2 & 13.1
// --------------------------------------------------------------------------

export const ERA27_FAQS: FaqItem[] = [
  {
    category: 'Venue & Age',
    question: 'Where exactly is the event venue located in Hyderabad?',
    answer: 'ERA 27 will take place in Aziz Nagar, Moinabad, Hyderabad. The exact venue resort/ground landmark and Google Maps pin will be published prior to official ticket rollout.',
  },
  {
    category: 'Venue & Age',
    question: 'What is the age policy for entry and the bar counter?',
    answer: 'General entry to ERA 27 is open to all ages with a valid pass. However, access to the bar counter and purchase/consumption of alcohol is strictly restricted to guests aged 21 and older. Valid physical government ID (Aadhaar, Driving License, or Passport) is mandatory.',
  },
  {
    category: 'Tickets & Passes',
    question: 'What is the 10% pre-booking offer and how does it work?',
    answer: 'Guests who register their pre-booking interest prior to official ticket launch receive a 10% discount on passes. Pre-booking also reserves your spot before the 1,500-guest venue capacity is reached.',
  },
  {
    category: 'Wallet & Food',
    question: 'What is "Wallet Money" and how do I redeem it?',
    answer: 'Wallet money is a redeemable credit balance provided with Gold, Platinum, Elite, and all Group passes. You can redeem it through the Advara platform to book food & dessert stall orders in advance or spend at on-site stalls.',
  },
  {
    category: 'Surprise Stage',
    question: 'How do I book a "Surprise Your Loved Ones" stage slot?',
    answer: 'There are only 20 slots available for the entire night (5 reserved for Elite VIP pass holders) priced at ₹9,999 per slot. Bookings are processed directly via call (7093962355 / 6300320768) or Instagram DM (@advara.__ / @era._27).',
  },
  {
    category: 'Tickets & Passes',
    question: 'Can I purchase group passes for my friends or family?',
    answer: 'Yes! We offer Duo (2 guests), Trio (3 guests), Squad (5 guests), and Mega Squad (10 guests) passes. One booking covers the entire group with substantial bundled wallet money.',
  },
];



// --------------------------------------------------------------------------
// Core Experience Pillars - PRD Section 6
// --------------------------------------------------------------------------

export interface ExperiencePillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tag: string;
  badge?: string;
}

export const ERA27_EXPERIENCES: ExperiencePillar[] = [
  {
    id: 'exp-main-stage',
    number: '01',
    title: 'The Multi-Level LED Stage',
    subtitle: 'Concert-Grade Audio-Visual Production',
    description: 'A high-energy stage featuring immersive LED visuals, laser shows, pyrotechnics and a massive dance floor.',
    highlights: [
      'Multilingual performances: Hindi, Telugu, Punjabi, Tamil & English',
      'Concert-grade sound system and pyrotechnics',
      'Spacious dance floor with clear sightlines',
      'Synchronized midnight countdown spectacle',
    ],
    tag: 'Main Arena',
  },
  {
    id: 'exp-surprise-stage',
    number: '02',
    title: 'Surprise Your Loved Ones',
    subtitle: 'Exclusive Dedicated Celebration Stage',
    description: 'A dedicated stage to create unforgettable public surprise celebrations for your loved ones.',
    highlights: [
      'Limited to 20 slots only',
      '5 slots reserved for Elite VIP pass holders',
      'Custom songs, LED backdrop & fireworks',
      'Professional photo and video coverage',
    ],
    tag: 'Special Feature',
    badge: '20 SLOTS ONLY',
  },
  {
    id: 'exp-stalls',
    number: '03',
    title: 'Food, Desserts & Fun Zone',
    subtitle: '14+ Curated Stalls & Activities',
    description: 'A vibrant festival zone packed with food, treats and fun experiences.',
    highlights: [
      '14+ curated food stalls and activities',
      'Street food favourites: Pani Puri, Momos & Biryani',
      'Gourmet desserts: Biscoff & Belgian Chocolate Cheesecakes',
      'Wallet money accepted at food and dessert counters',
    ],
    tag: 'Festival Zone',
  },
  {
    id: 'exp-bar',
    number: '04',
    title: '21+ Curated Bar Counter',
    subtitle: 'Premium Spirits, Cocktails & Festive Shots',
    description: 'An exclusive bar experience with curated drinks in a dedicated lounge setting.',
    highlights: [
      'Curated cocktails, spirits & festive shots',
      'Mandatory government ID verification',
      'Dedicated bar staff & quick service',
      'Comfortable high-table lounge seating',
    ],
    tag: 'Strictly 21+',
    badge: 'ID REQUIRED',
  },
];

// --------------------------------------------------------------------------
// Gallery & Teaser Visuals - PRD Section 10.2
// --------------------------------------------------------------------------

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  gradient: string;
  accentColor: string;
}

export const ERA27_GALLERY: GalleryItem[] = [
  {
    id: 'gal-stage-concept',
    title: 'Multi-Level LED Stage Visuals',
    category: 'Stage Design',
    description: 'Dynamic floral LED screen artwork combining electric blues, deep orange, and neon magenta highlights.',
    gradient: 'linear-gradient(135deg, #1b0a2a 0%, #0d1e4c 50%, #2f1042 100%)',
    accentColor: '#ff2e93',
  },
  {
    id: 'gal-laser-show',
    title: 'Truss Lighting & Laser Arrays',
    category: 'Lighting Production',
    description: 'High-power concert laser sweeps spanning the open grounds during peak multi-genre drops.',
    gradient: 'linear-gradient(135deg, #091333 0%, #150930 50%, #062b3a 100%)',
    accentColor: '#2f6bff',
  },
  {
    id: 'gal-surprise-moment',
    title: 'Surprise Stage Fireworks Moment',
    category: 'Special Experiences',
    description: 'Stage spotlight, cold pyrotechnic fountains, and crowd cheers as loved ones are celebrated.',
    gradient: 'linear-gradient(135deg, #2b1107 0%, #23082b 50%, #0a1738 100%)',
    accentColor: '#ff7a1a',
  },
  {
    id: 'gal-crowd-vibe',
    title: 'The 1,500 Crowd Arena',
    category: 'Festival Atmosphere',
    description: 'A sea of guests dancing across languages, celebrating together as Hyderabad welcomes 2027.',
    gradient: 'linear-gradient(135deg, #160a2c 0%, #29081f 50%, #0a213e 100%)',
    accentColor: '#8b3cff',
  },
];
