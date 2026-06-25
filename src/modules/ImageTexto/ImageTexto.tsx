import type { ReactNode } from "react";
import { ActionButton } from "../../components/ActionButton";
import { CashbackCard } from "./CashbackCard";
import type { SemanticTheme } from "../../tokens/semantic-colors";
import imgCajero from "@/assets/images/imagetexto-cajero.webp";

export interface ImageTextoProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  image?: string;
  theme?: SemanticTheme;
  cashbackTheme?: SemanticTheme;
  /** Invertido: imagen a la izquierda, texto a la derecha (espejo). */
  reverse?: boolean;
  /** Overlay personalizado sobre la imagen (centrado). Si no, CashbackCard (abajo-dcha). */
  overlay?: ReactNode;
}

/**
 * Módulo Image+Texto — Figma `Image+Texto` (+ versión invertida). Contenedor centrado
 * (max-width 1440), grid de 12 col con `items-center`. `reverse` intercambia los lados
 * (y el orden del DOM, para que ambos queden en la misma fila del grid).
 */
export function ImageTexto({
  title = "Programa EURO 6000 Plus: compra como siempre, ahorra como nunca",
  description = "Activa el Programa EURO 6000 Plus y disfruta de descuentos y cashback en cientos de marcas y tiendas que utilizas cada día.",
  buttonLabel = "Activar programa",
  image = imgCajero,
  theme,
  cashbackTheme = "dark-red-primary",
  reverse = false,
  overlay,
}: ImageTextoProps) {
  const textZone = (
    <div className={`flex flex-col ${reverse ? "lg:col-start-8 lg:col-span-4" : "lg:col-start-2 lg:col-span-4"}`}>
      <div className="flex flex-col gap-[var(--space-6)]">
        <h2 className="type-title-04 text-sem-texts-base">{title}</h2>
        <p className="type-body-03 text-sem-texts-neutral-1">{description}</p>
      </div>
      <div className="mt-[var(--space-7)]">
        <ActionButton variant="primary" size="s">{buttonLabel}</ActionButton>
      </div>
    </div>
  );

  const imageZone = (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-[var(--radius-l)] bg-sem-backgrounds-neutral-2 ${reverse ? "lg:col-start-1 lg:col-span-6" : "lg:col-start-7 lg:col-span-6"}`}
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
  );

  return (
    <section data-theme={theme} className="bg-sem-backgrounds-base py-[var(--space-13)]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-[var(--space-9)] px-[var(--wrapper-default)] lg:grid-cols-12 lg:items-center lg:gap-[var(--gutter)]">
        {reverse ? (<>{imageZone}{textZone}</>) : (<>{textZone}{imageZone}</>)}
      </div>
    </section>
  );
}
