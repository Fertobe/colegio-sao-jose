// app/noticias/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { readNewsBySlug, listNewsMeta } from "@/lib/news";

// Next 15: params é Promise
type Params = { slug: string };
type Props = {
  params: Promise<Params>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

// Conteúdo vem do filesystem ⇒ podemos gerar estaticamente
export const dynamic = "force-static";

const SITE_URL = "https://colegio.artferro.site";

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = readNewsBySlug(slug);

  if (!post) {
    return {
      title: "Notícia não encontrada",
      description: "Esta notícia não está disponível.",
      alternates: { canonical: "/noticias" },
      robots: { index: false, follow: false },
    };
  }

  const title = `${post.title} | Colégio São José`;
  const description =
    post.excerpt ||
    // fallback: primeira frase do HTML sem tags
    post.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: `/noticias/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/noticias/${slug}`,
      type: "article",
      images: post.cover ? [{ url: `${SITE_URL}${post.cover}` }] : undefined,
    },
  };
}

export default async function NewsPostPage({ params }: Props) {
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

  // JSON-LD para SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    ...(post.date ? { datePublished: post.date } : {}),
    image: post.cover ? [`${SITE_URL}${post.cover}`] : undefined,
    url: `${SITE_URL}/noticias/${post.slug}`,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    publisher: {
      "@type": "Organization",
      name: "Colégio São José",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      {/* JSON-LD */}
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
              width={1200}
              height={675}
              loading="eager"
              decoding="sync"
              draggable={false}
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

// Geração estática das rotas (Next 15)
export async function generateStaticParams() {
  const posts = listNewsMeta();
  return posts.map((p) => ({ slug: p.slug }));
}
