// app/noticias/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { listNewsMeta } from "@/lib/news";
import { getSiteUrl } from "@/app/utils/site-url";

// Conteúdo vem do filesystem → pode ser totalmente estático.
// Se migrar para CMS/DB, troque para "force-dynamic".
export const dynamic = "force-static";

// Base do site (respeita ambiente / previews)
const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Notícias | Colégio São José",
  description:
    "Acompanhe as últimas notícias, eventos e comunicados do Colégio São José.",
  alternates: {
    canonical: "/noticias",
    // <link rel="alternate" type="application/rss+xml" ...> para SEO
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    title: "Notícias | Colégio São José",
    description:
      "Acompanhe as últimas notícias, eventos e comunicados do Colégio São José.",
    url: `${SITE_URL}/noticias`,
    type: "website",
    images: [{ url: `${SITE_URL}/og-cover.webp` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notícias | Colégio São José",
    description:
      "Acompanhe as últimas notícias, eventos e comunicados do Colégio São José.",
    images: [`${SITE_URL}/og-cover.webp`],
  },
};

type Post = {
  slug: string;
  title: string;
  date?: string;
  cover: string;   // pode vir "/capa.jpg" ou "https://..."
  excerpt?: string;
};

export default function NoticiasPage() {
  // já vem ordenado (mais recentes primeiro) e filtrado por published
  const posts = listNewsMeta() as Post[];

  // Helper para imagem absoluta
  const toAbs = (u: string) => (u.startsWith("http") ? u : `${SITE_URL}${u}`);

  // JSON-LD (listagem de posts). Usa URLs absolutas e imagem absoluta.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Notícias | Colégio São José",
    url: `${SITE_URL}/noticias`,
    publisher: {
      "@type": "Organization",
      name: "Colégio São José",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      ...(p.date ? { datePublished: p.date } : {}),
      url: `${SITE_URL}/noticias/${p.slug}`,
      image: toAbs(p.cover),
      ...(p.excerpt ? { description: p.excerpt } : {}),
    })),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* JSON-LD estruturado */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-3xl font-extrabold text-brand-700">Notícias</h1>

      {!posts.length && (
        <p className="mt-8 text-gray-600">
          Nenhuma notícia publicada ainda. Crie arquivos <code>*.md</code> em{" "}
          <code>content/noticias</code>.
        </p>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => {
          const headingId = `post-${p.slug}`;
          const eager = i === 0; // ajuda o LCP do primeiro card

          // Data segura (não quebra se vier inválida)
          let dateLabel: string | null = null;
          if (p.date) {
            const d = new Date(p.date);
            if (!isNaN(d.getTime())) {
              dateLabel = d.toLocaleDateString("pt-BR");
            }
          }

          return (
            <article
              key={p.slug}
              className="overflow-hidden rounded-2xl bg-white shadow ring-1 ring-gray-200"
              aria-labelledby={headingId}
            >
              <Link
                href={`/noticias/${p.slug}`}
                className="block"
                aria-label={`Ler notícia: ${p.title}`}
              >
                <div className="h-44 w-full overflow-hidden bg-gray-100">
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="h-full w-full object-cover"
                    width={1200}
                    height={675}
                    // LCP: a primeira imagem ajuda o carregamento
                    loading={eager ? "eager" : "lazy"}
                    fetchPriority={eager ? "high" : "low"}
                    decoding="async"
                    draggable={false}
                    // baixa tamanhos coerentes com o grid (3/2/1 colunas)
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>

                <div className="p-4">
                  <h2 id={headingId} className="text-lg font-semibold text-gray-900">
                    {p.title}
                  </h2>

                  {dateLabel && (
                    <p className="mt-1 text-xs text-gray-500">
                      <time dateTime={p.date}>{dateLabel}</time>
                    </p>
                  )}

                  {p.excerpt && (
                    <p className="mt-2 text-sm text-gray-700">{p.excerpt}</p>
                  )}
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </main>
  );
}
