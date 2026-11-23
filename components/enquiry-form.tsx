'use client';
import {useRef,useState} from 'react';
export default function EnquiryForm({occasion='Wedding / Reception',email='',onSaved}:{occasion?:string;email?:string;onSaved?:()=>void}) {
  const [busy,setBusy]=useState(false),[error,setError]=useState(''),[saved,setSaved]=useState<Record<string,string>|null>(null),[login,setLogin]=useState(false);
  const requestId=useRef('');
  async function submit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); if(busy)return; const data=Object.fromEntries(new FormData(e.currentTarget)) as Record<string,string>;
    setBusy(true);setError('');setLogin(false);requestId.current ||= crypto.randomUUID();
    try {
      const res=await fetch('/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,id:requestId.current})});
      const result=await res.json() as {error?:string};
      if(!res.ok){setLogin(res.status===401);throw new Error(result.error||'Please try again.');}
      setSaved(data);onSaved?.();
    }catch(err){setError(err instanceof Error?err.message:'Unable to send. Please try again.');}finally{setBusy(false);}
  }
  if(saved)return <div className="saved-enquiry"><p className="eyebrow">ENQUIRY RECEIVED</p><h3>Your celebration is on our list.</h3><p>Your details are saved in your account and visible to the Advara team. Track updates in <a href="/account">My enquiries ↗</a>.</p><form action="https://formsubmit.co/pavankumardvk678@gmail.com" method="POST">{Object.entries(saved).map(([key,value])=><input key={key} type="hidden" name={key} value={value}/>)}<input type="hidden" name="_subject" value="New Advara celebration enquiry"/><input type="hidden" name="_template" value="table"/><p>You can also send an email copy to the team through FormSubmit.</p><button className="primary" type="submit">Email a copy ↗</button></form><button className="textlink portal-button" onClick={()=>{setSaved(null);requestId.current='';}}>Create another enquiry</button></div>;
  return <form onSubmit={submit}><p className="form-privacy">Sign in to save your enquiry and follow its progress. <a href="/login">Visitor login ↗</a></p><div className="fields"><label>Your name<input name="Name" required maxLength={100} autoComplete="name" placeholder="What should we call you?"/></label><label>Email<input name="email" type="email" required maxLength={254} autoComplete="email" defaultValue={email} placeholder="you@example.com"/></label><label>Occasion<select name="Occasion" defaultValue={occasion}>{Array.from(new Set([occasion,'Wedding / Reception','Engagement / Pre-wedding','Birthday','Anniversary / Milestone','Family / Festive occasion','Corporate / Social event','Other celebration'])).map(t=><option key={t}>{t}</option>)}</select></label><label>Event date<input name="Date" type="date"/></label><label>Guest count<input name="Guests" type="number" min="0" max="1000000" placeholder="Approximate number"/></label><label>Budget (₹)<input name="Budget" type="number" min="0" max="1000000000" placeholder="Your comfortable range"/></label></div><label>Your ideas<textarea name="Ideas" rows={4} maxLength={4000} placeholder="Location, theme, colours, or that one big idea…"/></label><p className="form-privacy">Your details are stored securely for your account and the Advara team to manage this enquiry.</p><button className="primary" disabled={busy} type="submit">{busy?'Saving your enquiry…':'Send enquiry ↗'}</button>{error&&<p role="alert" className="form-error">{error} {login&&<a href="/login">Continue to login ↗</a>}</p>}</form>;
}
