import type { ReactNode } from "react";

const Magnifier: ReactNode = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
);

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

/**
 * SearchBar — Figma `SearchBar`. Pill blanca (`Backgrounds/Base`, radius rounded) con
 * input y botón lupa circular de acento. Mode-driven.
 */
export function SearchBar({ placeholder = "Buscar un cajero…", onSearch }: SearchBarProps) {
  return (
    <form
      className="flex w-[445px] max-w-full items-center gap-[var(--space-3)] rounded-[var(--radius-rounded)] bg-sem-backgrounds-base py-[var(--space-2)] pl-[var(--space-6)] pr-[var(--space-2)] text-sem-texts-base shadow-md"
      onSubmit={(e) => { e.preventDefault(); const v = (e.currentTarget.elements.namedItem("q") as HTMLInputElement)?.value ?? ""; onSearch?.(v); }}
    >
      <input
        name="q"
        type="search"
        placeholder={placeholder}
        className="type-body-03 min-w-0 flex-1 border-0 bg-transparent text-sem-texts-base outline-none placeholder:text-sem-texts-neutral-1"
      />
      <button type="submit" aria-label="Buscar" className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-sem-backgrounds-accent-base text-sem-texts-inverted">
        <span className="h-6 w-6">{Magnifier}</span>
      </button>
    </form>
  );
}
