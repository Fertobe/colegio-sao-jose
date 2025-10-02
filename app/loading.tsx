// app/loading.tsx
// Skeleton global mostrado em transições de rota no App Router.

export default function Loading() {
  return (
    <main
      className="mx-auto max-w-6xl px-4 py-10"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Spinner central (mobile) */}
      <div className="mb-6 flex items-center justify-center md:hidden">
        <svg
          className="h-8 w-8 animate-spin text-brand-700"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-90"
            fill="currentColor"
            d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
          />
        </svg>
        <span className="sr-only">Carregando…</span>
      </div>

      {/* HERO skeleton */}
      <section className="grid items-center gap-8 md:grid-cols-2">
        {/* Esquerda: “imagem” */}
        <div className="relative mx-auto aspect-square w-[320px] md:w-[420px] lg:w-[520px]">
          <div className="h-full w-full rounded-3xl bg-gradient-to-br from-brand-900/20 via-brand-700/20 to-brand-500/20 animate-pulse" />
        </div>

        {/* Direita: textos */}
        <div className="space-y-4">
          <div className="inline-block h-6 w-40 rounded-full bg-brand-100 animate-pulse" />
          <div className="h-8 w-4/5 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-8 w-3/4 rounded-lg bg-gray-200 animate-pulse" />
          <div className="h-4 w-2/3 rounded bg-gray-200 animate-pulse" />
          <div className="mt-4 flex gap-3">
            <div className="h-10 w-40 rounded-full bg-brand-200 animate-pulse" />
            <div className="h-10 w-44 rounded-full bg-gray-200 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Linha separadora suave */}
      <div className="my-10 h-px w-full bg-gray-100" />

      {/* Cards “Segmentos” skeleton */}
      <section aria-label="Carregando segmentos" className="space-y-6">
        <div className="h-6 w-72 rounded bg-gray-200 animate-pulse" />
        <div className="grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-3xl border bg-white p-4 shadow-sm"
            >
              <div className="h-20 rounded-2xl bg-gray-100 animate-pulse" />
              <div className="mt-4 h-5 w-3/4 rounded bg-gray-200 animate-pulse" />
              <div className="mt-2 h-4 w-11/12 rounded bg-gray-100 animate-pulse" />
            </div>
          ))}
        </div>
      </section>

      {/* Linha separadora suave */}
      <div className="my-10 h-px w-full bg-gray-100" />

      {/* “Diferenciais” skeleton */}
      <section aria-label="Carregando diferenciais" className="space-y-6">
        <div className="h-6 w-80 rounded bg-gray-200 animate-pulse" />
        <div className="grid gap-6 md:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-3xl border bg-white p-4 shadow-sm"
            >
              <div className="h-16 rounded-2xl bg-gray-100 animate-pulse" />
              <div className="mt-4 h-5 w-4/5 rounded bg-gray-200 animate-pulse" />
              <div className="mt-2 h-4 w-full rounded bg-gray-100 animate-pulse" />
            </div>
          ))}
        </div>
      </section>

      {/* Linha separadora suave */}
      <div className="my-10 h-px w-full bg-gray-100" />

      {/* CTA skeleton */}
      <section className="rounded-3xl bg-gradient-to-br from-brand-900/10 via-brand-800/10 to-brand-700/10 p-6 ring-1 ring-white/40 md:p-8">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <div className="inline-block h-5 w-56 rounded-full bg-white/60 animate-pulse" />
            <div className="mt-3 h-7 w-3/4 rounded bg-white/70 animate-pulse" />
            <div className="mt-2 h-4 w-5/6 rounded bg-white/60 animate-pulse" />
            <div className="mt-4 flex gap-3">
              <div className="h-10 w-44 rounded-full bg-white/70 animate-pulse" />
              <div className="h-10 w-52 rounded-full bg-white/50 animate-pulse" />
            </div>
          </div>
          <div className="h-[220px] w-full rounded-3xl bg-white/60 animate-pulse md:h-[280px]" />
        </div>
      </section>
    </main>
  );
}
