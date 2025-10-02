// app/robots.ts
import type { MetadataRoute } from "next";

// Normaliza base: remove barra final e garante protocolo
function normalizeBase(u?: string) {
  if (!u) return "https://colegio.artferro.site";
  let s = u.trim().replace(/\/$/, "");
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  return s;
}

// ⬇️ ADIÇÃO: fallback para previews usando VERCEL_URL (sem remover nada do seu código)
const rawBase =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

const base = normalizeBase(rawBase);

export default function robots(): MetadataRoute.Robots {
  // Em previews (Vercel) bloqueia tudo para não indexar staging
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      // sem sitemap/host em preview
    };
  }

  // Produção
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // evita crawl da rota intermediária que só faz redirect
      { userAgent: "*", disallow: ["/institucional/noticias"] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
