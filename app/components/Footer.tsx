// app/components/Footer.tsx
import Link from "next/link";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-3">
        {/* Coluna 1 — Logo + tagline + redes */}
        <div>
          <Link href="/" aria-label="Voltar para a página inicial">
            <img
              src="/logo.svg"
              alt="Colégio São José"
              className="h-8 w-auto"
              loading="lazy"
              decoding="async"
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
              href="https://www.youtube.com/" // TODO: troque pelo link real
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube do Colégio São José"
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 ring-2 ring-brand-300 text-brand-200 transition
                         hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-brand-200/80"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a4 4 0 0 0-2.8-2.8C18.7 3 12 3 12 3s-6.7 0-8.7.4A4 4 0 0 0 .5 6.2 40.6 40.6 0 0 0 0 12a40.6 40.6 0 0 0 .5 5.8 4 4 0 0 0 2.8 2.8C5.3 21 12 21 12 21s6.7 0 8.7-.4a4 4 0 0 0 2.8-2.8c.3-1.9.5-3.8.5-5.8s-.2-3.9-.5-5.8ZM9.8 15.5V8.5L15.5 12l-5.7 3.5Z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/" // TODO: troque pelo link real
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do Colégio São José"
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 ring-2 ring-brand-300 text-brand-200 transition
                         hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-brand-200/80"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/" // TODO: troque pelo link real
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook do Colégio São José"
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 ring-2 ring-brand-300 text-brand-200 transition
                         hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-brand-200/80"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.6-1.5H16V5.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.1v7h3.4Z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/" // TODO: troque pelo link real
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok do Colégio São José"
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 ring-2 ring-brand-300 text-brand-200 transition
                         hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-brand-200/80"
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
              <Link href="/institucional/nossa-historia">Sobre</Link>
            </li>
            <li>
              <Link href="/politica-de-privacidade">Política de Privacidade</Link>
            </li>
            <li>
              <Link href="/politica-de-cookies">Política de Cookies</Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3 — Contato */}
        <div>
          <h3 className="font-semibold text-brand-600">Contato</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="mailto:contato@colegiosaojose.com.br">contato@colegiosaojose.com.br</a>
            </li>
            <li>
              <a href="tel:+5542998276516">+55 (42) 99827-6516</a>
            </li>
            <li>
              <Link href="/contato">Fale conosco</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-gray-500">
        © {YEAR} Colégio São José — Todos os direitos reservados.
      </div>
    </footer>
  );
}
