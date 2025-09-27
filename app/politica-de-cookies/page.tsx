// app/politica-de-cookies/page.tsx
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import BackToTop from "../components/BackToTop";

export const metadata: Metadata = {
  title: "Política de Cookies | Colégio São José",
  description:
    "Entenda como o Colégio São José usa cookies e tecnologias semelhantes para melhorar sua experiência, analisar métricas e personalizar conteúdos.",
};

// ⬇️ Imagem do HERO (troque quando subir as artes definitivas)
const HERO_DESKTOP = {
  src: "/cookies/hero.webp",
  alt: "Ilustração relacionada à Política de Cookies",
};
const HERO_MOBILE = {
  src: "/cookies/mobile/hero.webp",
  alt: "Ilustração relacionada à Política de Cookies (mobile)",
};

// ⬇️ Ajustes finos de posição/escala (pode editar à vontade)
const heroDesktopStyle: CSSProperties = {
  transform: "translateX(-50%) translateY(0px) scale(1.1)",
  transformOrigin: "bottom center",
  willChange: "transform",
};
const heroMobileStyle: CSSProperties = {
  transform: "translateX(-50%) translateY(20px) scale(1.1)",
  transformOrigin: "bottom center",
  willChange: "transform",
};

export default function PoliticaDeCookiesPage() {
  const atualizadoEm = "Setembro de 2025";

  return (
    <main className="bg-white">
      {/* ===================== HERO ===================== */}
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
              Política de Cookies
            </span>
            <h1 className="mt-3 text-[32px] font-extrabold leading-tight md:text-5xl">
              Como o <span className="text-brand-300">Colégio São José</span> usa cookies
            </h1>
            <p className="mt-4 max-w-2xl text-white/90 md:text-lg">
              Esta página explica o que são cookies, quais categorias podem ser utilizadas
              em nosso site, por que as utilizamos e como você pode gerenciar suas
              preferências de consentimento.
            </p>
            <p className="mt-3 text-sm text-white/80">Última atualização: {atualizadoEm}</p>
          </div>

          {/* Imagem do HERO (desktop/tablet e mobile separadas) */}
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
              />
            </div>

            {/* Desktop/Tablet */}
            <div className="hidden md:block">
              <img
                src={HERO_DESKTOP.src}
                alt={HERO_DESKTOP.alt}
                className="
                  absolute left-1/2 -translate-x-1/2
                  bottom-[-10px] md:bottom-[-10px] lg:bottom-[-70px]
                  h-[115%] md:h-[122%] lg:h-[130%] w-auto max-w-none
                  select-none object-contain origin-bottom
                  drop-shadow-[0_25px_40px_rgba(0,0,0,.35)]
                "
                style={heroDesktopStyle}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Onda branca padrão */}
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

      {/* ===================== CONTEÚDO ===================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          {/* O que são cookies */}
          <section id="o-que-sao-cookies">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">O que são cookies?</h2>
            <p className="mt-3 text-brand-900/85 leading-relaxed">
              Cookies são pequenos arquivos de texto baixados no seu dispositivo quando você acessa
              um site. Eles permitem que páginas reconheçam o seu navegador, memorizem preferências
              e ajudem a oferecer uma experiência mais eficiente e personalizada. Tecnologias
              semelhantes (como pixels, tags e localStorage) podem ter propósitos parecidos e, para
              simplificar, também as chamamos de “cookies” aqui.
            </p>
          </section>

          {/* Por que usamos */}
          <section id="por-que-usamos" className="mt-10">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">Por que usamos cookies?</h2>
            <p className="mt-3 text-brand-900/85 leading-relaxed">
              Utilizamos cookies para (i) garantir funcionalidades essenciais do site, (ii) entender
              como as páginas são utilizadas e melhorar sua performance e conteúdo, (iii) lembrar
              escolhas feitas por você e (iv) quando aplicável, oferecer conteúdos e serviços
              integrados de terceiros (por exemplo, mapas, vídeos ou botões de compartilhamento).
            </p>
          </section>

          {/* Tipos de cookies */}
          <section id="tipos" className="mt-10">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">Tipos de cookies</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl bg-gray-50 p-6 shadow-sm ring-1 ring-brand-900/5">
                <h3 className="text-lg font-semibold text-brand-800">Essenciais (estritamente necessários)</h3>
                <p className="mt-2 text-brand-900/80 leading-relaxed">
                  Indispensáveis para o funcionamento do site (ex.: navegação, segurança,
                  carregamento de páginas). Não podem ser desativados pelo nosso gerenciador, mas
                  você pode bloqueá-los no navegador — o que pode afetar o funcionamento.
                </p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-6 shadow-sm ring-1 ring-brand-900/5">
                <h3 className="text-lg font-semibold text-brand-800">Desempenho & análise</h3>
                <p className="mt-2 text-brand-900/80 leading-relaxed">
                  Ajudam a medir tráfego, identificar páginas mais/menos acessadas e entender como
                  os usuários interagem, para que possamos melhorar conteúdo e usabilidade.
                </p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-6 shadow-sm ring-1 ring-brand-900/5">
                <h3 className="text-lg font-semibold text-brand-800">Funcionais</h3>
                <p className="mt-2 text-brand-900/80 leading-relaxed">
                  Lembram preferências (ex.: idioma, unidade de interesse) e ajustes feitos por você
                  para oferecer uma experiência mais personalizada.
                </p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-6 shadow-sm ring-1 ring-brand-900/5">
                <h3 className="text-lg font-semibold text-brand-800">Publicidade (quando aplicável)</h3>
                <p className="mt-2 text-brand-900/80 leading-relaxed">
                  Podem ser usados para exibir anúncios mais relevantes, limitar repetição e mensurar
                  eficácia de campanhas. Normalmente são definidos por parceiros autorizados.
                </p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-6 shadow-sm ring-1 ring-brand-900/5">
                <h3 className="text-lg font-semibold text-brand-800">Cookies de terceiros</h3>
                <p className="mt-2 text-brand-900/80 leading-relaxed">
                  Alguns recursos incorporados (por exemplo, vídeos, mapas, widgets sociais) podem
                  definir cookies próprios. Recomendamos consultar as políticas de privacidade desses
                  serviços.
                </p>
              </div>
            </div>
          </section>

          {/* O que pode aparecer no site */}
          <section id="quais-usamos" className="mt-10">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">Quais cookies podem aparecer neste site?</h2>
            <p className="mt-3 text-brand-900/85 leading-relaxed">
              A presença efetiva de cada categoria pode variar ao longo do tempo, conforme evoluímos
              o site do Colégio São José. Nosso objetivo é utilizar apenas o que for necessário
              para oferecer uma experiência segura, estável e útil para você. Sempre que houver
              mudanças relevantes, esta política será atualizada.
            </p>
          </section>

          {/* Como gerenciar */}
          <section id="preferencias" className="mt-10">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">Como gerenciar suas preferências</h2>
            <div className="mt-4 space-y-4 text-brand-900/85 leading-relaxed">
              <p>
                <strong>Banner/central de privacidade:</strong> quando exibido, use o controle de
                consentimento para aceitar, recusar ou ajustar categorias não essenciais.
              </p>
              <p>
                <strong>No navegador:</strong> você pode bloquear, apagar ou limitar cookies nas
                configurações do seu navegador (Chrome, Firefox, Safari, Edge, entre outros).
                Consulte a seção de “Privacidade” ou “Cookies” do seu navegador para instruções
                atualizadas.
              </p>
              <p className="text-sm text-brand-900/70">
                Observação: o bloqueio de cookies essenciais pode prejudicar o funcionamento de
                partes do site (ex.: formulários, login e recursos interativos).
              </p>
            </div>
          </section>

          {/* Base legal & retenção */}
          <section id="base-legal" className="mt-10">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">Base legal e retenção</h2>
            <p className="mt-3 text-brand-900/85 leading-relaxed">
              Tratamos dados pessoais por meio de cookies com base em diferentes fundamentos
              previstos na legislação aplicável (como execução de contrato, legítimo interesse,
              cumprimento de obrigação legal e/ou consentimento, quando necessário). Os prazos de
              retenção variam conforme o tipo e a finalidade do cookie; após o término do prazo, os
              dados são excluídos, anonimizados ou mantidos apenas quando houver base legal que
              justifique a conservação.
            </p>
          </section>

          {/* Alterações */}
          <section id="alteracoes" className="mt-10">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">Atualizações desta política</h2>
            <p className="mt-3 text-brand-900/85 leading-relaxed">
              Podemos atualizar esta Política de Cookies para refletir mudanças legais, técnicas ou
              operacionais. Quando apropriado, notificaremos você por meio do próprio site.
              Recomendamos revisar periodicamente.
            </p>
          </section>

          {/* Contato */}
          <section id="contato" className="mt-10">
            <h2 className="text-2xl font-bold text-brand-700 uppercase">Fale com o Colégio São José</h2>
            <p className="mt-3 text-brand-900/85 leading-relaxed">
              Em caso de dúvidas sobre esta política ou sobre o uso de cookies, entre em contato
              pelo e-mail{" "}
              <a
                href="mailto:contato@colegiosaojese.net"
                className="font-semibold text-brand-700 underline underline-offset-4"
              >
                contato@colegiosaojese.net
              </a>
            </p>
          </section>
        </div>
      </section>

      {/* Botão flutuante “Voltar ao topo” */}
      <BackToTop />
    </main>
  );
}
