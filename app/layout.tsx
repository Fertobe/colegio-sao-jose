// app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getSiteUrl, assertSiteUrlForEnv } from "@/app/utils/site-url"; // ⬅️ util existente

// Base derivada do util (sem mudar sua lógica)
const BASE_URL = getSiteUrl();
assertSiteUrlForEnv();

export const metadata: Metadata = {
  title: {
    default: "Colégio São José",
    template: "%s — Colégio São José",
  },
  description: "Tradição e inovação para preparar estudantes para a vida real.",
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Colégio São José",
    url: `${BASE_URL}/`,
    images: ["/og-cover.webp"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0B5DBB",
  colorScheme: "light",
};

// JSON-LD da organização (com endereço/CEP corretos)
const ORG_LD_JSON = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Colégio São José",
  url: `${BASE_URL}/`,
  logo: `${BASE_URL}/logo.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Cândido de Abreu, 1636",
    addressLocality: "Prudentópolis",
    addressRegion: "PR",
    postalCode: "84400-000",
    addressCountry: "BR",
  },
  telephone: "+55 (42) 3446-2212",
  sameAs: ["https://wa.me/5542998276516"],
} as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preload do logo: ajuda no LCP e evita “piscada” no topo */}
        <link
          rel="preload"
          as="image"
          href="/logo.svg"
          type="image/svg+xml"
          fetchPriority="high"
        />

        {/* ✅ Preload do 1º frame do HERO (mobile e desktop) sem usar props não tipadas */}
        <link
          rel="preload"
          as="image"
          href="/hero/mobile/aluno-01.webp"
          type="image/webp"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/hero/aluno-01.webp"
          type="image/webp"
          media="(min-width: 768px)"
          fetchPriority="high"
        />

        {/* Perf hints — aceleram WhatsApp e (se usado) Google Fonts */}
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="preconnect" href="https://wa.me" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Prefetch de rotas quentes */}
        <link rel="prefetch" href="/ensino/educacao-infantil" as="document" />
        <link rel="prefetch" href="/ensino/ensino-fundamental" as="document" />
        <link rel="prefetch" href="/ensino/ensino-medio" as="document" />
        <link rel="prefetch" href="/diferenciais/genio-das-financas" as="document" />
        <link rel="prefetch" href="/diferenciais/coc" as="document" />
        <link rel="prefetch" href="/noticias" as="document" />

        {/* Se usar fonte local, descomente e ajuste
        <link
          rel="preload"
          as="font"
          href="/fonts/inter-var.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        */}
      </head>

      <body className="min-h-screen flex flex-col bg-white text-gray-900" suppressHydrationWarning>
        {/* A11y: link para pular direto ao conteúdo */}
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white p-2 rounded shadow"
        >
          Pular para o conteúdo
        </a>

        {/* JSON-LD no body (ok para Google) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD_JSON) }}
        />

        <Header />

        <main id="conteudo" className="flex-1">
          {children}
        </main>

        <Footer />

        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </body>
    </html>
  );
}
