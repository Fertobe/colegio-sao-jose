// app/institucional/filosofia/page.tsx
import Link from "next/link";
import type { CSSProperties } from "react";
import BackToTop from "../../components/BackToTop";

export const metadata = {
  title: "Nossa Filosofia | Colégio São José",
  description:
    "Conheça a missão, visão e valores do Colégio São José — princípios que orientam nossa prática pedagógica.",
};

export default function NossaFilosofiaPage() {
  // ✅ UMA ÚNICA IMAGEM (PNG com transparência)
  // se quiser um arquivo específico para mobile, coloque em /filosofia/mobile/hero-01.png
  const HERO_DESKTOP = { src: "/filosofia/hero-01.webp", alt: "Estudante — Nossa Filosofia" };
  const HERO_MOBILE  = { src: "/filosofia/hero-01.webp", alt: "Estudante — Nossa Filosofia (mobile)" };

  // 🎛️ CONTROLES FINOS (pode mudar estes valores sem tocar no restante)
  // *-bottom: quanto “cola” na onda (valores negativos descem)
  // *-ty: empurra para cima/baixo sem mexer na base (px)
  // *-scale: escala do PNG
  const HERO_VARS: CSSProperties = {
    // Mobile
    ["--hero-m-bottom" as any]: "-10px",
    ["--hero-m-ty" as any]: "12px",
    ["--hero-m-scale" as any]: "0.98",
    // Desktop/Tablet
    ["--hero-d-bottom" as any]: "-30px",
    ["--hero-d-ty" as any]: "0px",
    ["--hero-d-scale" as any]: "0.9",
  };

  return (
    <>
      {/* HERO (texto à esquerda, personagem à direita) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600" />

        {/* mesma altura/respiração das outras páginas */}
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20 lg:py-24">
          {/* ESQUERDA: Texto */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-300" />
              Institucional
            </span>
            <h1 className="mt-3 text-[32px] font-extrabold leading-tight md:text-5xl">
              Nossa <span className="text-brand-300">Filosofia</span>
            </h1>
            <p className="mt-4 text-base text-white/90 md:text-lg">
              Educação integral, acolhedora e de excelência — é assim que
              formamos pessoas para a vida, para a cidadania e para o futuro.
            </p>

            <div className="mt-6">
              <Link
                href="/institucional/nossa-historia"
                className="inline-flex rounded-full bg-brand-300 px-5 py-3 font-semibold text-brand-900 shadow-lg transition hover:bg-brand-200"
              >
                Conheça nossa história
              </Link>
            </div>
          </div>

          {/* DIREITA: UMA ÚNICA IMAGEM com tuning separado p/ mobile e desktop */}
          <div className="relative mx-auto aspect-square w-[320px] md:w-[420px] lg:w-[520px]" style={HERO_VARS}>
            {/* Mobile (até md) */}
            <img
              src={HERO_MOBILE.src}
              alt={HERO_MOBILE.alt}
              className="
                md:hidden
                absolute left-1/2
                h-[118%] w-auto max-w-none select-none object-contain origin-bottom
                drop-shadow-[0_25px_40px_rgba(0,0,0,.35)]
              "
              style={{
                bottom: "var(--hero-m-bottom)",
                transform: "translateX(-50%) translateY(var(--hero-m-ty)) scale(var(--hero-m-scale))",
              }}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              draggable={false}
            />

            {/* Desktop/Tablet (md+) */}
            <img
              src={HERO_DESKTOP.src}
              alt={HERO_DESKTOP.alt}
              className="
                hidden md:block
                absolute left-1/2
                h-[122%] lg:h-[130%] w-auto max-w-none select-none object-contain origin-bottom
                drop-shadow-[0_25px_40px_rgba(0,0,0,.35)]
              "
              style={{
                bottom: "var(--hero-d-bottom)",
                transform: "translateX(-50%) translateY(var(--hero-d-ty)) scale(var(--hero-d-scale))",
              }}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              draggable={false}
            />
          </div>
        </div>

        {/* Onda branca padrão (inalterada) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
          <svg
            viewBox="0 0 1440 140"
            className="h-[90px] w-full md:h-[110px] lg:h-[130px]"
            preserveAspectRatio="none"
          >
            <path d="M0,80 C320,140 920,10 1440,90 L1440,140 L0,140 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* TÍTULO DA SEÇÃO */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pt-10 md:pt-14">
          <h2 className="text-2xl font-bold text-brand-700 uppercase">
            Missão, Visão e Valores
          </h2>
          <div className="relative mt-6">
            <div className="h-[3px] w-full rounded-full bg-brand-400" />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 grid grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={`filo-dot-${i}`}
                  className="justify-self-center h-5 w-5 rounded-full bg-brand-400 ring-8 ring-brand-400/25"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSÃO / VISÃO / VALORES */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Missão */}
            <div className="rounded-3xl bg-brand-700/90 p-6 text-white shadow-lg ring-1 ring-white/10 transition-colors hover:bg-brand-600 focus-within:bg-brand-600">
              <div className="mb-3 flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20s-7-4.35-7-10a7 7 0 0 1 14 0c0 5.65-7 10-7 10Z" />
                </svg>
                <h3 className="text-lg font-semibold">Missão</h3>
              </div>
              <p className="text-white/95 leading-relaxed">
                Promover uma educação de qualidade que valoriza cada pessoa em sua singularidade,
                incentivando o desenvolvimento acadêmico, humano e social em um ambiente de
                acolhimento, respeito e inclusão.
              </p>
            </div>

            {/* Visão */}
            <div className="rounded-3xl bg-brand-700/90 p-6 text-white shadow-lg ring-1 ring-white/10 transition-colors hover:bg-brand-600 focus-within:bg-brand-600">
              <div className="mb-3 flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <h3 className="text-lg font-semibold">Visão</h3>
              </div>
              <p className="text-white/95 leading-relaxed">
                Ser referência em educação integral e inclusiva, formando cidadãos éticos, solidários
                e preparados para transformar a sociedade por meio do conhecimento, da empatia e da
                responsabilidade.
              </p>
            </div>

            {/* Valores */}
            <div className="rounded-3xl bg-brand-700/90 p-6 text-white shadow-lg ring-1 ring-white/10 transition-colors hover:bg-brand-600 focus-within:bg-brand-600">
              <div className="mb-3 flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <h3 className="text-lg font-semibold">Valores</h3>
              </div>
              <ul className="list-disc space-y-1 pl-5 text-white/95">
                <li><strong>Amor e respeito:</strong> reconhecer e valorizar cada indivíduo em sua dignidade.</li>
                <li><strong>Inclusão e acolhimento:</strong> garantir que todos tenham espaço, voz e pertencimento.</li>
                <li><strong>Solidariedade:</strong> cultivar a cooperação e o cuidado com o próximo.</li>
                <li><strong>Justiça e integridade:</strong> agir com ética e transparência em todas as relações.</li>
                <li><strong>Esperança e perseverança:</strong> incentivar a confiança no futuro e a superação de desafios.</li>
                <li><strong>Excelência educacional:</strong> buscar continuamente qualidade no ensino e no desenvolvimento integral do estudante.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCO TEXTO + IMAGEM */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold text-brand-700">Como vivemos nossa filosofia</h3>
            <p className="mt-3 leading-relaxed text-gray-700">
              Projetos, avaliações formativas e experiências mão na massa fazem parte do nosso
              cotidiano. Incentivamos a curiosidade, o trabalho em equipe e a construção de
              conhecimentos significativos.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-brand-700">
              <span className="rounded-full bg-brand-100 px-3 py-1">Metodologias ativas</span>
              <span className="rounded-full bg-brand-100 px-3 py-1">Tecnologia educacional</span>
              <span className="rounded-full bg-brand-100 px-3 py-1">Socioemocional</span>
            </div>
          </div>

          {/* Recorte perfeito */}
          <div className="relative">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg md:rounded-3xl">
              <img
                src="/cta/colegio.webp"
                alt="Fachada do Colégio São José"
                className="h-full w-full select-none object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
            <svg className="pointer-events-none absolute -left-3 -top-3 h-20 w-20 opacity-60" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="#14D3E0" strokeDasharray="4 10" strokeWidth="4" />
            </svg>
            <svg className="pointer-events-none absolute -right-4 bottom-2 h-16 w-16 opacity-60" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="28" stroke="#0ea5b7" strokeOpacity="0.35" strokeWidth="6" />
            </svg>
          </div>
        </div>
      </section>

      {/* Botão flutuante “Voltar ao topo” */}
      <BackToTop />
    </>
  );
}
