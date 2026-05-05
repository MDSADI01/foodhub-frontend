import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/provider/themeProvider";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "./context/cart-context";
import { SmoothScrollProvider } from "@/components/ui/smooth-scroll-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoodyVerse",
  description: "The place which ensures to provide food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SmoothScrollProvider>
              {children}
              <Toaster richColors></Toaster>
            </SmoothScrollProvider>
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}
