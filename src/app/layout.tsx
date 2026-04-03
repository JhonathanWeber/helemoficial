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
  metadataBase: new URL("https://helemoficial.com"),
  title: {
    template: "%s | Helem Christina",
    default: "Helem Christina | Pré-candidata a Deputada Estadual - RJ",
  },
  description:
    "Conheça a história de Helem Christina. Mulher negra de periferia, mãe, criada no Jacarezinho. Uma voz incansável na luta contra a violência feminina e na defesa do Rio de Janeiro.",
  keywords: [
    "Helem Christina",
    "Deputada Estadual",
    "PSDB RJ",
    "Defesa da Mulher",
    "Combate à Violência contra a Mulher",
    "Rio de Janeiro",
    "Jacarezinho",
    "Maricá",
    "Política",
  ],
  authors: [{ name: "Helem Christina" }],
  creator: "Helem Christina",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Helem Christina | Pré-candidata a Deputada Estadual - RJ",
    description:
      "A dor virou luta. Junte-se à fortaleza de Helem Christina pelas mulheres do Rio de Janeiro.",
    siteName: "Helem Christina",
    images: [
      {
        url: "/helem foto de capa.jpg",
        width: 1200,
        height: 630,
        alt: "Helem Christina - #Elas e suas fortalezas!",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Helem Christina | Pré-candidata a Deputada Estadual",
    description: "A dor virou luta. Vem lutar com a gente. #Elas e suas fortalezas.",
    images: ["/helem foto de capa.jpg"],
  },
  alternates: {
    canonical: "/",
  },
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
