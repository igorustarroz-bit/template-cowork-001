import { ActionButton } from "../../components/ActionButton";
import { CashbackCard } from "./CashbackCard";

export interface ImageTextoProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  image?: string;
}

/**
 * Módulo Image+Texto — Figma `Image+Texto` (Euro6000). Dos zonas:
 *  - Texto (≈4 col, anclado izquierda, arranca en col 2) · título Title/04 + Body/03 + CTA.
 *  - Imagen (6 col, anclada derecha) cuadrada (object-cover) con CashbackCard overlay
 *    anclada abajo-derecha (tamaño fijo).
 * Mobile-first: apilado; en `lg` pasa a grid de 12 col (dos zonas), centradas vertical.
 */
export function ImageTexto({
  title = "Programa EURO 6000 Plus: compra como siempre, ahorra como nunca",
  description = "Activa el Programa EURO 6000 Plus y disfruta de descuentos y cashback en cientos de marcas y tiendas que utilizas cada día.",
  buttonLabel = "Activar programa",
  image,
}: ImageTextoProps) {
  return (
    <section className="flex flex-col gap-[var(--space-9)] bg-sem-backgrounds-base px-[var(--wrapper-default)] py-[var(--space-13)] lg:grid lg:grid-cols-12 lg:items-center lg:gap-[var(--gutter)]">
      <div className="flex flex-col lg:col-span-4 lg:col-start-2">
        <div className="flex flex-col gap-[var(--space-6)]">
          <h2 className="type-title-04 text-sem-texts-base">{title}</h2>
          <p className="type-body-03 text-sem-texts-neutral-1">{description}</p>
        </div>
        <div className="mt-[var(--space-7)]">
          <ActionButton variant="primary" size="s">{buttonLabel}</ActionButton>
        </div>
      </div>

      <div
        className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-l)] bg-sem-backgrounds-neutral-2 lg:col-span-6 lg:col-start-7"
        style={image ? { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
      >
        <div className="absolute bottom-[var(--space-5)] right-[var(--space-5)] w-[min(362px,calc(100%-40px))]">
          <CashbackCard />
        </div>
      </div>
    </section>
  );
}
