/* app/diferenciais/socioemocional/page.tsx */
import BackToTop from "../../components/BackToTop";
import Link from "next/link"; // ⬅️ ADICIONADO

export const metadata = {
  title: "Educação Socioemocional · Programa Pleno | Colégio São José",
  description:
    "Conheça o Programa Pleno: competências socioemocionais, metodologias ativas e aprendizagem conectada à realidade dos estudantes.",
};

// imagem única do herói
const HERO_IMG = "/pleno/hero-pack.png";

// pilares
const PILARES = [
  {
    titulo: "Baseado no modelo internacional CASEL",
    texto:
      "Fundamentado no modelo internacional CASEL, referência global em educação socioemocional, o programa promove mudanças profundas e duradouras.",
  },
  {
    titulo: "Aprendizagem Baseada em Projetos",
    texto:
      "Essa é a nossa metodologia central! Com ela, os alunos trabalham em equipe, argumentam, escutam e entendem outros pontos de vista enquanto resolvem problemas reais.",
  },
  {
    titulo: "Abordagem SAFER",
    texto:
      "Pra reforçar ainda mais o aprendizado, essa abordagem irá trabalhar com um ensino sequencial, ativo, focado, explícito e responsivo para toda a escola.",
  },
  {
    titulo: "Impacto em toda comunidade escolar",
    texto:
      "O Pleno vai além da sala de aula! Impactamos estudantes, famílias, professores e escolas com desenvolvimento socioemocional contínuo e sustentável.",
  },
];

// materiais — card (composição completa) + livros
const MATERIAIS = [
  {
    faixa: "Educação Infantil",
    anos: "3 a 5 anos",
    card: "/pleno/logos/criativos.png",
    books: "/pleno/books/Criativos.png",
    altCard: "Materiais da coleção Criativos (logo/placa composta)",
    altBooks: "Livros da coleção Criativos (Educação Infantil)",
  },
  {
    faixa: "Ensino Fundamental Anos Iniciais",
    anos: "1º ao 5º ano",
    card: "/pleno/logos/incriveis.png",
    books: "/pleno/books/Incriveis.png",
    altCard: "Materiais da coleção Incríveis (logo/placa composta)",
    altBooks: "Livros da coleção Incríveis (Anos Iniciais)",
  },
  {
    faixa: "Ensino Fundamental Anos Finais",
    anos: "6º ao 9º ano",
    card: "/pleno/logos/inovadores.png",
    books: "/pleno/books/Inovadores.png",
    altCard: "Materiais da coleção Inovadores (logo/placa composta)",
    altBooks: "Livros da coleção Inovadores (Anos Finais)",
  },
  {
    faixa: "Ensino Médio",
    anos: "1ª à 3ª série",
    card: "/pleno/logos/extraordinarios.png",
    books: "/pleno/books/Extraordinarios.png",
    altCard: "Materiais da coleção Extraordinários (logo/placa composta)",
    altBooks: "Livros da coleção Extraordinários (Ensino Médio)",
  },
];

