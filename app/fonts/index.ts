import localFont from "next/font/local";

// Arquivo real: app/fonts/silka/Silka-Bold.woff2  (respeite maiúsculas)
export const silkaBold = localFont({
  src: "./silka/Silka Bold.woff2", // caminho RELATIVO a este arquivo
  weight: "700",
  style: "normal",
  variable: "--font-silka-bold",
  display: "swap",
});
