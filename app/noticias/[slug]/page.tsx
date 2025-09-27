// app/noticias/[slug]/page.tsx
import Link from "next/link";
import { readNewsBySlug, listNewsMeta } from "@/lib/news";

// Next 15: params e (opcional) searchParams são Promises
type Params = { slug: string };
type Props = {
  params: Promise<Params>;
  // você não usa searchParams aqui; tipamos de forma genérica e segura:
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

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
            href="/institucional/noticias"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            ← Voltar para notícias
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      {/* ← Voltar */}
      <div className="mb-6">
        <Link
          href="/institucional/noticias"
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
          href="/institucional/noticias"
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
