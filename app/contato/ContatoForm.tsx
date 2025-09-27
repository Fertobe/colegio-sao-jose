"use client";
import * as React from "react";

export default function ContatoForm({ email }: { email: string }) {
  const [isSending, setIsSending] = React.useState(false);
  const [fallbackHref, setFallbackHref] = React.useState<string | null>(null);

  const buildMailto = (to: string, subjectRaw: string, bodyRaw: string) => {
    // usa CRLF para máxima compatibilidade
    const subject = encodeURIComponent(subjectRaw);
    const body = encodeURIComponent(bodyRaw.replace(/\r?\n/g, "\r\n"));
    return `mailto:${to}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot anti-bot — se preenchido, ignora submissão
    if ((data.get("website") as string)?.trim()) return;

    const nome = String(data.get("nome") || "").trim();
    const assuntoEscolhido = String(data.get("assunto") || "Contato pelo site").trim();
    const tel = String(data.get("telefone") || "").trim();
    const msg = String(data.get("mensagem") || "").trim();

    const assunto = `[Site] ${assuntoEscolhido} – ${nome || "Sem nome"}`;

    const body =
      `Nome: ${nome}\r\n` +
      `Telefone: ${tel}\r\n` +
      `Assunto: ${assuntoEscolhido}\r\n\r\n` +
      `Mensagem:\r\n${msg}\r\n`;

    const href = buildMailto(email, assunto, body);
    setFallbackHref(href);
    setIsSending(true);

    // tenta abrir o app de e-mail
    window.location.href = href;

    // reabilita o botão depois de um tempinho (caso o handler retorne)
    window.setTimeout(() => setIsSending(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* honeypot invisível (anti-spam) */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="nome" className="block text-sm font-semibold text-brand-900">
          Nome completo *
        </label>
        <input
          id="nome"
          name="nome"
          required
          autoComplete="name"
          maxLength={100}
          className="mt-1 w-full rounded-xl border border-brand-200 bg-white px-3 py-2 outline-none ring-brand-300 focus:ring-2"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="telefone" className="block text-sm font-semibold text-brand-900">
            Telefone / WhatsApp
          </label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(42) 9 9999-9999"
            maxLength={30}
            className="mt-1 w-full rounded-xl border border-brand-200 bg-white px-3 py-2 outline-none ring-brand-300 focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="assunto" className="block text-sm font-semibold text-brand-900">
            Assunto *
          </label>
          <select
            id="assunto"
            name="assunto"
            required
            className="mt-1 w-full rounded-xl border border-brand-200 bg-white px-3 py-2 outline-none ring-brand-300 focus:ring-2"
          >
            <option value="Matrículas">Matrículas</option>
            <option value="Secretaria">Secretaria</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Pedagógico">Pedagógico</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="mensagem" className="block text-sm font-semibold text-brand-900">
          Mensagem *
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          required
          rows={5}
          maxLength={4000}
          className="mt-1 w-full rounded-xl border border-brand-200 bg-white px-3 py-2 outline-none ring-brand-300 focus:ring-2"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSending}
          className={`inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-white shadow-sm transition ${
            isSending ? "bg-brand-600 opacity-80" : "bg-brand-700 hover:bg-brand-600"
          }`}
        >
          {isSending ? "Abrindo seu e-mail…" : "Enviar por e-mail"}
        </button>

        {fallbackHref && (
          <a
            href={fallbackHref}
            className="text-sm font-semibold text-brand-700 underline underline-offset-4"
          >
            Se não abrir, clique aqui
          </a>
        )}
      </div>
    </form>
  );
}
