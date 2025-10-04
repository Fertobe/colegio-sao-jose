// app/noticias/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readNewsBySlug, listNewsMeta } from "@/lib/news";
import { getSiteUrl } from "@/app/utils/site-url";

// Next 15: params e (opcional) searchParams podem vir como Promises
type Params = { slug: string };
type Props = {
  params: Promise<Params>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

// Conteúdo estático + ISR
export const dynamic = "force-static";
export const revalidate = 3600; // 1h

/* ========= METADATA DINÂMICA (OG/Twitter/Canonical) ========= */
export async function generateMetadata(
  { params }: { params: Promise<Params> },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const post = readNewsBySlug(slug);
  const base = getSiteUrl();

  // 404 lógico: evita indexar e aponta canonical da lista
  if (!post) {
    return {
      metadataBase: new URL(base),
      title: "Notícia não encontrada",
      description: "A notícia informada não foi localizada.",
      robots: { index: false, follow: false },
      alternates: { canonical: "/noticias" },
    };
  }

  const title = post.title;
  const description = post.excerpt ?? "Leia esta notícia do Colégio São José.";
  const path = `/noticias/${slug}`;
  const urlAbs = `${base}${path}`;
  const imgAbs = post.cover?.startsWith("http") ? post.cover : `${base}${post.cover}`;

  return {
    metadataBase: new URL(base),
    title, // o template global do layout acrescenta “ — Colégio São José”
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: urlAbs,
      title,
      description,
      siteName: "Colégio São José",
      images: [{ url: imgAbs, alt: post.title }],
      ...(post.date ? { publishedTime: post.date } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imgAbs],
    },
  };
}

/* ========= PÁGINA ========= */
export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = readNewsBySlug(slug);

  // Retorna 404 real (usa app/not-found.tsx e status correto)
  if (!post) {
    notFound();
  }

  // JSON-LD por post (melhora SEO para Article/BlogPosting)
  const base = getSiteUrl();
  const urlAbs = `${base}/noticias/${post.slug}`;
  const imgAbs = post.cover?.startsWith("http") ? post.cover : `${base}${post.cover}`;

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    ...(post.date ? { datePublished: post.date } : {}),
    image: imgAbs,
    url: urlAbs,
    ...(post.excerpt ? { description: post.excerpt } : {}),
    mainEntityOfPage: urlAbs,
    publisher: {
      "@type": "Organization",
      name: "Colégio São José",
      logo: { "@type": "ImageObject", url: `${base}/logo.svg` },
    },
  };

  // Breadcrumbs JSON-LD
  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Notícias", item: `${base}/noticias` },
      { "@type": "ListItem", position: 2, name: post.title, item: urlAbs },
    ],
  };

  // Data segura (não quebra se vier inválida)
  let dateLabel: string | null = null;
  if (post.date) {
    const d = new Date(post.date);
    if (!isNaN(d.getTime())) dateLabel = d.toLocaleDateString("pt-BR");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      {/* JSON-LD específico do post */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      {/* JSON-LD Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
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
        {dateLabel && (
          <p className="mt-2 text-sm text-gray-500">
            <time dateTime={post.date}>{dateLabel}</time>
          </p>
        )}

        {post.cover && (
          <div className="mt-6 overflow-hidden rounded-2xl shadow">
            <img
              src={post.cover}
              alt={post.title}
              className="h-auto w-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              draggable={false}
              width={1200}
              height={675}
              sizes="(min-width: 768px) 768px, 100vw"
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
