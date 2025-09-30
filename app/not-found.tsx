// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-extrabold text-brand-700">Página não encontrada</h1>
      <p className="mt-3 text-gray-600">
        A página que você tentou acessar não existe ou foi movida.
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-semibold text-brand-700 hover:bg-brand-50"
        >
          ← Voltar para a Home
        </Link>
        <Link
          href="/noticias"
          className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-semibold text-brand-700 hover:bg-brand-50"
        >
          Ver notícias
        </Link>
      </div>
    </main>
  );
}
