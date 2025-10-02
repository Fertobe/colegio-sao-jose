// app/politica-de-privacidade/page.tsx
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import BackToTop from "../components/BackToTop";
import { getSiteUrl } from "@/app/utils/site-url";

const BASE = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: "Política de Privacidade", // o layout aplica “ — Colégio São José”
  description:
    "Como coletamos, utilizamos e protegemos seus dados pessoais no Colégio São José, em conformidade com a LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
  openGraph: {
    type: "article",
    siteName: "Colégio São José",
    title: "Política de Privacidade",
    description:
      "Como coletamos, utilizamos e protegemos seus dados pessoais no Colégio São José, em conformidade com a LGPD.",
    url: "/politica-de-privacidade",
    images: ["/og-cover.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Privacidade",
    description:
      "Como coletamos, utilizamos e protegemos seus dados pessoais no Colégio São José, em conformidade com a LGPD.",
    images: ["/og-cover.webp"],
  },
};

const HERO_DESKTOP = {
  src: "/privacidade/hero.webp",
  alt: "Estudantes do Colégio São José",
};
const HERO_MOBILE = {
  src: "/privacidade/hero.webp",
  alt: "Estudantes do Colégio São José (mobile)",
};

const heroDesktopStyle: CSSProperties = {
  transform: "translateX(-50%) translateY(20px) scale(1.0)",
  transformOrigin: "bottom center",
  willChange: "transform",
};
const heroMobileStyle: CSSProperties = {
  transform: "translateX(-50%) translateY(20px) scale(1.0)",
  transformOrigin: "bottom center",
  willChange: "transform",
};

// ⬅️ placeholder — trocamos no final do projeto junto com o domínio final
const DPO_EMAIL = "privacidade@colegiosaojose.net";
const LAST_UPDATE = "23/09/2025";

