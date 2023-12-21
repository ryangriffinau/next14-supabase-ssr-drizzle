import { GeistSans } from 'geist/font';
import './globals.css';
import { db } from '@/lib/db';

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'Findable // Wave the SEO wand',
    description: 'Expand your reach with pSEO by Findable',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en' className={GeistSans.className}>
            <body className='bg-background text-foreground'>
                <main className='min-h-screen flex flex-col items-center'>
                    {children}
                </main>
            </body>
        </html>
    );
}
