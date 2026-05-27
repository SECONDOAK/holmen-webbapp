import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';

/**
 * Sorteringsriktning för en tabellkolumn.
 */
export type SortDirection = 'asc' | 'desc';

interface SortHeaderProps {
  label: string;
  active: boolean;
  direction: SortDirection;
  align?: 'left' | 'right';
  onClick: () => void;
}

/**
 * Klickbar tabellheader för sorterbara kolumner.
 *
 * Alla sortbara kolumner visar en dim `ChevronsUpDown` som signalerar
 * att de KAN sorteras; den aktiva kolumnen visar istället en tydlig
 * `ChevronUp`/`ChevronDown` beroende på sorteringsriktning.
 *
 * Används av DocumentsPage, InvoicesPage och AnnualStatementPage så
 * att alla tabeller i ekonomi-flödet har samma utseende.
 */
export default function SortHeader({
  label,
  active,
  direction,
  align = 'left',
  onClick,
}: SortHeaderProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-[4px] cursor-pointer hover:opacity-90 transition-opacity ${
        align === 'right' ? 'justify-end' : 'justify-start'
      }`}
    >
      <span
        className="font-['IBM_Plex_Sans',sans-serif] font-semibold text-[12px] text-[#021c20] uppercase tracking-[0.5px] opacity-70 select-none"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        {label}
      </span>
      {active ? (
        direction === 'asc' ? (
          <ChevronUp className="size-[14px] text-[#021c20]" strokeWidth={2} />
        ) : (
          <ChevronDown className="size-[14px] text-[#021c20]" strokeWidth={2} />
        )
      ) : (
        <ChevronsUpDown
          className="size-[14px] text-[#021c20] opacity-30"
          strokeWidth={2}
        />
      )}
    </button>
  );
}
