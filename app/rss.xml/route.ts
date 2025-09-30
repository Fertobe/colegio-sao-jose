// app/rss.xml/route.ts
import { listNewsMeta } from "@/lib/news";

const SITE_URL = "https://colegio.artferro.site";
const SITE_NAME = "Colégio São José";

export const dynamic = "force-static";
// ❗ literal numérico
export const revalidate = 21600; // 6h

function rfc1123(d: string | Date) {
  const dt = typeof d === "string" ? new Date(d) : d;
  return isNaN(dt.getTime()) ? new Date().toUTCString() : dt.toUTCString();
}
function xmlEscape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const posts = (listNewsMeta() || []) as Array<{
    slug: string;
    title: string;
    date?: string;
    excerpt?: string;
    cover: string;
  }>;

  const items = posts.map((p) => {
    const link = `${SITE_URL}/noticias/${p.slug}`;
    const guid = link;
    const title = xmlEscape(p.title);
    const desc = p.excerpt ? xmlEscape(p.excerpt) : "";
    const pubDate = p.date ? rfc1123(p.date) : rfc1123(new Date());
    const img = p.cover?.startsWith("http") ? p.cover : `${SITE_URL}${p.cover}`;

    return `<item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${guid}</guid>
      <pubDate>${pubDate}</pubDate>
      ${desc ? `<description>${desc}</description>` : ""}
      <enclosure url="${xmlEscape(img)}" type="image/jpeg" />
    </item>`;
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>${xmlEscape(SITE_NAME)} — Notícias</title>
      <link>${SITE_URL}/noticias</link>
      <description>Últimas notícias, eventos e comunicados do ${xmlEscape(SITE_NAME)}.</description>
      <lastBuildDate>${rfc1123(new Date())}</lastBuildDate>
      <language>pt-BR</language>
      ${items.join("\n")}
    </channel>
  </rss>`.trim();

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
