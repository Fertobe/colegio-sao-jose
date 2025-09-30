"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BrandIcon from "./icons/BrandIcon";

export default function Header() {
  // ===== Desktop dropdowns =====
  const [instOpen, setInstOpen] = useState(false);
  const [ensOpen, setEnsOpen] = useState(false);

  const instBtnRef = useRef<HTMLButtonElement | null>(null);
  const instMenuRef = useRef<HTMLDivElement | null>(null);
  const ensBtnRef = useRef<HTMLButtonElement | null>(null);
  const ensMenuRef = useRef<HTMLDivElement | null>(null);

  // timers de fechamento suave
  const instCloseTimer = useRef<number | null>(null);
  const ensCloseTimer  = useRef<number | null>(null);
  const cancelInstClose = () => { if (instCloseTimer.current) { window.clearTimeout(instCloseTimer.current); instCloseTimer.current = null; } };
  const cancelEnsClose  = () => { if (ensCloseTimer.current)  { window.clearTimeout(ensCloseTimer.current);  ensCloseTimer.current  = null; } };
  const scheduleInstClose = () => { cancelInstClose(); instCloseTimer.current = window.setTimeout(() => setInstOpen(false), 140); };
  const scheduleEnsClose  = () => { cancelEnsClose();  ensCloseTimer.current  = window.setTimeout(() => setEnsOpen(false), 140); };

  const closeAll = () => {
    setInstOpen(false);
    setEnsOpen(false);
  };
  const openInst = (value: boolean) => {
    setEnsOpen(false);
    setInstOpen(value);
  };
  const openEns = (value: boolean) => {
    setInstOpen(false);
    setEnsOpen(value);
  };

  // ===== Mobile menu (drawer) =====
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileInstOpen, setMobileInstOpen] = useState(false);
  const [mobileEnsOpen, setMobileEnsOpen] = useState(false);

  const toggleMobile = (val?: boolean) => {
    const v = typeof val === "boolean" ? val : !mobileOpen;
    setMobileOpen(v);
    if (!v) {
      setMobileInstOpen(false);
      setMobileEnsOpen(false);
    }
  };

  // ESC fecha tudo + devolve foco ao gatilho do dropdown
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (mobileOpen) toggleMobile(false);
        if (instOpen) {
          setInstOpen(false);
          instBtnRef.current?.focus();
        }
        if (ensOpen) {
          setEnsOpen(false);
          ensBtnRef.current?.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, instOpen, ensOpen]);

  // Clique-fora fecha dropdowns (desktop)
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      const t = e.target as Node;
      const clickedInst =
        instBtnRef.current?.contains(t) || instMenuRef.current?.contains(t);
      const clickedEns =
        ensBtnRef.current?.contains(t) || ensMenuRef.current?.contains(t);
      if (!clickedInst) setInstOpen(false);
      if (!clickedEns) setEnsOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Trava scroll quando o drawer abre
  useEffect(() => {
    const { body } = document;
    if (mobileOpen) {
      const prev = body.style.overflow;
      body.style.overflow = "hidden";
      return () => { body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  // limpa timers se o componente desmontar
  useEffect(() => {
    return () => {
      cancelInstClose();
      cancelEnsClose();
    };
  }, []);

  // Foco primeiro item (desktop) com ↓
  const focusFirstInst = () => {
    instMenuRef.current?.querySelector<HTMLElement>('[data-inst-item="1"]')?.focus();
  };
  const focusFirstEns = () => {
    ensMenuRef.current?.querySelector<HTMLElement>('[data-ens-item="1"]')?.focus();
  };

  // Helper: fechar drawer ao navegar
  const closeMobileAnd = (fn?: () => void) => () => {
    toggleMobile(false);
    fn?.();
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* ===== LADO ESQUERDO (MOBILE: hambúrguer + logo) ===== */}
        <div className="flex items-center">
          {/* Hambúrguer — ESQUERDA no mobile */}
          <button
            type="button"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-gray-300 md:hidden"
            onClick={() => toggleMobile()}
          >
            {!mobileOpen ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            )}
          </button>

          {/* Logo — deslocada um pouco à direita no mobile */}
          <Link
            href="/"
            className="ml-2 flex shrink-0 items-center gap-3 md:ml-0"
            aria-label="Página inicial"
            onMouseEnter={closeAll}
            onFocus={closeAll}
            onClick={closeMobileAnd()}
          >
            <img
              src="/logo.svg"
              alt="Logomarca do Colégio São José"
              className="h-10 w-auto md:h-12"
            />
            <div className="leading-none">
              <span className="block text-[10px] font-semibold tracking-[0.14em] text-gray-600 md:text-xs">
                COLÉGIO
              </span>
              <span className="block text-sm font-bold text-gray-900 md:text-lg lg:text-xl">
                SÃO JOSÉ
              </span>
            </div>
          </Link>
        </div>

        {/* ===== NAV DESKTOP (centro/direita) ===== */}
        <nav aria-label="principal" className="hidden items-center gap-6 text-sm md:flex">
          {/* DROPDOWN: INSTITUCIONAL */}
          <div
            className="relative"
            onMouseEnter={() => { cancelInstClose(); openInst(true); }}
            onMouseLeave={scheduleInstClose}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setInstOpen(false);
            }}
          >
            <button
              ref={instBtnRef}
              type="button"
              aria-haspopup="menu"
              aria-expanded={instOpen}
              aria-controls="menu-institucional"
              className="inline-flex items-center gap-1 rounded hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/40"
              onClick={() => openInst(!instOpen)}
              onFocus={() => openInst(true)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  openInst(true);
                  setTimeout(focusFirstInst, 0);
                }
              }}
            >
              Institucional
              <svg
                className={`h-4 w-4 transition-transform ${instOpen ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div
              id="menu-institucional"
              ref={instMenuRef}
              role="menu"
              aria-label="submenu institucional"
              tabIndex={-1}
              className={`absolute left-0 top-full z-50 mt-2 w-64 rounded-2xl border bg-white p-2 shadow-lg transition ${instOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
              onMouseEnter={() => { cancelInstClose(); openInst(true); }}
            >
              <Link
                href="/institucional/nossa-historia"
                role="menuitem"
                data-inst-item="1"
                className="block rounded-lg px-4 py-2.5 text-[0.95rem] text-gray-800 hover:bg-brand-50 hover:text-brand-700 focus:bg-brand-50 focus:outline-none"
              >
                Nossa História
              </Link>
              <Link
                href="/institucional/filosofia"
                role="menuitem"
                data-inst-item="1"
                className="block rounded-lg px-4 py-2.5 text-[0.95rem] text-gray-800 hover:bg-brand-50 hover:text-brand-700 focus:bg-brand-50 focus:outline-none"
              >
                Nossa Filosofia
              </Link>
              <Link
                href="/institucional/noticias"
                role="menuitem"
                data-inst-item="1"
                className="block rounded-lg px-4 py-2.5 text-[0.95rem] text-gray-800 hover:bg-brand-50 hover:text-brand-700 focus:bg-brand-50 focus:outline-none"
              >
                Notícias
              </Link>
            </div>
          </div>

          {/* DROPDOWN: ENSINO */}
          <div
            className="relative"
            onMouseEnter={() => { cancelEnsClose(); openEns(true); }}
            onMouseLeave={scheduleEnsClose}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setEnsOpen(false);
            }}
          >
            <button
              ref={ensBtnRef}
              type="button"
              aria-haspopup="menu"
              aria-expanded={ensOpen}
              aria-controls="menu-ensino"
              className="inline-flex items-center gap-1 rounded hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/40"
              onClick={() => openEns(!ensOpen)}
              onFocus={() => openEns(true)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  openEns(true);
                  setTimeout(focusFirstEns, 0);
                }
              }}
            >
              Ensino
              <svg
                className={`h-4 w-4 transition-transform ${ensOpen ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div
              id="menu-ensino"
              ref={ensMenuRef}
              role="menu"
              aria-label="submenu ensino"
              tabIndex={-1}
              className={`absolute left-0 top-full z-50 mt-2 w-64 rounded-2xl border bg-white p-2 shadow-lg transition ${ensOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
              onMouseEnter={() => { cancelEnsClose(); openEns(true); }}
            >
              <Link
                href="/ensino/educacao-infantil"
                role="menuitem"
                data-ens-item="1"
                className="block rounded-lg px-4 py-2.5 text-[0.95rem] text-gray-800 hover:bg-brand-50 hover:text-brand-700 focus:bg-brand-50 focus:outline-none"
              >
                Educação Infantil
              </Link>
              <Link
                href="/ensino/ensino-fundamental"
                role="menuitem"
                data-ens-item="1"
                className="block rounded-lg px-4 py-2.5 text-[0.95rem] text-gray-800 hover:bg-brand-50 hover:text-brand-700 focus:bg-brand-50 focus:outline-none"
              >
                Ensino Fundamental
              </Link>
              <Link
                href="/ensino/ensino-medio"
                role="menuitem"
                data-ens-item="1"
                className="block rounded-lg px-4 py-2.5 text-[0.95rem] text-gray-800 hover:bg-brand-50 hover:text-brand-700 focus:bg-brand-50 focus:outline-none"
              >
                Ensino Médio
              </Link>
            </div>
          </div>

          {/* Itens simples */}
          <Link href="/matriculas" className="hover:text-brand-600" onMouseEnter={closeAll} onFocus={closeAll}>
            Matrículas
          </Link>
          <Link href="/agendamento" className="hover:text-brand-600" onMouseEnter={closeAll} onFocus={closeAll}>
            Agendamento
          </Link>
          <Link href="/contato" className="hover:text-brand-600" onMouseEnter={closeAll} onFocus={closeAll}>
            Contato
          </Link>

          {/* WhatsApp (desktop) */}
          <a
            href="https://wa.me/5542998276516"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-brand-600 px-4 py-2 text-brand-600 hover:bg-brand-50"
            aria-label="Abrir conversa no WhatsApp"
            onMouseEnter={closeAll}
            onFocus={closeAll}
          >
            <BrandIcon name="whatsapp" color="currentColor" className="h-4 w-4" />
            <span className="font-medium">WhatsApp</span>
          </a>
        </nav>

        {/* ===== Ação à direita no mobile: WhatsApp (fora da sanfona) ===== */}
        <a
          href="https://wa.me/5542998276516"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-brand-600 px-3 py-1 text-brand-600 md:hidden"
          aria-label="Abrir WhatsApp"
          onClick={closeMobileAnd()}
        >
          <BrandIcon name="whatsapp" color="currentColor" className="h-4 w-4" />
          <span className="font-medium">WhatsApp</span>
        </a>
      </div>

      {/* ===== Drawer Mobile (ESQUERDA) ===== */}
      <div id="mobile-menu" className={`md:hidden ${mobileOpen ? "" : "pointer-events-none"}`}>
        {/* backdrop */}
        <div
          className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => toggleMobile(false)}
          aria-hidden="true"
        />
        {/* painel */}
        <aside
          className={`fixed left-0 top-0 z-50 h-full w-[86%] max-w-[360px] transform bg-white shadow-xl transition-transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b px-4 py-3">
            <span className="text-sm font-semibold text-gray-700">Menu</span>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md ring-1 ring-gray-300"
              onClick={() => toggleMobile(false)}
              aria-label="Fechar menu"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="px-2 py-2 text-[15px]">
            {/* INSTITUCIONAL (accordion) */}
            <div className="px-2">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-2 py-3 font-medium"
                aria-expanded={mobileInstOpen}
                onClick={() => setMobileInstOpen((v) => !v)}
              >
                <span>Institucional</span>
                <svg
                  className={`h-5 w-5 transition-transform ${mobileInstOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all ${mobileInstOpen ? "max-h-64" : "max-h-0"}`}>
                <ul className="space-y-1 pb-2 pl-3">
                  <li>
                    <Link href="/institucional/nossa-historia" onClick={closeMobileAnd()} className="block rounded-md px-2 py-2 text-gray-800 hover:bg-gray-100">
                      Nossa História
                    </Link>
                  </li>
                  <li>
                    <Link href="/institucional/filosofia" onClick={closeMobileAnd()} className="block rounded-md px-2 py-2 text-gray-800 hover:bg-gray-100">
                      Nossa Filosofia
                    </Link>
                  </li>
                  <li>
                    <Link href="/institucional/noticias" onClick={closeMobileAnd()} className="block rounded-md px-2 py-2 text-gray-800 hover:bg-gray-100">
                      Notícias
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* ENSINO (accordion) */}
            <div className="px-2">
              <button
                type="button"
                className="mt-1 flex w-full items-center justify-between rounded-lg px-2 py-3 font-medium"
                aria-expanded={mobileEnsOpen}
                onClick={() => setMobileEnsOpen((v) => !v)}
              >
                <span>Ensino</span>
                <svg
                  className={`h-5 w-5 transition-transform ${mobileEnsOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all ${mobileEnsOpen ? "max-h-64" : "max-h-0"}`}>
                <ul className="space-y-1 pb-2 pl-3">
                  <li>
                    <Link href="/ensino/educacao-infantil" onClick={closeMobileAnd()} className="block rounded-md px-2 py-2 text-gray-800 hover:bg-gray-100">
                      Educação Infantil
                    </Link>
                  </li>
                  <li>
                    <Link href="/ensino/ensino-fundamental" onClick={closeMobileAnd()} className="block rounded-md px-2 py-2 text-gray-800 hover:bg-gray-100">
                      Ensino Fundamental
                    </Link>
                  </li>
                  <li>
                    <Link href="/ensino/ensino-medio" onClick={closeMobileAnd()} className="block rounded-md px-2 py-2 text-gray-800 hover:bg-gray-100">
                      Ensino Médio
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Links simples */}
            <div className="mt-1 space-y-1 px-2">
              <Link href="/matriculas" onClick={closeMobileAnd()} className="block rounded-md px-2 py-2 text-gray-800 hover:bg-gray-100">
                Matrículas
              </Link>
              <Link href="/agendamento" onClick={closeMobileAnd()} className="block rounded-md px-2 py-2 text-gray-800 hover:bg-gray-100">
                Agendamento
              </Link>
              <Link href="/contato" onClick={closeMobileAnd()} className="block rounded-md px-2 py-2 text-gray-800 hover:bg-gray-100">
                Contato
              </Link>
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
}
