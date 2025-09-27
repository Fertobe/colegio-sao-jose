// app/sitemap.ts
import type { MetadataRoute } from "next";

const base = "https://colegio.artferro.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // Páginas principais
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/agendamento`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contato`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/noticias`, lastModified: now, changeFrequency: "daily", priority: 0.8 },

    // Ensinos
    { url: `${base}/ensino/educacao-infantil`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/ensino/ensino-fundamental`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/ensino/ensino-medio`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // Diferenciais
    { url: `${base}/diferenciais/socioemocional`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/diferenciais/sistema-coc`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/diferenciais/genio-das-financas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/diferenciais/maralto`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
