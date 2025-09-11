import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppWrapper from "./components/AppWrapper";
import { SantuarioProvider } from "./components/SantuarioContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Belasco de Baquedano",
  description: "Vinos, restaurante y enoturismo — demo privada",
  openGraph: {
    title: 'Belasco de Baquedano',
    description: 'Vinos, restaurante y enoturismo — demo privada',
    images: ['/og/og-image.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Belasco de Baquedano',
    description: 'Vinos, restaurante y enoturismo — demo privada',
    images: ['/og/og-image.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/og/og-image.svg" />
        <meta name="twitter:image" content="/og/og-image.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <SantuarioProvider>
          <AppWrapper>
            {children}
          </AppWrapper>
        </SantuarioProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
