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
  // Log amigável (não quebra build se error vier indefinido)
  useEffect(() => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [error]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 text-center">
      <div className="mx-auto max-w-xl">
        {/* A11y: anuncia o erro para tecnologias assistivas */}
        <div role="alert" aria-live="assertive">
          <h1 className="text-4xl font-extrabold text-brand-700">
            Ops! Algo deu errado.
          </h1>
          <p className="mt-4 text-gray-600">
            Tente novamente. Se o problema persistir, volte mais tarde.
          </p>

          {/* ID do erro ajuda no suporte sem expor stack em produção */}
          {error?.digest && (
            <p className="mt-2 text-xs text-gray-400">ID do erro: {error.digest}</p>
          )}
        </div>

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

          {/* Opcional: remover se quiser manter bem minimalista */}
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 rounded-full bg-gray-800 px-5 py-2.5 font-semibold text-white hover:bg-gray-700"
          >
            Fale conosco
          </Link>
        </div>

        {/* Dev only: diagnóstico para facilitar debug durante desenvolvimento */}
        {process.env.NODE_ENV !== "production" && error?.message && (
          <details className="mx-auto mt-8 max-w-full text-left">
            <summary className="cursor-pointer text-sm text-gray-500">
              Detalhes técnicos (dev)
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-gray-50 p-4 text-xs text-gray-700">
{error.message}
{error.stack ? `\n\n${error.stack}` : ""}
            </pre>
          </details>
        )}
      </div>
    </main>
  );
}
