import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AgentKit demo",
  description: "Demo of ChatKit with hosted workflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to ChatKit CDN for faster loading */}
        <link rel="preconnect" href="https://cdn.platform.openai.com" />
        <link rel="dns-prefetch" href="https://cdn.platform.openai.com" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
