// app/robots.ts
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/app/utils/site-url";

/** Mantém estático (default em metadata routes, mas deixo explícito) */
export const dynamic = "force-static";

/** Base do site (respeita env/preview) via util centralizado */
const BASE_URL = getSiteUrl();

/** Opt-in para anunciar sitemap/host (mesma lógica que você já usava)
 * Produção: defina uma destas:
 * - NEXT_PUBLIC_ENABLE_SITEMAP=1
 * - ENABLE_SITEMAP=true
 */
const sitemapEnabled =
  process.env.NEXT_PUBLIC_ENABLE_SITEMAP === "1" ||
  process.env.ENABLE_SITEMAP === "true";

export default function robots(): MetadataRoute.Robots {
  // Em previews (qualquer coisa ≠ production), bloqueia indexação
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      // sem sitemap/host em preview
    };
  }

  // Produção
  const rules: MetadataRoute.Robots["rules"] = [
    { userAgent: "*", allow: "/" },
    // Evita crawl de rota que só redireciona
    { userAgent: "*", disallow: ["/institucional/noticias"] },
  ];

  // Saída base (segura por padrão)
  const out: MetadataRoute.Robots = { rules };

  // Anuncia sitemap/host só quando habilitado
  if (sitemapEnabled) {
    out.sitemap = `${BASE_URL}/sitemap.xml`;
    out.host = BASE_URL;
  }

  return out;
}
