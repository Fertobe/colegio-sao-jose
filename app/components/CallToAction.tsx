"use client";

type CallToActionProps = {
  title?: string;
  subtitle?: string;
  whatsappNumber?: string;         // só dígitos, com DDI
  bgImage?: string;                // ex.: "/cta/hero-cta.jpg" ou URL
  color?: "brand" | "orange";      // curva à direita
  iconPath?: string;               // ex.: "/icones/whatsapp.svg"
  overlayClassName?: string;       // ex.: "bg-black/10"
};

export default function CallToAction({
  title = "Ficou alguma dúvida? Fale com a nossa central.",
  subtitle = "Nossos atendentes estão à disposição para esclarecer as suas dúvidas e oferecer suporte.",
  whatsappNumber = "5542998276516",
  bgImage = "/cta/hero-cta.jpg",
  color = "brand",
  iconPath = "/icones/whatsapp.svg",
  overlayClassName = "bg-black/10",
}: CallToActionProps) {
  const blockColor = color === "brand" ? "text-brand-700" : "text-orange-500";

  return (
    <section className="relative isolate overflow-hidden">
      {/* Fundo */}
      <div className="absolute inset-0">
        <img
          src={bgImage}
          alt="Ambiente do Colégio São José"
          className="h-full w-full object-cover object-center"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          draggable={false}
        />
        <div className={`absolute inset-0 ${overlayClassName}`} />
      </div>

      {/* Bloco curvo à direita */}
      <div className={`absolute inset-y-0 right-0 w-[62%] ${blockColor}`}>
        <svg
          viewBox="0 0 800 600"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,0 H800 V600 H0 C140,470 140,130 0,0 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Conteúdo */}
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20 md:py-24">
        <div className="md:ml-auto md:w-1/2">
          <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            {title}
          </h2>

          <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/95 font-medium">
            {subtitle}
          </p>

          <div className="mt-8">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "Olá! Gostaria de tirar uma dúvida."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir conversa no WhatsApp"
              className="group inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-md transition
                         hover:shadow-xl hover:-translate-y-0.5 focus:-translate-y-0.5 focus:shadow-xl
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70
                         motion-safe:hover:animate-bounce"
              title="Tire suas dúvidas no WhatsApp"
            >
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
