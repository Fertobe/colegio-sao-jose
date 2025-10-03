// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/app/utils/site-url";

/**
 * Sitemap minimalista e seguro:
 * - usa apenas getSiteUrl()
 * - bloqueia previews
 * - só expõe quando habilitado por ENV (alinhado ao robots.ts)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // 1) Nunca expor em pré-produção
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return [];
  }

  // 2) Opt-in para expor sitemap em produção
  const sitemapEnabled =
    process.env.NEXT_PUBLIC_ENABLE_SITEMAP === "1" ||
    process.env.ENABLE_SITEMAP === "true";
  if (!sitemapEnabled) {
    return [];
  }

  const base = getSiteUrl();
  const now = new Date();

  return [
    // Home
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },

    // Institucional
    { url: `${base}/institucional/nossa-historia`, lastModified: now, priority: 0.6 },
    { url: `${base}/institucional/filosofia`, lastModified: now, priority: 0.6 },

    // Notícias / Legais
    { url: `${base}/noticias`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/politica-de-privacidade`, lastModified: now, priority: 0.3 },
    { url: `${base}/politica-de-cookies`, lastModified: now, priority: 0.3 },

    // Ensino
    { url: `${base}/ensino/educacao-infantil`, lastModified: now, priority: 0.7 },
    { url: `${base}/ensino/ensino-fundamental`, lastModified: now, priority: 0.7 },
    { url: `${base}/ensino/ensino-medio`, lastModified: now, priority: 0.7 },

    // Diferenciais
    { url: `${base}/diferenciais/socioemocional`, lastModified: now, priority: 0.6 },
    { url: `${base}/diferenciais/sistema-coc`, lastModified: now, priority: 0.6 },
    { url: `${base}/diferenciais/genio-das-financas`, lastModified: now, priority: 0.6 },
    { url: `${base}/diferenciais/maralto`, lastModified: now, priority: 0.6 },

    // Conversão / Contato
    { url: `${base}/agendamento`, lastModified: now, priority: 0.6 },
    { url: `${base}/matriculas`, lastModified: now, priority: 0.6 },
    { url: `${base}/contato`, lastModified: now, priority: 0.5 },
  ];
}
