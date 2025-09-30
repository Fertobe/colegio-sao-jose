// app/sitemap.xml/route.ts
import { listNewsMeta } from "@/lib/news";

const SITE_URL = "https://colegio.artferro.site";

export const dynamic = "force-static";
export const revalidate = 60 * 60 * 6; // 6h

function xmlEscape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function GET() {
  // rotas estáticas principais
  const staticPaths = [
    "/", "/contato", "/matriculas", "/agendamento",
    "/institucional/nossa-historia", "/institucional/filosofia",
    "/institucional/noticias",
    "/diferenciais/coc",
  ];

  const staticUrls = staticPaths.map(
    (p) => `<url><loc>${SITE_URL}${p}</loc></url>`
  );

  // notícias publicadas (vem ordenadas)
  const posts = (listNewsMeta() || []) as Array<{
    slug: string; title: string; date?: string;
  }>;

  const postUrls = posts.map((p) => {
    const loc = `${SITE_URL}/noticias/${p.slug}`;
    const lastmod = p.date ? new Date(p.date).toISOString() : undefined;
    return `<url>
      <loc>${xmlEscape(loc)}</loc>
      ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
    </url>`;
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticUrls.join("\n")}
    ${postUrls.join("\n")}
  </urlset>`.trim();

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
