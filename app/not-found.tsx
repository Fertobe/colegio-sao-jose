// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 text-center">
      <div className="mx-auto max-w-xl">
        <h1 className="text-4xl font-extrabold text-brand-700">
          Página não encontrada
        </h1>
        <p className="mt-4 text-gray-600">
          A página que você tentou acessar não existe ou foi movida.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-brand-600 px-5 py-2.5 font-semibold text-brand-700 hover:bg-brand-50"
          >
            ← Voltar para a Home
          </Link>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 font-semibold text-white hover:bg-brand-600"
          >
            Fale conosco
          </Link>
        </div>
      </div>
    </main>
  );
}
