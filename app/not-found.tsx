// app/not-found.tsx
import Link from "next/link";
import BackToTop from "./components/BackToTop";

export default function NotFound() {
  return (
    <main className="bg-white">
      {/* HERO 404 — mesmo visual das outras páginas */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600" />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-20 lg:py-24">
          {/* Texto */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-300" />
              Erro 404
            </span>
            <h1 className="mt-3 text-[32px] font-extrabold leading-tight md:text-5xl">
              Página não encontrada
              <span className="block text-brand-300">Mas a gente te ajuda a continuar</span>
            </h1>
            <p className="mt-4 max-w-2xl text-white/90 md:text-lg">
              A página que você tentou acessar não existe ou foi movida.
              Você pode voltar para a Home, falar com nossa equipe ou seguir por um dos atalhos abaixo.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-full bg-brand-300 px-5 py-3 font-semibold text-brand-900 shadow-lg transition hover:bg-brand-200"
              >
                ← Voltar para a Home
              </Link>
              <Link
                href="/agendamento"
                className="rounded-full border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Agendar uma visita
              </Link>
              <Link
                href="/contato"
                className="rounded-full border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Fale conosco
              </Link>
            </div>
          </div>

          {/* Lado direito vazio (mantém respiro e simetria do hero) */}
          <div aria-hidden className="hidden md:block" />
        </div>

        {/* Onda branca padrão */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
          <svg
            viewBox="0 0 1440 140"
            className="h-[90px] w-full md:h-[110px] lg:h-[130px]"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M0,80 C320,140 920,10 1440,90 L1440,140 L0,140 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* LINKS ÚTEIS */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl md:text-2xl font-bold text-brand-700 uppercase">
            Links úteis
          </h2>

          {/* régua com 3 pontos para manter padrão visual */}
          <div className="relative mt-6">
            <div className="h-[3px] w-full rounded-full bg-brand-400" />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 grid grid-cols-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={`dot-404-${i}`}
                  className="justify-self-center h-5 w-5 rounded-full bg-brand-400 ring-8 ring-brand-400/25"
                />
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <Link
              href="/ensino/educacao-infantil"
              className="group block rounded-3xl bg-brand-700/90 text-white shadow-lg ring-1 ring-white/10 transition hover:bg-brand-700"
            >
              <div className="rounded-3xl rounded-b-none bg-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M12 3l9 6-9 6-9-6 9-6Z" />
                    <path d="M3 10.5V18l9 6 9-6v-7.5" />
                  </svg>
                  <h3 className="text-base md:text-lg font-semibold">Educação Infantil</h3>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4">
                <p className="text-white/90 leading-relaxed">
                  Aprender brincando em ambiente acolhedor e estimulante.
                </p>
              </div>
            </Link>

            <Link
              href="/ensino/ensino-fundamental"
              className="group block rounded-3xl bg-brand-700/90 text-white shadow-lg ring-1 ring-white/10 transition hover:bg-brand-700"
            >
              <div className="rounded-3xl rounded-b-none bg-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M4 19h16M4 8h16M8 3h8M8 13h8" />
                  </svg>
                  <h3 className="text-base md:text-lg font-semibold">Ensino Fundamental</h3>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4">
                <p className="text-white/90 leading-relaxed">
                  Competências essenciais, leitura, escrita e matemática.
                </p>
              </div>
            </Link>

            <Link
              href="/ensino/ensino-medio"
              className="group block rounded-3xl bg-brand-700/90 text-white shadow-lg ring-1 ring-white/10 transition hover:bg-brand-700"
            >
              <div className="rounded-3xl rounded-b-none bg-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M3 21v-8l9-5 9 5v8" />
                    <path d="M9 22v-6h6v6" />
                  </svg>
                  <h3 className="text-base md:text-lg font-semibold">Ensino Médio</h3>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4">
                <p className="text-white/90 leading-relaxed">
                  Preparação para vestibulares e para a vida acadêmica.
                </p>
              </div>
            </Link>
          </div>

          {/* Segunda linha de atalhos (opcional) */}
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <Link
              href="/diferenciais/sistema-coc"
              className="group block rounded-3xl bg-brand-600/95 text-white shadow-lg ring-1 ring-brand-800/10 transition hover:bg-brand-600"
            >
              <div className="rounded-3xl rounded-b-none bg-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M4 6h16v12H4Z" />
                    <path d="M8 10h8M8 14h5" />
                  </svg>
                  <h3 className="text-base md:text-lg font-semibold">Sistema COC</h3>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4">
                <p className="text-white/95 leading-relaxed">
                  Material didático e avaliações integradas de alta performance.
                </p>
              </div>
            </Link>

            <Link
              href="/diferenciais/genio-das-financas"
              className="group block rounded-3xl bg-brand-600/95 text-white shadow-lg ring-1 ring-brand-800/10 transition hover:bg-brand-600"
            >
              <div className="rounded-3xl rounded-b-none bg-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M3 10h18M3 14h18" />
                    <path d="M12 6v12" />
                  </svg>
                  <h3 className="text-base md:text-lg font-semibold">Gênio das Finanças</h3>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4">
                <p className="text-white/95 leading-relaxed">
                  Projetos práticos de planejamento e consumo consciente.
                </p>
              </div>
            </Link>

            <Link
              href="/contato"
              className="group block rounded-3xl bg-brand-600/95 text-white shadow-lg ring-1 ring-brand-800/10 transition hover:bg-brand-600"
            >
              <div className="rounded-3xl rounded-b-none bg-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M4 4h16v16H4Z" />
                    <path d="M8 9h8M8 13h5" />
                  </svg>
                  <h3 className="text-base md:text-lg font-semibold">Fale conosco</h3>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4">
                <p className="text-white/95 leading-relaxed">
                  Nossa equipe está pronta para ajudar.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Botão flutuante */}
      <BackToTop />
    </main>
  );
}
