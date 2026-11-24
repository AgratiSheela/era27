import { z } from 'zod';
import {
  ERA27_BOOKING_CONFIG,
  ERA27_SINGLE_PASSES,
  ERA27_GROUP_PASSES,
} from '@/lib/era27-content';

export const dynamic = 'force-dynamic';

const json = (data: unknown, status = 200) =>
  Response.json(data, {
    status,
    headers: { 'Cache-Control': 'private, no-store' },
  });

const prebookSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters'),
  phone: z.string().trim().regex(/^\+?[\d\s-]{10,15}$/, 'Valid 10-digit phone number is required'),
  email: z.string().trim().email('Valid email address is required'),
  passType: z.string().min(1, 'Please select a pass tier'),
  quantity: z.number().int().min(1).max(50).default(1),
  notes: z.string().max(2000).optional().default(''),
});

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const parsed = prebookSchema.safeParse(rawBody);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Invalid input details.';
      return json({ error: firstError }, 400);
    }

    const { fullName, phone, email, passType, quantity, notes } = parsed.data;

    // Verify booking mode
    const isPreBookingMode = ERA27_BOOKING_CONFIG.mode === 'PREBOOKING';

    // Look up pass tier
    const allPasses = [...ERA27_SINGLE_PASSES, ...ERA27_GROUP_PASSES];
    const passDetails = allPasses.find((p) => p.name === passType);

    const basePrice = passDetails ? passDetails.basePrice : 0;
    const unitPrice = passDetails?.couponPrice ?? basePrice;
    const estimatedTotal = unitPrice * quantity;
    const totalWalletMoney = (passDetails?.walletMoney || 0) * quantity;

    // Generate unique pre-booking reference code
    const uniqueSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referenceCode = isPreBookingMode
      ? `ERA27-PRB-${uniqueSuffix}`
      : `ERA27-TKT-${uniqueSuffix}`;

    const submissionRecord = {
      referenceCode,
      mode: ERA27_BOOKING_CONFIG.mode,
      fullName,
      phone,
      email,
      passType,
      quantity,
      estimatedTotal,
      totalWalletMoney,
      notes,
      submittedAt: new Date().toISOString(),
      discountPercentage: ERA27_BOOKING_CONFIG.discountPercentage,
    };

    // Log the registration locally for auditing
    console.log('[ERA 27 Pre-Booking Registered]', submissionRecord);

    return json(
      {
        success: true,
        referenceCode,
        mode: ERA27_BOOKING_CONFIG.mode,
        summary: {
          fullName,
          phone,
          email,
          passType,
          quantity,
          estimatedTotal,
          totalWalletMoney,
          discountApplied: `${ERA27_BOOKING_CONFIG.discountPercentage}%`,
        },
        message: isPreBookingMode
          ? 'Early pre-booking interest successfully registered! Your 10% discount is reserved.'
          : 'Booking recorded.',
      },
      201
    );
  } catch (err) {
    console.error('ERA 27 Pre-booking error:', err);
    return json(
      { error: 'Unable to process your pre-booking at this time. Please try again.' },
      500
    );
  }
}

export async function GET() {
  return json({
    mode: ERA27_BOOKING_CONFIG.mode,
    discountPercentage: ERA27_BOOKING_CONFIG.discountPercentage,
    officialLaunchLabel: ERA27_BOOKING_CONFIG.officialLaunchLabel,
    venueCapacity: ERA27_BOOKING_CONFIG.venueCapacity,
  });
}

