import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import { site } from "@/content/site";
import { buildTravelAgencySchema } from "@/lib/schema";
import { getSiteUrl } from "@/lib/site-url";
import { MotionProvider } from "@/components/providers/MotionProvider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  weight: ["600"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Patrotur Turismo | Agência de Viagens em Patrocínio, MG",
    template: "%s | Patrotur Turismo",
  },
  description:
    "Agência de viagens em Patrocínio, MG, há mais de 10 anos. Passagens, hospedagem e roteiros nacionais e internacionais planejados de forma pessoal, pelo WhatsApp ou na agência física.",
  keywords: [
    "agência de viagens em Patrocínio MG",
    "agência de turismo em Patrocínio",
    "pacotes de viagem Patrocínio MG",
    "viagens nacionais Patrocínio",
    "viagens internacionais Patrocínio",
    "excursões Patrocínio MG",
  ],
  authors: [{ name: site.brandName }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: site.brandName,
    title: "Patrotur Turismo: sua próxima viagem começa aqui",
    description:
      "Planejamento de viagens humano e personalizado em Patrocínio, MG. Nacional e internacional, direto pelo WhatsApp.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${jakarta.variable} ${caveat.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildTravelAgencySchema(siteUrl)) }}
        />
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
