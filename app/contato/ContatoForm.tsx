"use client";
import * as React from "react";

export default function ContatoForm({ email }: { email: string }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") || "");
    const assunto = String(data.get("assunto") || "Contato pelo site");
    const tel = String(data.get("telefone") || "");
    const msg = String(data.get("mensagem") || "");

    const subject = encodeURIComponent(`[Site] ${assunto} – ${nome}`);
    const body = encodeURIComponent(
      `Nome: ${nome}\nTelefone: ${tel}\nAssunto: ${assunto}\n\nMensagem:\n${msg}\n`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nome" className="block text-sm font-semibold text-brand-900">
          Nome completo *
        </label>
        <input
          id="nome"
          name="nome"
          required
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
            inputMode="tel"
            placeholder="(42) 9 9999-9999"
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
          className="mt-1 w-full rounded-xl border border-brand-200 bg-white px-3 py-2 outline-none ring-brand-300 focus:ring-2"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-brand-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-600"
      >
        Enviar por e-mail
      </button>
    </form>
  );
}
