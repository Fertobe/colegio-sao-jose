// app/sitemap.ts
import type { MetadataRoute } from "next";
import { listNewsMeta } from "@/lib/news";

const base =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://colegio.artferro.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${base}/`,                      lastModified: now, changeFrequency: "weekly",  priority: 1   },
    { url: `${base}/agendamento`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contato`,               lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${base}/noticias`,              lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${base}/ensino/educacao-infantil`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/ensino/ensino-fundamental`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/ensino/ensino-medio`,      lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/diferenciais/socioemocional`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/diferenciais/coc`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/diferenciais/genio-das-financas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/diferenciais/maralto`,        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const posts = listNewsMeta();
  const newsEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/noticias/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...newsEntries];
}
