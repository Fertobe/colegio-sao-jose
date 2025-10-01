// app/diferenciais/genio-das-financas/ObjectAnimation.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { silkaBold } from "../../fonts";

type ID = 0 | 1 | 2 | 3 | 4;

const STAGE: Record<ID, string> = {
  0: "/genio/anim/Stage_0.webp",
  1: "/genio/anim/Stage_1.webp",
  2: "/genio/anim/Stage_2.webp",
  3: "/genio/anim/Stage_3.webp",
  4: "/genio/anim/Stage_4.webp",
};

const CENTER: Record<Exclude<ID, 0>, { icon: string; lines: string[] }> = {
  1: { icon: "/genio/anim/icon_branco_1.webp", lines: ["Planejamento", "Financeiro"] },
  2: { icon: "/genio/anim/icon_branco_2.webp", lines: ["Sustentabilidade"] },
  3: { icon: "/genio/anim/icon_branco_3.webp", lines: ["Autonomia e tomada", "de decisão", "consciente"] },
  4: { icon: "/genio/anim/icon_branco_4.webp", lines: ["Empreendedorismo e", "Projeto de Vida"] },
};

const POS: Record<Exclude<ID, 0>, { top: string; left: string }> = {
  1: { top: "50%", left: "6%" },
  2: { top: "6%", left: "50%" },
  3: { top: "94%", left: "50%" },
  4: { top: "50%", left: "94%" },
};

const TITLE_CLASSES =
  "mx-auto text-center font-extrabold text-white leading-[1.15] tracking-[-0.015em] " +
  "text-[22px] sm:text-[24px] md:text-[28px] lg:text-[30px]";

const FADE_MS = 220; // duração do cross-fade

export default function ObjectAnimation({ initial = 0 }: { initial?: ID }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Estado de intenção (hover/click)
  const [active, setActive] = useState<ID>(initial);
  const [hovered, setHovered] = useState<ID | null>(null);
  const current: ID = (hovered ?? active) as ID;

  // Pré-carregamento
  const stageSrcs = useMemo(() => Object.values(STAGE), []);
  const iconSrcs  = useMemo(() => Object.values(CENTER).map(c => c.icon), []);
  const [decoded, setDecoded] = useState<Record<ID, boolean>>({
    0: false, 1: false, 2: false, 3: false, 4: false,
  });

  useEffect(() => {
    let alive = true;
    const preload = async (src: string) => {
      try {
        const img = new Image();
        img.decoding = "async";
        img.loading = "eager";
        img.src = src;
        if (typeof img.decode === "function") await img.decode();
      } catch {}
    };
    (async () => {
      await Promise.all(stageSrcs.map(preload));
      await Promise.all(iconSrcs.map(preload));
      if (!alive) return;
      setDecoded({ 0: true, 1: true, 2: true, 3: true, 4: true });
    })();
    return () => { alive = false; };
  }, [stageSrcs, iconSrcs]);

  // === Cross-fade: mantém a imagem anterior até a próxima ficar pronta ===
  const [topId, setTopId]     = useState<ID>(initial);  // camada de cima (alvo)
  const [bottomId, setBottom] = useState<ID | null>(null); // camada de baixo (anterior)
  const [topVisible, setTopVisible] = useState<boolean>(true); // controla transição

  // Troca a intenção -> prepara cross-fade
  useEffect(() => {
    if (current === topId) return;

    // Se a próxima ainda não está decodificada, espera (este effect roda de novo quando 'decoded' muda)
    if (!decoded[current]) return;

    // 1) fixa a atual como "bottom"
    setBottom(topId);
    // 2) coloca a nova no topo, mas invisível (opacity 0)
    setTopId(current);
    setTopVisible(false);

    // 3) num próximo frame, liga o fade (opacity 1)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setTopVisible(true));
    });
  }, [current, decoded, topId]);

  // Quando o fade termina, removemos a de baixo
  const onFadeEnd = () => setBottom(null);

  // Reset para o centro ao sair do bloco/foco
  const resetToCenter = () => { setHovered(null); setActive(0); };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onFocusOut = (e: FocusEvent) => {
      if (el && !el.contains(e.relatedTarget as Node)) resetToCenter();
    };
    el.addEventListener("focusout", onFocusOut as any);
    return () => el.removeEventListener("focusout", onFocusOut as any);
  }, []);

  return (
    <div
      ref={rootRef}
      className={`relative mx-auto w-full max-w-[640px] select-none ${silkaBold.variable}`}
      style={{ fontFamily: "var(--font-silka-bold), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
      onMouseLeave={resetToCenter}
    >
      {/* Contêiner com aspecto fixo: elimina qualquer pulo/CLS */}
      <div className="relative w-full aspect-square will-change-[opacity,transform]">
        {/* camada de baixo (anterior) */}
        {bottomId !== null && (
          <img
            key={`bottom-${bottomId}`}
            src={STAGE[bottomId]}
            alt=""
            className="absolute inset-0 h-full w-full object-contain"
            draggable={false}
            decoding="async"
          />
        )}

        {/* camada de cima (alvo) com fade controlado */}
        <img
          key={`top-${topId}`}
          src={STAGE[topId]}
          alt="Diagrama — estado atual"
          className="absolute inset-0 h-full w-full object-contain transition-opacity"
          style={{ opacity: topVisible ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
          draggable={false}
          decoding="async"
          loading={topId === 0 ? "eager" : "lazy"}
          fetchPriority={topId === 0 ? "high" : "auto"}
          onLoad={() => {
            // garante que, se vier a carregar “em cima da hora”, o fade entra
            if (!topVisible) {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => setTopVisible(true));
              });
            }
          }}
          onTransitionEnd={onFadeEnd}
        />

        {/* Overlay textual (não capta eventos) */}
        {topId !== 0 && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6" aria-live="polite">
            <div className="text-center">
              <img
                src={CENTER[topId as 1 | 2 | 3 | 4].icon}
                alt=""
                className="mx-auto mb-3 h-[44px] w-[44px] sm:h-[48px] sm:w-[48px] md:h-[56px] md:w-[56px]"
                draggable={false}
                decoding="async"
              />
              <div className={`${TITLE_CLASSES} max-w-[420px] md:max-w-[460px]`}>
                {CENTER[topId as 1 | 2 | 3 | 4].lines.map((line, i) => (
                  <span key={i} className="block" style={{ animation: `rise-soft 520ms cubic-bezier(0.22,0.7,0.25,1) both`, animationDelay: `${i * 90}ms` }}>
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Hotspots */}
        {(Object.keys(POS) as unknown as (1 | 2 | 3 | 4)[]).map((id) => (
          <button
            key={id}
            type="button"
            aria-label={`Ir para estágio ${id}`}
            aria-pressed={active === id}
            className="absolute z-20 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-white/60"
            style={{ top: POS[id].top, left: POS[id].left }}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(id)}
            onBlur={() => setHovered(null)}
            onClick={() => setActive(id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(id);
              }
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes rise-soft { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
