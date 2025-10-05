// app/robots.ts
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/app/utils/site-url";

/** Metadata routes já são estáticas; deixo explícito para clareza */
export const dynamic = "force-static";

/** Base do site (respeita env/preview) via util centralizado */
const BASE_URL = getSiteUrl();

/**
 * Produção: habilite uma das flags p/ anunciar sitemap/host:
 * - NEXT_PUBLIC_ENABLE_SITEMAP=1
 * - ENABLE_SITEMAP=true
 */
const sitemapEnabled =
  process.env.NEXT_PUBLIC_ENABLE_SITEMAP === "1" ||
  process.env.ENABLE_SITEMAP === "true";

/** Heurística extra para detectar preview/ambiente não-prod */
const isPreviewEnv =
  // Vercel: qualquer coisa ≠ production
  (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") ||
  // Domínios de preview/dev (fallback defensivo)
  BASE_URL.includes("vercel.app") ||
  BASE_URL.includes("localhost");

export default function robots(): MetadataRoute.Robots {
  // Previews / dev: bloquear indexação totalmente
  if (isPreviewEnv) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      // não anunciar host/sitemap em preview
    };
  }

  // Produção
  const rules: MetadataRoute.Robots["rules"] = [
    { userAgent: "*", allow: "/" },
    // Evita crawl de rota que só redireciona (mantido do seu código)
    { userAgent: "*", disallow: ["/institucional/noticias"] },
    // (Opcional) Evitar crawl de rotas API
    { userAgent: "*", disallow: ["/api"] },
  ];

  const out: MetadataRoute.Robots = { rules };

  if (sitemapEnabled) {
    out.sitemap = `${BASE_URL}/sitemap.xml`;
    out.host = BASE_URL;
  }

  return out;
}
