// app/robots.ts
import type { MetadataRoute } from "next";

const base =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://colegio.artferro.site";

export default function robots(): MetadataRoute.Robots {
  // Em previews (Vercel) bloqueia tudo para não indexar staging
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // evita o crawl da rota intermediária que só faz redirect
      { userAgent: "*", disallow: ["/institucional/noticias"] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
