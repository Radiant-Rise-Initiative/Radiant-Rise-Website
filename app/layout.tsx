import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/layout/skip-link";
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
  title: "Radiant Rise",
  description: "Supporting marginalized communities through impactful digital experiences.",
  openGraph: {
    title: "Radiant Rise",
    description: "Supporting marginalized communities through impactful digital experiences.",
    type: "website",
    locale: "en_US",
    siteName: "Radiant Rise",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden w-full">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overflow-x-hidden w-full",
          inter.variable,
          geistMono.variable
        )}
      >
        <SkipLink />
        <main id="main-content" className="relative flex min-h-screen flex-col overflow-x-hidden w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
