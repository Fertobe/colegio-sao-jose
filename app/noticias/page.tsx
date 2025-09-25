// app/noticias/page.tsx
import Link from "next/link";
import { listNewsMeta } from "@/lib/news";

export const metadata = {
  title: "Notícias | Colégio São José",
};

export default function NoticiasPage() {
  const posts = listNewsMeta(); // já vem ordenado (mais recentes primeiro)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-brand-700">Notícias</h1>

      {!posts.length && (
        <p className="mt-8 text-gray-600">
          Nenhuma notícia publicada ainda. Crie arquivos .md em <code>content/noticias</code>.
        </p>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <article key={p.slug} className="overflow-hidden rounded-2xl bg-white shadow ring-1 ring-gray-200">
            <Link href={`/noticias/${p.slug}`} className="block">
              <div className="h-44 w-full overflow-hidden bg-gray-100">
                <img
                  src={p.cover}
                  alt={p.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">{p.title}</h2>
                {p.date && (
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(p.date).toLocaleDateString("pt-BR")}
                  </p>
                )}
                {p.excerpt && <p className="mt-2 text-sm text-gray-700">{p.excerpt}</p>}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
