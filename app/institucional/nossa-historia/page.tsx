// app/institucional/nossa-historia/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import BackToTop from "../../components/BackToTop";

// ==================== CONFIG ====================
const HERO_IMG = "/historia/Hero.webp"; // única imagem no herói

// Linha do tempo (conteúdo do PDF resumido em marcos)
const TIMELINE: Array<{ year: string; title: string; text: string }> = [
  {
    year: "1896",
    title: "Chegada de imigrantes ucranianos",
    text:
      "O crescimento das colônias no PR e SC amplia a necessidade de assistência espiritual, cultural e educacional.",
  },
  {
    year: "1931",
    title: "Noviciado Basiliano",
    text:
      "Fundado o Noviciado Basiliano, surge a necessidade de preparar candidatos ao noviciado.",
  },
  {
    year: "1935",
    title: "Fundação do Seminário São José",
    text:
      "Em 04 de junho de 1935, é criado o Seminário São José pelo Pe. Basiliano Josafat Roga, OSBM. Começa com Língua Portuguesa, Ucraniano, Geografia e Matemática, ampliando gradualmente os estudos.",
  },
  {
    year: "1981",
    title: "Reorganização escolar",
    text:
      "Com a implantação da Lei nº 5.692/71, o Seminário passa por reestruturações e se organiza para atendimento escolar ampliado.",
  },
  {
    year: "1986",
    title: "Autorização do 2º Grau (Ensino Médio)",
    text:
      "Autorizado a administrar o curso de 2º Grau pela Resolução nº 4.675/86 – DOE 31/10/1986.",
  },
  {
    year: "1996–2002",
    title: "Ensino Médio mantido e ajustes no Fundamental",
    text:
      "Mantém o Ensino Médio e solicita cassação gradativa do Fundamental (com prorrogação em 2000). O Fundamental é encerrado ao fim de 2002, permanecendo o Ensino Médio.",
  },
  {
    year: "2006–2007",
    title: "Reimplantação do Fundamental",
    text:
      "Retorno gradativo do Ensino Fundamental: 5ª e 6ª séries (2006) e 7ª e 8ª séries (2007).",
  },
  {
    year: "2011",
    title: "Educação Infantil",
    text:
      "Autorizado a ministrar Educação Infantil pela Resolução 3897/11 – DOE 25/10/2011.",
  },
  {
    year: "2024",
    title: "Nova mantenedora",
    text:
      "A Centro Educacional Evoluir Ltda. assume a direção. O Colégio atende Educação Infantil, Ensino Fundamental e Médio.",
  },
  {
    year: "Hoje",
    title: "Tradição que se renova",
    text:
      "Com tecnologia, projetos inovadores e proposta integral, seguimos formando pessoas para a vida e para o mundo.",
  },
];

export const metadata: Metadata = {
  title: "Nossa História | Colégio São José",
  description:
    "Conheça a trajetória do Colégio São José — origem, marcos e evolução ao longo das décadas.",
};

