// app/diferenciais/maralto/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import BackToTop from "../../components/BackToTop"; // ⬅️ mesmo import da Home (azul por padrão)
import Gallery from "./gallery";

export const metadata: Metadata = {
  title: "Programa de Formação Leitora Maralto • Diferenciais — Colégio São José",
  description:
    "Iniciativa que promove a cultura do livro e da leitura para estudantes da Educação Infantil ao Ensino Médio.",
  metadataBase: new URL("https://colegio.artferro.site"),
  alternates: { canonical: "/diferenciais/maralto" },
  openGraph: {
    type: "article",
    siteName: "Colégio São José",
    title: "Programa de Formação Leitora Maralto • Diferenciais",
    description:
      "Iniciativa que promove a cultura do livro e da leitura para estudantes da Educação Infantil ao Ensino Médio.",
    url: "https://colegio.artferro.site/diferenciais/maralto",
    images: ["/maralto/Hero.webp"],
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  twitter: { card: "summary_large_image" },
};

export default function MaraltoPage() {
  return (
    <>
      {/* Preload leve para suavizar o 1º paint */}
      <link rel="preload" as="image" href="/maralto/Hero.webp" />
      <link rel="preload" as="image" href="/maralto/gal-01.avif" />
      <link rel="preload" as="image" href="/maralto/gal-02.avif" />

      {/* HERO — imagem única ocupando toda a largura */}
      <section
        className="relative overflow-hidden bg-black"
        style={{ contentVisibility: "auto" as any, containIntrinsicSize: "600px" as any }}
      >
        <img
          src="/maralto/Hero.webp"
          alt="Programa de Formação Leitora Maralto"
          className="w-full h-auto select-none"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0" aria-hidden="true">
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

      {/* BLOCO — o que o programa oferece */}
      {/* ⬇️ relative z-20 cria um stacking context acima de elementos absolutos de seções vizinhas */}
      <section
        className="relative z-20 bg-white"
        style={{ contentVisibility: "auto" as any, containIntrinsicSize: "900px" as any }}
      >
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-8 md:grid-cols-3">
            {/* ...cards... */}
            <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-2xl font-semibold">Catálogo premiado</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Títulos com excelente qualidade literária e diversidade de temas e gêneros, com obras
                premiadas (Jabuti, FNLJ, Selo Altamente Recomendável) e selecionadas para eventos
                internacionais do livro.
              </p>
            </div>
            <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-2xl font-semibold">Propostas de leitura</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Materiais de aprofundamento para antes, durante e depois da leitura — elaborados por
                especialistas — que enriquecem a experiência em sala.
              </p>
            </div>
            <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-2xl font-semibold">Consultoria Literária</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Apoio ao corpo pedagógico na curadoria das obras e no desenvolvimento de projetos de
                leitura, potencializando os recursos disponíveis.
              </p>
            </div>
            <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-2xl font-semibold">Portal Maralto</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Conteúdos digitais extras para a comunidade escolar: contações de histórias, guias
                para famílias, cursos on-line, vídeos com autores e muito mais.
              </p>
            </div>
            <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-2xl font-semibold">Formação de professores</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Jornadas literárias, mediação de leitura e uso do livro em sala de aula, com
                certificação e nomes de referência no livro ilustrado brasileiro.
              </p>
            </div>
            <div className="rounded-3xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-2xl font-semibold">Integração com a escola</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Ações conjuntas com famílias e estudantes, feiras, encontros e projetos que
                fortalecem a cultura leitora ao longo do ano letivo.
              </p>
            </div>

            {/* Botão Voltar para Diferenciais */}
            <div className="md:col-span-3">
              {/* ⬇️ reforço local de stacking acima de qualquer overlay da galeria */}
              <div className="mt-10 relative z-30">
                <Link
                  href="/#diferenciais"
                  className="rounded-full border border-teal-600/20 bg-teal-50 px-5 py-3 font-semibold text-teal-800 transition hover:bg-teal-100"
                >
                  ← Voltar para Diferenciais
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section
        className="bg-gray-50"
        style={{ contentVisibility: "auto" as any, containIntrinsicSize: "700px" as any }}
      >
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-teal-800 uppercase">Galeria</h2>
          <div className="mt-6">
            <Gallery
              images={[
                "/maralto/gal-01.avif",
                "/maralto/gal-02.avif",
                "/maralto/gal-03.avif",
                "/maralto/gal-04.avif",
                "/maralto/gal-05.avif",
                "/maralto/gal-06.avif",
              ]}
              /* Desktop: 3 por página (como já estava) */
              perPage={3}
              /* Mobile: 1 por página com setas externas (mesmo padrão da Semana Page) */
              perPageMobile={1}
              showArrows
              arrowsOutside
              /* Alturas responsivas (deixei uma altura para mobile também) */
              heightClass="h-56 md:h-72 lg:h-80"
            />
          </div>
        </div>
      </section>

      {/* Botão flutuante — agora AZUL (padrão) */}
      <BackToTop threshold={650} />
    </>
  );
}
