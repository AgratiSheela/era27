import { getChatGPTUser } from '../../chatgpt-auth';
import { getDb } from '@/db';
import { enquiries } from '@/db/schema';
import { and, desc, eq } from 'drizzle-orm';
import { enquiryInput, isAdmin, statuses } from '@/lib/enquiry-policy';
import { z } from 'zod';
export const dynamic = 'force-dynamic';
const json = (data: unknown, status = 200) => Response.json(data, {status, headers:{'Cache-Control':'private, no-store'}});
function sameOrigin(req: Request) { return req.headers.get('origin') === new URL(req.url).origin; }
async function body(req: Request) {
  if (!req.headers.get('content-type')?.includes('application/json')) throw new Error('Invalid body');
  const text = await req.text();
  if (text.length > 16000) throw new Error('Body too large');
  return JSON.parse(text);
}
export async function GET(req: Request) {
  const user = await getChatGPTUser();
  if (!user) return json({error:'Please sign in to view enquiries.'},401);
  const url = new URL(req.url);
  const admin = url.searchParams.get('view') === 'admin';
  if (admin && !isAdmin(user)) return json({error:'Admin access is required.'},403);
  const page = Number(url.searchParams.get('page') || 0);
  if (!Number.isInteger(page) || page < 0 || page > 100000) return json({error:'Invalid page.'},400);
  try {
    const rows = await getDb().select().from(enquiries).where(admin ? undefined : eq(enquiries.userId,user.userId)).orderBy(desc(enquiries.createdAt),desc(enquiries.id)).limit(26).offset(page*25);
    // Account identity is internal; visitors receive only their enquiry details.
    return json({items: rows.slice(0,25).map(({userId,accountEmail,...row}) => admin ? {...row,accountEmail} : row), hasMore:rows.length>25});
  } catch { return json({error:'Unable to load enquiries. Please try again.'},503); }
}
export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({error:'Invalid request origin.'},403);
  const user = await getChatGPTUser();
  if (!user) return json({error:'Please sign in before sending your enquiry.'},401);
  let input;
  try { input = enquiryInput.parse(await body(req)); } catch { return json({error:'Please check your details. Name, valid email and occasion are required; ideas must be under 4,000 characters.'},400); }
  const now = new Date().toISOString();
  try {
    const db = getDb();
    await db.insert(enquiries).values({id:input.id,userId:user.userId,accountEmail:user.email,name:input.Name,email:input.email,occasion:input.Occasion,eventDate:input.Date,guests:input.Guests,budget:input.Budget,ideas:input.Ideas,status:'New',createdAt:now,updatedAt:now}).onConflictDoNothing();
    const saved = await db.select({id:enquiries.id}).from(enquiries).where(and(eq(enquiries.id,input.id),eq(enquiries.userId,user.userId))).get();
    if (!saved) return json({error:'Unable to save. Please start a new enquiry.'},409);
    return json({id:saved.id,saved:true},201);
  } catch { return json({error:'Your enquiry could not be saved. Your details are still here; please try again.'},503); }
}
export async function PATCH(req: Request) {
  if (!sameOrigin(req)) return json({error:'Invalid request origin.'},403);
  const user = await getChatGPTUser();
  if (!user) return json({error:'Please sign in.'},401);
  if (!isAdmin(user)) return json({error:'Admin access is required.'},403);
  let input;
  try { input = z.object({id:z.string().uuid(),status:z.enum(statuses)}).parse(await body(req)); } catch { return json({error:'Invalid status update.'},400); }
  try {
    const updated = await getDb().update(enquiries).set({status:input.status,updatedAt:new Date().toISOString()}).where(eq(enquiries.id,input.id)).returning({id:enquiries.id});
    return updated.length ? json({saved:true}) : json({error:'Enquiry not found.'},404);
  } catch { return json({error:'Update failed. Please try again.'},503); }
}
