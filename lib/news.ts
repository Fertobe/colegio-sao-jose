// lib/news.ts
import fs from "fs";
import path from "path";

export type CarouselItem = { img: string; title: string; href: string };

type NewsFrontmatter = {
  title?: string;
  date?: string;       // YYYY-MM-DD
  cover?: string;      // "/noticias/feira.webp" | "feira.webp" | "https://..."
  excerpt?: string;
  published?: boolean; // default true se ausente
  tags?: string[];     // opcional (não usado na UI ainda)
  author?: string;     // opcional
};

const POSTS_DIR = path.join(process.cwd(), "content", "noticias");

/* =========================
   Helpers
   ========================= */

function normalizeEOL(s: string): string {
  // Garante que o parser funcione igual em Windows/Linux/Mac
  return s.replace(/\r\n/g, "\n");
}

function parseBool(val?: string): boolean | undefined {
  if (!val) return undefined;
  const v = val.toLowerCase().trim();
  if (v === "true") return true;
  if (v === "false") return false;
  return undefined;
}

// Aceita: [A, B], ["A","B"], [A ,B ], ou uma string "A, B"
function parseTags(val?: string): string[] | undefined {
  if (!val) return undefined;
  let raw = val.trim();

  const isQuoted = (s: string) =>
    (s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"));

  if (raw.startsWith("[") && raw.endsWith("]")) {
    raw = raw.slice(1, -1).trim();
  }

  const parts = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (isQuoted(s) ? s.slice(1, -1) : s));

  return parts.length ? parts : undefined;
}

// Data estável (sem variação por fuso local)
function parseDateISO(d?: string): Date {
  if (!d) return new Date(0);
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(d) ? `${d}T00:00:00Z` : d;
  const dt = new Date(iso);
  return isNaN(dt.getTime()) ? new Date(0) : dt;
}

function resolveCover(cover?: string) {
  if (!cover) return "/noticias/placeholder.jpg";
  // ✅ suporta imagens absolutas remotas
  if (cover.startsWith("http://") || cover.startsWith("https://")) return cover;
  // ✅ suporta absoluto local (/noticias/...)
  if (cover.startsWith("/")) return cover;
  // fallback relativo
  return `/noticias/${cover}`;
}

/* =========================
   Frontmatter
   ========================= */

function parseFrontmatter(mdRaw: string): NewsFrontmatter {
  const md = normalizeEOL(mdRaw);
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

    // remove aspas do início/fim
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }

    switch (key) {
      case "title":
        obj.title = val;
        break;
      case "date":
        obj.date = val;
        break;
      case "cover":
        obj.cover = val;
        break;
      case "excerpt":
        obj.excerpt = val;
        break;

      // published/publicado: só atribui se o parser devolver boolean
      case "published":
      case "publicado": {
        const b = parseBool(val);
        if (typeof b === "boolean") obj.published = b; // ✅ evita undefined
        break;
      }

      // tags: só atribui se veio lista não-vazia
      case "tags": {
        const t = parseTags(val);
        if (t && t.length) obj.tags = t; // ✅ evita undefined
        break;
      }

      case "author":
        obj.author = val;
        break;

      default:
        break;
    }
  }
  return obj;
}

/* =========================
   Markdown -> HTML simples
   (com escape de HTML)
   ========================= */

function escapeHtml(src: string) {
  return src
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function mdToHtml(srcRaw: string) {
  const src = normalizeEOL(srcRaw);

  // 1) escapa qualquer HTML cru
  let html = escapeHtml(src);

  // 2) títulos
  html = html
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>");

  // 3) negrito / itálico (ordem importa para não conflitar)
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // 4) links [txt](url)
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1</a>'
  );

  // 5) parágrafos (mantém headings como blocos)
  html = html
    .split(/\n{2,}/)
    .map((b) => (b.match(/^<h[1-3]>/) ? b : `<p>${b.replace(/\n/g, "<br/>")}</p>`))
    .join("\n");

  return html;
}

/* =========================
   API pública
   ========================= */

/** Carrossel: pega as últimas N (publicadas) */
export function getLatestNewsForCarousel(limit = 12): CarouselItem[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((f) => {
    const slug = f.replace(/\.md$/, "");
    const md = fs.readFileSync(path.join(POSTS_DIR, f), "utf8");
    const fm = parseFrontmatter(md);
    const date = parseDateISO(fm.date);
    const published = fm.published ?? true;

    return {
      slug,
      title: fm.title ?? slug,
      img: resolveCover(fm.cover),
      date,
      published,
    };
  });

  const onlyPublished = posts.filter((p) => p.published);
  onlyPublished.sort((a, b) => b.date.getTime() - a.date.getTime());

  return onlyPublished.slice(0, limit).map((p) => ({
    img: p.img,
    title: p.title,
    href: `/noticias/${p.slug}`,
  }));
}

/** Lista metadados para a página /noticias */
export function listNewsMeta() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  const rows = files.map((f) => {
    const slug = f.replace(/\.md$/, "");
    const md = fs.readFileSync(path.join(POSTS_DIR, f), "utf8");
    const fm = parseFrontmatter(md);
    const date = parseDateISO(fm.date);
    const published = fm.published ?? true;

    return {
      slug,
      title: fm.title ?? slug,
      date: fm.date ?? undefined,
      cover: resolveCover(fm.cover),
      excerpt: fm.excerpt ?? undefined,
      time: date.getTime(),
      published,
    };
  });

  const onlyPublished = rows.filter((r) => r.published);
  onlyPublished.sort((a, b) => b.time - a.time);
  return onlyPublished.map(({ time, published, ...rest }) => rest);
}

/** Lê um post completo pela slug e retorna HTML simples */
export function readNewsBySlug(slug: string) {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const mdRaw = fs.readFileSync(file, "utf8");
  const md = normalizeEOL(mdRaw);

  let fm: NewsFrontmatter = {};
  let body = md;

  if (md.startsWith("---")) {
    const end = md.indexOf("\n---", 3);
    if (end !== -1) {
      fm = parseFrontmatter(md);
      body = md.slice(end + 4).trim();
    }
  }

  // se published:false, trata como não encontrado (mantém privacidade)
  if (fm.published === false) return null;

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
