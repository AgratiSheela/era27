import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Advara — Celebrations, thoughtfully made',description:'Weddings, receptions, birthdays, pre-wedding ceremonies, family occasions, and corporate events. Thoughtfully planned. Beautifully brought to life.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
