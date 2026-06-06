import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jashuvro.dev'),
  title: {
    default: 'J.A. Shuvro — Flutter & Full-Stack Developer',
    template: '%s | J.A. Shuvro',
  },
  description: 'Experienced Flutter & Full-Stack Developer from Rajshahi, Bangladesh. Building mobile and web apps with Flutter, NestJS, Next.js, Laravel, and PostgreSQL.',
  keywords: ['Flutter Developer', 'Full-Stack Developer', 'Next.js Developer', 'Bangladesh Developer', 'Freelance Developer', 'NestJS', 'React Developer'],
  authors: [{ name: 'J.A. Shuvro' }],
  creator: 'J.A. Shuvro',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jashuvro.dev',
    siteName: 'J.A. Shuvro Portfolio',
    title: 'J.A. Shuvro — Flutter & Full-Stack Developer',
    description: 'Experienced Flutter & Full-Stack Developer from Rajshahi, Bangladesh.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'J.A. Shuvro — Flutter & Full-Stack Developer',
    description: 'Experienced Flutter & Full-Stack Developer from Rajshahi, Bangladesh.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://jashuvro.dev' },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body bg-background text-text antialiased`}>
        {children}
      </body>
    </html>
  );
}
