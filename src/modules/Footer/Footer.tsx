import type { ReactNode } from "react";
import type { SemanticTheme } from "../../tokens/semantic-colors";

export interface FooterColumn { title: string; links: string[]; }
export interface FooterProps {
  /** Logo de marca (slot · vector). Si no se pasa, placeholder de texto. */
  logo?: ReactNode;
  columns?: FooterColumn[];
  copyright?: string;
  theme?: SemanticTheme;
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  { title: "EURO 6000", links: ["Quiénes somos", "Soluciones para banca", "Área de prensa"] },
  { title: "Red de cajeros", links: ["Buscador de cajeros", "Lista de cajeros"] },
  { title: "Programa EURO 6000 Plus", links: ["El programa", "Descuentos", "Cashback", "Restaurantes", "Blog", "Activar EURO 6000 Plus"] },
  { title: "Ayuda y contacto", links: ["Faqs", "Contacto", "Teléfonos"] },
  { title: "Legal", links: ["Aviso Legal", "Política y configuración de cookies", "Política de Privacidad", "Código ético", "Sistema interno de información"] },
];

const SOCIAL: { name: string; icon: ReactNode }[] = [
  { name: "YouTube", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.7-.5-5.4a2.8 2.8 0 0 0-2-2C18.7 4 12 4 12 4s-6.7 0-8.5.6a2.8 2.8 0 0 0-2 2C1 8.3 1 12 1 12s0 3.7.5 5.4a2.8 2.8 0 0 0 2 2C5.3 20 12 20 12 20s6.7 0 8.5-.6a2.8 2.8 0 0 0 2-2C23 15.7 23 12 23 12ZM10 15.5v-7l6 3.5-6 3.5Z" /></svg> },
  { name: "Instagram", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg> },
  { name: "Facebook", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3 1.3-3 3.2V11H8v3h3v7h3v-7h2.5l.5-3H14V9.4c0-.3.2-.4.5-.4Z" /></svg> },
  { name: "Twitter", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h4.5l3.3 4.8L16 4h3l-5.3 6.7L20 20h-4.5l-3.7-5.3L7.5 20H4l5.6-7L4 4Z" /></svg> },
  { name: "LinkedIn", icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 8.5H4V20h2.9V8.5ZM5.4 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20 13.4c0-3-1.6-4.4-3.7-4.4-1.7 0-2.5.9-2.9 1.6V8.5H10.5V20h2.9v-6.1c0-1.3.6-2.1 1.7-2.1 1 0 1.6.7 1.6 2.1V20H20v-6.6Z" /></svg> },
];

/**
 * Footer — Figma `Footer`. Oscuro (Dark-Black-Neutral). Logo (vector, slot) + columnas
 * de enlaces separadas por **líneas verticales** (Strokes-Icons/Neutral 3), y barra
 * inferior con **botones sociales circulares** (44px, Backgrounds/Inverse) + copyright.
 * max-width 1440. Mode-driven.
 */
export function Footer({
  logo,
  columns = DEFAULT_COLUMNS,
  copyright = "Todos los derechos reservados ® EURO 6000 2026",
  theme = "dark-black-neutral",
}: FooterProps) {
  return (
    <footer data-theme={theme} className="bg-sem-backgrounds-base pb-[var(--space-7)] pt-[var(--space-10)] text-sem-texts-base">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[var(--space-13)] px-[var(--wrapper-default)]">
        <div className="flex flex-wrap justify-between gap-[var(--space-9)]">
          {columns.map((col, i) => (
            <nav
              key={col.title}
              className={[
                "flex min-w-[140px] flex-col gap-[var(--space-3)]",
                i > 0 ? "border-l border-sem-strokes-icons-neutral-3 pl-[var(--gutter)]" : "",
              ].join(" ")}
            >
              {i === 0 ? (
                <span className="text-sem-texts-base">{logo ?? <span className="type-title-01" aria-label={col.title}>{col.title}</span>}</span>
              ) : (
                <span className="type-cta-02 text-sem-texts-base">{col.title}</span>
              )}
              <ul className="flex flex-col gap-[var(--space-3)]">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="type-body-03 text-sem-texts-neutral-1 transition-colors hover:text-sem-texts-base">{l}</a></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-[var(--space-4)]">
          <ul className="flex items-center gap-[var(--space-4)]">
            {SOCIAL.map((s) => (
              <li key={s.name}>
                <a href="#" aria-label={s.name} className="flex h-11 w-11 items-center justify-center rounded-full bg-sem-backgrounds-inverse text-sem-texts-inverted transition-opacity hover:opacity-90">
                  <span className="h-5 w-5">{s.icon}</span>
                </a>
              </li>
            ))}
          </ul>
          <span className="type-body-02 text-sem-texts-neutral-1">{copyright}</span>
        </div>
      </div>
    </footer>
  );
}
