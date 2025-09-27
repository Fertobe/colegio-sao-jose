// app/ensino/educacao-infantil/page.tsx
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import BackToTop from "../../components/BackToTop";
import BrandIcon from "../../components/icons/BrandIcon"; // ✅ ícone oficial do WhatsApp

/** SEO da página (não altera layout) */
export const metadata: Metadata = {
  title: "Educação Infantil — Colégio São José",
  description:
    "Solução completa do Berçário ao Infantil 5 com propostas mão na massa, jogos, trilhas digitais e avaliação contínua.",
  metadataBase: new URL("https://colegio.artferro.site"),
  alternates: { canonical: "/ensino/educacao-infantil" },
  openGraph: {
    type: "article",
    siteName: "Colégio São José",
    title: "Educação Infantil — Colégio São José",
    description:
      "Um começo lúdico, afetivo e intencional: do Berçário ao Infantil 5, com projetos, tecnologia e avaliação contínua.",
    url: "https://colegio.artferro.site/ensino/educacao-infantil",
    images: ["/ensino/infantil/hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
  },
  twitter: { card: "summary_large_image" },
};

export default function EducacaoInfantilPage() {
  // Desktop: imagem original (sem mudanças)
  const heroImgDesktop = {
    src: "/ensino/infantil/hero.webp",
    alt: "Estudante da Educação Infantil",
  };

  // Mobile: coloque a versão com transparência em /public/ensino/infantil/mobile/hero.webp
  const heroImgMobile = {
    src: "/ensino/infantil/mobile/hero.webp",
    alt: "Estudante da Educação Infantil (mobile)",
  };

  // ===== Tuning do HERO =====
  // Desktop (igual estava)
  const heroStyleDesktop: CSSProperties = {
    transform: "translateX(-50%) translateY(68px) scale(0.78)",
    transformOrigin: "bottom center",
    willChange: "transform",
  };

  // Mobile (pode ajustar depois, a imagem tem fundo transparente)
  // → levemente mais baixa e um pouco maior para dar presença
  const heroStyleMobile: CSSProperties = {
    transform: "translateX(-50%) translateY(64px) scale(0.86)",
    transformOrigin: "bottom center",
    willChange: "transform",
  };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20 lg:py-24">
          {/* IMAGEM — duas versões para controlar o mobile sem alterar o desktop */}
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

            {/* DESKTOP/TABLET (inalterado) */}
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
              ENSINO • EDUCAÇÃO INFANTIL
            </span>

            <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
              Um começo lúdico, afetivo e <span className="text-brand-300">intencional</span>
            </h1>

            <p className="mt-4 text-base text-white/90 md:text-lg">
              Solução completa do Berçário ao Infantil 5 com propostas mão na massa, jogos, trilhas
              digitais e avaliação contínua.
            </p>

            <div className="mt-6">
              <a
                href="https://wa.me/5542998276516?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20a%20Educa%C3%A7%C3%A3o%20Infantil."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-300 px-5 py-3 font-semibold text-brand-900 shadow-lg transition hover:bg-brand-200"
              >
                {/* ✅ troca do emoji pelo ícone oficial */}
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

      {/* CONTEÚDO PRINCIPAL */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-3xl font-extrabold text-brand-700">
            De que forma os pequenos aprendem?
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Ludicidade com intencionalidade pedagógica",
                desc:
                  "Aprendizagem divertida e significativa, com propostas que estimulam o desenvolvimento cognitivo, motor e afetivo.",
              },
              {
                title: "Material flexível e lúdico",
                desc:
                  "Conteúdos com ícones, ilustrações e imagens; atividades de múltiplas inteligências e propostas adaptadas a cada faixa etária.",
              },
              {
                title: "Fichas avaliativas e autoavaliação",
                desc:
                  "Acompanhamento constante do desenvolvimento, favorecendo a observação do processo e o protagonismo infantil.",
              },
              {
                title: "Aprendizagem adaptativa (Infantil 4 e 5)",
                desc:
                  "Jogos interativos focados em habilidades essenciais, trilhas digitais, relatórios e capacitação para educadores.",
              },
              {
                title: "Amigos do COC & Plugue!",
                desc:
                  "Personagens e recursos que estimulam a imaginação, a linguagem e a socialização nas primeiras etapas da vida escolar.",
              },
              {
                title: "Para as famílias",
                desc:
                  "Rotina de ensino mais leve, desenvolvimento integral e participação próxima no acompanhamento das crianças.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-3xl bg-gray-50 p-7 shadow-sm ring-1 ring-brand-900/5"
              >
                <h3 className="text-lg md:text-xl font-semibold text-brand-800">{c.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-brand-900/80">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Botão flutuante */}
      <BackToTop />
    </>
  );
}
