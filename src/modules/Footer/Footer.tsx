import type { ReactNode } from "react";
import type { SemanticTheme } from "../../tokens/semantic-colors";

export interface FooterColumn { title: string; links: string[]; }
export interface FooterProps {
  /** Logo de marca (slot · vector). Si no se pasa, placeholder. */
  logo?: ReactNode;
  columns?: FooterColumn[];
  copyright?: string;
  theme?: SemanticTheme;
  /** Modo propio del grupo de redes (en Figma: Light-White → botones blancos + icono rojo). */
  socialTheme?: SemanticTheme;
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  { title: "EURO 6000", links: ["Quiénes somos", "Soluciones para banca", "Área de prensa"] },
  { title: "Red de cajeros", links: ["Buscador de cajeros", "Lista de cajeros"] },
  { title: "Programa EURO 6000 Plus", links: ["El programa", "Descuentos", "Cashback", "Restaurantes", "Blog", "Activar EURO 6000 Plus"] },
  { title: "Ayuda y contacto", links: ["Faqs", "Contacto", "Teléfonos"] },
  { title: "Legal", links: ["Aviso Legal", "Política y configuración de cookies", "Política de Privacidad", "Código ético", "Sistema interno de información"] },
];

// Iconos de marca en OUTLINE (trazo). Color por currentColor (Strokes-Icons/Accent-Base).
const sv = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const SOCIAL: { name: string; icon: ReactNode }[] = [
  { name: "YouTube", icon: <svg {...sv}><rect x="2.5" y="6" width="19" height="12" rx="3.5" /><path d="M10.5 9.5v5l4-2.5z" /></svg> },
  { name: "Instagram", icon: <svg {...sv}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="3.8" /><circle cx="17" cy="7" r="0.6" /></svg> },
  { name: "Facebook", icon: <svg {...sv}><circle cx="12" cy="12" r="9" /><path d="M13.6 8.2h1.2m-3 12V11c0-1.4.7-2.2 2.1-2.2M10.4 13h3.8" /></svg> },
  { name: "Twitter", icon: <svg {...sv}><path d="M5 5l14 14M19 5 5 19" /></svg> },
  { name: "LinkedIn", icon: <svg {...sv}><rect x="3.5" y="3.5" width="17" height="17" rx="3.5" /><path d="M8 10.5V17M8 7.5v.01M12 17v-3.5a2 2 0 0 1 4 0V17" /></svg> },
];

/**
 * Footer — Figma `Footer`. Oscuro (Dark-Black-Neutral). Columnas de enlaces (todo
 * en `Body/03`) separadas por líneas verticales (Strokes-Icons/Neutral 3), y barra
 * inferior: logo (vector, slot) + copyright a la izquierda; redes a la derecha
 * (botones circulares, bg Backgrounds/Base, icono outline en Strokes-Icons/Accent-Base).
 * Distancia columnas↔barra = Spacers/18. max-width 1440. Mode-driven.
 */
export function Footer({
  logo,
  columns = DEFAULT_COLUMNS,
  copyright = "Todos los derechos reservados ® EURO 6000 2026",
  theme = "dark-black-neutral",
  socialTheme = "light-white",
}: FooterProps) {
  return (
    <footer data-theme={theme} className="bg-sem-backgrounds-base pb-[var(--space-7)] pt-[var(--space-10)] text-sem-texts-base">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[var(--space-18)] px-[var(--wrapper-default)]">
        <div className="flex flex-wrap justify-between gap-[var(--space-9)]">
          {columns.map((col, i) => (
            <nav
              key={col.title}
              className={[
                "flex min-w-[140px] flex-col gap-[var(--space-3)]",
                i > 0 ? "border-l border-sem-strokes-icons-neutral-3 pl-[var(--gutter)]" : "",
              ].join(" ")}
            >
              <span className="type-body-03 text-sem-texts-base">{col.title}</span>
              <ul className="flex flex-col gap-[var(--space-3)]">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="type-body-03 text-sem-texts-neutral-1 transition-colors hover:text-sem-texts-base">{l}</a></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-[var(--space-7)]">
          <div className="flex items-center gap-[var(--space-5)]">
            {logo ?? <span className="type-title-02 text-sem-texts-accent-base" aria-label="EURO 6000">6:</span>}
            <span className="type-body-02 text-sem-texts-neutral-1">{copyright}</span>
          </div>
          <ul data-theme={socialTheme} className="flex items-center gap-[var(--space-2)]">
            {SOCIAL.map((s) => (
              <li key={s.name}>
                <a href="#" aria-label={s.name} className="flex h-11 w-11 items-center justify-center rounded-full bg-sem-backgrounds-base text-sem-strokes-icons-accent-base transition-opacity hover:opacity-80">
                  <span className="h-5 w-5">{s.icon}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
