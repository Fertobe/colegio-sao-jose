// app/sitemap.ts
import type { MetadataRoute } from "next";
import { listNewsMeta } from "@/lib/news";

// Revalida 1x por dia (ajuste se quiser mais/menos frequente)
export const revalidate = 60 * 60 * 24;

// Normaliza a BASE: remove barra final e garante protocolo
function normalizeBase(u?: string) {
  if (!u) return "https://colegio.artferro.site";
  let s = u.trim().replace(/\/$/, "");
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  return s;
}

// Usa env no preview; cai no domínio prod como fallback
const base = normalizeBase(process.env.NEXT_PUBLIC_SITE_URL);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Páginas estáticas principais
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${base}/`,                        lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/matriculas`,              lastModified: now, changeFrequency: "monthly", priority: 0.9 }, // ⬅️ novo
    { url: `${base}/agendamento`,             lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/contato`,                 lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${base}/noticias`,                lastModified: now, changeFrequency: "daily",   priority: 0.8 },

    // Ensinos
    { url: `${base}/ensino/educacao-infantil`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/ensino/ensino-fundamental`,lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/ensino/ensino-medio`,      lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // Diferenciais (rota do COC corrigida)
    { url: `${base}/diferenciais/socioemocional`,        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/diferenciais/coc`,                   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/diferenciais/genio-das-financas`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/diferenciais/maralto`,              lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Notícias dinâmicas (publicadas) — vêm ordenadas/filtradas do lib
  const posts = listNewsMeta();
  const newsEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/noticias/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...newsEntries];
}
