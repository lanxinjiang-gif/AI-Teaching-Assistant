import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { HydrateStore } from '@/components/HydrateStore';
import { InboxNotificationStack } from '@/components/immersion/InboxNotification';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Accounting Case Game',
  description: 'Learn accounting through interactive case simulations',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50">
        <HydrateStore />
        {children}
        <InboxNotificationStack />
      </body>
    </html>
  );
}
