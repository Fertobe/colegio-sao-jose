'use client';

import { useRef, useState } from 'react';

type ApiResp = { ok: boolean; id?: string | null; error?: string };

export default function ContactForm({ className = '' }: { className?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'fail'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg(null);

    const fd = new FormData(e.currentTarget);

    // Honeypot anti-spam: se o campo "website" vier preenchido, ignoramos
    if ((fd.get('website') as string) ?? '') {
      setStatus('ok');
      formRef.current?.reset();
      return;
    }

    const payload = {
      name: String(fd.get('name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      message: String(fd.get('message') || '').trim(),
    };

    try {
      const r = await fetch('/api/mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: ApiResp = await r.json();

      if (data.ok) {
        setStatus('ok');
        formRef.current?.reset();
      } else {
        setStatus('fail');
        setErrorMsg(data.error || 'Falha ao enviar. Tente novamente.');
      }
    } catch (err: any) {
      setStatus('fail');
      setErrorMsg(String(err?.message || err));
    }
  }

  const isSending = status === 'sending';

  return (
    <form ref={formRef} onSubmit={onSubmit} className={className} noValidate>
      {/* Feedback */}
      {status === 'ok' && (
        <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-green-800 ring-1 ring-green-200">
          Mensagem enviada! Em breve entraremos em contato.
        </div>
      )}
      {status === 'fail' && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-red-800 ring-1 ring-red-200">
          Ocorreu um erro ao enviar. {errorMsg}
        </div>
      )}

      {/* Nome */}
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="name">
          Seu nome*
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none ring-brand-200 focus:border-brand-400 focus:ring-2"
          placeholder="Ex.: Maria Silva"
          disabled={isSending}
        />
      </div>

      {/* E-mail */}
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">
          Seu e-mail*
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none ring-brand-200 focus:border-brand-400 focus:ring-2"
          placeholder="voce@gmail.com"
          disabled={isSending}
        />
      </div>

      {/* Telefone (opcional) */}
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="phone">
          Telefone (opcional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none ring-brand-200 focus:border-brand-400 focus:ring-2"
          placeholder="(42) 99999-9999"
          disabled={isSending}
        />
      </div>

      {/* Mensagem */}
      <div className="mb-6">
        <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="message">
          Mensagem*
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none ring-brand-200 focus:border-brand-400 focus:ring-2"
          placeholder="Como podemos ajudar?"
          disabled={isSending}
        />
      </div>

      {/* Honeypot escondido */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Não preencher</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={isSending}
        className="inline-flex items-center justify-center rounded-full bg-brand-700 px-6 py-3 font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSending ? 'Enviando…' : 'Enviar mensagem'}
      </button>
    </form>
  );
}
