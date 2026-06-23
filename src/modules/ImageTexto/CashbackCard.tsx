import type { ReactNode } from "react";
import type { SemanticTheme } from "../../tokens/semantic-colors";

const ArrowUpRight: ReactNode = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
);

export interface CashbackCardProps {
  label?: string;
  amount?: string;
  onAction?: () => void;
  /** Modo de color propio de la card (override del global). */
  theme?: SemanticTheme;
}

/**
 * CashbackCard — Figma `CashbackCard`. Mode-driven: usa tokens semánticos `Base`
 * (no colores fijos); su MODO (data-theme) la colorea. Por defecto Dark-Red-Primary
 * → fondo rojo + texto blanco; en Light-White sería blanca + texto negro.
 */
export function CashbackCard({ label = "Cashback acumulado", amount = "+128,40 €", onAction, theme }: CashbackCardProps) {
  const bars = [42, 66, 54, 82, 70, 90];
  return (
    <div
      data-theme={theme}
      className="flex h-[307px] w-full flex-col justify-between rounded-[var(--radius-l)] bg-sem-backgrounds-base p-[var(--space-6)] text-sem-texts-base"
    >
      <div className="flex flex-col gap-[var(--space-1)]">
        <span className="type-body-02">{label}</span>
        <span className="type-title-02">{amount}</span>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex h-[72px] items-end gap-[var(--space-2)]">
          {bars.map((h, i) => (
            <div key={i} className="w-[10px] rounded-[var(--radius-xs)] bg-sem-texts-base" style={{ height: `${h}%`, opacity: 0.85 }} />
          ))}
        </div>
        <button
          type="button"
          aria-label="Ver cashback"
          onClick={onAction}
          className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-sem-backgrounds-inverse text-sem-texts-inverted"
        >
          <span className="h-6 w-6">{ArrowUpRight}</span>
        </button>
      </div>
    </div>
  );
}
