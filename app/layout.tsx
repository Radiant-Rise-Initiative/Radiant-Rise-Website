import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/layout/SkipLink";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Radiant Rise",
    template: "%s | Radiant Rise",
  },
  description: "Nurturing Hope and Purpose to Transform Vulnerability into Sustained Livelihoods",
  icons: {
    icon: "/assets/branding/rr-monogram.png",
    shortcut: "/assets/branding/rr-monogram.png",
    apple: "/assets/branding/rr-monogram.png",
  },
  openGraph: {
    title: "Radiant Rise",
    description: "Nurturing Hope and Purpose to Transform Vulnerability into Sustained Livelihoods",
    type: "website",
    locale: "en_US",
    siteName: "Radiant Rise",
    images: [
      {
        url: "/assets/branding/rr-monogram.png",
        width: 800,
        height: 800,
        alt: "Radiant Rise Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="w-full">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased w-full",
          inter.variable,
          geistMono.variable
        )}
      >
        <SkipLink />
        <main id="main-content" className="relative flex min-h-screen flex-col w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