export default function SocioemocionalPage() {
  return (
    <main className="bg-white">
      {/* ===================== HERO ===================== */}
      <section className="relative overflow-visible">
        {/* fundo em degradê */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#7F3A97] via-[#6C2F8F] to-[#4B2A85]" />

        {/* conteúdo do hero */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 md:py-20 lg:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* imagem única */}
            <div className="relative flex justify-center md:justify-start">
              <img
                src={HERO_IMG}
                alt="Estudante do Programa Pleno sorrindo"
                className="pointer-events-none select-none h-auto w-[300px] md:w-[420px] lg:w-[520px] drop-shadow-[0_25px_40px_rgba(0,0,0,.35)]"
                loading="eager"
              />
            </div>

            {/* título */}
            <div className="relative z-10">
              <h1 className="max-w-[620px] text-[24px] md:text-[34px] lg:text-[46px] leading-[1.18] md:leading-[1.16] lg:leading-[1.14] font-bold tracking-tight text-white">
                <span className="block">Se sua escola conecta</span>
                <span className="block">teoria e prática à</span>
                <span className="block">realidade dos</span>
                <span className="block">estudantes e valoriza</span>
                <span className="block">metodologias ativas, o</span>
                <span className="block text-[#14D3E0] font-semibold">
                  Pleno é para você!
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* ONDA DO HERO — fica por cima do próximo bloco */}
        <div className="absolute inset-x-0 bottom-0 z-30 pointer-events-none">
          <svg
            viewBox="0 0 1440 200"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[130px] w-full md:h-[155px] lg:h-[180px]"
            preserveAspectRatio="none"
          >
            <path d="M0,140 C420,195 820,80 1440,135 L1440,200 L0,200 Z" fill="#673089" />
            <path d="M0,160 C420,200 820,90 1440,150 L1440,200 L0,200 Z" fill="#EFE1F4" />
          </svg>
        </div>
      </section>

      {/* ===================== O PROGRAMA ===================== */}
      <section id="programa" className="relative bg-[#EFE1F4]">
        {/* container da seção (mantém o mesmo padding/altura) */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-20">
          {/* desloca o conteúdo para cima sem alterar o layout */}
          <div className="transform-gpu -translate-y-8 md:-translate-y-12 lg:-translate-y-16">
            {/* Título + ponto + linha */}
            <div className="flex items-center gap-4">
              <h2 className="text-[34px] md:text-[40px] font-extrabold tracking-[.02em] text-[#5B2E83]">
                O PROGRAMA
              </h2>
              <span className="h-5 w-5 rounded-full bg-[#14D3E0] ring-8 ring-[#14D3E0]/20" />
              <span className="h-[3px] flex-1 rounded-full bg-[#14D3E0]" />
            </div>

            {/* Conteúdo */}
            <div className="mt-8 md:mt-10 grid items-start gap-10 md:grid-cols-[.9fr_auto_1.2fr]">
              {/* coluna esquerda */}
              <div>
                <p className="text-[#5B2E83]">
                  <span className="block text-lg md:text-xl font-semibold tracking-[.18em]">
                    TRANSFORMANDO
                  </span>
                  <span className="block text-lg md:text-xl font-semibold tracking-[.18em]">
                    VIDAS EM
                  </span>
                  <span className="mt-2 block text-4xl md:text-5xl font-extrabold tracking-tight">
                    TODO O PAÍS
                  </span>
                </p>

                <p className="mt-6 max-w-sm text-sm md:text-[15px] text-[#5B2E83]/85">
                  O Programa Pleno é aplicado da{" "}
                  <strong className="text-[#5B2E83] font-semibold">Educação Infantil</strong> ao{" "}
                  <strong className="text-[#5B2E83] font-semibold">Ensino Médio</strong> em{" "}
                  <strong className="text-[#5B2E83] font-semibold">1 hora-aula</strong> semanal na
                  matriz curricular.
                </p>
              </div>

              {/* selo “+ de 100 MIL” */}
              <div className="justify-self-center">
                <div className="relative h-[220px] w-[230px] rounded-[36px] bg-gradient-to-br from-[#7F3A97] to-[#5B2E83] shadow-lg ring-1 ring-white/20">
                  <span
                    className="absolute top-1/2 -translate-y-1/2 rotate-180 text-white/95 uppercase font-extrabold tracking-[.5em] left-4 md:left-5 text-[18px] md:text-[22px] lg:text-[24px]"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    + de
                  </span>
                  <div className="absolute inset-y-0 left-12 right-4 flex flex-col items-center justify-center text-white">
                    <div className="text-[94px] leading-none font-black text-[#14D3E0]">100</div>
                    <div className="text-[62px] leading-none -mt-2 font-black text-[#14D3E0]">MIL</div>
                    <div className="mt-2 text-sm font-extrabold tracking-widest">ESTUDANTES</div>
                  </div>
                </div>
              </div>

              {/* coluna direita */}
              <div className="text-[17px] leading-8 text-[#3C2A5A] md:text-[18px]">
                <p>
                  Integrado ao grupo Arco Educação, o Programa Pleno oferece uma jornada inovadora e
                  focada no desenvolvimento de{" "}
                  <strong className="font-semibold">
                    competências e habilidades socioemocionais essenciais
                  </strong>
                  .
                </p>
                <p className="mt-4">
                  Com a{" "}
                  <strong className="font-semibold">Aprendizagem Baseada em Projetos (ABP)</strong>,
                  os alunos trabalham em equipe para resolver problemas reais, enquanto a{" "}
                  <strong className="font-semibold">abordagem SAFER</strong> adapta o ensino às
                  necessidades individuais dos estudantes. Baseado no{" "}
                  <strong className="font-semibold">modelo internacional CASEL</strong>, o programa
                  impacta toda a comunidade escolar – estudantes, famílias e professores.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ondas sólidas no rodapé do bloco “O PROGRAMA” */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
          <svg
            viewBox="0 0 1440 160"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[120px] w-full md:h-[140px]"
            preserveAspectRatio="none"
          >
            <path
              d="M0,90 C240,135 520,40 800,78 C1080,116 1260,124 1440,92 L1440,160 L0,160 Z"
              fill="#5B2E83"
            />
            <path
              d="M0,104 C260,150 520,50 800,90 C1080,128 1260,136 1440,104 L1440,160 L0,160 Z"
              fill="#6F3390"
            />
          </svg>
        </div>
      </section>

      {/* ===================== NOSSOS PILARES ===================== */}
      <section id="pilares" className="relative overflow-hidden bg-[#6F3390] text-white">
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">NOSSOS PILARES</h2>

          {/* Linha turquesa + esferas acima dos cards */}
          <div className="relative mt-6">
            <div className="h-[3px] w-full rounded-full bg-[#14D3E0]" />

            {/* ⬇️ Dots: mobile = 2; md+ = 4. Alinhados no centro da linha */}
            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
              {/* mobile: 2 pontos */}
              <div className="grid grid-cols-2 md:hidden">
                {[0, 1].map((i) => (
                  <span
                    key={`dot-m-${i}`}
                    className="justify-self-center h-5 w-5 rounded-full bg-[#14D3E0] ring-8 ring-[#14D3E0]/20"
                  />
                ))}
              </div>

              {/* md+: 4 pontos (um por card) — mantém comportamento original */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: PILARES.length }).map((_, i) => (
                  <span
                    key={`dot-${i}`}
                    className="justify-self-center h-5 w-5 rounded-full bg-[#14D3E0] ring-8 ring-[#14D3E0]/20"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {PILARES.map((p, i) => (
              <div key={i} className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm shadow-lg">
                <div className="rounded-2xl rounded-b-none bg-white/10 px-5 py-4">
                  <h3 className="text-base md:text-lg font-semibold leading-snug">{p.titulo}</h3>
                </div>
                <div className="px-5 pb-5 pt-4">
                  <p className="text-white/90 leading-relaxed">{p.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== NOSSOS MATERIAIS ===================== */}
      <section id="materiais" className="relative overflow-hidden bg-[#6F3390] text-white">
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">NOSSOS MATERIAIS</h2>

            {/* linha com ponto (decorativa) */}
            <div className="mt-6 h-8 md:h-10">
              <div className="relative h-[3px] w-full rounded-full bg-[#14D3E0]">
                <span className="absolute left-1/2 -translate-x-1/2 -top-[10px] inline-block h-5 w-5 rounded-full bg-[#14D3E0] ring-8 ring-[#14D3E0]/20" />
              </div>
            </div>
          </div>

          {/* Card composto + Livros (tamanhos nativos) */}
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {MATERIAIS.map((m) => (
              <div key={m.faixa} className="text-center">
                <p className="text-white font-semibold">
                  {m.faixa}
                  <br />
                  <span className="text-white/90 font-normal">{m.anos}</span>
                </p>

                <img
                  src={m.card}
                  alt={m.altCard}
                  className="mx-auto mt-4 max-w-full h-auto"
                  loading="lazy"
                />

                <img
                  src={m.books}
                  alt={m.altBooks}
                  className="mx-auto mt-6 max-w-full h-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== VOLTAR PARA DIFERENCIAIS (HOME) ===================== */}
      <section className="bg-[]">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <Link
            href="/#diferenciais"
            className="inline-flex items-center gap-2 rounded-full border border-[#5B2E83]/20 bg-white px-5 py-3 font-semibold text-[#5B2E83] transition hover:bg-[#F7EFFB]"
          >
            ← Voltar para Diferenciais
          </Link>
        </div>
      </section>

      {/* ✅ Botão flutuante “Voltar ao topo” — agora roxo */}
      <BackToTop variant="purple" threshold={700} />
    </main>
  );
}