export default function PoliticaPrivacidadePage() {
  // JSON-LD breadcrumb (Início → Política de Privacidade)
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${BASE}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Política de Privacidade",
        item: `${BASE}/politica-de-privacidade`,
      },
    ],
  };

  return (
    <main className="bg-white">
      {/* JSON-LD (invisível; ajuda SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20 lg:py-24">
          {/* Texto */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-300" />
              Institucional
            </span>
            <h1 className="mt-3 text-[32px] font-extrabold leading-tight md:text-5xl">
              Política de <span className="text-brand-300">Privacidade</span>
            </h1>
            <p className="mt-4 text-base text-white/90 md:text-lg">
              Esta página explica como o <strong>Colégio São José</strong> trata dados pessoais
              em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD)</strong>.
            </p>

            {/* Navegação por âncoras */}
            <nav className="mt-6 flex flex-wrap gap-2">
              {[
                ["escopo", "Escopo"],
                ["dados", "Dados coletados"],
                ["finalidades", "Finalidades & Bases"],
                ["cookies", "Cookies"],
                ["compartilhamento", "Compartilhamento"],
                ["transferencia", "Transferência internacional"],
                ["retencao", "Retenção"],
                ["seguranca", "Segurança"],
                ["direitos", "Direitos do titular"],
                ["contato", "Contato do DPO"],
              ].map(([id, label]) => (
                <Link
                  key={id}
                  href={`#${id}`}
                  className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/25"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <p className="mt-3 text-xs text-white/80">Última atualização: {LAST_UPDATE}</p>
          </div>

          {/* Imagem */}
          <div className="relative mx-auto aspect-square w-[320px] md:w-[420px] lg:w-[520px]">
            {/* Mobile */}
            <div className="md:hidden">
              <img
                src={HERO_MOBILE.src}
                alt={HERO_MOBILE.alt}
                className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] h-[118%] w-auto max-w-none select-none object-contain origin-bottom drop-shadow-[0_25px_40px_rgba(0,0,0,.35)]"
                style={heroMobileStyle}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                draggable={false}
                width={900}
                height={900}
                sizes="(max-width: 767px) 320px, 0px"
              />
            </div>
            {/* Desktop/Tablet */}
            <div className="hidden md:block">
              <img
                src={HERO_DESKTOP.src}
                alt={HERO_DESKTOP.alt}
                className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] md:bottom-[-10px] lg:bottom-[-86px] h-[115%] md:h-[122%] lg:h-[130%] w-auto max-w-none select-none object-contain origin-bottom drop-shadow-[0_25px_40px_rgba(0,0,0,.35)]"
                style={heroDesktopStyle}
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
        </div>

        {/* Onda branca */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
          <svg
            viewBox="0 0 1440 140"
            className="h-[90px] w-full md:h-[110px] lg:h-[130px]"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M0,80 C320,140 920,10 1440,90 L1440,140 L0,140 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* SEÇÕES */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          {/* Escopo */}
          <div id="escopo" className="scroll-mt-28">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">Escopo</h2>
            <p className="mt-3 leading-relaxed text-brand-900/85">
              Esta Política se aplica ao tratamento de dados pessoais realizado pelo <strong>Colégio São José</strong> em seus
              sites, aplicativos, canais de atendimento (e-mail, telefone, WhatsApp) e nas rotinas acadêmicas/administrativas
              relacionadas à comunidade escolar (estudantes, responsáveis, colaboradores e visitantes).
            </p>
          </div>

          {/* Dados coletados */}
          <div id="dados" className="mt-10 scroll-mt-28">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">Categorias de dados coletados</h2>
            <ul className="mt-3 grid gap-2 text-brand-900/85">
              <li>
                <strong>Dados cadastrais e de contato:</strong> nome, CPF/RG, data de nascimento, filiação, endereço,
                e-mail, telefone/WhatsApp.
              </li>
              <li>
                <strong>Identificação digital:</strong> endereço IP, data/hora e páginas acessadas, device, sistema e
                navegador, cookies e identificadores online.
              </li>
              <li>
                <strong>Dados de uso e comunicações:</strong> interações no site, formulários, registros de atendimento.
              </li>
              <li>
                <strong>Dados financeiros e de cobrança:</strong> quando necessários para matrícula e contratos.
              </li>
              <li>
                <strong>Dados acadêmicos:</strong> histórico escolar, desempenho, relatórios pedagógicos.
              </li>
              <li>
                <strong>Dados sensíveis (quando estritamente necessários):</strong> saúde (ex.: vacinação, laudos), deficiência,
                aspectos socioassistenciais — sempre com base legal adequada e mínimo necessário.
              </li>
              <li>
                <strong>Dados de visitantes (se aplicável):</strong> controle de acesso às unidades.
              </li>
            </ul>
          </div>

          {/* Finalidades & Bases legais */}
          <div id="finalidades" className="mt-10 scroll-mt-28">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">Finalidades e Bases legais</h2>
            <p className="mt-3 text-brand-900/85">
              Tratamos os dados para atender finalidades legítimas e transparentes. As principais estão abaixo:
            </p>

            <div className="mt-4 grid gap-3 rounded-2xl border border-brand-100 p-4">
              {[
                ["Prestação do serviço educacional (matrícula, avaliações, boletins, plataformas).", "Execução de contrato; obrigação legal."],
                ["Atendimento, suporte e comunicações institucionais.", "Execução de contrato; legítimo interesse."],
                ["Cumprimento de obrigações legais e regulatórias.", "Obrigação legal; exercício regular de direitos."],
                ["Segurança da informação e prevenção a fraudes/incidentes.", "Legítimo interesse."],
                ["Melhoria contínua dos serviços, métricas e analytics essenciais.", "Legítimo interesse."],
                ["Envio de comunicações de marketing institucional.", "Consentimento (revogável a qualquer tempo)."],
                ["Uso de dados sensíveis (ex.: saúde) quando indispensável.", "Cumprimento de obrigação legal; tutela da saúde; consentimento, quando aplicável."],
              ].map(([f, b], i) => (
                <div key={i} className="rounded-xl bg-brand-50/40 p-3 ring-1 ring-brand-100">
                  <p className="text-brand-900/90">
                    <strong className="text-brand-700">Finalidade:</strong> {f}
                  </p>
                  <p className="text-brand-900/80">
                    <strong className="text-brand-700">Base legal:</strong> {b}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cookies */}
          <div id="cookies" className="mt-10 scroll-mt-28">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">Cookies e tecnologias semelhantes</h2>
            <p className="mt-3 leading-relaxed text-brand-900/85">
              Utilizamos cookies para autenticar usuários, lembrar preferências, medir audiência e aprimorar a navegação. Para
              detalhes das categorias e como gerenciar suas preferências, consulte a{" "}
              <Link href="/politica-de-cookies" className="font-semibold text-brand-700 underline underline-offset-2">
                Política de Cookies
              </Link>
              .
            </p>
          </div>

          {/* Compartilhamento */}
          <div id="compartilhamento" className="mt-10 scroll-mt-28">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">Compartilhamento de dados</h2>
            <p className="mt-3 leading-relaxed text-brand-900/85">
              Podemos compartilhar dados com <em>operadores</em> que nos auxiliam (ex.: hospedagem, e-mail, plataformas
              educacionais, cobrança, suporte e segurança), órgãos públicos quando exigido, e parceiros estritamente
              necessários à execução das atividades educacionais. Exigimos desses terceiros padrões de segurança,
              confidencialidade e conformidade com a LGPD. Não comercializamos dados pessoais para marketing de terceiros.
            </p>
          </div>

          {/* Transferência internacional */}
          <div id="transferencia" className="mt-10 scroll-mt-28">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">Transferência internacional</h2>
            <p className="mt-3 leading-relaxed text-brand-900/85">
              Caso haja armazenamento ou processamento em outros países (ex.: serviços de nuvem), adotamos salvaguardas
              adequadas, como cláusulas contratuais específicas, observando os requisitos da LGPD.
            </p>
          </div>

          {/* Retenção */}
          <div id="retencao" className="mt-10 scroll-mt-28">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">Retenção e descarte</h2>
            <p className="mt-3 leading-relaxed text-brand-900/85">
              Mantemos os dados apenas pelo tempo necessário ao atendimento das finalidades informadas e/ou cumprimento de
              obrigações legais e regulatórias. Após esse período, realizamos o descarte seguro ou a anonimização, conforme o caso.
            </p>
          </div>

          {/* Segurança */}
          <div id="seguranca" className="mt-10 scroll-mt-28">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">Segurança da informação</h2>
            <p className="mt-3 leading-relaxed text-brand-900/85">
              Adotamos medidas técnicas e administrativas para proteger os dados pessoais contra acessos não autorizados,
              destruição, perda, alteração ou qualquer forma de tratamento inadequado ou ilícito. Havendo incidente de
              segurança relevante, seguiremos os procedimentos legais cabíveis.
            </p>
          </div>

          {/* Direitos do titular */}
          <div id="direitos" className="mt-10 scroll-mt-28">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">Seus direitos</h2>
            <p className="mt-3 text-brand-900/85">
              De acordo com a LGPD, você pode solicitar: (i) confirmação da existência de tratamento; (ii) acesso; (iii) correção
              de dados incompletos, inexatos ou desatualizados; (iv) anonimização, bloqueio ou eliminação de dados desnecessários
              ou excessivos; (v) portabilidade; (vi) informação sobre compartilhamentos; (vii) revogação do consentimento, quando
              aplicável; e (viii) outras prerrogativas previstas em lei.
            </p>
          </div>

          {/* Contato do DPO */}
          <div id="contato" className="mt-10 scroll-mt-28">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">Canal do Titular</h2>
            <p className="mt-3 text-brand-900/85">
              Para exercer seus direitos ou tirar dúvidas sobre esta Política, entre em contato pelo e-mail{" "}
              <a href={`mailto:${DPO_EMAIL}`} className="font-semibold text-brand-700 underline underline-offset-2">
                {DPO_EMAIL}
              </a>
              . Para sua segurança, poderemos solicitar informações adicionais para confirmar sua identidade.
            </p>
            <p className="mt-3 text-sm text-brand-900/70">
              Esta Política pode ser atualizada a qualquer momento. Publicaremos a versão vigente nesta página, com a data
              de última atualização.
            </p>
          </div>
        </div>
      </section>

      <BackToTop
        variant="brand"
        threshold={600}
        className="!bg-brand-700 hover:!bg-brand-600 !text-white !ring-white/40"
      />
    </main>
  );
}
