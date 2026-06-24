import type { ReactNode } from "react";
import { ActionButton } from "../../components/ActionButton";
import { CashbackCard } from "./CashbackCard";
import type { SemanticTheme } from "../../tokens/semantic-colors";

export interface ImageTextoProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  image?: string;
  /** Modo de color del módulo (override del global). */
  theme?: SemanticTheme;
  /** Modo de color propio de la CashbackCard (si no se pasa overlay propio). */
  cashbackTheme?: SemanticTheme;
  /** Invertido: imagen a la izquierda, texto a la derecha (espejo). */
  reverse?: boolean;
  /** Overlay personalizado sobre la imagen (centrado). Si no, usa CashbackCard (abajo-dcha). */
  overlay?: ReactNode;
}

/**
 * Módulo Image+Texto — Figma `Image+Texto` (y su versión invertida). Dos zonas:
 * texto (≈4 col) e imagen cuadrada (6 col) con un overlay. `reverse` intercambia los
 * lados. Mobile-first apilado → grid 12 col en `lg`, centrado vertical.
 */
export function ImageTexto({
  title = "Programa EURO 6000 Plus: compra como siempre, ahorra como nunca",
  description = "Activa el Programa EURO 6000 Plus y disfruta de descuentos y cashback en cientos de marcas y tiendas que utilizas cada día.",
  buttonLabel = "Activar programa",
  image,
  theme,
  cashbackTheme = "dark-red-primary",
  reverse = false,
  overlay,
}: ImageTextoProps) {
  const textCol = reverse ? "lg:col-start-8 lg:col-span-4" : "lg:col-start-2 lg:col-span-4";
  const imgCol = reverse ? "lg:col-start-1 lg:col-span-6" : "lg:col-start-7 lg:col-span-6";
  return (
    <section
      data-theme={theme}
      className="flex flex-col gap-[var(--space-9)] bg-sem-backgrounds-base px-[var(--wrapper-default)] py-[var(--space-13)] lg:grid lg:grid-cols-12 lg:items-center lg:gap-[var(--gutter)]"
    >
      <div className={`flex flex-col ${textCol}`}>
        <div className="flex flex-col gap-[var(--space-6)]">
          <h2 className="type-title-04 text-sem-texts-base">{title}</h2>
          <p className="type-body-03 text-sem-texts-neutral-1">{description}</p>
        </div>
        <div className="mt-[var(--space-7)]">
          <ActionButton variant="primary" size="s">{buttonLabel}</ActionButton>
        </div>
      </div>

      <div
        className={`relative aspect-square w-full overflow-hidden rounded-[var(--radius-l)] bg-sem-backgrounds-neutral-2 ${imgCol}`}
        style={image ? { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      >
        {overlay ? (
          <div className="absolute inset-0 flex items-center justify-center p-[var(--space-7)]">{overlay}</div>
        ) : (
          <div className="absolute bottom-[var(--space-5)] right-[var(--space-5)] w-[min(362px,calc(100%-40px))]">
            <CashbackCard theme={cashbackTheme} />
          </div>
        )}
      </div>
    </section>
  );
}
