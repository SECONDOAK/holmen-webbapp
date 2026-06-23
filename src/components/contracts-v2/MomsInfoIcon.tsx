import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

/**
 * Moms-variant per sektion:
 *   - `exkl`:  beloppen är exklusive moms (t.ex. avräkningens line-items)
 *   - `inkl`:  beloppen är inklusive moms (faktiska kassaflöden — innestående
 *             medel, betalplan, utbetalningar)
 *   - `mixed`: radbeloppen är exkl moms men totalsumman inkluderar moms 25%
 *             (avräknings-summering)
 */
export type MomsVariant = 'exkl' | 'inkl' | 'mixed';

export const MOMS_INFO_TEXT: Record<MomsVariant, string> = {
  exkl: 'Belopp visas exklusive moms.',
  inkl: 'Belopp visas inklusive moms.',
  mixed: 'Radbeloppen visas exklusive moms. Totalsumman inkluderar moms 25 %.',
};

/**
 * Liten moms-info-ikon. Återanvänds på alla sektioner som visar summor
 * så användaren vet om beloppen är inkl. eller exkl. moms.
 */
export function MomsInfoIcon({ variant }: { variant: MomsVariant }) {
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Information om moms"
        >
          <Info className="size-[14px] text-[#021c20]" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" align="center" className="max-w-[240px] z-[9999] text-center">
        {MOMS_INFO_TEXT[variant]}
      </TooltipContent>
    </Tooltip>
  );
}

/** Visningsläge för belopp som kan växlas via `MomsToggle`. */
export type MomsMode = 'exkl' | 'inkl';

/**
 * Räknar ut det belopp som ska visas givet ett netto-belopp (datat lagras
 * som netto/exkl moms) och valt visningsläge. 25 % moms-schablon, samma
 * logik som `applyMoms` i contractsV2Data.
 */
export function momsDisplayAmount(netto: number, mode: MomsMode): number {
  return mode === 'inkl' ? Math.round(netto * 1.25) : netto;
}

/**
 * Liten segmenterad toggle (Ex moms / Ink moms) som låter användaren växla
 * hur radbeloppen visas i en sektion. Används i kontraktsvyns Betalplan-
 * och Utbetalningar-kort.
 */
export function MomsToggle({
  value,
  onChange,
}: {
  value: MomsMode;
  onChange: (mode: MomsMode) => void;
}) {
  const options: Array<{ id: MomsMode; label: string }> = [
    { id: 'exkl', label: 'Ex moms' },
    { id: 'inkl', label: 'Ink moms' },
  ];
  return (
    <div
      className="ml-auto flex items-center border border-[#d4d4d4] bg-white shrink-0"
      role="group"
      aria-label="Visa belopp exklusive eller inklusive moms"
    >
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            aria-pressed={active}
            className={`font-['IBM_Plex_Sans',sans-serif] font-semibold text-[11px] tracking-[0.3px] px-[12px] py-[4px] transition-colors ${
              active
                ? 'bg-[#1e3856] text-white'
                : 'bg-white text-[#021c20] opacity-60 hover:opacity-100'
            }`}
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Generisk info-ikon med valfri tooltip-text. Används där `MomsInfoIcon`
 * inte passar — t.ex. för förklaringar av kopplingar eller andra
 * kontextuella hjälptexter.
 */
export function InfoTooltipIcon({ text }: { text: string }) {
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Information"
        >
          <Info className="size-[14px] text-[#021c20]" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" align="center" className="max-w-[260px] z-[9999] text-center">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}
