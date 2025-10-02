// app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    default: "Colégio São José",
    template: "%s — Colégio São José",
  },
  description: "Tradição e inovação para preparar estudantes para a vida real.",
  metadataBase: new URL("https://colegio.artferro.site"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Colégio São José",
    url: "https://colegio.artferro.site/",
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

const ORG_LD_JSON = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Colégio São José",
  "url": "https://colegio.artferro.site/",
  "logo": "/logo.svg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua (preencher) 123",
    "addressLocality": "Prudentópolis",
    "addressRegion": "PR",
    "postalCode": "(CEP)",
    "addressCountry": "BR"
  },
  "telephone": "+55 (42) 3446-2212",
  "sameAs": ["https://wa.me/5542998276516"]
};

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

        {/* Perf hints — aceleram WhatsApp e (se usado) Google Fonts */}
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="preconnect" href="https://wa.me" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

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
