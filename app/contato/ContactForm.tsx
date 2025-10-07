// app/contato/ContactForm.tsx
"use client";

import * as React from "react";

type SendState = "idle" | "sending" | "ok" | "err";

export default function ContactForm() {
  const [state, setState] = React.useState<SendState>("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const isSending = state === "sending";
  const isOk = state === "ok";
  const isErr = state === "err";

  // honeypot field name
  const HONEY = "website";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSending) return;

    const form = e.currentTarget;

    // dispara validação nativa do browser
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);

    // honeypot anti-spam — se vier preenchido, só ignora
    if (String(data.get(HONEY) || "").trim()) return;

    const name = String(data.get("nome") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("telefone") || "").trim();
    const assunto = String(data.get("assunto") || "").trim();
    const msg = String(data.get("mensagem") || "").trim();

    // opcional: inclui o assunto no topo do corpo
    const message = assunto ? `[Assunto: ${assunto}]\n\n${msg}` : msg;

    try {
      setState("sending");
      setErrorMsg(null);

      const res = await fetch("/api/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          message,
        }),
      });

      const json = await res.json().catch(() => ({} as any));

      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || `Falha ao enviar (HTTP ${res.status})`);
      }

      setState("ok");
      form.reset();
    } catch (err: any) {
      setErrorMsg(String(err?.message || err || "Erro desconhecido"));
      setState("err");
    } finally {
      // volta para idle depois de alguns segundos
      setTimeout(() => setState("idle"), 6000);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate aria-busy={isSending}>
      {/* honeypot invisível (anti-spam) */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={HONEY}>Não preencha este campo</label>
        <input id={HONEY} name={HONEY} tabIndex={-1} autoComplete="off" />
      </div>

      {/* feedback */}
      {isOk && (
        <p className="rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-800 ring-1 ring-green-200">
          ✅ Mensagem enviada com sucesso! Em breve entraremos em contato.
        </p>
      )}
      {isErr && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800 ring-1 ring-red-200">
          ❌ Não foi possível enviar agora. {errorMsg}
        </p>
      )}

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
          <label htmlFor="email" className="block text-sm font-semibold text-brand-900">
            E-mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            maxLength={160}
            className="mt-1 w-full rounded-xl border border-brand-200 bg-white px-3 py-2 outline-none ring-brand-300 focus:ring-2"
          />
        </div>
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
      </div>

      <div>
        <label htmlFor="assunto" className="block text-sm font-semibold text-brand-900">
          Assunto *
        </label>
        <select
          id="assunto"
          name="assunto"
          required
          defaultValue="Matrículas"
          className="mt-1 w-full rounded-xl border border-brand-200 bg-white px-3 py-2 outline-none ring-brand-300 focus:ring-2"
        >
          <option value="Matrículas">Matrículas</option>
          <option value="Secretaria">Secretaria</option>
          <option value="Financeiro">Financeiro</option>
          <option value="Pedagógico">Pedagógico</option>
          <option value="Outros">Outros</option>
        </select>
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
          aria-disabled={isSending}
          className={`inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-white shadow-sm transition ${
            isSending ? "bg-brand-600 opacity-80" : "bg-brand-700 hover:bg-brand-600"
          }`}
        >
          {isSending ? "Enviando…" : "Enviar mensagem"}
        </button>
      </div>
    </form>
  );
}
