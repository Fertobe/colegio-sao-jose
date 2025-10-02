// app/robots.ts
import type { MetadataRoute } from "next";

// Normaliza base: remove barra final e garante protocolo
function normalizeBase(u?: string) {
  if (!u) return "https://colegio.artferro.site";
  let s = u.trim().replace(/\/$/, "");
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  return s;
}

// ⬇️ Fallback para previews usando VERCEL_URL (mantido do seu padrão)
const rawBase =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

const base = normalizeBase(rawBase);

// ⬇️ NOVO: controle “opt-in” para anunciar sitemap/host
// Ligue em produção com: NEXT_PUBLIC_ENABLE_SITEMAP=1  (ou ENABLE_SITEMAP=true)
const sitemapEnabled =
  process.env.NEXT_PUBLIC_ENABLE_SITEMAP === "1" ||
  process.env.ENABLE_SITEMAP === "true";

export default function robots(): MetadataRoute.Robots {
  // Em previews (Vercel) bloqueia tudo para não indexar staging
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      // sem sitemap/host em preview
    };
  }

  // Produção
  const rules: MetadataRoute.Robots["rules"] = [
    { userAgent: "*", allow: "/" },
    // evita crawl da rota intermediária que só faz redirect
    { userAgent: "*", disallow: ["/institucional/noticias"] },
  ];

  // Base sem sitemap (safe por padrão)
  const out: MetadataRoute.Robots = { rules };

  // Anuncia sitemap/host só quando habilitado por env
  if (sitemapEnabled) {
    out.sitemap = `${base}/sitemap.xml`;
    out.host = base;
  }

  return out;
}
