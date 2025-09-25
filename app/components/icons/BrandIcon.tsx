// app/components/BrandIcon.tsx
"use client";

import * as React from "react";
import {
  siWhatsapp,
  siInstagram,
  siFacebook,
  siYoutube,
} from "simple-icons/icons";

/** Ícones de MARCA (simple-icons) — compatível com a Home */
const BRAND_MAP = {
  whatsapp: siWhatsapp,
  instagram: siInstagram,
  facebook: siFacebook,
  youtube: siYoutube,
} as const;
type BrandName = keyof typeof BRAND_MAP;

/** Ícones “genéricos” do site (traço) */
type SysName = "phone" | "globe" | "pinHome" | "mail" | "calendar";

/** União: mantém compatibilidade e adiciona os novos */
export type IconName = BrandName | SysName;

type Props = {
  name: IconName;
  className?: string;      // ex.: "h-5 w-5 text-brand-700"
  title?: string;          // acessibilidade opcional
  color?: string;          // ex.: "currentColor" (para brands) ou "#25D366"
  strokeWidth?: number;    // só afeta os ícones de traço; padrão 2
};

export default function BrandIcon({
  name,
  className = "h-5 w-5",
  title,
  color,
  strokeWidth = 2,
}: Props) {
  // 1) Se for ícone de MARCA (Home continua funcionando igual)
  const brand = (BRAND_MAP as Record<string, { path: string; hex: string }>)[
    name as BrandName
  ];
  if (brand) {
    const fill = color ?? `#${brand.hex}`; // default = cor oficial da marca
    return (
      <svg
        viewBox="0 0 24 24"
        role={title ? "img" : "presentation"}
        aria-label={title}
        aria-hidden={title ? undefined : true}
        className={className}
      >
        <path d={brand.path} fill={fill} />
      </svg>
    );
  }

  // 2) Ícones de traço (site): estilize com `text-*` e tamanhos via className
  switch (name as SysName) {
    case "phone":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          role={title ? "img" : "presentation"}
          aria-label={title}
        >
          <path d="M22 16.92v2a3 3 0 0 1-3.27 3A19.5 19.5 0 0 1 3.1 6.27 3 3 0 0 1 6.1 3h2a2 2 0 0 1 2 1.72c.07.58.2 1.14.38 1.69a2 2 0 0 1-.45 2.11l-.96.96a16 16 0 0 0 6.46 6.46l.96-.96a2 2 0 0 1 2.11-.45c.55.18 1.11.31 1.69.38A2 2 0 0 1 22 16.92Z" />
        </svg>
      );

    case "globe":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          role={title ? "img" : "presentation"}
          aria-label={title}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 0 0 20" />
          <path d="M12 2a15.3 15.3 0 0 1 0 20" />
        </svg>
      );

    case "pinHome":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          role={title ? "img" : "presentation"}
          aria-label={title}
        >
          {/* Pin */}
          <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
          {/* Casinha simplificada */}
          <path d="M9.5 12.5V10l2.5-2 2.5 2v2.5" />
          <path d="M9.5 12.5h5" />
        </svg>
      );

    case "mail":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          role={title ? "img" : "presentation"}
          aria-label={title}
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );

    case "calendar":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          role={title ? "img" : "presentation"}
          aria-label={title}
        >
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );

    default:
      return null;
  }
}
