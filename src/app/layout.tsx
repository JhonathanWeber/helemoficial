import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat, Indie_Flower } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const indieFlower = Indie_Flower({
  weight: "400",
  variable: "--font-indie",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Helem Christina - Oficial",
  description: "Site oficial da Helem Christina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${indieFlower.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
