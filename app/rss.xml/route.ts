// app/rss.xml/route.ts
import { listNewsMeta } from "@/lib/news";
import { getSiteUrl } from "@/app/utils/site-url";

const SITE_URL = getSiteUrl();
const SITE_NAME = "Colégio São José";

export const dynamic = "force-static";
// ❗ literal numérico
export const revalidate = 21600; // 6h
// ✅ garante execução em Node.js (bom se listNewsMeta usa filesystem)
export const runtime = "nodejs";

function rfc1123(d: string | Date) {
  const dt = typeof d === "string" ? new Date(d) : d;
  return isNaN(dt.getTime()) ? new Date().toUTCString() : dt.toUTCString();
}

// Para conteúdo de texto (elementos)
function xmlText(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
// Para atributos
function xmlAttr(s: string) {
  return xmlText(s).replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

// ✅ sem indexar arrays (evita ts(2532) com noUncheckedIndexedAccess)
function mimeFromUrl(u?: string): string | undefined {
  if (!u) return;
  const q = u.indexOf("?");
  const h = u.indexOf("#");
  const end = Math.min(q === -1 ? u.length : q, h === -1 ? u.length : h);
  const clean = u.slice(0, end).toLowerCase();

  if (clean.endsWith(".webp")) return "image/webp";
  if (clean.endsWith(".jpg") || clean.endsWith(".jpeg")) return "image/jpeg";
  if (clean.endsWith(".png")) return "image/png";
  if (clean.endsWith(".gif")) return "image/gif";
  if (clean.endsWith(".avif")) return "image/avif";
  if (clean.endsWith(".svg")) return "image/svg+xml";
  return undefined;
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
    const title = xmlText(p.title);
    const desc = p.excerpt ? xmlText(p.excerpt) : "";
    const pubDate = p.date ? rfc1123(p.date) : rfc1123(new Date());
    const imgAbs = p.cover?.startsWith("http") ? p.cover : `${SITE_URL}${p.cover}`;
    const mime = mimeFromUrl(imgAbs);

    return `<item>
  <title>${title}</title>
  <link>${xmlText(link)}</link>
  <guid isPermaLink="true">${xmlText(guid)}</guid>
  <pubDate>${pubDate}</pubDate>
  ${desc ? `<description>${desc}</description>` : ""}
  ${mime ? `<enclosure url="${xmlAttr(imgAbs)}" type="${xmlAttr(mime)}" />` : ""}
</item>`;
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlText(SITE_NAME)} — Notícias</title>
    <link>${xmlText(`${SITE_URL}/noticias`)}</link>
    <atom:link href="${xmlAttr(`${SITE_URL}/rss.xml`)}" rel="self" type="application/rss+xml" />
    <description>${xmlText(`Últimas notícias, eventos e comunicados do ${SITE_NAME}.`)}</description>
    <lastBuildDate>${rfc1123(new Date())}</lastBuildDate>
    <language>pt-BR</language>
    ${items.join("\n")}
  </channel>
</rss>`.trim();

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=21600, max-age=0, stale-while-revalidate=86400",
    },
  });
}
