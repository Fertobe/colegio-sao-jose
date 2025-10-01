// app/noticias/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { readNewsBySlug, listNewsMeta } from "@/lib/news";

// Next 15: params e (opcional) searchParams são Promises
type Params = { slug: string };
type Props = {
  params: Promise<Params>;
  // você não usa searchParams aqui; tipamos de forma genérica e segura:
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

/* ========= METADATA DINÂMICA (OG/Twitter/Canonical) ========= */
export async function generateMetadata(
  { params }: { params: Promise<Params> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const post = readNewsBySlug(slug);

  // 404 lógico: evita indexar e aponta canonical da lista
  if (!post) {
    return {
      title: "Notícia não encontrada",
      description: "A notícia informada não foi localizada.",
      robots: { index: false, follow: false },
      alternates: { canonical: "/noticias" },
    };
  }

  const title = post.title;
  const description = post.excerpt ?? "Leia esta notícia do Colégio São José.";
  const url = `/noticias/${slug}`;
  const images = post.cover
    ? [{ url: post.cover, alt: post.title }]
    : [{ url: "/og-cover.webp", alt: "Colégio São José" }];

  return {
    title, // o template global do layout acrescenta “ — Colégio São José”
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "Colégio São José",
      images,
      ...(post.date ? { publishedTime: post.date } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
  };
}

/* ========= PÁGINA ========= */
export default async function NewsPostPage({ params }: Props) {
  // Desempacota o slug a partir da Promise
  const { slug } = await params;

  const post = readNewsBySlug(slug);

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">Notícia não encontrada</h1>
        <p className="mt-4">Verifique a URL.</p>
        <div className="mt-8">
          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            ← Voltar para notícias
          </Link>
        </div>
      </main>
    );
  }

  // JSON-LD por post (melhora SEO para Article/BlogPosting)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    ...(post.date ? { datePublished: post.date } : {}),
    image: post.cover,
    url: `https://colegio.artferro.site/noticias/${post.slug}`,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    publisher: {
      "@type": "Organization",
      name: "Colégio São José",
      logo: {
        "@type": "ImageObject",
        url: "https://colegio.artferro.site/logo.svg",
      },
    },
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      {/* JSON-LD específico do post */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ← Voltar */}
      <div className="mb-6">
        <Link
          href="/noticias"
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          ← Voltar para notícias
        </Link>
      </div>

      <article>
        <h1 className="text-3xl font-extrabold text-gray-900">{post.title}</h1>
        {post.date && (
          <p className="mt-2 text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString("pt-BR")}
          </p>
        )}

        {post.cover && (
          <div className="mt-6 overflow-hidden rounded-2xl shadow">
            <img
              src={post.cover}
              alt={post.title}
              className="h-auto w-full object-cover"
              loading="eager"
              decoding="async"
              draggable={false}
              width={1200}
              height={675}
            />
          </div>
        )}

        <div
          className="prose prose-brand mt-8 max-w-none prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      {/* ← Voltar (no final do post também) */}
      <div className="mt-10">
        <Link
          href="/noticias"
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          ← Voltar para notícias
        </Link>
      </div>
    </main>
  );
}

// Geração estática das rotas (ok no Next 15). Pode retornar direto ou Promise.
export async function generateStaticParams() {
  const posts = listNewsMeta();
  return posts.map((p) => ({ slug: p.slug }));
}

// Opcional: revalida as páginas de notícia periodicamente
export const revalidate = 3600; // 1h
