import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

const displayFont = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Petr Hollan | Data & AI",
  description: "Portfolio of Petr Hollan",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <StructuredData locale={locale} />
      </head>
      <body className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} bg-primary text-white font-sans`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
