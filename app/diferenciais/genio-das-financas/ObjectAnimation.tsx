"use client";

import { useEffect, useMemo, useState } from "react";
import { silkaBold } from "../../fonts"; // usa a Silka Bold

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

export default function ObjectAnimation({ initial = 0 }: { initial?: ID }) {
  const [active, setActive] = useState<ID>(initial);
  const [hovered, setHovered] = useState<ID | null>(null);
  const current: ID = (hovered ?? active) as ID;

  // ---- PRELOAD: aquece cache na 1ª montagem (sem mudar layout) ----
  const allStageSrcs = useMemo(() => Object.values(STAGE), []);
  const allIconSrcs = useMemo(() => Object.values(CENTER).map((c) => c.icon), []);
  const [preloaded, setPreloaded] = useState(false);

  useEffect(() => {
    let alive = true;

    const preload = async (src: string) => {
      try {
        const img = new Image();
        img.decoding = "async";
        img.loading = "eager";
        img.src = src;
        // decode() evita “flash” quando a gente troca o src depois
        if (typeof img.decode === "function") {
          await img.decode();
        }
      } catch {
        /* ignora falhas (offline etc.) */
      }
    };

    (async () => {
      // carrega em paralelo (stages primeiro, depois ícones)
      await Promise.all(allStageSrcs.map(preload));
      await Promise.all(allIconSrcs.map(preload));
      if (alive) setPreloaded(true);
    })();

    return () => {
      alive = false;
    };
  }, [allStageSrcs, allIconSrcs]);

  // ---- Fade curto quando a imagem do “Stage” terminou de carregar ----
  const [stageLoaded, setStageLoaded] = useState(false);
  useEffect(() => {
    setStageLoaded(false); // sempre que muda de estágio, espera onLoad
  }, [current]);

  return (
    <div
      className={`relative mx-auto w-full max-w-[640px] select-none ${silkaBold.variable}`}
      style={{
        fontFamily:
          "var(--font-silka-bold), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      }}
    >
      <img
        src={STAGE[current]}
        alt="Diagrama — estado atual"
        className={`block h-auto w-full transition-opacity duration-200 ${
          stageLoaded ? "opacity-100" : "opacity-0"
        }`}
        draggable={false}
        decoding="async"
        // prioridade alta só para o estado inicial (evita travadinha no 1º paint)
        loading={current === 0 ? "eager" : "lazy"}
        fetchPriority={current === 0 ? "high" : "auto"}
        onLoad={() => setStageLoaded(true)}
      />

      {current !== 0 && (
        <div
          key={current}
          className="overlay pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6"
          aria-live="polite"
        >
          <div className="text-center">
            <img
              src={CENTER[current as 1 | 2 | 3 | 4].icon}
              alt=""
              className="icon mx-auto mb-3 h-[44px] w-[44px] sm:h-[48px] sm:w-[48px] md:h-[56px] md:w-[56px]"
              draggable={false}
              decoding="async"
            />
            <div className={`${TITLE_CLASSES} max-w-[420px] md:max-w-[460px]`}>
              {CENTER[current as 1 | 2 | 3 | 4].lines.map((line, i) => (
                <span key={i} className="line block" style={{ animationDelay: `${i * 90}ms` }}>
                  {line}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

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
          onClick={() => setActive(id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActive(id);
            }
          }}
        />
      ))}

      <style jsx>{`
        /* animação suave usada no texto E no ícone */
        @keyframes rise-soft {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .overlay .icon {
          animation: rise-soft 420ms cubic-bezier(0.22, 0.7, 0.25, 1) both;
        }
        .overlay .line {
          animation: rise-soft 520ms cubic-bezier(0.22, 0.7, 0.25, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .overlay .icon,
          .overlay .line {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
