import { useEffect, useRef, useState } from "react";
import { ActionButton } from "../../components/ActionButton";
import { ActionLinkButton } from "../../components/ActionLinkButton";
import type { SemanticTheme } from "../../tokens/semantic-colors";

export interface NavLink { label: string; href?: string; }
export interface NavEntry { label: string; submenu?: NavLink[]; }

export interface NavProps {
  items?: NavEntry[];
  utility?: NavLink[];
  activeLabel?: string;
  /** Comportamiento sticky: ocultar al bajar, mostrar al subir. */
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

/** Oculta al bajar y reaparece al subir. */
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
 * Navegación principal (desktop) — Figma `Navigation`. Ítems con dropdown (megamenú)
 * que abre al hacer click (uno a la vez), ítem activo resaltado y barra sticky que
 * se oculta al bajar y reaparece al subir. Mode-driven (`Backgrounds/Base`).
 * Nota: los ítems usan `ActionButton` como placeholder (se sustituirán por `Navigation`).
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

  const toggle = (i: number, hasSub: boolean) => { if (hasSub) setOpenIndex((cur) => (cur === i ? null : i)); else setOpenIndex(null); };
  const open = openIndex !== null ? items[openIndex] : null;

  return (
    <nav
      ref={ref}
      data-theme={theme}
      className="sticky top-0 z-50 w-full bg-sem-backgrounds-base transition-transform duration-300 ease-out"
      style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}
    >
      <div className="flex h-[72px] items-center justify-between gap-[var(--gutter)] px-[var(--wrapper-default)]">
        <div className="flex items-center gap-[var(--space-3)]">
          <span className="type-title-01 select-none text-sem-texts-accent-base" aria-label="EURO 6000">EURO 6000</span>
          <ul className="flex items-center gap-[var(--space-1)]">
            {items.map((it, i) => (
              <li key={it.label}>
                <ActionButton
                  variant="primary"
                  size="xs"
                  selected={it.label === activeLabel || openIndex === i}
                  aria-expanded={it.submenu ? openIndex === i : undefined}
                  onClick={() => toggle(i, !!it.submenu)}
                >
                  {it.label}
                </ActionButton>
              </li>
            ))}
          </ul>
        </div>
        <ul className="flex items-center gap-[var(--space-2)]">
          {utility.map((u) => (
            <li key={u.label}>
              <ActionButton variant="terciary" size="xs">{u.label}</ActionButton>
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
