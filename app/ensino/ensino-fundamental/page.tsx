// app/ensino/ensino-fundamental/page.tsx
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import BackToTop from "../../components/BackToTop";
import BrandIcon from "../../components/icons/BrandIcon"; // ✅ ícone oficial

/** SEO da página (não altera layout) */
export const metadata: Metadata = {
  title: "Ensino Fundamental — Colégio São José",
  description:
    "Transição cuidadosa, propostas interdisciplinares, recursos digitais e acompanhamento contínuo da aprendizagem no Ensino Fundamental.",
  metadataBase: new URL("https://colegio.artferro.site"),
  alternates: { canonical: "/ensino/ensino-fundamental" },
  openGraph: {
    type: "article",
    siteName: "Colégio São José",
    title: "Ensino Fundamental — Colégio São José",
    description:
      "Base forte para os próximos desafios: práticas interdisciplinares, tecnologia e avaliação contínua.",
    url: "https://colegio.artferro.site/ensino/ensino-fundamental",
    images: ["/ensino/fundamental/hero.webp"],
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  twitter: { card: "summary_large_image" },
};

export default function EnsinoFundamentalPage() {
  // DESKTOP/TABLET — imagem original
  const heroImgDesktop = {
    src: "/ensino/fundamental/hero.webp",
    alt: "Estudante do Ensino Fundamental",
  };

  // MOBILE — versão recortada/transparente
  const heroImgMobile = {
    src: "/ensino/fundamental/mobile/hero.webp",
    alt: "Estudante do Ensino Fundamental (mobile)",
  };

  // ===== Tuning do HERO =====
  const heroStyleDesktop: CSSProperties = {
    transform: "translateX(-50%) translateY(48px) scale(0.85)",
    transformOrigin: "bottom center",
    willChange: "transform",
  };
  const heroStyleMobile: CSSProperties = {
    transform: "translateX(-50%) translateY(66px) scale(0.92)",
    transformOrigin: "bottom center",
    willChange: "transform",
  };

  // ✅ Breadcrumb JSON-LD (Início → Ensino Fundamental)
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://colegio.artferro.site/" },
      { "@type": "ListItem", position: 2, name: "Ensino Fundamental", item: "https://colegio.artferro.site/ensino/ensino-fundamental" },
    ],
  };

  return (
    <>
      {/* JSON-LD de breadcrumb (invisível; ajuda SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20 lg:py-24">
          {/* IMAGEM — duas versões para não mexer no desktop */}
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
                sizes="(max-width: 767px) 320px, 0px"
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
                sizes="(min-width: 1024px) 520px, (min-width: 768px) 420px, 0px"
              />
            </div>
          </div>

          {/* TEXTO DO HERO */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-300" />
              ENSINO • ENSINO FUNDAMENTAL
            </span>

            <h1 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
              Base forte para os próximos desafios
            </h1>

            <p className="mt-4 text-base text-white/90 md:text-lg">
              Transição cuidadosa entre a Educação Infantil e o Fundamental, com propostas
              interdisciplinares, recursos digitais e acompanhamento contínuo da aprendizagem.
            </p>

            <div className="mt-6">
              <a
                href="https://wa.me/5542998276516?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20a%20coordena%C3%A7%C3%A3o%20sobre%20o%20Ensino%20Fundamental."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-300 px-5 py-3 font-semibold text-brand-900 shadow-lg transition hover:bg-brand-200"
              >
                <BrandIcon name="whatsapp" color="currentColor" className="h-[18px] w-[18px]" title="WhatsApp" />
                Fale com a coordenação
              </a>
            </div>
          </div>
        </div>

        {/* Onda branca inferior (decorativa) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30" aria-hidden="true" role="presentation">
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

      {/* BLOCO 1 — Visão geral do Fundamental */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-brand-700 uppercase">Ensino Fundamental</h2>
          <p className="mt-4 max-w-3xl text-brand-900/80 leading-relaxed">
            No São José, o Ensino Fundamental promove uma transição cuidadosa a partir da Educação
            Infantil, fortalecendo competências com práticas interdisciplinares, integração de
            recursos digitais e acompanhamento contínuo da aprendizagem.
          </p>
        </div>
      </section>

      {/* BLOCO 2 — Práticas pedagógicas interdisciplinares */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-brand-700 uppercase">
            Práticas pedagógicas interdisciplinares
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Correlação entre componentes curriculares",
                desc:
                  "Integração entre áreas do conhecimento para desenvolver pensamento crítico e interdisciplinar.",
              },
              {
                title: "Proposta de projeto interdisciplinar",
                desc:
                  "Cada livro traz um projeto que conecta objetivos e habilidades a situações reais.",
              },
              {
                title: "Organizador visual ao final de cada capítulo",
                desc:
                  "Mapas/fluxogramas facilitam revisão e estabelecem conexões entre conceitos.",
              },
            ].map((c) => (
              <div key={c.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-900/5">
                <h3 className="text-lg font-semibold text-brand-800">{c.title}</h3>
                <p className="mt-2 text-brand-900/80 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO 3 — Estrutura da coleção */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-brand-700 uppercase">Estrutura da coleção</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Acompanhamento da aprendizagem",
              desc:
                "4 avaliações nacionais por ano (do 2º ano do EF à 2ª série do EM), com relatórios e comparativos.",
            },
            {
              title: "Avaliações",
              desc:
                "Plataforma inteligente para criação de provas e relatórios de desempenho entre escolas COC.",
            },
            {
              title: "Coleção Multimodal",
              desc:
                "Cadernos digitais personalizáveis, conteúdo multimídia interativo e planos/roteiros ao professor.",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-3xl bg-gray-50 p-6 shadow-sm ring-1 ring-brand-900/5">
              <h3 className="text-base font-semibold text-brand-800">{c.title}</h3>
              <p className="mt-2 text-brand-900/80 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* BLOCO 4 — Para as famílias */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-900/5">
              <h3 className="text-xl font-bold text-brand-700">Para as famílias</h3>
              <ul className="mt-3 grid list-disc gap-1 pl-5 text-brand-900/80">
                <li>Transição leve entre Educação Infantil e Anos Iniciais.</li>
                <li>Acompanhamento contínuo da aprendizagem.</li>
                <li>Desenvolvimento socioemocional (colaboração, empatia, convivência saudável).</li>
                <li>Metodologia que respeita e valoriza a diversidade.</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-900/5">
              <h3 className="text-xl font-bold text-brand-700">Preparação para os próximos passos</h3>
              <p className="mt-3 text-brand-900/80 leading-relaxed">
                Engajamento no aprendizado e formação de base sólida para a transição aos anos
                finais e, posteriormente, ao Ensino Médio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Botão flutuante “Voltar ao topo” */}
      <BackToTop />
    </>
  );
}
