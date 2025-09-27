// app/diferenciais/genio-das-financas/page.tsx
import Link from "next/link";
import type { CSSProperties } from "react";
import ObjectAnimation from "./ObjectAnimation";
import BackToTop from "../../components/BackToTop"; // ⬅️ botão flutuante

export const metadata = {
  title: "Gênio das Finanças • Diferenciais",
  description:
    "Programa de educação financeira para estudantes — projetos práticos, trilhas por faixa etária e integração com a comunidade escolar.",
};

export default function GenioFinancasPage() {
  const redVars: CSSProperties = {
    ["--kid-floor" as any]: "-8px",
    ["--kid-raise" as any]: "-12px",
    ["--text-shift" as any]: "8px",
  };

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden bg-black">
        <img
          src="/genio/hero.webp"
          alt="Gênio das Finanças — Educação Financeira"
          className="w-full h-auto select-none"
          loading="eager"
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[70px] w-full md:h-[90px]"
            preserveAspectRatio="none"
          >
            <path d="M0,60 C260,120 840,5 1440,75 L1440,120 L0,120 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ===================== INTRO ===================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
          <div className="grid items-start gap-10 md:grid-cols-2">
            {/* Esquerda */}
            <div>
              <h1 className="text-[32px] leading-tight md:text-[40px] lg:text-[48px] font-extrabold text-[#217a32]">
                Educação <span className="text-[#1F7A3F]">Financeira</span> para
                <br /> uma vida mais <br /> consciente e <br /> saudável!
              </h1>

              <div className="mt-6 flex h-2 w-56 overflow-hidden rounded-full">
                <span className="flex-1 bg-[#4849A6]" />
                <span className="w-16 bg-[#F1592A]" />
                <span className="w-20 bg-[#F6BD60]" />
              </div>
            </div>

            {/* Direita */}
            <div>
              <h2 className="text-[20px] md:text-[24px] lg:text-[26px] font-extrabold leading-snug text-[#F6A01A]">
                Você sabia que + de 50% dos brasileiros não
                possuem conhecimentos financeiros básicos, e
                70% dos estudantes não alcançam um nível
                intermediário de proficiência em finanças?
              </h2>
              <p className="mt-5 text-[16px] md:text-[17px] leading-8 text-[#1b2b42]/90">
                Estes dados, do levantamento conduzido pela Organização para a
                Cooperação e Desenvolvimento Econômico (OCDE), em 2022, são
                alguns que comprovam como a nossa relação com a educação financeira
                é complexa e precisa ser transformada. Com o Gênio das Finanças,
                ajudamos a mudar o comportamento com o dinheiro rumo a uma vida
                mais consciente e saudável.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========== FAIXA VERMELHA (estatística) — MANTIDA =========== */}
      <section
        className="relative bg-[#E24635] text-white isolate overflow-visible"
        style={redVars}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0" aria-hidden="true">
          <svg
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[80px] w-full"
            preserveAspectRatio="none"
          >
            <path d="M0,40 C400,100 1040,0 1440,40 L1440,0 L0,0 Z" fill="#ffffff" />
          </svg>
        </div>

        {/* Menina encostada */}
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="mx-auto max-w-6xl px-2">
            <img
              src="/genio/kid.webp"
              alt=""
              className="pointer-events-none select-none block w-auto h-[300px] md:h-[300px] lg:h-[450px]
                         translate-y-[1px] md:translate-y-[1.5px] lg:translate-y-[0.5px]"
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>

        {/* Texto */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-10 pb-20 md:pt-14 md:pb-24">
          {/* Mobile: empurra o conteúdo para a direita; Desktop: mantém ml-[52%] como estava */}
          <div
            className="pl-[46%] md:pl-0 md:ml-[52%]"
            style={{ transform: "translateY(var(--text-shift))" }}
          >
            <p className="text-[30px] md:text-[36px] lg:text-[42px] font-extrabold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,.12)]">
              + de 1/3 das famílias brasileiras <br /> estão inadimplentes.
            </p>
            <p className="mt-3 text-white/90">(Serasa, 2023)</p>
          </div>
        </div>
      </section>

      {/* ======== TRANSFORMAÇÃO & COMO MUDAR ======== */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-extrabold leading-tight text-[28px] md:text-[36px] lg:text-[44px] text-[#A3CF63]">
                Se essa transformação <br className="hidden md:block" />
                não ocorrer, dados <br className="hidden md:block" />
                como este, do Serasa <br className="hidden md:block" />
                (2023), serão ainda mais <br className="hidden md:block" />
                preocupantes no futuro.
              </h2>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="text-[#1F7A3F] font-extrabold tracking-tight text-[24px] md:text-[28px] lg:text-[30px] leading-snug">
                  E como mudar essa realidade?
                </h3>
                <p className="mt-3 text-[#1b2b42] font-medium text-[17px] md:text-[18px] lg:text-[19px] leading-8">
                  Acesso à educação financeira, sugestão do próprio levantamento da OCDE.
                  O documento indica que oferecer essa oportunidade de aprendizado assegura
                  que os jovens possam reconhecer a diferença entre necessidade e desejo
                  de adquirir/consumir algo e tomar decisões financeiras responsáveis e saudáveis.
                </p>
              </div>

              <div>
                <h4 className="text-[#1F7A3F] font-extrabold tracking-tight text-[22px] md:text-[24px] lg:text-[26px] leading-snug">
                  Bons hábitos financeiros podem transformar vidas!
                </h4>
                <p className="mt-3 text-[#1b2b42] font-medium text-[17px] md:text-[18px] lg:text-[19px] leading-8">
                  Estudantes financeiramente saudáveis crescem economicamente e contribuem
                  para o desenvolvimento sustentável do Brasil.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Faixa multicolorida */}
        <div className="h-10 w-full">
          <div className="flex h-full w-full">
            <span className="w-[34%] bg-[#A3CF63]" />
            <span className="w-[20%] bg-[#F6A01A]" />
            <span className="flex-1 bg-[#E24635]" />
            <span className="w-[18%] bg-[#4849A6]" />
          </div>
        </div>
      </section>

      {/* ===================== QUEM SOMOS + ANIMAÇÃO ===================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
          {/* coluna fixa para a animação + coluna do texto */}
          <div className="grid items-center gap-12 md:grid-cols-[minmax(0,640px)_1fr]">
            {/* Esquerda: animação */}
            <div className="flex justify-center md:justify-start">
              <ObjectAnimation initial={0} />
            </div>

            {/* Direita: texto */}
            <div>
              <h2 className="text-[#2F9E44] text-[34px] md:text-[40px] lg:text-[46px] font-extrabold leading-tight">
                Quem somos
              </h2>
              <p className="mt-6 text-[17px] md:text-[18px] leading-8 text-[#1b2b42]">
                O Gênio das Finanças é o programa de educação financeira
                comportamental da Arco Educação. Oferecemos um programa completo
                e flexível para alunos do Ensino Fundamental e Médio de escolas por
                todo o Brasil.
              </p>
              <p className="mt-5 text-[17px] md:text-[18px] leading-8 text-[#1b2b42]">
                Nossa missão é fomentar autonomia e sustentabilidade, estimulando os
                estudantes a refletirem sobre os fatores emocionais que levam às decisões
                financeiras. Acreditamos que melhores decisões financeiras tornam possível
                um planejamento financeiro que fomente o empreendedorismo e projetos de vida
                mais conscientes e saudáveis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== VOLTAR ===================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-8">
          <Link
            href="/#diferenciais"
            className="rounded-full border border-[#1F7A3F]/20 bg-[#EBF7EE] px-5 py-3 font-semibold text-[#1F7A3F] transition hover:bg-[#DFF1E4]"
          >
            ← Voltar para Diferenciais
          </Link>
        </div>
      </section>

      {/* ✅ Botão flutuante “Voltar ao topo” — verde do Gênio */}
      <BackToTop
        variant="brand"
        threshold={650}
        className="!bg-[#1F7A3F] hover:!bg-[#239049] !text-white !ring-white/40"
      />
    </>
  );
}
