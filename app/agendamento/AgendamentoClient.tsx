// app/agendamento/AgendamentoClient.tsx
"use client";

import { useMemo, useState } from "react";
import BackToTop from "../components/BackToTop";
import BrandIcon from "../components/icons/BrandIcon";

/** ====== TOGGLES ======
 * Se estiver FALSE (padrão), não chama a API e usa fallback (WhatsApp ou e-mail).
 * Quando você finalizar o backend, coloque TRUE no .env:
 * NEXT_PUBLIC_AGENDAMENTOS_ATIVO=true
 */
const AGENDAMENTO_ATIVO =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_AGENDAMENTOS_ATIVO === "true";

/** Fallback (enquanto o e-mail não estiver pronto)
 * Opções: "whatsapp" | "email"
 * Se quiser usar e-mail temporariamente:
 * NEXT_PUBLIC_AGENDAMENTOS_FALLBACK=email
 */
const FALLBACK =
  (typeof process !== "undefined" &&
    (process.env.NEXT_PUBLIC_AGENDAMENTOS_FALLBACK as
      | "whatsapp"
      | "email")) || "whatsapp";

/** E-mail de destino para o fallback por e-mail (se usar) */
const DEST_EMAIL =
  (typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_CONTATO_EMAIL) ||
  "contato@colegiosaojose.com.br";

// ======== Imagens ========
const HERO_SIDE_IMG_DESKTOP = "/agendamento/hero-side.webp";
const HERO_SIDE_IMG_MOBILE = "/agendamento/mobile/hero-side.webp";

// ======== Dados fixos da unidade ========
const COLEGIO = {
  nome: "Colégio São José - Educação para a vida.",
  endereco: "R. Cândido de Abreu, 1636 - Prudentópolis, PR, 84400-000",
  telefoneWa: "5542998276516", // DDI 55 + DDD + número
  horario: "7h – 19h",
  segmentos: "Da Educação Infantil ao Ensino Médio",
  img: "/agendamento/colegio.webp",
};

