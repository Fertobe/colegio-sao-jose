"use client";
import * as React from "react";

export default function AgendamentoForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<{ ok: boolean; msg: string } | null>(null);
  const [tstart] = React.useState(() => Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    // honeypot
    if (String(data.get("website") || "").trim()) {
      setStatus({ ok: true, msg: "Recebido." });
      return;
    }

    const nome = String(data.get("nome") || "").trim();
    const email = String(data.get("email") || "").trim();
    const telefone = String(data.get("telefone") || "").trim();
    const dataPref = String(data.get("data") || "").trim();
    const periodo = String(data.get("periodo") || "").trim();
    const serie = String(data.get("serie") || "").trim();
    const obs = String(data.get("observacoes") || "").trim();

    const message =
      [
        "Pedido de agendamento de visita",
        `Data preferida: ${dataPref || "-"}`,
        `Período: ${periodo || "-"}`,
        `Série/ano do aluno: ${serie || "-"}`,
        "",
        "Observações:",
        obs || "-",
      ].join("\n");

    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nome,
          email,
          phone: telefone,
          subject: `Agendamento de visita — ${nome}`,
          message,
          meta: {
            tipo: "agendamento",
            t_dwell_ms: Date.now() - tstart,
            url: typeof window !== "undefined" ? window.location.href : "",
          },
        }),
      });

      const json = await res.json();
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Falha no envio");
      }
      setStatus({ ok: true, msg: "Agendamento enviado! Vamos responder em breve." });
      form.reset();
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message || "Erro ao enviar." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Não preencha</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-brand-900">Nome completo *</label>
          <input name="nome" required maxLength={120} className="mt-1 w-full rounded-xl border border-brand-200 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-900">E-mail *</label>
          <input type="email" name="email" required maxLength={160} className="mt-1 w-full rounded-xl border border-brand-200 px-3 py-2" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm font-semibold text-brand-900">Telefone</label>
          <input name="telefone" maxLength={40} className="mt-1 w-full rounded-xl border border-brand-200 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-900">Data preferida</label>
          <input type="date" name="data" className="mt-1 w-full rounded-xl border border-brand-200 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-900">Período</label>
          <select name="periodo" defaultValue="" className="mt-1 w-full rounded-xl border border-brand-200 px-3 py-2">
            <option value="">Indiferente</option>
            <option>Manhã</option>
            <option>Tarde</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-900">Série/Ano do aluno</label>
        <input name="serie" maxLength={80} className="mt-1 w-full rounded-xl border border-brand-200 px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-brand-900">Observações</label>
        <textarea name="observacoes" rows={4} maxLength={1000} className="mt-1 w-full rounded-xl border border-brand-200 px-3 py-2" />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`rounded-full px-6 py-3 font-semibold text-white ${submitting ? "bg-brand-600 opacity-80" : "bg-brand-700 hover:bg-brand-600"}`}
      >
        {submitting ? "Enviando…" : "Solicitar agendamento"}
      </button>

      {status && (
        <p className={`text-sm ${status.ok ? "text-green-700" : "text-red-700"}`}>{status.msg}</p>
      )}
    </form>
  );
}
