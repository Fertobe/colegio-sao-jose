// app/diferenciais/coc/page.tsx
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import BackToTop from "../../components/BackToTop";
import Reveal from "../../components/Reveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sistema COC | Colégio São José",
  description:
    "Tradição, resultados e inovação: soluções completas para potencializar o ensino e a aprendizagem com o Sistema COC.",
};

// HERO (1920x700)
const HERO_IMG = "/coc/hero.webp";

// Ornamento e foto
const DECO_LEFT = "/coc/ornament-1.svg";
const FOTO_DIREITA = "/coc/plataforma-coc.webp";

// Ícones dos pilares
const PILAR_1 = "/coc/pilares/pilar1.webp";
const PILAR_2 = "/coc/pilares/pilar2.webp";
const PILAR_3 = "/coc/pilares/pilar3.webp";

// Fundo do bloco “Nossos pilares”
const PILARES_BG = "/coc/pilares/bg.webp";

// “Nossas soluções educacionais”
const SOLUCOES_IMG = "/coc/solucoes.webp";

// DNA Aprovador
const DNA_LEFT = "/coc/dna/left-c.webp";
const DNA_RING = "/coc/dna/right-ring.png"; // confirme extensão/caixa no /public
const DNA_STUDENTS = "/coc/dna/students.webp";
const SHOW_DNA_BUTTON = false;

// Vars do primeiro bloco (ornamento)
const DECO_VARS: CSSProperties = {
  ["--coc-deco-left" as any]: "-460px",
  ["--coc-deco-top" as any]: "40px",
  ["--coc-deco-size" as any]: "420px",
};

/** Vars do “DNA Aprovador” (desktop/tablet) */
const DNA_VARS: CSSProperties = {
  ["--dna-c-h" as any]: "360px",
  ["--dna-c-ml" as any]: "-380px",
  ["--dna-c-scale" as any]: "2.5",

  ["--dna-c-x" as any]: "0px",
  ["--dna-c-y" as any]: "0px",

  ["--dna-ring-h" as any]: "860px",
  ["--dna-students-h" as any]: "580px",
  ["--dna-students-right" as any]: "0%",
  ["--dna-y" as any]: "0px",
};

/** Reserva pintura fora da tela (melhora performance sem afetar visual) */
const LAZY_BLOCK_STYLE: CSSProperties = {
  contentVisibility: "auto",
  containIntrinsicSize: "720px",
};

