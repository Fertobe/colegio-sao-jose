"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  from?: "right" | "left" | "up" | "down";
  delay?: number;        // ms
  duration?: number;     // ms
  once?: boolean;
  threshold?: number;    // 0..1
  rootMargin?: string;   // opcional; default igual ao seu
  className?: string;
  children: React.ReactNode;
};

export default function Reveal({
  from = "right",
  delay = 0,
  duration = 700,
  once = true,
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
  className = "",
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // respeita prefers-reduced-motion
    const prefersReduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReduce) {
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    // fallback para ambientes sem IntersectionObserver
    if (typeof window === "undefined" || typeof (window as any).IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            if (once) io.disconnect();
          } else if (!once) {
            setShown(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold, rootMargin]);

  const base =
    "transform-gpu will-change-[transform,opacity] transition-[transform,opacity] ease-out";

  // deslocamento inicial apenas no eixo necessário
  const hidden =
    from === "right"
      ? "translate-x-10 md:translate-x-16 opacity-0"
      : from === "left"
      ? "-translate-x-10 md:-translate-x-16 opacity-0"
      : from === "up"
      ? "-translate-y-8 opacity-0"
      : "translate-y-8 opacity-0";

  // quando visível, zera só o eixo animado (não sobrescreve outros transforms, ex. -translate-y-1/2)
  const shownCls =
    from === "right" || from === "left"
      ? "translate-x-0 opacity-100"
      : "translate-y-0 opacity-100";

  return (
    <div
      ref={ref}
      className={`${base} ${shown ? shownCls : hidden} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}
