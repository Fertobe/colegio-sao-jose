// app/ensino/ensino-medio/page.tsx
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import BackToTop from "../../components/BackToTop";
import BrandIcon from "../../components/icons/BrandIcon"; // ✅ usa o ícone oficial

/** SEO da página (não altera layout) */
export const metadata: Metadata = {
  title: "Ensino Médio — Colégio São José",
  description:
    "Itinerários formativos, eletivas, projeto de vida e simulados — proposta alinhada ao Novo Ensino Médio, com trilhas e acompanhamento contínuo.",
  metadataBase: new URL("https://colegio.artferro.site"),
  alternates: { canonical: "/ensino/ensino-medio" },
  openGraph: {
    type: "article",
    siteName: "Colégio São José",
    title: "Ensino Médio — Colégio São José",
    description:
      "Base forte para o futuro: trilhas, eletivas, projeto de vida e simulados alinhados ao Novo Ensino Médio.",
    url: "https://colegio.artferro.site/ensino/ensino-medio",
    images: ["/ensino/medio/hero.webp"],
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  twitter: { card: "summary_large_image" },
};

export default function EnsinoMedioPage() {
  // DESKTOP/TABLET — mantém a arte e o tuning originais
  const heroImgDesktop = {
    src: "/ensino/medio/hero.webp",
    alt: "Estudante do Ensino Médio",
  };

  // MOBILE — coloque a PNG recortada (transparente) aqui
  const heroImgMobile = {
    src: "/ensino/medio/mobile/hero.webp",
    alt: "Estudante do Ensino Médio (mobile)",
  };

  // ===== Tuning do HERO =====
  // Desktop (inalterado)
  const heroStyleDesktop: CSSProperties = {
    transform: "translateX(-50%) translateY(58px) scale(0.8)",
    transformOrigin: "bottom center",
    willChange: "transform",
  };

  // Mobile (ajuste fino para enquadrar sem cortar)
  const heroStyleMobile: CSSProperties = {
    transform: "translateX(-50%) translateY(64px) scale(0.92)",
    transformOrigin: "bottom center",
    willChange: "transform",
  };

  return (
    <>
      {/* HERO (mesmo tamanho e estrutura) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20 lg:py-24">
          {/* IMAGEM — duas versões para não alterar o desktop */}
          <div className="relative mx-auto aspect-square w-[320px] md:w-[420px] lg:w-[520px]">
            {/* MOBILE */}
            <div className="md:hidden">
              <img
                src={heroImgMobile.src}
                alt={heroImgMobile.alt}
                className="absolute bottom-0 left-1/2 w-auto max-w-full select-none object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,.35)]"
                style={heroStyleMobile}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                draggable={false}
                width={900}
                height={900}
              />
            </div>

            {/* DESKTOP/TABLET */}
            <div className="hidden md:block">
              <img
                src={heroImgDesktop.src}
                alt={heroImgDesktop.alt}
                className="absolute bottom-0 left-1/2 w-auto max-w-full select-none object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,.35)]"
                style={heroStyleDesktop}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                draggable={false}
                width={1200}
                height={1200}
              />
            </div>
          </div>

          {/* Texto do HERO */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-300" />
              ENSINO • ENSINO MÉDIO
            </span>

            <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
              Base forte para o futuro, com{" "}
              <span className="text-brand-300">itinerários formativos,</span>{" "}
              <span className="text-brand-300">eletivas,</span>{" "}
              <span className="text-brand-300">projeto de vida e</span>{" "}
              <span className="text-brand-300">simulados.</span>
            </h1>

            <p className="mt-4 text-base text-white/90 md:text-lg">
              Proposta alinhada às diretrizes do Novo Ensino Médio, com trilhas de aprendizagem,
              acompanhamento contínuo e integração de conteúdos físicos e digitais.
            </p>

            <div className="mt-6">
              <a
                href="https://wa.me/5542998276516?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20o%20Ensino%20M%C3%A9dio."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-300 px-5 py-3 font-semibold text-brand-900 shadow-lg transition hover:bg-brand-200"
              >
                {/* ✅ trocado o emoji pelo ícone oficial */}
                <BrandIcon
                  name="whatsapp"
                  color="currentColor"
                  className="h-[18px] w-[18px]"
                  title="WhatsApp"
                />
                Fale com a coordenação
              </a>
            </div>
          </div>
        </div>

        {/* Onda branca inferior */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
          <svg
            viewBox="0 0 1440 140"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[90px] w-full md:h-[110px] lg:h-[130px]"
            preserveAspectRatio="none"
          >
            <path d="M0,80 C320,140 920,10 1440,90 L1440,140 L0,140 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* BLOCO: Visão geral do Novo EM */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-brand-700 uppercase">Novo Ensino Médio</h2>
          <p className="mt-4 max-w-3xl text-brand-900/80 leading-relaxed">
            No São José, cada etapa prepara o estudante para os próximos desafios acadêmicos.
            Na 1ª e 2ª séries, trabalhamos conteúdos que fortalecem a base e desenvolvem
            competências. Na 3ª série, a revisão intensiva potencializa o desempenho no Enem e
            vestibulares, com acompanhamento próximo de metas e resultados.
          </p>
        </div>
      </section>

      {/* BLOCO: Como os alunos se preparam para o futuro */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-brand-700 uppercase">
            De que forma os alunos se preparam para o futuro?
          </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Formação Geral Básica (FGB)",
                desc:
                  "Conteúdos essenciais com exercícios de diferentes bancas e foco em resultados.",
              },
              {
                title: "Itinerários formativos",
                desc:
                  "Trilhas que promovem contextualização e aprofundamento em áreas de interesse.",
              },
              {
                title: "Eletivas (100% digitais)",
                desc:
                  "Mais de 40 opções, aplicação presencial ou remota, PBL e flexibilidade de currículo.",
              },
              {
                title: "Projeto de Vida",
                desc:
                  "Autoconhecimento, protagonismo e escolhas conscientes para objetivos pessoais.",
              },
              {
                title: "Simulados & Avaliações",
                desc:
                  "Ciclos anuais com relatórios completos e comparativos para acompanhamento contínuo.",
              },
              {
                title: "Materiais e trilhas",
                desc:
                  "Tarefa • Reforço • Aprofundamento • Lider! — caminhos personalizados de estudo.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-900/5"
              >
                <h3 className="text-lg font-semibold text-brand-800">{c.title}</h3>
                <p className="mt-2 text-brand-900/80 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO: Avaliações e simulados */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-brand-700 uppercase">
            Avaliações e Simulados do COC
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Simulado Enem",
                desc: "Preparatório alinhado à principal porta de entrada para a universidade.",
              },
              {
                title: "Simulados Regionais",
                desc:
                  "Exploração de diferentes possibilidades de prova ao longo do ano letivo.",
              },
              {
                title: "Simulado COC",
                desc:
                  "Verificação do aprendizado e acompanhamento longitudinal.",
              },
              {
                title: "Avaliação Nacional",
                desc:
                  "Análise anual com dados comparativos para a jornada do aluno.",
              },
            ].map((i) => (
              <div key={i.title} className="rounded-3xl bg-gray-50 p-6 shadow-sm ring-1 ring-brand-900/5">
                <h3 className="text-base font-semibold text-brand-800">{i.title}</h3>
                <p className="mt-2 text-brand-900/80 leading-relaxed">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO: Pré-vestibular e Terceirão */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-900/5">
              <h3 className="text-xl font-bold text-brand-700">Pré-vestibular</h3>
              <p className="mt-3 text-brand-900/80 leading-relaxed">
                As coleções PV500 e PV1000 potencializam a preparação para os vestibulares por
                meio de conteúdos flexíveis e hiperatualizados, diálogo com a realidade dos
                estudantes e foco em resultados.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-900/5">
              <h3 className="text-xl font-bold text-brand-700">Novo Terceirão COC</h3>
              <p className="mt-3 text-brand-900/80 leading-relaxed">
                Material extensivo revisional para ingresso nas melhores universidades.
              </p>
              <ul className="mt-3 grid list-disc gap-1 pl-5 text-brand-900/80">
                <li>Foco em aprovação</li>
                <li>Jornada de aprendizagem guiada</li>
                <li>Abordagem multimodal</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Botão flutuante “Voltar ao topo” */}
      <BackToTop />
    </>
  );
}
