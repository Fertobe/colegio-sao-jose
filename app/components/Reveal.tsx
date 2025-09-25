"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  from?: "right" | "left" | "up" | "down";
  delay?: number;       // ms
  duration?: number;    // ms
  once?: boolean;
  threshold?: number;   // 0..1
  className?: string;
  children: React.ReactNode;
};

export default function Reveal({
  from = "right",
  delay = 0,
  duration = 700,
  once = true,
  threshold = 0.2,
  className = "",
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const prefersReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

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
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  const base =
    "transform-gpu will-change-[transform,opacity] transition-[transform,opacity] ease-out";

  // aplica deslocamento inicial só no eixo necessário
  const hidden =
    from === "right"
      ? "translate-x-10 md:translate-x-16 opacity-0"
      : from === "left"
      ? "-translate-x-10 md:-translate-x-16 opacity-0"
      : from === "up"
      ? "-translate-y-8 opacity-0"
      : "translate-y-8 opacity-0";

  // quando visível, zera só o eixo animado (evita sobrescrever -translate-y-1/2)
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
