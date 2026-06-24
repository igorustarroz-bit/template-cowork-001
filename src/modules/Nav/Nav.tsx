import { useEffect, useRef, useState, type ReactNode } from "react";
import { ActionButton } from "../../components/ActionButton";
import { ActionLinkButton } from "../../components/ActionLinkButton";
import type { SemanticTheme } from "../../tokens/semantic-colors";

export interface NavLink { label: string; href?: string; }
export interface NavEntry { label: string; submenu?: NavLink[]; }

export interface NavProps {
  items?: NavEntry[];
  utility?: NavLink[];
  activeLabel?: string;
  /** Sticky: ocultar al bajar, mostrar al subir. */
  hideOnScroll?: boolean;
  theme?: SemanticTheme;
}

const DEFAULT_ITEMS: NavEntry[] = [
  { label: "Inicio" },
  { label: "EURO 6000", submenu: [{ label: "Quiénes somos" }, { label: "Soluciones para banca" }, { label: "Área de prensa" }] },
  { label: "Red de cajeros", submenu: [{ label: "Localizador" }, { label: "Comisiones" }] },
  { label: "Programa EURO 6000 Plus", submenu: [{ label: "Cómo funciona" }, { label: "Ventajas" }, { label: "Activar" }] },
];
const DEFAULT_UTILITY: NavLink[] = [{ label: "Ayuda" }, { label: "Castellano" }];

const Caret = ({ open }: { open?: boolean }): ReactNode => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s ease" }}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/** Ítem de menú (placeholder del futuro componente Navigation): texto transparente,
 *  caret si tiene submenú, y pill gris (Backgrounds/Neutral-1) cuando está activo. */
function NavItem({ label, hasCaret, active, expanded, onClick }: {
  label: string; hasCaret?: boolean; active?: boolean; expanded?: boolean; onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={hasCaret ? expanded : undefined}
      aria-current={active ? "page" : undefined}
      className={[
        "type-cta-01 inline-flex h-10 items-center gap-[var(--space-1)] rounded-[var(--radius-rounded)] px-[var(--space-4)] transition-colors",
        "text-sem-texts-base hover:bg-sem-backgrounds-neutral-1",
        active ? "bg-sem-backgrounds-neutral-1" : "bg-transparent",
      ].join(" ")}
    >
      {label}
      {hasCaret && <Caret open={expanded} />}
    </button>
  );
}

function useHideOnScroll(enabled: boolean) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > last && y > 80) setHidden(true);
      else if (y < last) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled]);
  return hidden;
}

/**
 * Navegación principal (desktop) — Figma `Navigation`. Ítems de texto con dropdown
 * (megamenú) al click (uno a la vez, `aria-expanded`, cierra con Esc/clic fuera);
 * ítem activo con pill gris. Barra sticky que se oculta al bajar y reaparece al subir.
 * Mode-driven (`Backgrounds/Base`).
 */
export function Nav({
  items = DEFAULT_ITEMS,
  utility = DEFAULT_UTILITY,
  activeLabel = "Inicio",
  hideOnScroll = true,
  theme,
}: NavProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const hidden = useHideOnScroll(hideOnScroll);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpenIndex(null); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenIndex(null); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [openIndex]);

  useEffect(() => { if (hidden) setOpenIndex(null); }, [hidden]);

  const open = openIndex !== null ? items[openIndex] : null;

  return (
    <nav
      ref={ref}
      data-theme={theme}
      className="sticky top-0 z-50 w-full bg-sem-backgrounds-base transition-transform duration-300 ease-out"
      style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}
    >
      <div className="flex h-[72px] items-center justify-between gap-[var(--gutter)] px-[var(--wrapper-default)]">
        <div className="flex items-center gap-[var(--space-5)]">
          <span className="type-title-01 select-none text-sem-texts-accent-base" aria-label="EURO 6000">EURO 6000</span>
          <ul className="flex items-center gap-[var(--space-1)]">
            {items.map((it, i) => (
              <li key={it.label}>
                <NavItem
                  label={it.label}
                  hasCaret={!!it.submenu}
                  active={it.label === activeLabel}
                  expanded={openIndex === i}
                  onClick={() => (it.submenu ? setOpenIndex((c) => (c === i ? null : i)) : setOpenIndex(null))}
                />
              </li>
            ))}
          </ul>
        </div>
        <ul className="flex items-center gap-[var(--space-2)]">
          {utility.map((u) => (
            <li key={u.label}>
              <ActionButton variant="secondary" size="xs">{u.label}</ActionButton>
            </li>
          ))}
        </ul>
      </div>

      {open?.submenu && (
        <div className="absolute inset-x-0 top-[72px] border-t border-sem-strokes-icons-neutral-2 bg-sem-backgrounds-base shadow-lg">
          <div className="flex gap-[var(--gutter)] px-[var(--wrapper-default)] py-[var(--space-7)]">
            <ul className="flex flex-col gap-[var(--space-2)]">
              {open.submenu.map((s) => (
                <li key={s.label}>
                  <ActionLinkButton size="s">{s.label}</ActionLinkButton>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
