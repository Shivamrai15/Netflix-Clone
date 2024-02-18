import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { ModalProvider } from '@/providers/modal-provider';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Netflix - Watch TV Shows Online, Watch Movies Online',
    keywords : [
        "watch movies",
        "movies online",
        "watch TV",
        "TV online",
        "TV shows online",
        "watch TV shows",
        "stream movies",
        "stream tv",
        "instant streaming",
        "watch online",
        "movies",
        "watch movies India",
        "watch TV online",
        "no download",
        "full length movies"
    ],
    description: 'Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.',
}


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await auth();

    return (
        <SessionProvider session={session}>
            <html lang="en">
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <body className={inter.className}>
                    <ModalProvider />
                    <Toaster position="bottom-right"/>
                    {children}
                </body>
            </html>
        </SessionProvider>
        
    )
}
