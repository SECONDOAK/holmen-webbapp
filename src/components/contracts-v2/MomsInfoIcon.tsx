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
