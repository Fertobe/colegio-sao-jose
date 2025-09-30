// app/noticias/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { listNewsMeta } from "@/lib/news";

// Conteúdo vem do filesystem → pode ser totalmente estático.
// Se migrar para CMS/DB, troque para "force-dynamic".
export const dynamic = "force-static";

// ajuste aqui se usar outro domínio em produção
const SITE_URL = "https://colegio.artferro.site";

export const metadata: Metadata = {
  title: "Notícias | Colégio São José",
  description:
    "Acompanhe as últimas notícias, eventos e comunicados do Colégio São José.",
  alternates: {
    canonical: "/noticias",
    // adiciona <link rel="alternate" type="application/rss+xml" ...> para SEO
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    title: "Notícias | Colégio São José",
    description:
      "Acompanhe as últimas notícias, eventos e comunicados do Colégio São José.",
    url: `${SITE_URL}/noticias`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notícias | Colégio São José",
    description:
      "Acompanhe as últimas notícias, eventos e comunicados do Colégio São José.",
  },
};

type Post = {
  slug: string;
  title: string;
  date?: string;
  cover: string;
  excerpt?: string;
};

export default function NoticiasPage() {
  // já vem ordenado (mais recentes primeiro) e filtrado por published
  const posts = listNewsMeta() as Post[];

  // JSON-LD (listagem de posts). Usa URLs absolutas e imagem absoluta.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Notícias | Colégio São José",
    url: `${SITE_URL}/noticias`,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      ...(p.date ? { datePublished: p.date } : {}),
      url: `${SITE_URL}/noticias/${p.slug}`,
      image: `${SITE_URL}${p.cover}`,
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
          const eager = i === 0;
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
                  />
                </div>

                <div className="p-4">
                  <h2 id={headingId} className="text-lg font-semibold text-gray-900">
                    {p.title}
                  </h2>

                  {p.date && (
                    <p className="mt-1 text-xs text-gray-500">
                      <time dateTime={p.date}>
                        {new Date(p.date).toLocaleDateString("pt-BR")}
                      </time>
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
