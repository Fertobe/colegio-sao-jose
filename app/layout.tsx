// app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getSiteUrl, assertSiteUrlForEnv } from "@/app/utils/site-url"; // util existente

// Base derivada do util (sem mudar sua lógica)
const BASE_URL = getSiteUrl();
assertSiteUrlForEnv();

// Ambiente: bloquear pré-produção também por domínio (defensivo)
const IS_PREVIEW =
  (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") ||
  BASE_URL.includes("vercel.app") ||
  BASE_URL.includes("localhost");

// Opcional: GTM/GA via ENV (só entram em produção)
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID; // ex: "GTM-XXXXXXX"
const GA_ID  = process.env.NEXT_PUBLIC_GA_ID;  // ex: "G-XXXXXXXXXX"

export const metadata: Metadata = {
  title: {
    default: "Colégio São José",
    template: "%s — Colégio São José",
  },
  description: "Tradição e inovação para preparar estudantes para a vida real.",
  metadataBase: new URL(BASE_URL),
  // ❌ Sem canonical global — cada página define o seu quando necessário
  openGraph: {
    type: "website",
    siteName: "Colégio São José",
    url: `${BASE_URL}/`,
    images: ["/og-cover.webp"], // resolvido para absoluto via metadataBase
  },
  // ✅ Meta robots também respeita preview (alinhado ao robots.ts/sitemap.ts)
  robots: IS_PREVIEW
    ? {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      }
    : {
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

  // ✅ Adicionado: manifest + ícone padrão
  manifest: "/site.webmanifest",
  icons: {
    icon: "/logo.svg",
    // se quiser: apple: "/apple-touch-icon.png", shortcut: "/favicon.ico"
  },
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
  telephone: "+55 42 3446-2212",
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

        {/* ✅ Preload do 1º frame do HERO (mobile e desktop) */}
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

        {/* Perf hints — WhatsApp e Google Fonts */}
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="preconnect" href="https://wa.me" crossOrigin="anonymous" />

        {/* 👇 adicionados para o domínio de CSS das fontes */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />

        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Prefetch de rotas quentes */}
        <link rel="prefetch" href="/ensino/educacao-infantil" as="document" />
        <link rel="prefetch" href="/ensino/ensino-fundamental" as="document" />
        <link rel="prefetch" href="/ensino/ensino-medio" as="document" />
        <link rel="prefetch" href="/diferenciais/genio-das-financas" as="document" />
        <link rel="prefetch" href="/diferenciais/sistema-coc" as="document" />
        <link rel="prefetch" href="/noticias" as="document" />

        {/* Se usar fonte local, descomente
        <link
          rel="preload"
          as="font"
          href="/fonts/inter-var.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        */}

        {/* ================== GTM (opcional) ================== */}
        {!IS_PREVIEW && GTM_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${GTM_ID}');
                `.trim(),
              }}
            />
          </>
        )}

        {/* ================== GA4 direto (opcional) ==================
            Use apenas se NÃO estiver disparando GA4 via GTM.
        */}
        {!IS_PREVIEW && GA_ID && !GTM_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}', { anonymize_ip: true });
                `.trim(),
              }}
            />
          </>
        )}
      </head>

      <body className="min-h-screen flex flex-col bg-white text-gray-900" suppressHydrationWarning>
        {/* GTM noscript (boa prática) */}
        {!IS_PREVIEW && GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

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
