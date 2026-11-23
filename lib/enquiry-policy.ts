import { z } from 'zod';
export const statuses = ['New', 'Contacted', 'Planning', 'Confirmed', 'Completed', 'Cancelled'] as const;
export const ADMIN_EMAIL = 'chinnuyadavvv369@gmail.com';
export const isAdmin = (user: {email: string} | null) => user?.email.toLowerCase() === ADMIN_EMAIL;
const optionalNumber = (max: number) => z.preprocess(v => v === '' || v == null ? null : v, z.coerce.number().int().min(0).max(max).nullable());
export const enquiryInput = z.object({
  id: z.string().uuid(),
  Name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  Occasion: z.string().trim().min(1).max(100),
  Date: z.string().max(10).refine(v => v === '' || (/^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0,10) === v), 'Choose a valid date'),
  Guests: optionalNumber(1000000),
  Budget: optionalNumber(1000000000),
  Ideas: z.string().trim().max(4000),
});
export function ownsEnquiry(userId: string, record: {userId: string}) { return record.userId === userId; }