// ======== Helpers de máscara/validação ========
function formatPhoneBR(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10) {
    return d.replace(/^(\d{0,2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  }
  return d.replace(/^(\d{0,2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}
function isValidPhone(value: string): boolean {
  const d = value.replace(/\D/g, "");
  return d.length >= 10;
}
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value.trim());
}

export default function AgendamentoClient() {
  const [passo, setPasso] = useState<1 | 2>(1);

  // responsável
  const [respNome, setRespNome] = useState("");
  const [respTel, setRespTel] = useState("");
  const [respEmail, setRespEmail] = useState("");

  // erros do responsável
  const [errNome, setErrNome] = useState<string | null>(null);
  const [errTel, setErrTel] = useState<string | null>(null);
  const [errEmail, setErrEmail] = useState<string | null>(null);

  // aluno
  const [alunoNome, setAlunoNome] = useState("");
  const [alunoSerie, setAlunoSerie] = useState("");
  const [mensagem, setMensagem] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [ok, setOk] = useState<null | "ok" | "erro">(null);
  const [alertaResp, setAlertaResp] = useState(false);

  const canIrAluno =
    respNome.trim().length > 0 && isValidPhone(respTel) && isValidEmail(respEmail);

  // Link para falar com a unidade (CTA do card)
  const whatsUrl = useMemo(() => {
    const texto =
      `Olá! Gostaria de falar com a unidade.\n\n` +
      `• Unidade: ${COLEGIO.nome}\n` +
      `• Endereço: ${COLEGIO.endereco}\n`;
    return `https://wa.me/${COLEGIO.telefoneWa}?text=${encodeURIComponent(texto)}`;
  }, []);

  function validateResponsavel(): boolean {
    let ok = true;

    if (!respNome.trim()) {
      setErrNome("Informe o nome do responsável.");
      ok = false;
    } else setErrNome(null);

    if (!isValidPhone(respTel)) {
      setErrTel("Informe um telefone válido.");
      ok = false;
    } else setErrTel(null);

    if (!isValidEmail(respEmail)) {
      setErrEmail("Informe um e-mail válido.");
      ok = false;
    } else setErrEmail(null);

    return ok;
  }

  function irParaAluno() {
    const ok = validateResponsavel();
    if (ok) {
      setPasso(2);
      setAlertaResp(false);
    } else {
      setAlertaResp(true);
      setPasso(1);
    }
  }

  /** Envio temporário sem API */
  function sendFallback() {
    const corpo =
      `Olá! Quero agendar uma visita.\n\n` +
      `— Unidade: ${COLEGIO.nome}\n` +
      `— Endereço: ${COLEGIO.endereco}\n\n` +
      `Responsável:\n` +
      `• Nome: ${respNome}\n` +
      `• Telefone: ${respTel}\n` +
      `• E-mail: ${respEmail}\n\n` +
      `Aluno(a):\n` +
      `• Nome: ${alunoNome}\n` +
      `• Série/Idade: ${alunoSerie || "-"}\n\n` +
      `Observações:\n${mensagem || "-"}`;

    if (FALLBACK === "email") {
      const subject = "Agendamento de visita — Colégio São José";
      const href = `mailto:${encodeURIComponent(
        DEST_EMAIL
      )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(corpo)}`;
      window.location.href = href;
    } else {
      const href = `https://wa.me/${COLEGIO.telefoneWa}?text=${encodeURIComponent(corpo)}`;
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }

  async function handleAgendar() {
    if (!validateResponsavel() || !alunoNome.trim()) {
      setOk("erro");
      return;
    }

    if (!AGENDAMENTO_ATIVO) {
      sendFallback();
      setOk("ok");
      return;
    }

    // Quando houver API real:
    setEnviando(true);
    setOk(null);
    try {
      const res = await fetch("/api/agendamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unidade: COLEGIO.nome,
          endereco: COLEGIO.endereco,
          responsavel: { nome: respNome, telefone: respTel, email: respEmail },
          aluno: { nome: alunoNome, serie: alunoSerie },
          mensagem,
          origem: "site-agendamento",
          quando: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Falha no envio");
      setOk("ok");
      setAlunoNome("");
      setAlunoSerie("");
      setMensagem("");
    } catch {
      setOk("erro");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600" />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20 lg:py-24">
          {/* ESQUERDA: texto */}
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-300" />
              Agendamento
            </span>

            <h1 className="mt-3 text-[32px] font-extrabold leading-tight md:text-5xl">
              Agendamento de visita
              <span className="block text-brand-300">Escolha a melhor data</span>
            </h1>

            <p className="mt-4 max-w-3xl text-white/90 md:text-lg">
              Venha conhecer nossos espaços e conversar com nossa equipe. O processo é simples:
              preencha seus dados, escolha o melhor horário e nós confirmamos com você.
            </p>
            {/* frase de “envio temporariamente via …” removida */}
          </div>

          {/* DIREITA: imagem */}
          <div className="relative mx-auto aspect-square w-[320px] md:w-[420px] lg:w-[520px]">
            {/* MOBILE */}
            <div className="md:hidden">
              <img
                src={HERO_SIDE_IMG_MOBILE}
                alt="Família visitando a escola (mobile)"
                className="absolute left-1/2 bottom-[-10px] h-[120%] w-auto max-w-none select-none object-contain origin-bottom drop-shadow-[0_25px_40px_rgba(0,0,0,.35)]"
                style={{ transform: "translateX(-50%) translateY(30px) scale(0.98)" }}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                draggable={false}
              />
            </div>

            {/* DESKTOP/TABLET */}
            <div className="hidden md:block">
              <img
                src={HERO_SIDE_IMG_DESKTOP}
                alt="Família visitando a escola"
                className="
                  absolute left-80 -translate-x-1/2
                  bottom-[-10px] md:bottom-[-10px] lg:bottom-[-46px]
                  h-[115%] md:h-[132%] lg:h-[115%] w-auto max-w-none
                  select-none object-contain origin-bottom
                  drop-shadow-[0_25px_40px_rgba(0,0,0,.35)]
                "
                loading="eager"
                decoding="async"
                fetchPriority="high"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Onda branca */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
          <svg viewBox="0 0 1440 140" className="h-[90px] w-full md:h-[110px] lg:h-[130px]" preserveAspectRatio="none">
            <path d="M0,80 C320,140 920,10 1440,90 L1440,140 L0,140 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <h2 className="text-center text-3xl font-bold text-brand-700">
            Venha conhecer nossos espaços e nossa proposta pedagógica em detalhes
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-gray-700">
            Escolha uma data e nos conte quem vai visitar. Nossa equipe confirma tudo com você por e-mail/telefone.
          </p>
        </div>
      </section>

      {/* FORM + CARD */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <div className="grid items-start gap-10 md:grid-cols-2">
            {/* --------- FORM --------- */}
            <div>
              <div className="mb-6">
                <span className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 ring-1 ring-brand-300/50">
                  {COLEGIO.nome}
                </span>
              </div>

              <div className="flex items-center gap-8 text-brand-700">
                <button
                  type="button"
                  className={`relative pb-2 text-sm font-semibold ${passo === 1 ? "text-brand-700" : "text-brand-700/60"}`}
                  onClick={() => setPasso(1)}
                >
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-300 text-brand-900 text-xs font-bold">
                    1
                  </span>
                  Dados do Responsável
                  <span className={`absolute left-0 -bottom-[2px] h-[2px] w-full rounded-full transition ${passo === 1 ? "bg-brand-400" : "bg-transparent"}`} />
                </button>

                <button
                  type="button"
                  aria-disabled={!canIrAluno}
                  disabled={!canIrAluno}
                  className={`relative pb-2 text-sm font-semibold ${passo === 2 ? "text-brand-700" : "text-brand-700/60"} ${
                    !canIrAluno ? "cursor-not-allowed opacity-40" : ""
                  }`}
                  onClick={() => (canIrAluno ? setPasso(2) : null)}
                >
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-300 text-brand-900 text-xs font-bold">
                    2
                  </span>
                  Dados do Aluno
                  <span className={`absolute left-0 -bottom-[2px] h-[2px] w-full rounded-full transition ${passo === 2 ? "bg-brand-400" : "bg-transparent"}`} />
                </button>
              </div>

              {alertaResp && (
                <p className="mt-3 text-sm font-semibold text-rose-600">Preencha os dados do responsável para continuar.</p>
              )}

              {/* passo 1 */}
              {passo === 1 && (
                <div className="mt-5 space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-brand-700">Nome do Responsável *</label>
                    <input
                      value={respNome}
                      onChange={(e) => {
                        setRespNome(e.target.value);
                        if (e.target.value.trim()) setErrNome(null);
                      }}
                      onBlur={() => setErrNome(respNome.trim() ? null : "Informe o nome do responsável.")}
                      className="w-full rounded-full border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-300"
                      placeholder="Informe o nome do Responsável"
                    />
                    {errNome && <p className="mt-1 text-xs font-semibold text-rose-600">{errNome}</p>}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-brand-700">Telefone *</label>
                    <input
                      type="tel"
                      value={respTel}
                      onChange={(e) => {
                        const masked = formatPhoneBR(e.target.value);
                        setRespTel(masked);
                        if (isValidPhone(masked)) setErrTel(null);
                      }}
                      onBlur={() => setErrTel(isValidPhone(respTel) ? null : "Informe um telefone válido.")}
                      className="w-full rounded-full border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-300"
                      placeholder="(99) 99999-9999"
                      inputMode="numeric"
                    />
                    {errTel && <p className="mt-1 text-xs font-semibold text-rose-600">{errTel}</p>}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-brand-700">E-mail do Responsável *</label>
                    <input
                      type="email"
                      value={respEmail}
                      onChange={(e) => {
                        setRespEmail(e.target.value);
                        if (isValidEmail(e.target.value)) setErrEmail(null);
                      }}
                      onBlur={() => setErrEmail(isValidEmail(respEmail) ? null : "Informe um e-mail válido.")}
                      className="w-full rounded-full border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-300"
                      placeholder="Informe seu melhor e-mail"
                    />
                    {errEmail && <p className="mt-1 text-xs font-semibold text-rose-600">{errEmail}</p>}
                  </div>

                  <button
                    type="button"
                    onClick={irParaAluno}
                    className="mt-2 inline-flex rounded-full bg-brand-300 px-5 py-3 font-semibold text-brand-900 shadow-sm transition hover:bg-brand-200"
                  >
                    Informar dados do aluno
                  </button>
                </div>
              )}

              {/* passo 2 */}
              {passo === 2 && (
                <div className="mt-5 space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-brand-700">Nome do Aluno *</label>
                    <input
                      value={alunoNome}
                      onChange={(e) => setAlunoNome(e.target.value)}
                      className="w-full rounded-full border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-300"
                      placeholder="Informe o nome do Aluno"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-brand-700">Série / Idade</label>
                    <input
                      value={alunoSerie}
                      onChange={(e) => setAlunoSerie(e.target.value)}
                      className="w-full rounded-full border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-300"
                      placeholder="Ex.: 5º ano / 10 anos"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-brand-700">Observações (opcional)</label>
                    <textarea
                      value={mensagem}
                      onChange={(e) => setMensagem(e.target.value)}
                      className="min-h-[110px] w-full rounded-2xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-300"
                      placeholder="Deixe alguma observação aqui…"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAgendar}
                    disabled={enviando}
                    className="mt-2 inline-flex rounded-full bg-brand-300 px-5 py-3 font-semibold text-brand-900 shadow-sm transition hover:bg-brand-200 disabled:opacity-60"
                  >
                    {enviando ? "Enviando…" : AGENDAMENTO_ATIVO ? "Agendar" : "Enviar pedido"}
                  </button>

                  {ok === "ok" && (
                    <p className="text-sm font-semibold text-emerald-600">
                      Pedido enviado! Em breve entraremos em contato.
                    </p>
                  )}
                  {ok === "erro" && (
                    <p className="text-sm font-semibold text-rose-600">
                      Verifique os campos obrigatórios ou tente novamente.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* --------- CARD DA UNIDADE --------- */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-black/10 shadow-md">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img src={COLEGIO.img} alt={COLEGIO.nome} className="h-full w-full object-cover" />
                </div>
                <div className="space-y-3 p-4">
                  <h3 className="text-xl font-semibold text-brand-700">{COLEGIO.nome}</h3>

                  <span className="inline-block rounded-full border border-brand-300/60 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {COLEGIO.segmentos}
                  </span>

                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <BrandIcon name="pinHome" className="h-5 w-5 text-brand-700" title="Endereço" />
                      <span>{COLEGIO.endereco}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <BrandIcon name="calendar" className="h-5 w-5 text-brand-700" title="Horário" />
                      <span>{COLEGIO.horario}</span>
                    </li>
                  </ul>

                  <p className="text-xs text-gray-500">
                    Se você já é pai, mãe ou responsável de aluno matriculado, fale diretamente com a unidade.
                  </p>

                  <a
                    href={whatsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-300 px-5 py-3 text-sm font-semibold text-brand-900 shadow-sm transition hover:bg-brand-200"
                  >
                    <BrandIcon name="whatsapp" color="currentColor" className="h-5 w-5 text-brand-900" title="WhatsApp" />
                    Falar com a unidade no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </main>
  );
}
