import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Providers } from "@/components/providers";
import { Header } from "@/components/navigation/header";
import { AuthProvider } from "@/components/auth/auth-context";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dyaspora — Your Homecoming Platform",
    template: "%s | Dyaspora",
  },
  description:
    "The modern homecoming platform for Africans around the world. Book flights, accommodation, events, and more.",
  keywords: [
    "Africa", "travel", "diaspora", "homecoming", "flights",
    "accommodation", "events", "Nigeria", "Ghana", "Kenya",
  ],
  openGraph: {
    title: "Dyaspora — Your Homecoming Platform",
    description: "The modern homecoming platform for Africans around the world.",
    url: "https://dyaspora.com",
    siteName: "Dyaspora",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dyaspora — Your Homecoming Platform",
    description: "The modern homecoming platform for Africans around the world.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <TooltipProvider>
            <AuthProvider>
              <Header />
              {children}
            </AuthProvider>
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