export default function COCPage() {
  return (
    <main className="bg-white">
      {/* ===================== HERO ===================== */}
      <section className="relative w-full overflow-hidden">
        <div className="relative aspect-[1920/700] w-full">
          <img
            src={HERO_IMG}
            alt="Tradição, resultados e inovação — Sistema COC"
            className="h-full w-full object-cover"
            loading="eager"
            draggable={false}
          />
        </div>
      </section>

      {/* ===================== TEXTO + IMAGEM ===================== */}
      <section className="relative bg-white">
        <div
          className="relative mx-auto max-w-6xl px-4 py-12 md:py-16"
          style={DECO_VARS}
        >
          <img
            src={DECO_LEFT}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-[var(--coc-deco-left)] top-[var(--coc-deco-top)] hidden select-none opacity-95 md:block h-[var(--coc-deco-size)] w-auto"
            draggable={false}
          />

          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="text-center md:text-left">
              <h2 className="text-[34px] md:text-[44px] lg:text-[52px] leading-tight text-[#1E7E33] font-extrabold tracking-tight">
                Impulsionando escolas
                <br />
                rumo a uma educação
                <br />
                contemporânea de
                <br />
                excelência
              </h2>

              <p className="mt-6 text-[16px] md:text-[17px] leading-8 text-[#305B3B]">
                Com escolas parceiras em todo o Brasil, somos uma plataforma de
                educação com décadas de experiência aliada à inovação —
                oferecendo apoio completo às escolas em toda a trajetória
                escolar, mantendo o mesmo compromisso: excelência no ensino,
                formação integral dos estudantes e os melhores resultados.
              </p>
            </div>

            <div className="relative mx-auto aspect-square w-[360px] md:w-[520px] lg:w-[640px]">
              <img
                src={FOTO_DIREITA}
                alt="Apoio pedagógico e tecnologia em sala"
                className="absolute inset-0 m-auto h-full w-full object-contain"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>

          {/* --------------------- MÉTRICAS --------------------- */}
          <div className="mt-14 grid gap-10 text-center md:grid-cols-3">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="leading-none font-black text-[#41C541] text-[72px] md:text-[92px] lg:text-[108px]">
                  24
                </div>
                <div className="leading-none text-[#41C541] font-bold text-[28px] md:text-[32px] lg:text-[34px]">
                  estados
                </div>
              </div>
              <p className="mt-2 text-[#305B3B]">
                brasileiros com presença COC.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="leading-none font-black text-[#41C541] text-[72px] md:text-[92px] lg:text-[108px]">
                93%
              </div>
              <p className="mt-2 text-[#305B3B]">
                de satisfação das escolas parceiras.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="leading-none font-black text-[#41C541] text-[72px] md:text-[92px] lg:text-[108px]">
                  +60
                </div>
                <div className="leading-none text-[#41C541] font-bold text-[28px] md:text-[32px] lg:text-[34px]">
                  anos
                </div>
              </div>
              <p className="mt-2 text-[#305B3B]">unindo tradição e inovação.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== NOSSOS PILARES ===================== */}
      <section className="relative md:overflow-hidden" style={LAZY_BLOCK_STYLE}>
        <div className="relative w-full md:aspect-[1920/850] md:min-h-[620px] bg-[#0FA958] md:bg-transparent">
          {/* Fundo desktop */}
          <img
            src={PILARES_BG}
            alt=""
            aria-hidden
            className="absolute inset-0 hidden h-full w-full select-none object-cover md:block"
            draggable={false}
          />

          {/* Conteúdo */}
          <div className="px-4 py-12 text-white md:absolute md:inset-0 md:flex md:items-center md:px-4 md:py-0">
            <div className="mx-auto w-full max-w-6xl">
              <h3 className="text-center font-extrabold tracking-wide text-3xl md:text-5xl lg:text-6xl drop-shadow-[0_6px_16px_rgba(0,0,0,.25)]">
                Nossos pilares
              </h3>

              <div className="mt-8 md:mt-14 grid gap-12 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto h-[160px] w-[160px] md:h-[220px] md:w-[220px] lg:h-[240px] lg:w-[240px]">
                    <img
                      src={PILAR_1}
                      alt="Tradição feita no presente"
                      className="h-full w-full select-none object-contain"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  <h4 className="mt-5 text-[22px] md:text-[24px] lg:text-[26px] font-extrabold leading-snug">
                    Tradição feita
                    <br />
                    no presente
                  </h4>
                  <p className="mt-3 mx-auto max-w-[360px] text-base md:text-[17px] leading-relaxed text-white/90">
                    Pioneirismo e referência em educação há 60 anos.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto h-[160px] w-[160px] md:h-[220px] md:w-[220px] lg:h-[240px] lg:w-[240px]">
                    <img
                      src={PILAR_2}
                      alt="Resultados ao longo de toda a jornada"
                      className="h-full w-full select-none object-contain"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  <h4 className="mt-5 text-[22px] md:text-[24px] lg:text-[26px] font-extrabold leading-snug">
                    Resultados ao longo de
                    <br />
                    toda a jornada
                  </h4>
                  <p className="mt-3 mx-auto max-w-[380px] text-base md:text-[17px] leading-relaxed text-white/90">
                    Formação integral, conteúdo forte e apoio completo à escola.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto h-[160px] w-[160px] md:h-[220px] md:w-[220px] lg:h-[240px] lg:w-[240px]">
                    <img
                      src={PILAR_3}
                      alt="Inovação propulsora da aprendizagem"
                      className="h-full w-full select-none object-contain"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                  <h4 className="mt-5 text-[22px] md:text-[24px] lg:text-[26px] font-extrabold leading-snug">
                    Inovação propulsora da
                    <br />
                    aprendizagem
                  </h4>
                  <p className="mt-3 mx-auto max-w-[380px] text-base md:text-[17px] leading-relaxed text-white/90">
                    Produtos e práticas pedagógicas em constante evolução.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== NOSSAS SOLUÇÕES EDUCACIONAIS ===================== */}
      <section className="relative bg-white" style={LAZY_BLOCK_STYLE}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-8 md:py-16 md:grid-cols-2">
          <div className="relative mx-auto aspect-square w-[360px] md:w-[440px] lg:w-[520px]">
            <img
              src={SOLUCOES_IMG}
              alt="Estudante utilizando materiais do Sistema COC"
              className="absolute inset-0 h-full w-full object-contain"
              loading="lazy"
              draggable={false}
            />
          </div>

          <div>
            <h3 className="text-[32px] md:text-[40px] font-extrabold leading-tight text-[#106F2D]">
              Nossas soluções educacionais
            </h3>
            <p className="mt-4 text-[16px] md:text-[17px] leading-8 text-[#305B3B]">
              Todos os nossos materiais estão 100% alinhados com a Base Nacional
              Comum Curricular (BNCC), com foco na interdisciplinaridade e na
              contextualização para entregar um conteúdo forte e proporcionar
              autonomia a estudantes e professores, possibilitando uma alta
              performance durante toda a jornada escolar.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== DNA APROVADOR ===================== */}
      <section className="relative bg-white" style={LAZY_BLOCK_STYLE}>
        {/* mobile: menos padding para tirar o “vazio” */}
        <div
          className="relative isolate mx-auto max-w-7xl px-6 py-8 md:py-36"
          style={DNA_VARS}
        >
          {/* “C” sobreposto no mobile (ajustado) */}
          <div className="md:hidden pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 z-10">
            <img
              src={DNA_LEFT}
              alt=""
              className="block h-48 w-auto select-none opacity-50"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </div>

          <div className="relative z-20 grid items-center gap-8 md:grid-cols-12">
            {/* “C” (desktop/tablet) */}
            <div className="relative hidden md:col-span-2 md:block">
              <img
                src={DNA_LEFT}
                alt=""
                className="block h-[var(--dna-c-h)] w-auto object-contain select-none"
                style={{
                  marginLeft: "var(--dna-c-ml)",
                  transform:
                    "translate(var(--dna-c-x), var(--dna-c-y)) scale(var(--dna-c-scale))",
                  transformOrigin: "left center",
                }}
                draggable={false}
              />
            </div>

            {/* Texto */}
            <div className="col-span-12 md:col-span-4 text-left">
              <h3 className="text-[#106F2D] text-[32px] md:text-[40px] font-extrabold leading-tight">
                DNA Aprovador
              </h3>
              <p className="mt-4 text-[16px] md:text-[17px] leading-8 text-[#305B3B]">
                O COC é referência em resultados e aprovações nos principais
                vestibulares do país! Isso porque oferecemos, além de conteúdo
                forte, vivências leves e abordagens que vão além dos livros.
                Assim, o conhecimento é construído de forma integral, despertando
                a curiosidade e o interesse e impulsionando os estudantes rumo a
                grandes resultados.
              </p>
              {SHOW_DNA_BUTTON && (
                <button
                  type="button"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0FA958] px-6 py-3 font-semibold text-white shadow-sm transition hover:brightness-110"
                >
                  Saiba mais
                </button>
              )}
            </div>

            {/* Anel + estudantes */}
            <div className="relative col-span-12 md:col-span-6 min-h-[200px] md:min-h-[320px]">
              <Reveal
                from="right"
                duration={700}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-0"
              >
                <img
                  src={DNA_RING}
                  alt=""
                  aria-hidden
                  className="h-[var(--dna-ring-h)] w-auto object-contain select-none"
                  draggable={false}
                />
              </Reveal>

              <Reveal
                from="right"
                duration={700}
                delay={120}
                className="absolute right-[var(--dna-students-right)] top-[calc(50%+var(--dna-y))] -translate-y-1/2 z-10"
              >
                <img
                  src={DNA_STUDENTS}
                  alt="Estudantes do Sistema COC"
                  className="h-[var(--dna-students-h)] w-auto object-contain"
                  loading="lazy"
                  draggable={false}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== VOLTAR PARA DIFERENCIAIS ===================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <Link
            href="/#diferenciais"
            className="inline-flex items-center gap-2 rounded-full border border-[#106F2D]/20 bg-white px-5 py-3 font-semibold text-[#106F2D] transition hover:bg-[#E9F7EE]"
          >
            ← Voltar para Diferenciais
          </Link>
        </div>
      </section>

      {/* Botão flutuante */}
      <BackToTop
        variant="brand"
        threshold={650}
        className="!bg-[#0FA958] hover:!bg-[#15C26B] !text-white !ring-white/40"
      />
    </main>
  );
}
