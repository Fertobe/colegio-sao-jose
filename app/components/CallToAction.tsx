"use client";

type CallToActionProps = {
  /** Título grande (branco), exibido sobre o bloco curvo azul */
  title?: string;
  /** Subtítulo em branco (peso um pouco maior para legibilidade) */
  subtitle?: string;
  /** Somente dígitos, com DDI. Ex.: "5542998276516" */
  whatsappNumber?: string;
  /** Caminho da imagem de fundo. Pode ser URL externa ou caminho de /public (ex.: "/cta/hero-cta.jpg") */
  bgImage?: string;
  /** Cor do bloco curvo: "brand" (azul do colégio) ou "orange" (opcional) */
  color?: "brand" | "orange";
  /** Caminho do SVG do ícone dentro de /public (ex.: "/icones/whatsapp.svg" ou "/ícones/whatsapp.svg") */
  iconPath?: string;
  /** (Opcional) classe utilitária para a “película” sobre a foto. Ex.: "bg-black/10" (padrão) ou "bg-brand-700/10" */
  overlayClassName?: string;
};

export default function CallToAction({
  title = "Ficou alguma dúvida? Fale com a nossa central.",
  subtitle = "Nossos atendentes estão à disposição para esclarecer as suas dúvidas e oferecer suporte.",
  whatsappNumber = "5542998276516",
  // você pode trocar por um arquivo seu em /public, ex.: "/cta/hero-cta.jpg"
  bgImage = "/cta/hero-cta.jpg",
  color = "brand",
  // se sua pasta tiver acento, use "/ícones/whatsapp.svg"
  iconPath = "/icones/whatsapp.svg",
  overlayClassName = "bg-black/10",
}: CallToActionProps) {
  // Cor do bloco curvo à direita (o SVG usa currentColor)
  const blockColor = color === "brand" ? "text-brand-700" : "text-orange-500";

  return (
    <section className="relative isolate overflow-hidden">
      {/* IMAGEM DE FUNDO (mantém exatamente seu layout) */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt="Ambiente do Colégio São José"
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
        {/* Película sutil para contraste do fundo com o texto */}
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>

      {/* BLOCO CURVO AZUL À DIREITA (sem alterações) */}
      <div className={`absolute inset-y-0 right-0 w-[62%] ${blockColor}`}>
        <svg
          viewBox="0 0 800 600"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          preserveAspectRatio="none"
        >
          {/* curva suave à esquerda do bloco */}
          <path d="M0,0 H800 V600 H0 C140,470 140,130 0,0 Z" fill="currentColor" />
        </svg>
      </div>

      {/* CONTEÚDO (texto + botão) */}
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20 md:py-24">
        <div className="md:ml-auto md:w-1/2">
          <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h2>

          <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/95 font-medium">
            {subtitle}
          </p>

          <div className="mt-8">
            {/* Botão com sombra e leve “subir/descer” no hover */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "Olá! Gostaria de tirar uma dúvida."
              )}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir conversa no WhatsApp"
              className="group inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-md transition
                         hover:shadow-xl hover:-translate-y-0.5 focus:-translate-y-0.5 focus:shadow-xl
                         motion-safe:hover:animate-bounce"
            >
              {/* Ícone carregado de /public (SVG) — tamanho fixo para padronizar */}
              <img
                src={iconPath}
                alt=""
                aria-hidden="true"
                className="h-5 w-5 object-contain"
                draggable={false}
              />
              <span>Tire suas dúvidas</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
