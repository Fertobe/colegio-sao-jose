// app/page.tsx
import type { CSSProperties } from "react";
import Head from "next/head";
import Link from "next/link";
import NewsCarousel from "./components/NewsCarousel";
import ConquistasCarousel from "./components/ConquistasCarousel";
import BackToTop from "./components/BackToTop";
import styles from "./page.module.css";
import { getLatestNewsForCarousel } from "@/lib/news";
import BrandIcon from "./components/icons/BrandIcon";

export default function Home() {
  // === HERO DESKTOP (como estava) ==========================================
  const heroPngsDesktop = [
    { src: "/hero/aluno-01.webp", alt: "Estudante 1 sorrindo com cadernos" },
    { src: "/hero/aluna-02.webp", alt: "Estudante 2 com mochila" },
    { src: "/hero/aluno-03.webp", alt: "Estudante 3 animado" },
  ];

  // === HERO MOBILE (novas imagens; você coloca o degradê no PNG) ===========
  // /public/hero/mobile/aluno-01.webp, aluna-02.webp, aluno-03.webp
  const heroPngsMobile = [
    { src: "/hero/mobile/aluno-01.webp", alt: "Estudante 1 (mobile)" },
    { src: "/hero/mobile/aluna-02.webp", alt: "Estudante 2 (mobile)" },
    { src: "/hero/mobile/aluno-03.webp", alt: "Estudante 3 (mobile)" }, // 3ª mais alta/central
  ];

  // 🔧 CONTROLE INDIVIDUAL
  type HeroTune = { hPct: number; scale: number; x: number; y: number };

  // Desktop (sem mudanças visuais)
  const HERO_TUNE_DESKTOP: { img1: HeroTune; img2: HeroTune; img3: HeroTune } = {
    img1: { hPct: 100, scale: 1.25, x: 0, y: 64 },
    img2: { hPct: 100, scale: 1.25, x: 0, y: 66 },
    img3: { hPct: 100, scale: 1.75, x: -90, y: 220 },
  };

  // Mobile (3ª sobe/centraliza mais)
  const HERO_TUNE_MOBILE: { img1: HeroTune; img2: HeroTune; img3: HeroTune } = {
    img1: { hPct: 100, scale: 1.35, x: 0, y: 70 },
    img2: { hPct: 100, scale: 1.35, x: 0, y: 70 },
    img3: { hPct: 100, scale: 1.65, x: 10, y: 100 },
  };

  // helper para o transform
  const heroStyle = (t: HeroTune): CSSProperties => ({
    height: `${t.hPct}%`,
    transform: `translateX(calc(-50% + ${t.x}px)) translateY(${t.y}px) scale(${t.scale})`,
    transformOrigin: "bottom center",
    willChange: "transform",
  });

  // 🔗 pega notícias do blog; sem fallback estático
  let news: { img: string; title: string; href?: string }[] = [];
  try {
    const fromBlog = getLatestNewsForCarousel(12);
    if (Array.isArray(fromBlog)) news = fromBlog;
  } catch {
    // se falhar, fica vazio e a seção não renderiza
  }

  // ✅ Conquistas com IMAGENS LOCAIS em /public/conquistas/01.webp … 12.webp
  const conquistas = Array.from({ length: 12 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return { src: `/conquistas/${n}.webp`, alt: `Conquista ${n}` };
  });

  return (
    <>
      {/* HEAD: preconnect + preload do 1º hero (mobile/desktop) */}
      <Head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        {/* Preload do primeiro hero para mobile */}
        <link
          rel="preload"
          as="image"
          href="/hero/mobile/aluno-01.webp"
          media="(max-width: 767px)"
          /* tamanhos aproximados do container: 320px */
          imageSrcSet="/hero/mobile/aluno-01.webp 1x"
          imageSizes="(max-width: 767px) 320px"
        />
        {/* Preload do primeiro hero para desktop/tablet */}
        <link
          rel="preload"
          as="image"
          href="/hero/aluno-01.webp"
          media="(min-width: 768px)"
          imageSrcSet="/hero/aluno-01.webp 1x"
          imageSizes="(min-width: 768px) 420px"
        />
      </Head>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20 lg:py-24">
          {/* ESQUERDA: PNGs */}
          <div className="relative mx-auto aspect-square w-[320px] md:w-[420px] lg:w-[520px]">
            {/* MOBILE — outras imagens + outro tuning */}
            <div className="md:hidden">
              {heroPngsMobile.map((img, i) => {
                const tune =
                  i === 0 ? HERO_TUNE_MOBILE.img1 : i === 1 ? HERO_TUNE_MOBILE.img2 : HERO_TUNE_MOBILE.img3;
                return (
                  <img
                    key={`m-${img.src}`}
                    src={img.src}
                    alt={img.alt}
                    className={`${styles.heroFade} ${styles.heroCtl} ${
                      i === 0 ? styles.hero1 : i === 1 ? styles.hero2 : styles.hero3
                    } absolute bottom-0 left-1/2 w-auto max-w-full select-none object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,.35)]`}
                    style={{ ...heroStyle(tune), animationDelay: `${i * 4}s` }}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "low"}
                    decoding="async"
                    width={800}
                    height={800}
                    draggable={false}
                  />
                );
              })}
            </div>

            {/* DESKTOP/TABLET — mantém o tuning original */}
            <div className="hidden md:block">
              {heroPngsDesktop.map((img, i) => {
                const tune =
                  i === 0 ? HERO_TUNE_DESKTOP.img1 : i === 1 ? HERO_TUNE_DESKTOP.img2 : HERO_TUNE_DESKTOP.img3;
                return (
                  <img
                    key={`d-${img.src}`}
                    src={img.src}
                    alt={img.alt}
                    className={`${styles.heroFade} ${styles.heroCtl} ${
                      i === 0 ? styles.hero1 : i === 1 ? styles.hero2 : styles.hero3
                    } absolute bottom-0 left-1/2 w-auto max-w-full select-none object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,.35)]`}
                    style={{ ...heroStyle(tune), animationDelay: `${i * 4}s` }}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "low"}
                    decoding="async"
                    width={1000}
                    height={1000}
                    draggable={false}
                  />
                );
              })}
            </div>
          </div>

          {/* DIREITA: texto */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-300" />
              Colégio São José
            </span>
            <h1 className="mt-3 text-[28px] font-extrabold leading-tight md:text-5xl">
              No Colégio São José,<span className="text-brand-300">tradição e inovação</span> andam
              juntas para formar estudantes preparados para o
              <span className="text-brand-300"> Mundo Real</span>
            </h1>
            <p className="mt-4 text-base text-white/90 md:text-lg">
              Do Infantil ao Ensino Médio, com projetos, tecnologia e desenvolvimento socioemocional.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#segmentos"
                className="rounded-full bg-brand-300 px-5 py-3 font-semibold text-brand-900 shadow-lg transition hover:bg-brand-200"
              >
                Conheça os segmentos
              </a>
              <Link
                href="/agendamento"
                className="rounded-full border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Agendar uma visita
              </Link>
            </div>
          </div>
        </div>

        {/* Onda branca de transição — por cima das fotos */}
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

      {/* SEGMENTOS */}
      <section
        id="segmentos"
        style={{ contentVisibility: "auto" as any, containIntrinsicSize: "1000px" as any }}
      >
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl md:text-2xl font-bold text-brand-700 uppercase">NOSSOS SEGMENTOS</h2>
          <div className="relative mt-6">
            <div className="h-[3px] w-full rounded-full bg-brand-400" />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 grid grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={`seg-dot-${i}`}
                  className="justify-self-center h-5 w-5 rounded-full bg-brand-400 ring-8 ring-brand-400/25"
                />
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <a
              href="/ensino/educacao-infantil"
              className="group block rounded-3xl bg-brand-700/90 text-white shadow-lg ring-1 ring-white/10 transition hover:bg-brand-700"
            >
              <div className="rounded-3xl rounded-b-none bg-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
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
            </a>

            <a
              href="/ensino/ensino-fundamental"
              className="group block rounded-3xl bg-brand-700/90 text-white shadow-lg ring-1 ring-white/10 transition hover:bg-brand-700"
            >
              <div className="rounded-3xl rounded-b-none bg-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 19h16M4 8h16M8 3h8M8 13h8" />
                  </svg>
                  <h3 className="text-base md:text-lg font-semibold">Ensino Fundamental</h3>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4">
                <p className="text-white/90 leading-relaxed">
                  Desenvolvimento de competências, leitura, escrita e matemática.
                </p>
              </div>
            </a>

            <a
              href="/ensino/ensino-medio"
              className="group block rounded-3xl bg-brand-700/90 text-white shadow-lg ring-1 ring-white/10 transition hover:bg-brand-700"
            >
              <div className="rounded-3xl rounded-b-none bg-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
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
            </a>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section
        id="diferenciais"
        className="bg-white"
        style={{ contentVisibility: "auto" as any, containIntrinsicSize: "1000px" as any }}
      >
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl md:text-2xl font-bold text-brand-700 uppercase">NOSSOS DIFERENCIAIS</h2>
          {/* linha */}
          <div className="relative mt-6">
            <div className="h-[3px] w-full rounded-full bg-brand-400" />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 grid grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={`dif-dot-${i}`}
                  className="justify-self-center h-5 w-5 rounded-full bg-brand-400 ring-8 ring-brand-400/25"
                />
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-4">
            <Link
              href="/diferenciais/socioemocional"
              className="group block rounded-3xl bg-brand-600/95 text-white shadow-lg ring-1 ring-brand-800/10 transition hover:bg-brand-600"
            >
              <div className="rounded-3xl rounded-b-none bg-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 20s-7-4.35-7-10a7 7 0 0 1 14 0c0 5.65-7 10-7 10Z" />
                  </svg>
                  <h3 className="text-base md:text-lg font-semibold">Educação Socioemocional</h3>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4">
                <p className="text-white/95 leading-relaxed">
                  Desenvolvimento de empatia, autonomia e habilidades de convivência.
                </p>
              </div>
            </Link>

            <a
              href="/diferenciais/sistema-coc"
              className="group block rounded-3xl bg-brand-600/95 text-white shadow-lg ring-1 ring-brand-800/10 transition hover:bg-brand-600"
            >
              <div className="rounded-3xl rounded-b-none bg-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
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
            </a>

            <a
              href="/diferenciais/genio-das-financas"
              className="group block rounded-3xl bg-brand-600/95 text-white shadow-lg ring-1 ring-brand-800/10 transition hover:bg-brand-600"
            >
              <div className="rounded-3xl rounded-b-none bg-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 10h18M3 14h18" />
                    <path d="M12 6v12" />
                  </svg>
                  <h3 className="text-base md:text-lg font-semibold">Gênio das Finanças</h3>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4">
                <p className="text-white/95 leading-relaxed">
                  Projetos práticos de planejamento, consumo consciente e investimentos.
                </p>
              </div>
            </a>

            <a
              href="/diferenciais/maralto"
              className="group block rounded-3xl bg-brand-600/95 text-white shadow-lg ring-1 ring-brand-800/10 transition hover:bg-brand-600"
            >
              <div className="rounded-3xl rounded-b-none bg-white/10 px-6 py-4">
                <div className="flex items-center gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                    <path d="M7.8 7.8l2.1 2.1M14.1 14.1l2.1 2.1M7.8 16.2l2.1-2.1M14.1 9.9l2.1-2.1" />
                  </svg>
                  <h3 className="text-base md:text-lg font-semibold">Maralto</h3>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4">
                <p className="text-white/95 leading-relaxed">
                  Promove a cultura do livro e da leitura para estudantes de todas as idades.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ===================== NOTÍCIAS ===================== */}
      {news.length > 0 && (
        <section
          className="relative overflow-hidden bg-gray-200"
          style={{ contentVisibility: "auto" as any, containIntrinsicSize: "900px" as any }}
        >
          {/* Onda superior */}
          <div className="pointer-events-none absolute inset-x-0 top-0">
            <svg
              viewBox="0 0 1440 120"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[75px] w-full md:h-[90px]"
              preserveAspectRatio="none"
            >
              <path d="M0,0 L0,60 C260,120 840,5 1440,75 L1440,0 Z" fill="#ffffff" />
            </svg>
          </div>

          {/* Container relativo para o botão absoluto */}
          <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-24">
            <div className="translate-y-6 md:translate-y-8 lg:translate-y-10">
              <h2 className="text-xl md:text-2xl font-bold text-brand-700 uppercase">
                NOTÍCIAS SOBRE O COLÉGIO
              </h2>

              {/* Carrossel — MOBILE 1 por vez, altura menor p/ setas */}
              <div className="mt-6 md:hidden">
                {/* @ts-expect-error: heightClass será tipado no componente na próxima etapa */}
                <NewsCarousel items={news} perPage={1} heightClass="h-[240px]" />
              </div>

              {/* Carrossel — DESKTOP/TABLET 3 por vez */}
              <div className="mt-6 hidden md:block">
                <NewsCarousel items={news} perPage={3} />
              </div>
            </div>

            {/* Botão isolado (fica no lugar) */}
            <a
              href="/noticias"
              className="pointer-events-auto absolute left-1/2 bottom-20 -translate-x-1/2 rounded-full border border-brand-300/50 bg-white px-5 py-3 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-brand-50"
            >
              Ver todas as notícias
            </a>
          </div>

          {/* Onda inferior */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0">
            <svg
              viewBox="0 0 1440 120"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[75px] w-full md:h-[90px]"
              preserveAspectRatio="none"
            >
              <path d="M0,60 C260,120 840,5 1440,75 L1440,120 L0,120 Z" fill="#ffffff" />
            </svg>
          </div>
        </section>
      )}

      {/* CONQUISTAS */}
      <section
        className="bg-white"
        style={{ contentVisibility: "auto" as any, containIntrinsicSize: "900px" as any }}
      >
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl md:text-2xl font-bold text-brand-700 uppercase">
            CONHEÇA AS NOSSAS CONQUISTAS
          </h2>
        </div>

        {/* MOBILE — 1 por vez, altura menor */}
        <div className={`mx-auto max-w-6xl px-4 md:hidden ${styles.conquistasHoverSoft}`}>
          {/* @ts-expect-error: heightClass será tipado no componente na próxima etapa */}
          <ConquistasCarousel items={conquistas} perPage={1} heightClass="h-[240px]" />
        </div>

        {/* DESKTOP/TABLET — 3 por vez */}
        <div className={`mx-auto max-w-6xl px-4 hidden md:block ${styles.conquistasHoverSoft}`}>
          <ConquistasCarousel items={conquistas} perPage={3} />
        </div>
      </section>

      {/* ===================== CTA FINAL ===================== */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700"
        style={{ contentVisibility: "auto" as any, containIntrinsicSize: "700px" as any }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0">
          <svg
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[75px] w-full md:h-[90px]"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L0,60 C260,120 840,5 1440,75 L1440,0 Z" fill="#ffffff" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-14 md:pt-20 md:pb-16">
          <div className="relative grid items-center gap-8 rounded-3xl bg-white/10 p-6 backdrop-blur-sm ring-1 ring-white/15 md:grid-cols-2 md:p-8">
            <div className="text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-300" />
                Atendimento humano e rápido
              </span>
              <h3 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
                Ficou alguma dúvida? <br /> Fale com a nossa central.
              </h3>
              <p className="mt-3 text-white/90">
                Nossa equipe está pronta para ajudar com matrículas, visitas e informações gerais.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/5542998276516?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-300 px-5 py-3 font-semibold text-brand-900 shadow-lg transition hover:bg-brand-200"
                >
                  <BrandIcon name="whatsapp" color="currentColor" className="h-5 w-5" />
                  WhatsApp agora
                </a>
                <a
                  href="/contato"
                  className="rounded-full border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
                >
                  Outras formas de contato
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/80">
                <span className="rounded-full bg-white/10 px-3 py-1">Tempo médio de resposta &lt; 1h</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Horário comercial</span>
                <span className="rounded-full bg-white/10 px-3 py-1">Equipe especializada</span>
              </div>
            </div>

            <div className="relative">
              <div className="mx-auto w-full h-[260px] md:h-[320px] rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="/cta/colegio.jpg"
                  alt="Fachada do Colégio São José"
                  className="h-full w-full object-cover select-none"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  width={1200}
                  height={800}
                  draggable={false}
                />
              </div>

              <svg
                className="pointer-events-none absolute -left-3 -top-3 h-20 w-20 opacity-60"
                viewBox="0 0 100 100"
                fill="none"
              >
                <circle cx="50" cy="50" r="40" stroke="#14D3E0" strokeDasharray="4 10" strokeWidth="4" />
              </svg>
              <svg
                className="pointer-events-none absolute -right-4 bottom-2 h-16 w-16 opacity-60"
                viewBox="0 0 100 100"
                fill="none"
              >
                <circle cx="50" cy="50" r="28" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="6" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ⬇️ Botão flutuante “Voltar ao topo” */}
      <BackToTop />
    </>
  );
}
