// app/institucional/noticias/page.tsx
import { permanentRedirect } from "next/navigation";

// Precisa exportar um componente React (mesmo que nunca renderize)
export default function InstitucionalNoticiasPage() {
  permanentRedirect("/noticias"); // 301 para a listagem real
}
