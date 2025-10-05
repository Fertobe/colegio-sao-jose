// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/app/utils/site-url";
import { listNewsMeta } from "@/lib/news";

/** Metadata routes são estáticas; deixo explícito e com ISR opcional */
export const dynamic = "force-static";
export const revalidate = 3600; // opcional: 1h

/**
 * Sitemap com:
 * - bloqueio em previews (VERCEL_ENV !== "production" ou domínio de preview)
 * - opt-in por ENV (NEXT_PUBLIC_ENABLE_SITEMAP=1 ou ENABLE_SITEMAP=true)
 * - rotas estáticas principais
 * - rotas dinâmicas para /noticias/[slug] (apenas publicadas)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  // 1) Nunca expor em pré-produção / domínios de preview
  const isPreviewEnv =
    (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") ||
    base.includes("vercel.app") ||
    base.includes("localhost");

  if (isPreviewEnv) return [];

  // 2) Opt-in para expor sitemap em produção (alinhado ao robots.ts)
  const sitemapEnabled =
    process.env.NEXT_PUBLIC_ENABLE_SITEMAP === "1" ||
    process.env.ENABLE_SITEMAP === "true";
  if (!sitemapEnabled) return [];

  const now = new Date();

  // Rotas fixas
  const fixed: MetadataRoute.Sitemap = [
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

  // Rotas dinâmicas de notícias publicadas
  const posts = (listNewsMeta() || []) as Array<{ slug?: string; date?: string }>;
  const newsEntries: MetadataRoute.Sitemap =
    posts
      .filter((p) => !!p.slug)
      .map((p) => {
        const d = p.date ? new Date(p.date) : now;
        const lastModified = isNaN(d.getTime()) ? now : d;
        return {
          url: `${base}/noticias/${p.slug}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.7,
        };
      });

  return [...fixed, ...newsEntries];
}