export default function NossaHistoriaPage() {
  return (
    <main className="bg-white">
      {/* ===== HERO (padrão igual Matrículas/Contato/Agendamento) ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600" />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20 lg:py-24">
          {/* ESQUERDA: texto */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-300" />
              Institucional
            </span>
            <h1 className="mt-3 text-[32px] font-extrabold leading-tight md:text-5xl">
              Nossa <span className="text-brand-300">História</span>
            </h1>
            <p className="mt-4 text-base text-white/90 md:text-lg">
              Uma caminhada construída com afeto, excelência acadêmica 
              e um compromisso permanente com a formação integral.
            </p>
            <div className="mt-6">
              <Link
                href="/institucional/filosofia"
                className="inline-flex rounded-full bg-brand-300 px-5 py-3 font-semibold text-brand-900 shadow-lg transition hover:bg-brand-200"
              >
                Conheça nossa filosofia
              </Link>
            </div>
          </div>

          {/* DIREITA: única imagem ancorada na onda */}
          <div className="relative mx-auto aspect-square w-[320px] md:w-[420px] lg:w-[520px]">
            <img
              src={HERO_IMG}
              alt="Registro histórico do Colégio São José"
              className="
                absolute left-1/2 -translate-x-1/2
                /* ▼ MOBILE: só aqui alteramos para descer e aumentar um pouco */
                bottom-[-62px] h-[130%]
                /* ▼ DESKTOP/TABLET: mantidos como estavam */
                md:bottom-[-10px] md:h-[150%]
                lg:bottom-[-92px] lg:h-[120%]
                w-auto max-w-none select-none object-contain origin-bottom
                drop-shadow-[0_25px_40px_rgba(0,0,0,.35)]
              "
              loading="eager"
              decoding="async"
              width={1000}
              height={1000}
              draggable={false}
            />
          </div>
        </div>

        {/* Onda branca padrão (mesma altura das outras páginas) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
          <svg viewBox="0 0 1440 140" className="h-[90px] w-full md:h-[110px] lg:h-[130px]" preserveAspectRatio="none">
            <path d="M0,80 C320,140 920,10 1440,90 L1440,140 L0,140 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* ===== INTRO: “Raízes que se renovam” ===== */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-16">
          <div>
            <h2 className="text-xl font-bold text-brand-700">Raízes que se renovam</h2>
            <p className="mt-3 leading-relaxed text-gray-700">
              Desde a fundação, o Colégio São José acredita numa educação acolhedora,
              exigente e transformadora. Ao longo das décadas, evoluímos nossos espaços,
              metodologias e projetos, sem abrir mão dos valores que nos constituem:
              respeito, solidariedade, excelência, justiça e esperança.
            </p>
            <p className="mt-3 leading-relaxed text-gray-700">
              Hoje, vivemos a tradição no presente, com tecnologia, práticas inovadoras e
              uma proposta pedagógica que dá sentido ao conhecimento, formando pessoas
              para a vida e para o mundo.
            </p>
          </div>

          {/* imagem lateral (foto histórica) */}
          <div className="relative">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg md:rounded-3xl">
              <img
                src="/historia/capasala.webp"
                alt="Registro histórico do Colégio São José"
                className="h-full w-full select-none object-cover"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
            {/* ornamentos leves */}
            <svg className="pointer-events-none absolute -left-3 -top-3 h-20 w-20 opacity-60" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="#14D3E0" strokeDasharray="4 10" strokeWidth="4" />
            </svg>
            <svg className="pointer-events-none absolute -right-4 bottom-2 h-16 w-16 opacity-60" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="28" stroke="#0ea5b7" strokeOpacity="0.35" strokeWidth="6" />
            </svg>
          </div>
        </div>
      </section>

      {/* ===== LINHA DO TEMPO ===== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
          <h3 className="text-2xl font-bold text-brand-700 uppercase">Linha do tempo</h3>

          {/* régua com 1 círculo central (padrão do site) */}
          <div className="relative mt-6 mb-8">
            <div className="h-[3px] w-full rounded-full bg-brand-400" />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
              <span className="mx-auto block h-5 w-5 rounded-full bg-brand-400 ring-8 ring-brand-400/25" />
            </div>
          </div>

          {/* timeline vertical */}
          <ol className="relative border-l border-brand-200 pl-6">
            {TIMELINE.map((t, i) => (
              <li key={`${t.year}-${i}`} className="mb-8 ml-2">
                <div className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full bg-brand-400 ring-4 ring-brand-400/25" />
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold uppercase tracking-wide text-brand-700">
                    {t.year}
                  </span>
                  <h4 className="text-lg font-semibold text-brand-900">{t.title}</h4>
                  <p className="text-brand-800/85">{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== MARCOS QUE NOS ORGULHAM ===== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <h3 className="text-2xl font-bold text-brand-700 uppercase">Marcos que nos orgulham</h3>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Tradição e Inovação",
                text: "Décadas de história aliadas a projetos atuais, conectados às demandas do século XXI.",
              },
              {
                title: "Formação Integral",
                text: "Acadêmico forte com socioemocional, cidadania e espiritualidade.",
              },
              {
                title: "Resultados",
                text: "Aprovações, olimpíadas, protagonismo estudantil e reconhecimento na comunidade.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-3xl bg-brand-700/90 p-6 text-white shadow-lg ring-1 ring-white/10 transition-colors hover:bg-brand-600"
              >
                <h4 className="mb-2 text-lg font-semibold">{c.title}</h4>
                <p className="text-white/95 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Botão flutuante */}
      <BackToTop />
    </main>
  );
}
