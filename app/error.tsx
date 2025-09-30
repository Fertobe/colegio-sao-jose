// app/error.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Loga no console do navegador e em ferramentas como Vercel/Logs
  useEffect(() => {
    // Evita quebrar build se error for undefined (edge cases)
    if (error) console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 text-center">
      <div className="mx-auto max-w-xl">
        <h1 className="text-4xl font-extrabold text-brand-700">
          Ops! Algo deu errado.
        </h1>
        <p className="mt-4 text-gray-600">
          Tente novamente. Se o problema persistir, volte mais tarde.
        </p>

        {/* Mostra o digest (ID do erro) quando disponível — útil para suporte */}
        {error?.digest && (
          <p className="mt-2 text-xs text-gray-400">ID do erro: {error.digest}</p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 font-semibold text-white hover:bg-brand-600"
          >
            Tentar novamente
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-brand-600 px-5 py-2.5 font-semibold text-brand-700 hover:bg-brand-50"
          >
            Ir para a Home
          </Link>
        </div>
      </div>
    </main>
  );
}
