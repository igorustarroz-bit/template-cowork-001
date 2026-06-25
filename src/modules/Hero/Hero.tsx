import { useEffect, useState, type ReactNode } from "react";
import { HeroCard } from "./HeroCard";
import type { SemanticTheme } from "../../tokens/semantic-colors";

export interface HeroSlide { image?: string; cardTitle: string; cardIcon?: ReactNode; }
export interface HeroProps {
  title?: string;
  subtitle?: string;
  slides?: HeroSlide[];
  theme?: SemanticTheme;
  /** ms de autoplay (0 lo desactiva). */
  autoplayMs?: number;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  { cardTitle: "Una amplia red\nde cajeros en toda\nEspaña" },
  { cardTitle: "Saca dinero sin\ncomisiones" },
  { cardTitle: "La seguridad de tu\nbanco de siempre" },
];

/**
 * Hero — Figma `Hero` (Dark-Red-Primary). Título + subtítulo centrados y un
 * carrusel (imagen + HeroCard overlay) con autoplay y paginador de dots clicables.
 * Cambian imagen+card por slide; el título/subtítulo son fijos. Mode-driven; la nav
 * (Light-White) y la card (Dark-Black-Brand) llevan su propio modo. max-width 1440.
 */
export function Hero({
  title = "EURO 6000 servicios y ventajas para el día a día",
  subtitle = "Saca dinero, paga con confianza y ahorra con EURO 6000 Plus. Más comodidad, más ventajas y la seguridad de operar desde tu banco de siempre.",
  slides = DEFAULT_SLIDES,
  theme = "dark-red-primary",
  autoplayMs = 5000,
}: HeroProps) {
  const [i, setI] = useState(0);
  const n = slides.length;
  useEffect(() => {
    if (!autoplayMs || n <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), autoplayMs);
    return () => clearInterval(t);
  }, [autoplayMs, n]);
  const slide = slides[i];
  return (
    <section data-theme={theme} className="bg-sem-backgrounds-base py-[var(--space-13)] text-sem-texts-base">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-[var(--wrapper-default)]">
        <div className="flex flex-col items-center gap-[var(--space-7)] text-center">
          <h1 className="type-title-06 max-w-[908px] whitespace-pre-line">{title}</h1>
          <p className="type-body-03 max-w-[676px]">{subtitle}</p>
        </div>

        <div
          className="relative mt-[var(--space-15)] aspect-[1376/838] w-full overflow-hidden rounded-[var(--radius-xl)] bg-sem-backgrounds-neutral-2"
          style={slide.image ? { backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
        >
          <div className="absolute left-[6%] top-1/2 h-[72%] w-[min(446px,42%)] -translate-y-1/2">
            <HeroCard title={slide.cardTitle} icon={slide.cardIcon} />
          </div>
        </div>

        <div className="mt-[var(--space-6)] flex items-center gap-[var(--space-2)]" role="tablist" aria-label="Carrusel">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === i}
              aria-label={`Ir al slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className={["h-2 rounded-full transition-all duration-300", idx === i ? "w-[22px] bg-[var(--color-neutral-black)]" : "w-2 bg-[var(--color-neutral-white)]"].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
