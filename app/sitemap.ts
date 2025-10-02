// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/app/utils/site-url";

/**
 * Sitemap minimalista e seguro:
 * - usa apenas getSiteUrl()
 * - sem imports de libs que usem 'fs' ou Node APIs
 * - nenhuma chamada externa
 * - zero side effects
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // ⬇️ Opcional: não expor sitemap em pré-produção
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return [];
  }

  const base = getSiteUrl();
  const now = new Date();

  return [
    // Home
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },

    // Institucional / Legais
    { url: `${base}/noticias`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/politica-de-privacidade`, lastModified: now, priority: 0.3 },
    { url: `${base}/politica-de-cookies`, lastModified: now, priority: 0.3 },

    // Ensino
    { url: `${base}/ensino/educacao-infantil`, lastModified: now, priority: 0.7 },
    { url: `${base}/ensino/ensino-fundamental`, lastModified: now, priority: 0.7 },
    { url: `${base}/ensino/ensino-medio`, lastModified: now, priority: 0.7 },

    // Diferenciais
    { url: `${base}/diferenciais/genio-das-financas`, lastModified: now, priority: 0.6 },
    { url: `${base}/diferenciais/sistema-coc`, lastModified: now, priority: 0.6 }, // <- corrigido

    // Contato / Conversão
    { url: `${base}/agendamento`, lastModified: now, priority: 0.6 },
    { url: `${base}/contato`, lastModified: now, priority: 0.5 },
    { url: `${base}/matriculas`, lastModified: now, priority: 0.6 },
  ];
}
