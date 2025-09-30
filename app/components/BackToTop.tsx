"use client";

import { useEffect, useState } from "react";

type Props = {
  threshold?: number;
  className?: string;
  iconClass?: string;
  variant?: "brand" | "purple";
  style?: React.CSSProperties;
};

export default function BackToTop({
  threshold = 600,
  className = "",
  iconClass = "",
  variant = "brand",
  style,
}: Props) {
  const [show, setShow] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // controla exibição pelo scroll
  useEffect(() => {
    const onScroll = () => {
      // window.scrollY sempre existe no client
      setShow(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  // detecta prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const update = () => setReduceMotion(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const baseBtn =
    "fixed bottom-6 right-6 z-[60] inline-flex items-center justify-center " +
    "rounded-full p-3 ring-1 transition-colors focus:outline-none focus:ring-2";

  // mantém tua paleta (Home azul por padrão)
  const variantBtn =
    variant === "purple"
      ? "bg-[#7F3A97] text-white hover:bg-[#8E47A4] ring-white/40"
      : "bg-brand-700 text-white hover:bg-brand-600 ring-white/40";

  const btnClasses = `${baseBtn} ${variantBtn} ${className}`.trim();

  if (!show) return null;

  // Safe area para iOS (soma ao bottom/right = 1.5rem das classes Tailwind)
  const safeAreaStyle: React.CSSProperties = {
    marginRight: "max(0px, env(safe-area-inset-right))",
    marginBottom: "max(0px, env(safe-area-inset-bottom))",
  };

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: reduceMotion ? "auto" : "smooth",
        })
      }
      className={btnClasses}
      style={{ ...safeAreaStyle, ...style }}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-5 w-5 ${iconClass || ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
