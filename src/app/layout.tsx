import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://helemoficial.com"),
  title: {
    template: "%s | Helem Cristina",
    default: "Helem Cristina | Candidata a Deputada Estadual - RJ",
  },
  description:
    "Conheça a trajetória, as pautas e os compromissos propostos por Helem Cristina para o Rio de Janeiro.",
  keywords: [
    "Helem Cristina",
    "Deputada Estadual",
    "PSDB RJ",
    "Defesa da Mulher",
    "Combate à Violência contra a Mulher",
    "Rio de Janeiro",
    "Jacarezinho",
    "Maricá",
    "Política",
  ],
  authors: [{ name: "Helem Cristina" }],
  creator: "Helem Cristina",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Helem Cristina | Candidata a Deputada Estadual - RJ",
    description:
      "Conheça as pautas e os compromissos propostos por Helem Cristina para as mulheres e os territórios do Rio de Janeiro.",
    siteName: "Helem Cristina",
    images: [
      {
        url: "/whatsapp-image-2026-08-16-hero.jpeg",
        width: 1366,
        height: 768,
        alt: "Arte oficial de campanha de Helem Cristina para deputada estadual no Rio de Janeiro, número 45789",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Helem Cristina | Candidata a Deputada Estadual",
    description: "Conheça a trajetória e os compromissos propostos por Helem Cristina. #Elas e suas fortalezas.",
    images: ["/whatsapp-image-2026-08-16-hero.jpeg"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
