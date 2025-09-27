// lib/news.ts
import fs from "fs";
import path from "path";

export type CarouselItem = { img: string; title: string; href: string };

type NewsFrontmatter = {
  title?: string;
  date?: string;   // YYYY-MM-DD
  cover?: string;  // "feira.webp" ou "/noticias/feira.webp"
  excerpt?: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "noticias");

function parseFrontmatter(md: string): NewsFrontmatter {
  if (!md.startsWith("---")) return {};
  const end = md.indexOf("\n---", 3);
  if (end === -1) return {};
  const block = md.slice(3, end).trim();
  const obj: NewsFrontmatter = {};
  for (const raw of block.split("\n")) {
    const idx = raw.indexOf(":");
    if (idx === -1) continue;
    const key = raw.slice(0, idx).trim();
    let val = raw.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (key === "title") obj.title = val;
    if (key === "date") obj.date = val;
    if (key === "cover") obj.cover = val;
    if (key === "excerpt") obj.excerpt = val;
  }
  return obj;
}

function resolveCover(cover?: string) {
  if (!cover) return "/noticias/placeholder.jpg";
  return cover.startsWith("/") ? cover : `/noticias/${cover}`;
}

/** -------------- JÁ EXISTE no seu arquivo, mantenha -------------- */
export function getLatestNewsForCarousel(limit = 12): CarouselItem[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((f) => {
    const slug = f.replace(/\.md$/, "");
    const md = fs.readFileSync(path.join(POSTS_DIR, f), "utf8");
    const fm = parseFrontmatter(md);
    const date = fm.date ? new Date(fm.date) : new Date(0);
    return {
      slug,
      title: fm.title ?? slug,
      img: resolveCover(fm.cover),
      date: isNaN(date.getTime()) ? new Date(0) : date,
    };
  });
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  return posts.slice(0, limit).map((p) => ({
    img: p.img,
    title: p.title,
    href: `/noticias/${p.slug}`,
  }));
}
/** --------------------------------------------------------------- */

/** Lista metadados para a página /noticias */
export function listNewsMeta() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const rows = files.map((f) => {
    const slug = f.replace(/\.md$/, "");
    const md = fs.readFileSync(path.join(POSTS_DIR, f), "utf8");
    const fm = parseFrontmatter(md);
    const date = fm.date ? new Date(fm.date) : new Date(0);
    return {
      slug,
      title: fm.title ?? slug,
      date: fm.date ?? undefined,
      cover: resolveCover(fm.cover),
      excerpt: fm.excerpt ?? undefined,
      time: isNaN(date.getTime()) ? 0 : date.getTime(),
    };
  });
  rows.sort((a, b) => b.time - a.time);
  return rows.map(({ time, ...rest }) => rest);
}

/** Lê um post completo pela slug e retorna HTML simples */
export function readNewsBySlug(slug: string) {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const md = fs.readFileSync(file, "utf8");
  let fm: NewsFrontmatter = {};
  let body = md;

  if (md.startsWith("---")) {
    const end = md.indexOf("\n---", 3);
    if (end !== -1) {
      fm = parseFrontmatter(md);
      body = md.slice(end + 4).trim();
    }
  }

  const html = mdToHtml(body);
  return {
    slug,
    title: fm.title ?? slug,
    date: fm.date,
    cover: resolveCover(fm.cover),
    excerpt: fm.excerpt,
    html,
  };
}

/** Conversor Markdown → HTML (simples, sem dependências) */
function mdToHtml(src: string) {
  // títulos
  let html = src
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>");
  // negrito / itálico
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // links [txt](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  // parágrafos
  html = html
    .split(/\n{2,}/)
    .map((b) => (b.match(/^<h[1-3]>/) ? b : `<p>${b.replace(/\n/g, "<br/>")}</p>`))
    .join("\n");
  return html;
}
