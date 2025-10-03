// app/robots.ts
import type { MetadataRoute } from "next";

/** Normaliza a base: remove barra final e garante protocolo */
function normalizeBase(u?: string) {
  if (!u) return "https://colegio.artferro.site";
  let s = u.trim().replace(/\/$/, "");
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  return s;
}

/** Fallback para previews usando VERCEL_URL (mantido) */
const rawBase =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

const base = normalizeBase(rawBase);

/** Opt-in para anunciar sitemap/host
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

  // Base sem sitemap (seguro por padrão)
  const out: MetadataRoute.Robots = { rules };

  // Anuncia sitemap/host só quando habilitado
  if (sitemapEnabled) {
    out.sitemap = `${base}/sitemap.xml`;
    out.host = base;
  }

  return out;
}
