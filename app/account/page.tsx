import {requireChatGPTUser} from '../chatgpt-auth';
import {isAdmin} from '@/lib/enquiry-policy';
import PortalShell from '@/components/portal-shell';
import Dashboard from '@/components/enquiry-dashboard';
export const dynamic='force-dynamic';
export default async function Account(){const user=await requireChatGPTUser('/account');return <PortalShell title="Your celebrations." subtitle={`Signed in as ${user.email}`} signedIn admin={isAdmin(user)}><Dashboard email={user.email}/></PortalShell>}
