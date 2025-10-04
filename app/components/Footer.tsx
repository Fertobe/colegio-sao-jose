// app/components/Footer.tsx
import Link from "next/link";
import BrandIcon from "./icons/BrandIcon";

const YEAR = new Date().getFullYear();

/**
 * Vars de ambiente (todas opcionais; têm fallback seguro):
 * - NEXT_PUBLIC_CONTATO_EMAIL
 * - NEXT_PUBLIC_CONTATO_TEL_E164 (ex: +5542998276516)
 * - NEXT_PUBLIC_CONTATO_TEL_DISPLAY (ex: +55 (42) 99827-6516)
 * - NEXT_PUBLIC_ENDERECO (ex: "R. Cândido de Abreu, 1636 - Prudentópolis, PR, 84400-000")
 * - NEXT_PUBLIC_MAPS_URL (se quiser forçar uma URL específica do Maps)
 * - NEXT_PUBLIC_SOCIAL_YOUTUBE / _INSTAGRAM / _FACEBOOK / _TIKTOK
 */
const EMAIL = process.env.NEXT_PUBLIC_CONTATO_EMAIL ?? "contato@colegiosaojose.com.br";
const TEL_E164 = process.env.NEXT_PUBLIC_CONTATO_TEL_E164 ?? "+5542998276516";
const TEL_DISPLAY = process.env.NEXT_PUBLIC_CONTATO_TEL_DISPLAY ?? "+55 (42) 99827-6516";

const ADDRESS =
  process.env.NEXT_PUBLIC_ENDERECO ??
  "R. Cândido de Abreu, 1636 - Prudentópolis, PR, 84400-000";

const MAPS_URL =
  process.env.NEXT_PUBLIC_MAPS_URL ??
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

const YOUTUBE = process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE ?? "https://www.youtube.com/";
const INSTAGRAM = process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "https://www.instagram.com/";
const FACEBOOK = process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? "https://www.facebook.com/";
const TIKTOK = process.env.NEXT_PUBLIC_SOCIAL_TIKTOK ?? "https://www.tiktok.com/";

// WhatsApp com mensagem padrão
const WAPP = `https://wa.me/${TEL_E164.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Olá! Tenho uma dúvida."
)}`;

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-3">
        {/* Coluna 1 — Logo + tagline + redes */}
        <div>
          <Link href="/" prefetch={false} aria-label="Voltar para a página inicial">
            <img
              src="/logo.svg"
              alt="Colégio São José"
              className="h-8 w-auto"
              loading="lazy"
              decoding="async"
              width={144}
              height={48}
              draggable={false}
            />
          </Link>

          <p className="mt-3 text-sm text-gray-600">
            Colégio São José — Educação para a vida.
          </p>

          {/* Redes sociais */}
          <div className="mt-4 flex items-center gap-3">
            {/* YouTube */}
            <a
              href={YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube do Colégio São José"
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 ring-2 ring-brand-300 text-brand-200 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-brand-200/80"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a4 4 0 0 0-2.8-2.8C18.7 3 12 3 12 3s-6.7 0-8.7.4A4 4 0 0 0 .5 6.2 40.6 40.6 0 0 0 0 12a40.6 40.6 0 0 0 .5 5.8 4 4 0 0 0 2.8 2.8C5.3 21 12 21 12 21s6.7 0 8.7-.4a4 4 0 0 0 2.8-2.8c.3-1.9.5-3.8.5-5.8s-.2-3.9-.5-5.8ZM9.8 15.5V8.5L15.5 12l-5.7 3.5Z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do Colégio São José"
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 ring-2 ring-brand-300 text-brand-200 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-brand-200/80"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href={FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook do Colégio São José"
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 ring-2 ring-brand-300 text-brand-200 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-brand-200/80"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.6-1.5H16V5.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.1v7h3.4Z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href={TIKTOK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok do Colégio São José"
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 ring-2 ring-brand-300 text-brand-200 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-brand-200/80"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M21 8.6a6.9 6.9 0 0 1-4.6-1.7v6.2a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v3a3 3 0 1 0 2.1 2.9V2h3a6.9 6.9 0 0 0 4.5 4.1V8.6Z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Coluna 2 — Institucional */}
        <div>
          <h3 className="font-semibold text-brand-600">Institucional</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/institucional/nossa-historia" prefetch={false}>Sobre</Link>
            </li>
            <li>
              <Link href="/noticias" prefetch={false}>Notícias</Link>
            </li>
            <li>
              <Link href="/politica-de-privacidade" prefetch={false}>Política de Privacidade</Link>
            </li>
            <li>
              <Link href="/politica-de-cookies" prefetch={false}>Política de Cookies</Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3 — Contato */}
        <div>
          <h3 className="font-semibold text-brand-600">Contato</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={`mailto:${EMAIL}`} aria-label={`Enviar e-mail para ${EMAIL}`}>
                {EMAIL}
              </a>
            </li>
            <li>
              <a href={`tel:${TEL_E164}`} aria-label={`Ligar para ${TEL_DISPLAY}`}>
                {TEL_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver rota para ${ADDRESS}`}
                className="inline-flex items-center gap-2"
                title={ADDRESS}
              >
                <BrandIcon name="pinHome" className="h-4 w-4 text-brand-700" />
                <span>Como chegar</span>
              </a>
            </li>
            <li>
              <Link href="/contato" prefetch={false}>Fale conosco</Link>
            </li>
          </ul>

          {/* CTA rápido (WhatsApp + Agendamento) */}
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={WAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand-600 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
              aria-label="Abrir conversa no WhatsApp"
            >
              <BrandIcon name="whatsapp" color="currentColor" className="h-4 w-4" />
              WhatsApp
            </a>
            <Link
              href="/agendamento"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Agendar visita
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-gray-500">
        © {YEAR} Colégio São José — Todos os direitos reservados.
      </div>
    </footer>
  );
}
