import {requireChatGPTUser} from '../chatgpt-auth';
import {isAdmin} from '@/lib/enquiry-policy';
import PortalShell from '@/components/portal-shell';
import Dashboard from '@/components/enquiry-dashboard';
export const dynamic='force-dynamic';
export default async function Admin(){const user=await requireChatGPTUser('/admin');if(!isAdmin(user))return <PortalShell title="Admin access required." subtitle="This account does not have access to the Advara admin dashboard." signedIn><section className="portal-card"><p>You can still view and manage your own enquiries.</p><a className="primary" href="/account">Go to my enquiries ↗</a></section></PortalShell>;return <PortalShell title="The planning room." subtitle="Review enquiries, connect with your customers, and bring every celebration a little closer." signedIn admin><Dashboard admin email={user.email}/></PortalShell>}
